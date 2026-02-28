import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, fireEvent, render, renderHook } from "@testing-library/react";

import { useRadialBarChartRuntime } from "./hooks/use-radial-bar-chart-runtime";
import { RadialBarChart } from "./radial-bar-chart";
import {
  completeRadialBarData,
  completeRadialBarLabelData,
  completeRadialBarLabelSeries,
  completeRadialBarSeries,
} from "./radial-bar-chart-test-data";

afterEach(cleanup);

const chartSize = { height: 320, width: 720 };

describe("Complete RadialBarChart", () => {
  it("passes canonical radialBarChartProps through to Recharts", () => {
    const { container } = render(
      <RadialBarChart
        data={completeRadialBarData}
        dataKey="value"
        radialBarChartProps={{ className: "radial-bar-chart-canonical-props" }}
        responsiveContainerProps={chartSize}
        series={completeRadialBarSeries}
      />
    );

    expect(
      container.querySelector(".radial-bar-chart-canonical-props")
    ).not.toBeNull();
  });

  it("keeps chartProps alias support during migration", () => {
    const { container } = render(
      <RadialBarChart
        chartProps={{ className: "radial-bar-chart-alias-props" }}
        data={completeRadialBarData}
        dataKey="value"
        responsiveContainerProps={chartSize}
        series={completeRadialBarSeries}
      />
    );

    expect(
      container.querySelector(".radial-bar-chart-alias-props")
    ).not.toBeNull();
  });

  it("formats labels with percent mode in runtime", () => {
    const { result } = renderHook(() =>
      useRadialBarChartRuntime({
        chartProps: undefined,
        data: completeRadialBarLabelData,
        dataKey: "value",
        endAngle: undefined,
        labelMode: "percent",
        nameKey: undefined,
        series: completeRadialBarLabelSeries,
        startAngle: undefined,
        tooltipProps: undefined,
        tooltipSource: "segment",
        valueFormatter: undefined,
      })
    );

    expect(
      result.current.labelFormatter(60, completeRadialBarLabelData[0])
    ).toBe("60%");
    expect(
      result.current.labelFormatter(40, completeRadialBarLabelData[1])
    ).toBe("40%");
  });

  it("supports value label formatter in runtime", () => {
    const { result } = renderHook(() =>
      useRadialBarChartRuntime({
        chartProps: undefined,
        data: completeRadialBarLabelData,
        dataKey: "value",
        endAngle: undefined,
        labelMode: "value",
        nameKey: undefined,
        series: completeRadialBarLabelSeries,
        startAngle: undefined,
        tooltipProps: undefined,
        tooltipSource: "segment",
        valueFormatter: (value) => `VALUE:${value}`,
      })
    );

    expect(
      result.current.labelFormatter(60, completeRadialBarLabelData[0])
    ).toBe("VALUE:60");
  });

  it("enables segment backgrounds when requested", () => {
    const { container } = render(
      <RadialBarChart
        data={completeRadialBarData}
        dataKey="value"
        responsiveContainerProps={chartSize}
        series={completeRadialBarSeries}
        withBackground
      />
    );

    expect(
      container.querySelectorAll(".recharts-radial-bar-background-sector")
        .length
    ).toBeGreaterThan(0);
  });

  it("maps tooltipSource to shared tooltip behavior in runtime", () => {
    const { result } = renderHook(() =>
      useRadialBarChartRuntime({
        chartProps: undefined,
        data: completeRadialBarLabelData,
        dataKey: "value",
        endAngle: undefined,
        labelMode: "value",
        nameKey: undefined,
        series: completeRadialBarLabelSeries,
        startAngle: undefined,
        tooltipProps: undefined,
        tooltipSource: "all",
        valueFormatter: undefined,
      })
    );

    expect(result.current.resolvedTooltipProps).toMatchObject({ shared: true });
  });

  it("renders legend wrapper and remains stable on hover", () => {
    const { container } = render(
      <RadialBarChart
        data={completeRadialBarData}
        dataKey="value"
        responsiveContainerProps={chartSize}
        series={completeRadialBarSeries}
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
      <RadialBarChart
        data={completeRadialBarData}
        dataKey="value"
        enableLegendHighlight={false}
        responsiveContainerProps={chartSize}
        series={completeRadialBarSeries}
        withLegend
      />
    );

    expect(container.querySelector(".recharts-legend-wrapper")).not.toBeNull();
  });
});
