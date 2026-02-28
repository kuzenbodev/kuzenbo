import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, fireEvent, render, renderHook } from "@testing-library/react";

import { useRadarChartRuntime } from "./hooks/use-radar-chart-runtime";
import { RadarChart } from "./radar-chart";
import {
  completeRadarData,
  completeRadarSeries,
} from "./radar-chart-test-data";

afterEach(cleanup);

const chartSize = { height: 320, width: 720 };
const radarClassBySeries = {
  actual: "radar-props-series-actual",
  target: "radar-props-series-target",
} as const;

const getSeriesName = (seriesItem: { key?: string; name?: string }) =>
  seriesItem.name ?? seriesItem.key ?? "value";

const createRadarPropsBySeries =
  (callbackSeriesKeys: string[]) =>
  (seriesItem: { key?: string; name?: string }) => {
    const seriesName = getSeriesName(seriesItem);
    callbackSeriesKeys.push(seriesName);

    return {
      className:
        radarClassBySeries[seriesName as keyof typeof radarClassBySeries],
    };
  };

describe("Complete RadarChart", () => {
  it("passes canonical radarChartProps through to Recharts", () => {
    const { container } = render(
      <RadarChart
        data={completeRadarData}
        dataKey="metric"
        radarChartProps={{ className: "radar-chart-canonical-props" }}
        responsiveContainerProps={chartSize}
        series={completeRadarSeries}
      />
    );

    expect(
      container.querySelector(".radar-chart-canonical-props")
    ).not.toBeNull();
  });

  it("keeps chartProps alias support during migration", () => {
    const { container } = render(
      <RadarChart
        chartProps={{ className: "radar-chart-alias-props" }}
        data={completeRadarData}
        dataKey="metric"
        responsiveContainerProps={chartSize}
        series={completeRadarSeries}
      />
    );

    expect(container.querySelector(".radar-chart-alias-props")).not.toBeNull();
  });

  it("renders radar polygons and radial axis", () => {
    const { container } = render(
      <RadarChart
        data={completeRadarData}
        dataKey="metric"
        responsiveContainerProps={chartSize}
        series={completeRadarSeries}
        withPolarAngleAxis
        withPolarRadiusAxis
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
    expect(container.querySelectorAll(".recharts-radar").length).toBe(2);
    expect(
      container.querySelector(".recharts-polar-radius-axis")
    ).not.toBeNull();
  });

  it("formats radius axis ticks with valueFormatter", () => {
    const { result } = renderHook(() =>
      useRadarChartRuntime({
        chartProps: undefined,
        data: completeRadarData,
        series: completeRadarSeries,
        unit: undefined,
        valueFormatter: (value, seriesKey) => `${seriesKey}:${value}`,
      })
    );

    expect(result.current.radiusAxisTickFormatter(80)).toBe("actual:80");
  });

  it("applies radarProps callback overrides per series", () => {
    const callbackSeriesKeys: string[] = [];
    const radarPropsBySeries = createRadarPropsBySeries(callbackSeriesKeys);
    const { container } = render(
      <RadarChart
        data={completeRadarData}
        dataKey="metric"
        radarProps={radarPropsBySeries}
        responsiveContainerProps={chartSize}
        series={completeRadarSeries}
      />
    );

    expect(callbackSeriesKeys).toEqual(["actual", "target"]);
    expect(
      container.querySelector(".radar-props-series-actual")
    ).not.toBeNull();
    expect(
      container.querySelector(".radar-props-series-target")
    ).not.toBeNull();
  });

  it("renders legend wrapper and remains stable on hover", () => {
    const { container } = render(
      <RadarChart
        data={completeRadarData}
        dataKey="metric"
        responsiveContainerProps={chartSize}
        series={completeRadarSeries}
        withLegend
      />
    );

    const legendWrapper = container.querySelector(".recharts-legend-wrapper");
    expect(legendWrapper).not.toBeNull();
    fireEvent.mouseEnter(legendWrapper as Element);
    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
  });

  it("keeps legend rendering when highlight behavior is disabled", () => {
    const { container } = render(
      <RadarChart
        data={completeRadarData}
        dataKey="metric"
        enableLegendHighlight={false}
        responsiveContainerProps={chartSize}
        series={completeRadarSeries}
        withLegend
      />
    );

    expect(container.querySelector(".recharts-legend-wrapper")).not.toBeNull();
  });
});
