// Required to disable for webkit-user-select, although deprecated, it is still required for Safari support
/* eslint-disable @typescript-eslint/no-deprecated */
import type { RefCallback } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const useRefValue = <T>(value: T) => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

interface FloatingWindowPositionConfig {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

interface FloatingWindowPosition {
  /** Element offset from the left side of the viewport */
  x: number;

  /** Element offset from the top side of the viewport */
  y: number;
}

export interface UseFloatingWindowOptions {
  /** If `false`, the element can not be dragged. */
  enabled?: boolean;

  /** If `true`, the element can only move within the current viewport boundaries. */
  constrainToViewport?: boolean;

  /** The offset from the viewport edges when constraining the element. Requires `constrainToViewport: true`. */
  constrainOffset?: number;

  /** Selector of an element that should be used to drag floating window. If not specified, the entire root element is used as a drag target. */
  dragHandleSelector?: string;

  /** Selector of an element within `dragHandleSelector` that should be excluded from the drag event. */
  excludeDragHandleSelector?: string;

  /** If set, restricts movement to the specified axis */
  axis?: "x" | "y";

  /** Initial position. If not set, calculated from element styles. */
  initialPosition?: FloatingWindowPositionConfig;

  /** Called when the element position changes */
  onPositionChange?: (pos: FloatingWindowPosition) => void;

  /** Called when the drag starts */
  onDragStart?: () => void;

  /** Called when the drag stops */
  onDragEnd?: () => void;
}

export type SetFloatingWindowPosition = (
  position: FloatingWindowPositionConfig
) => void;

export interface UseFloatingWindowReturnValue<T extends HTMLElement> {
  /** Ref to the element that should be draggable */
  ref: RefCallback<T | null>;

  /** Function to set the position of the element */
  setPosition: SetFloatingWindowPosition;

  /** `true` if the element is currently being dragged */
  isDragging: boolean;
}

const px = (value: string) =>
  value.endsWith("px") ? Number.parseFloat(value) : 0;

const clampToViewport = (
  x: number,
  y: number,
  el: HTMLElement,
  offset = 0
): FloatingWindowPosition => {
  const rect = el.getBoundingClientRect();
  const maxX = window.innerWidth - rect.width - offset;
  const maxY = window.innerHeight - rect.height - offset;

  return {
    x: Math.min(Math.max(offset, x), maxX),
    y: Math.min(Math.max(offset, y), maxY),
  };
};

const getConstrainedPosition = (
  el: HTMLElement,
  pos: FloatingWindowPosition,
  constrainToViewport: boolean,
  constrainOffset: number
): FloatingWindowPosition => {
  if (!constrainToViewport) {
    return pos;
  }

  const rect = el.getBoundingClientRect();
  const maxX = window.innerWidth - rect.width - constrainOffset;
  const maxY = window.innerHeight - rect.height - constrainOffset;

  return {
    x: Math.min(Math.max(constrainOffset, pos.x), maxX),
    y: Math.min(Math.max(constrainOffset, pos.y), maxY),
  };
};

const matchesExcludeSelector = (target: Node, excludeSelector?: string) => {
  if (!excludeSelector || !(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest(excludeSelector));
};

const getHandle = (
  el: HTMLElement,
  target: EventTarget | null,
  dragHandleSelector: string | undefined,
  excludeDragHandleSelector: string | undefined
): boolean => {
  if (!(target instanceof Node)) {
    return false;
  }

  // If no drag handle selector, allow dragging from entire element.
  if (!dragHandleSelector) {
    return !matchesExcludeSelector(target, excludeDragHandleSelector);
  }

  const handles = [...el.querySelectorAll(dragHandleSelector)];
  return handles.some(
    (handle) =>
      handle.contains(target) &&
      !matchesExcludeSelector(target, excludeDragHandleSelector)
  );
};

const calculateInitialPosition = (
  el: HTMLElement,
  initialPosition: FloatingWindowPositionConfig | undefined,
  constrainToViewport: boolean,
  constrainOffset: number
): FloatingWindowPosition => {
  const rect = el.getBoundingClientRect();
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const style = window.getComputedStyle(el);

  const top = initialPosition?.top;
  const left = initialPosition?.left;
  const right = initialPosition?.right;
  const bottom = initialPosition?.bottom;

  let x = constrainOffset;
  let y = constrainOffset;

  const fallbackX =
    px(style.left) || winW - rect.width - px(style.right) || constrainOffset;
  const fallbackY =
    px(style.top) || winH - rect.height - px(style.bottom) || constrainOffset;

  const fromRight = right === undefined ? fallbackX : winW - rect.width - right;
  const fromBottom =
    bottom === undefined ? fallbackY : winH - rect.height - bottom;

  x = left === undefined ? fromRight : left;
  y = top === undefined ? fromBottom : top;

  if (!constrainToViewport) {
    return { x, y };
  }

  return clampToViewport(x, y, el, constrainOffset);
};

/**
 * Makes an element draggable and keeps its absolute position in sync with pointer/touch movement.
 * Supports drag handles, axis locking, viewport constraints, drag lifecycle callbacks, and imperative repositioning.
 *
 * @param {UseFloatingWindowOptions} options Configuration for drag behavior, constraints, initial position, and drag callbacks.
 */
export const useFloatingWindow = <T extends HTMLElement>(
  options: UseFloatingWindowOptions = {}
): UseFloatingWindowReturnValue<T> => {
  const {
    axis,
    constrainOffset = 0,
    constrainToViewport = false,
    dragHandleSelector,
    enabled,
    excludeDragHandleSelector,
    initialPosition,
    onDragEnd,
    onDragStart,
    onPositionChange,
  } = options;
  const initialTop = initialPosition?.top;
  const initialLeft = initialPosition?.left;
  const initialRight = initialPosition?.right;
  const initialBottom = initialPosition?.bottom;

  const [element, setElement] = useState<T | null>(null);
  const ref = useRef<T | null>(null);
  const pos = useRef<FloatingWindowPosition>({ x: 0, y: 0 });
  const dragOffset = useRef<FloatingWindowPosition>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const initialized = useRef(false);
  const enabledRef = useRefValue(enabled);

  const setDragging = useCallback((value: boolean) => {
    setIsDragging(value);
    isDraggingRef.current = value;
  }, []);

  const assignRef = useCallback((node: T | null) => {
    ref.current = node;
    setElement(node);
  }, []);

  useEffect(() => {
    const el = ref.current;

    if (!initialized.current && el) {
      initialized.current = true;
      pos.current = calculateInitialPosition(
        el,
        {
          top: initialTop,
          left: initialLeft,
          right: initialRight,
          bottom: initialBottom,
        },
        constrainToViewport,
        constrainOffset
      );
      el.style.left = `${pos.current.x}px`;
      el.style.top = `${pos.current.y}px`;
      el.style.right = "unset";
      el.style.bottom = "unset";
    }

    return () => {
      initialized.current = false;
    };
  }, [
    constrainOffset,
    constrainToViewport,
    element,
    initialBottom,
    initialLeft,
    initialRight,
    initialTop,
  ]);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const onMove = (event: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) {
        return;
      }

      const [touch] = "touches" in event ? event.touches : [event];
      if (!touch) {
        return;
      }

      event.preventDefault();

      let x = touch.clientX - dragOffset.current.x;
      let y = touch.clientY - dragOffset.current.y;

      const constrained = getConstrainedPosition(
        el,
        { x, y },
        constrainToViewport,
        constrainOffset
      );

      if (axis === "x") {
        ({ x } = constrained);
        ({ y } = pos.current);
      } else if (axis === "y") {
        ({ x } = pos.current);
        ({ y } = constrained);
      } else {
        ({ x } = constrained);
        ({ y } = constrained);
      }

      pos.current = { x, y };
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      onPositionChange?.({ x, y });
    };

    const onEnd = () => {
      if (!isDraggingRef.current) {
        return;
      }

      setDragging(false);
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      onDragEnd?.();
    };

    const onStart = (event: MouseEvent | TouchEvent) => {
      if (enabledRef.current === false) {
        return;
      }

      const [touch] = "touches" in event ? event.touches : [event];
      if (!touch) {
        return;
      }

      if ("button" in event && event.button !== 0) {
        return;
      }

      if (
        !getHandle(
          el,
          event.target,
          dragHandleSelector,
          excludeDragHandleSelector
        )
      ) {
        return;
      }

      setDragging(true);
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";

      const rect = el.getBoundingClientRect();

      dragOffset.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };

      onDragStart?.();

      document.addEventListener("mousemove", onMove, { signal });
      document.addEventListener("mouseup", onEnd, { signal });
      document.addEventListener("touchmove", onMove, {
        signal,
        passive: false,
      });
      document.addEventListener("touchend", onEnd, { signal });
    };

