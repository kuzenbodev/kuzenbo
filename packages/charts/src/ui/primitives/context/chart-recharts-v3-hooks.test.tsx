import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render } from "@testing-library/react";

import {
  Chart,
  useActiveTooltipCoordinate,
  useActiveTooltipDataPoints,
  useActiveTooltipLabel,
  useChartHeight,
  useChartWidth,
  useIsTooltipActive,
  useOffset,
  usePlotArea,
} from "../chart";

afterEach(cleanup);

const getPointCount = <T,>(points: ReadonlyArray<T> | undefined) => {
  if (points === undefined) {
    return 0;
  }

  return points.length;
};

const hasNumericCoordinateX = (
  coordinate: ReturnType<typeof useActiveTooltipCoordinate>
) => {
  if (coordinate === undefined) {
    return true;
  }

  return typeof coordinate.x === "number";
};

const hasNumericPlotAreaWidth = (plotArea: ReturnType<typeof usePlotArea>) => {
  if (plotArea === undefined) {
    return true;
  }

  return typeof plotArea.width === "number";
};

const hasNumericOffsetLeft = (offset: ReturnType<typeof useOffset>) => {
  if (offset === undefined) {
    return true;
  }

  return typeof offset.left === "number";
};

const isNumberOrUndefined = (value: number | undefined) => {
  if (value === undefined) {
    return true;
  }

  return typeof value === "number";
};

describe("Chart Recharts v3 hook bindings", () => {
  it("exposes Recharts hooks as Chart namespace members", () => {
    expect(typeof Chart.useActiveTooltipCoordinate).toBe("function");
    expect(typeof Chart.useActiveTooltipDataPoints).toBe("function");
    expect(typeof Chart.useActiveTooltipLabel).toBe("function");
    expect(typeof Chart.useChartHeight).toBe("function");
    expect(typeof Chart.useChartWidth).toBe("function");
    expect(typeof Chart.useIsTooltipActive).toBe("function");
    expect(typeof Chart.useOffset).toBe("function");
    expect(typeof Chart.usePlotArea).toBe("function");
  });

  it("calls exported Recharts hooks without throwing", () => {
    let probeSnapshot:
      | {
          isTooltipActive: boolean;
          labelsMatch: boolean;
          pointCount: number;
        }
      | undefined;

    const HookProbe = () => {
      const namedLabel = useActiveTooltipLabel();
      const namespacedLabel = Chart.useActiveTooltipLabel();
      const activePoints = useActiveTooltipDataPoints<{ value: number }>();
      const activeCoordinate = useActiveTooltipCoordinate();
      const isTooltipActive = useIsTooltipActive();
      const plotArea = usePlotArea();
      const offset = useOffset();
      const width = useChartWidth();
      const height = useChartHeight();

      probeSnapshot = {
        isTooltipActive,
        labelsMatch: namedLabel === namespacedLabel,
        pointCount: getPointCount(activePoints),
      };

      expect(hasNumericCoordinateX(activeCoordinate)).toBe(true);
      expect(hasNumericPlotAreaWidth(plotArea)).toBe(true);
      expect(hasNumericOffsetLeft(offset)).toBe(true);
      expect(isNumberOrUndefined(width)).toBe(true);
      expect(isNumberOrUndefined(height)).toBe(true);

      return null;
    };

    render(<HookProbe />);

    expect(probeSnapshot).toBeDefined();
    const snapshot = probeSnapshot as {
      isTooltipActive: boolean;
      labelsMatch: boolean;
      pointCount: number;
    };

    expect(snapshot.labelsMatch).toBe(true);
    expect(typeof snapshot.isTooltipActive).toBe("boolean");
    expect(snapshot.pointCount).toBeGreaterThanOrEqual(0);
  });
});
