import { useCallback, useEffect, useState } from "react";

import { useWindowEvent } from "../use-window-event/use-window-event";

const eventListerOptions = {
  passive: true,
};

/**
 * Tracks viewport dimensions and updates when the window is resized or the
 * device orientation changes.
 *
 * The returned size starts at `{ width: 0, height: 0 }` and is synced after
 * mount.
 *
 */
export const useViewportSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const setSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth || 0,
      height: window.innerHeight || 0,
    });
  }, []);

  useWindowEvent("resize", setSize, eventListerOptions);
  useWindowEvent("orientationchange", setSize, eventListerOptions);
  useEffect(setSize, [setSize]);

  return windowSize;
};
