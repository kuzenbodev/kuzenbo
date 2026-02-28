import type { RefCallback } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface FullscreenDocument extends Document {
  mozCancelFullScreen?: () => Promise<void> | void;
  mozFullScreenElement?: Element | null;
  msExitFullscreen?: () => Promise<void> | void;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenElement?: Element | null;
}

interface FullscreenElement extends HTMLElement {
  mozRequestFullscreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
  webkitEnterFullscreen?: () => Promise<void> | void;
  webkitRequestFullscreen?: () => Promise<void> | void;
}

const getFullscreenElement = (): HTMLElement | null => {
  const currentDocument = window.document as FullscreenDocument;

  const fullscreenElement =
    currentDocument.fullscreenElement ||
    currentDocument.webkitFullscreenElement ||
    currentDocument.mozFullScreenElement ||
    currentDocument.msFullscreenElement;

  return fullscreenElement instanceof HTMLElement ? fullscreenElement : null;
};

const exitFullscreen = async () => {
  const currentDocument = window.document as FullscreenDocument;

  if (typeof currentDocument.exitFullscreen === "function") {
    await currentDocument.exitFullscreen();
    return;
  }
  if (typeof currentDocument.msExitFullscreen === "function") {
    await currentDocument.msExitFullscreen();
    return;
  }
  if (typeof currentDocument.webkitExitFullscreen === "function") {
    await currentDocument.webkitExitFullscreen();
    return;
  }
  if (typeof currentDocument.mozCancelFullScreen === "function") {
    await currentDocument.mozCancelFullScreen();
  }
};

const enterFullScreen = async (element: HTMLElement) => {
  const fullscreenElement = element as FullscreenElement;

  if (typeof fullscreenElement.requestFullscreen === "function") {
    await fullscreenElement.requestFullscreen();
    return;
  }
  if (typeof fullscreenElement.msRequestFullscreen === "function") {
    await fullscreenElement.msRequestFullscreen();
    return;
  }
  if (typeof fullscreenElement.webkitEnterFullscreen === "function") {
    await fullscreenElement.webkitEnterFullscreen();
    return;
  }
  if (typeof fullscreenElement.webkitRequestFullscreen === "function") {
    await fullscreenElement.webkitRequestFullscreen();
    return;
  }
  if (typeof fullscreenElement.mozRequestFullscreen === "function") {
    await fullscreenElement.mozRequestFullscreen();
  }
};

const prefixes = ["", "webkit", "moz", "ms"] as const;

interface FullscreenEvents {
  onFullScreen: (event: Event) => void;
  onError: (event: Event) => void;
}

const addEvents = (
  element: HTMLElement,
  { onFullScreen, onError }: FullscreenEvents
) => {
  for (const prefix of prefixes) {
    element.addEventListener(`${prefix}fullscreenchange`, onFullScreen);
    element.addEventListener(`${prefix}fullscreenerror`, onError);
  }
};

const removeEvents = (
  element: HTMLElement,
  { onFullScreen, onError }: FullscreenEvents
) => {
  for (const prefix of prefixes) {
    element.removeEventListener(`${prefix}fullscreenchange`, onFullScreen);
    element.removeEventListener(`${prefix}fullscreenerror`, onError);
  }
};

export interface UseFullscreenElementReturnValue<
  T extends HTMLElement = HTMLElement,
> {
  ref: RefCallback<T | null>;
  toggle: () => Promise<void>;
  fullscreen: boolean;
}

/**
 * Controls fullscreen state for a specific element with vendor-prefixed browser fallbacks.
 * It listens for fullscreen change/error events on the referenced node and exposes an async toggle helper.
 *
 */
export const useFullscreenElement = <
  T extends HTMLElement = HTMLElement,
>(): UseFullscreenElementReturnValue<T> => {
  const [fullscreen, setFullscreen] = useState(false);
  const refElement = useRef<T | null>(null);
  const prevNodeRef = useRef<T | null>(null);

  const handleFullscreenChange = useCallback(() => {
    setFullscreen(refElement.current === getFullscreenElement());
  }, []);

  const handleFullscreenError = useCallback(() => {
    setFullscreen(false);
  }, []);

  const toggle = useCallback(async () => {
    if (!getFullscreenElement() && refElement.current) {
      await enterFullScreen(refElement.current);
      return;
    }

    await exitFullscreen();
  }, []);

  const refCallback: RefCallback<T | null> = useCallback(
    (node) => {
      if (prevNodeRef.current && prevNodeRef.current !== node) {
        removeEvents(prevNodeRef.current, {
          onFullScreen: handleFullscreenChange,
          onError: handleFullscreenError,
        });
      }

      if (node) {
        addEvents(node, {
          onFullScreen: handleFullscreenChange,
          onError: handleFullscreenError,
        });
      }

      refElement.current = node;
      prevNodeRef.current = node;
    },
    [handleFullscreenChange, handleFullscreenError]
  );

  return { ref: refCallback, toggle, fullscreen };
};

export interface UseFullscreenDocumentReturnValue {
  toggle: () => Promise<void>;
  fullscreen: boolean;
}

/**
 * Controls document-level fullscreen for the root element (`document.documentElement`).
 * It subscribes to fullscreen change/error events and exposes an async toggle helper.
 *
 */
export const useFullscreenDocument = (): UseFullscreenDocumentReturnValue => {
  const [fullscreen, setFullscreen] = useState(false);

  const handleFullscreenChange = useCallback(() => {
    setFullscreen(getFullscreenElement() === window.document.documentElement);
  }, []);

  const handleFullscreenError = useCallback(() => {
    setFullscreen(false);
  }, []);

  const toggle = useCallback(async () => {
    if (!getFullscreenElement()) {
      await enterFullScreen(window.document.documentElement);
      return;
    }

    await exitFullscreen();
  }, []);

  useEffect(() => {
    const rootElement = window.document.documentElement;

    addEvents(rootElement, {
      onFullScreen: handleFullscreenChange,
      onError: handleFullscreenError,
    });

    return () => {
      removeEvents(rootElement, {
        onFullScreen: handleFullscreenChange,
        onError: handleFullscreenError,
      });
    };
  }, [handleFullscreenChange, handleFullscreenError]);

  return { toggle, fullscreen };
};
