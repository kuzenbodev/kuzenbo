import { useCallback } from "react";

interface UseLegendHighlightHandlersOptions {
  onHighlightChange?: (seriesName: string | null) => void;
}

const useLegendHighlightHandlers = ({
  onHighlightChange,
}: UseLegendHighlightHandlersOptions) => {
  const clearHighlight = useCallback(() => {
    onHighlightChange?.(null);
  }, [onHighlightChange]);

  const getHighlightHandler = useCallback(
    (seriesName: string) => () => {
      onHighlightChange?.(seriesName);
    },
    [onHighlightChange]
  );

  return {
    clearHighlight,
    getHighlightHandler,
  };
};

export { useLegendHighlightHandlers };
