"use client";

import { useIsomorphicEffect } from "@kuzenbo/hooks/use-isomorphic-effect";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  type RefObject,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const createPortalNode = (
  props: ComponentPropsWithoutRef<"div">
): HTMLElement => {
  const node = document.createElement("div");
  node.dataset.portal = "true";

  if (typeof props.className === "string") {
    node.classList.add(...props.className.split(" ").filter(Boolean));
  }

  if (typeof props.style === "object" && props.style) {
    Object.assign(node.style, props.style);
  }

  if (typeof props.id === "string") {
    node.setAttribute("id", props.id);
  }

  return node;
};

export type BasePortalProps = ComponentPropsWithoutRef<"div"> & {
  /**
   * Element inside which portal should be created, by default a new div element is created and appended to the `document.body`
   */
  target?: HTMLElement | string | RefObject<HTMLElement | null>;
  /**
   * If set, all portals are rendered in the same DOM node
   * @default true
   */
  reuseTargetNode?: boolean;
};

export type PortalProps = BasePortalProps & {
  /**
   * Portal children, for example, custom modal or popover
   */
  children: ReactNode;
};

interface ResolvedTargetNode {
  node: HTMLElement;
  shouldAppend: boolean;
  shouldCleanup: boolean;
}

const getTargetNode = ({
  target,
  reuseTargetNode,
  ...others
}: BasePortalProps): ResolvedTargetNode => {
  if (target) {
    if (typeof target === "string") {
      const existing = document.querySelector<HTMLElement>(target);
      if (existing) {
        return {
          node: existing,
          shouldAppend: false,
          shouldCleanup: false,
        };
      }

      return {
        node: createPortalNode(others),
        shouldAppend: true,
        shouldCleanup: true,
      };
    }
    // Handle React refs
    if ("current" in target) {
      if (target.current) {
        return {
          node: target.current,
          shouldAppend: false,
          shouldCleanup: false,
        };
      }

      return {
        node: createPortalNode(others),
        shouldAppend: true,
        shouldCleanup: true,
      };
    }
    // Handle HTMLElement directly
    if (target instanceof HTMLElement) {
      return {
        node: target,
        shouldAppend: false,
        shouldCleanup: false,
      };
    }
  }

  if (reuseTargetNode) {
    const existingNode = document.querySelector<HTMLElement>(
      "[data-labs-shared-portal-node]"
    );
    if (existingNode) {
      return {
        node: existingNode,
        shouldAppend: false,
        shouldCleanup: false,
      };
    }
    const node = createPortalNode(others);
    node.dataset.labsSharedPortalNode = "true";
    return {
      node,
      shouldAppend: true,
      shouldCleanup: false,
    };
  }

  return {
    node: createPortalNode(others),
    shouldAppend: true,
    shouldCleanup: true,
  };
};

export const Portal = ({
  children,
  target,
  reuseTargetNode = true,
  ...others
}: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const nodeRef = useRef<HTMLElement | null>(null);
  const shouldCleanupRef = useRef(false);

  useIsomorphicEffect(() => {
    setMounted(true);
    const resolvedNode = getTargetNode({ target, reuseTargetNode, ...others });
    nodeRef.current = resolvedNode.node;
    shouldCleanupRef.current = resolvedNode.shouldCleanup;

    if (resolvedNode.shouldAppend) {
      document.body.append(resolvedNode.node);
    }

    return () => {
      if (shouldCleanupRef.current && nodeRef.current) {
        nodeRef.current.remove();
      }
    };
  }, [target, reuseTargetNode]);

  if (!(mounted && nodeRef.current)) {
    return null;
  }

  return createPortal(children, nodeRef.current);
};
