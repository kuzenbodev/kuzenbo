"use client";

import {
  type RefCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type DocumentWithFullscreen = Document & {
  fullscreenElement?: Element | null;
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
};

type ElementWithFullscreen = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>;
  webkitEnterFullscreen?: () => Promise<void>;
  mozRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
};

const getFullscreenElement = (): HTMLElement | null => {
  const doc = window.document as DocumentWithFullscreen;
  const el =
    doc.fullscreenElement ??
    doc.webkitFullscreenElement ??
    doc.mozFullScreenElement ??
    doc.msFullscreenElement;
  return el ? (el as HTMLElement) : null;
};

const exitFullscreen = (): Promise<void> | null => {
  const doc = window.document as DocumentWithFullscreen;
  if (typeof doc.exitFullscreen === "function") {
    return doc.exitFullscreen();
  }
  if (typeof doc.msExitFullscreen === "function") {
    return doc.msExitFullscreen();
  }
  if (typeof doc.webkitExitFullscreen === "function") {
    return doc.webkitExitFullscreen();
  }
  if (typeof doc.mozCancelFullScreen === "function") {
    return doc.mozCancelFullScreen();
  }
  return null;
};

const enterFullScreen = (element: HTMLElement): Promise<void> | undefined => {
  const el = element as ElementWithFullscreen;
  return (
    el.requestFullscreen?.() ??
    el.msRequestFullscreen?.() ??
    el.webkitEnterFullscreen?.() ??
    el.webkitRequestFullscreen?.() ??
    el.mozRequestFullscreen?.()
  );
};

const PREFIXES = ["", "webkit", "moz", "ms"];

const addEvents = (
  element: HTMLElement,
  {
    onFullScreen,
    onError,
  }: { onFullScreen: (event: Event) => void; onError: (event: Event) => void }
) => {
  for (const prefix of PREFIXES) {
    element.addEventListener(`${prefix}fullscreenchange`, onFullScreen);
    element.addEventListener(`${prefix}fullscreenerror`, onError);
  }
  return () => {
    for (const prefix of PREFIXES) {
      element.removeEventListener(`${prefix}fullscreenchange`, onFullScreen);
      element.removeEventListener(`${prefix}fullscreenerror`, onError);
    }
  };
};

export interface UseFullscreenReturnValue<T extends HTMLElement = HTMLElement> {
  ref: RefCallback<T | null>;
  toggle: () => Promise<void>;
  fullscreen: boolean;
}

export const useFullscreen = <
  T extends HTMLElement = HTMLElement,
>(): UseFullscreenReturnValue<T> => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const _ref = useRef<T | null>(null);

  const handleFullscreenChange = useCallback((event: Event) => {
    setFullscreen(event.target === getFullscreenElement());
  }, []);

  const handleFullscreenError = useCallback(() => {
    setFullscreen(false);
    console.error(
      "[@kuzenbo/use-fullscreen] Error attempting full-screen mode"
    );
  }, []);

  const toggle = useCallback(async () => {
    const target =
      _ref.current ?? (window.document.documentElement as unknown as T);
    await (getFullscreenElement() ? exitFullscreen() : enterFullScreen(target));
  }, []);

  const ref = useCallback((element: T | null) => {
    _ref.current =
      element === null
        ? (window.document.documentElement as unknown as T)
        : element;
  }, []);

  useEffect(() => {
    const el =
      _ref.current ?? (window.document?.documentElement as unknown as T);
    if (el) {
      return addEvents(el, {
        onFullScreen: handleFullscreenChange,
        onError: handleFullscreenError,
      });
    }
  }, [handleFullscreenChange, handleFullscreenError]);

  return { ref, toggle, fullscreen } as const;
};