    el.addEventListener("mousedown", onStart, { signal });
    el.addEventListener("touchstart", onStart, { signal, passive: false });

    return () => {
      controller.abort();
    };
  }, [
    axis,
    constrainOffset,
    constrainToViewport,
    dragHandleSelector,
    element,
    excludeDragHandleSelector,
    onDragEnd,
    onDragStart,
    onPositionChange,
    enabledRef,
    setDragging,
  ]);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    const observer = new ResizeObserver(() => {
      // Re-clamp current position if element size changes.
      const constrained = getConstrainedPosition(
        el,
        pos.current,
        constrainToViewport,
        constrainOffset
      );

      pos.current = constrained;
      el.style.left = `${constrained.x}px`;
      el.style.top = `${constrained.y}px`;
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [constrainOffset, constrainToViewport, element]);

  const setPosition: SetFloatingWindowPosition = useCallback(
    (position) => {
      const el = ref.current;
      if (!el) {
        return;
      }

      const rect = el.getBoundingClientRect();
      let x: number | undefined;
      let y: number | undefined;

      if (position.left !== undefined) {
        x = position.left;
      } else if (position.right !== undefined) {
        x = window.innerWidth - rect.width - position.right;
      }

      if (position.top !== undefined) {
        y = position.top;
      } else if (position.bottom !== undefined) {
        y = window.innerHeight - rect.height - position.bottom;
      }

      x ??= pos.current.x;
      y ??= pos.current.y;

      if (constrainToViewport) {
        const clamped = clampToViewport(x, y, el, constrainOffset);
        ({ x } = clamped);
        ({ y } = clamped);
      }

      pos.current = { x, y };
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      onPositionChange?.({ x, y });
    },
    [constrainOffset, constrainToViewport, onPositionChange]
  );

  return {
    ref: assignRef,
    setPosition,
    isDragging,
  };
};

export type UseFloatingWindowOptionsType = UseFloatingWindowOptions;
export type UseFloatingWindowPosition = FloatingWindowPosition;
export type UseFloatingWindowSetPosition = SetFloatingWindowPosition;
export type UseFloatingWindowReturn<T extends HTMLElement> =
  UseFloatingWindowReturnValue<T>;
