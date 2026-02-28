import { useRef } from "react";

/**
 * Indicates whether the current render is the component's first render.
 *
 */
export const useIsFirstRender = () => {
  const renderRef = useRef(true);

  if (renderRef.current === true) {
    renderRef.current = false;
    return true;
  }

  return renderRef.current;
};
