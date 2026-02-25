import { useEffect, useState } from "react";

interface UseCompleteLegendHighlightStateOptions {
  enableLegendHighlight: boolean;
  highlightScopeKey?: string;
  withLegend: boolean;
}

interface UseCompleteLegendHighlightStateResult {
  highlightedSeriesName: string | null;
  isAnySeriesHighlighted: boolean;
  isSeriesHighlighted: (seriesName: string) => boolean;
  onHighlightChange: ((seriesName: string | null) => void) | undefined;
  shouldEnableLegendHighlight: boolean;
}

const normalizeSeriesName = (seriesName: string | null): string | null => {
  if (seriesName === null) {
    return null;
  }

  return seriesName.trim().toLowerCase();
};

const useCompleteLegendHighlightState = ({
  enableLegendHighlight,
  highlightScopeKey,
  withLegend,
}: UseCompleteLegendHighlightStateOptions): UseCompleteLegendHighlightStateResult => {
  const [highlightedSeriesName, setHighlightedSeriesName] = useState<
    string | null
  >(null);
  const shouldEnableLegendHighlight = enableLegendHighlight && withLegend;

  useEffect(() => {
    if (!shouldEnableLegendHighlight) {
      setHighlightedSeriesName(null);
      return;
    }

    setHighlightedSeriesName((previousHighlightedSeriesName) =>
      previousHighlightedSeriesName === null
        ? previousHighlightedSeriesName
        : null
    );
  }, [highlightScopeKey, shouldEnableLegendHighlight]);

  const isAnySeriesHighlighted =
    shouldEnableLegendHighlight && highlightedSeriesName !== null;
  const normalizedHighlightedSeriesName = normalizeSeriesName(
    highlightedSeriesName
  );

  return {
    highlightedSeriesName: shouldEnableLegendHighlight
      ? highlightedSeriesName
      : null,
    isAnySeriesHighlighted,
    isSeriesHighlighted: (seriesName) =>
      !shouldEnableLegendHighlight ||
      highlightedSeriesName === null ||
      normalizedHighlightedSeriesName === normalizeSeriesName(seriesName),
    onHighlightChange: shouldEnableLegendHighlight
      ? setHighlightedSeriesName
      : undefined,
    shouldEnableLegendHighlight,
  };
};

export {
  useCompleteLegendHighlightState,
  type UseCompleteLegendHighlightStateResult,
};
