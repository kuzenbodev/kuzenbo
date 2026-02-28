import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, fireEvent, render, renderHook } from "@testing-library/react";

import { FunnelChart } from "./funnel-chart";
import {
  completeFunnelStageData,
  completeFunnelStageSeries,
} from "./funnel-chart-test-data";
import { useFunnelChartRuntime } from "./hooks/use-funnel-chart-runtime";

afterEach(cleanup);

const chartSize = { height: 320, width: 720 };

describe("Complete FunnelChart", () => {
  it("passes canonical funnelChartProps through to Recharts", () => {
    const { container } = render(
      <FunnelChart
        data={completeFunnelStageData}
        dataKey="value"
        funnelChartProps={{ className: "funnel-chart-canonical-props" }}
        responsiveContainerProps={chartSize}
        series={completeFunnelStageSeries}
      />
    );

    expect(
      container.querySelector(".funnel-chart-canonical-props")
    ).not.toBeNull();
  });

  it("keeps chartProps alias support during migration", () => {
    const { container } = render(
      <FunnelChart
        chartProps={{ className: "funnel-chart-alias-props" }}
        data={completeFunnelStageData}
        dataKey="value"
        responsiveContainerProps={chartSize}
        series={completeFunnelStageSeries}
      />
    );

    expect(container.querySelector(".funnel-chart-alias-props")).not.toBeNull();
  });

  it("supports value label formatter in runtime", () => {
    const { result } = renderHook(() =>
      useFunnelChartRuntime({
        chartProps: undefined,
        data: completeFunnelStageData,
        dataKey: "value",
        nameKey: undefined,
        series: completeFunnelStageSeries,
        tooltipProps: undefined,
        tooltipSource: "segment",
        valueFormatter: (value) => `VALUE:${value}`,
      })
    );

    expect(
      result.current.labelFormatter(1200, completeFunnelStageData[0])
    ).toBe("VALUE:1200");
  });

  it("maps tooltipSource to shared tooltip behavior in runtime", () => {
    const { result } = renderHook(() =>
      useFunnelChartRuntime({
        chartProps: undefined,
        data: completeFunnelStageData,
        dataKey: "value",
        nameKey: undefined,
        series: completeFunnelStageSeries,
        tooltipProps: undefined,
        tooltipSource: "all",
        valueFormatter: undefined,
      })
    );

    expect(result.current.resolvedTooltipProps).toMatchObject({ shared: true });
  });

  it("renders legend wrapper and remains stable on hover", () => {
    const { container } = render(
      <FunnelChart
        data={completeFunnelStageData}
        dataKey="value"
        responsiveContainerProps={chartSize}
        series={completeFunnelStageSeries}
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
      <FunnelChart
        data={completeFunnelStageData}
        dataKey="value"
        enableLegendHighlight={false}
        responsiveContainerProps={chartSize}
        series={completeFunnelStageSeries}
        withLegend
      />
    );

    expect(container.querySelector(".recharts-legend-wrapper")).not.toBeNull();
  });
});
