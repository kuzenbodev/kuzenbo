import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, fireEvent, render, renderHook } from "@testing-library/react";

import { usePieChartRuntime } from "./hooks/use-pie-chart-runtime";
import { PieChart } from "./pie-chart";
import {
  completePieLabelData,
  completePieLabelSeries,
  completePieRevenueData,
  completePieRevenueSeries,
} from "./pie-chart-test-data";

afterEach(cleanup);

const chartSize = { height: 320, width: 720 };

describe("Complete PieChart", () => {
  it("passes canonical pieChartProps through to Recharts", () => {
    const { container } = render(
      <PieChart
        data={completePieRevenueData}
        dataKey="value"
        pieChartProps={{ className: "pie-chart-canonical-props" }}
        responsiveContainerProps={chartSize}
        series={completePieRevenueSeries}
      />
    );

    expect(
      container.querySelector(".pie-chart-canonical-props")
    ).not.toBeNull();
  });

  it("keeps chartProps alias support during migration", () => {
    const { container } = render(
      <PieChart
        chartProps={{ className: "pie-chart-alias-props" }}
        data={completePieRevenueData}
        dataKey="value"
        responsiveContainerProps={chartSize}
        series={completePieRevenueSeries}
      />
    );

    expect(container.querySelector(".pie-chart-alias-props")).not.toBeNull();
  });

  it("passes pieProps through to the pie element", () => {
    const { container } = render(
      <PieChart
        data={completePieRevenueData}
        dataKey="value"
        pieProps={{ className: "pie-series-pass-through" }}
        responsiveContainerProps={chartSize}
        series={completePieRevenueSeries}
      />
    );

    expect(container.querySelector(".pie-series-pass-through")).not.toBeNull();
  });

  it("formats labels with percent mode in runtime", () => {
    const { result } = renderHook(() =>
      usePieChartRuntime({
        chartProps: undefined,
        data: completePieLabelData,
        dataKey: "value",
        endAngle: undefined,
        labelMode: "percent",
        nameKey: undefined,
        series: completePieLabelSeries,
        startAngle: undefined,
        tooltipProps: undefined,
        tooltipSource: "segment",
        valueFormatter: undefined,
      })
    );

    expect(result.current.labelFormatter(60, completePieLabelData[0])).toBe(
      "60%"
    );
    expect(result.current.labelFormatter(40, completePieLabelData[1])).toBe(
      "40%"
    );
  });

  it("supports value label formatter in runtime", () => {
    const { result } = renderHook(() =>
      usePieChartRuntime({
        chartProps: undefined,
        data: completePieLabelData,
        dataKey: "value",
        endAngle: undefined,
        labelMode: "value",
        nameKey: undefined,
        series: completePieLabelSeries,
        startAngle: undefined,
        tooltipProps: undefined,
        tooltipSource: "segment",
        valueFormatter: (value) => `VALUE:${value}`,
      })
    );

    expect(result.current.labelFormatter(60, completePieLabelData[0])).toBe(
      "VALUE:60"
    );
  });

  it("resolves pie radii from size in runtime", () => {
    const { result } = renderHook(() =>
      usePieChartRuntime({
        chartProps: undefined,
        data: completePieLabelData,
        dataKey: "value",
        endAngle: undefined,
        labelMode: "value",
        nameKey: undefined,
        series: completePieLabelSeries,
        size: 74,
        startAngle: undefined,
        tooltipProps: undefined,
        tooltipSource: "segment",
        valueFormatter: undefined,
      })
    );

    expect(result.current.resolvedRadii).toEqual({
      innerRadius: 0,
      outerRadius: 74,
    });
  });

  it("maps tooltipSource to shared tooltip behavior in runtime", () => {
    const { result } = renderHook(() =>
      usePieChartRuntime({
        chartProps: undefined,
        data: completePieLabelData,
        dataKey: "value",
        endAngle: undefined,
        labelMode: "value",
        nameKey: undefined,
        series: completePieLabelSeries,
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
      <PieChart
        data={completePieRevenueData}
        dataKey="value"
        responsiveContainerProps={chartSize}
        series={completePieRevenueSeries}
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
      <PieChart
        data={completePieRevenueData}
        dataKey="value"
        enableLegendHighlight={false}
        responsiveContainerProps={chartSize}
        series={completePieRevenueSeries}
        withLegend
      />
    );

    expect(container.querySelector(".recharts-legend-wrapper")).not.toBeNull();
  });

  it("accepts radial style props without breaking render", () => {
    const { container } = render(
      <PieChart
        data={completePieRevenueData}
        dataKey="value"
        paddingAngle={2}
        responsiveContainerProps={chartSize}
        series={completePieRevenueSeries}
        size="82%"
        strokeColor="var(--color-border)"
        strokeWidth={2}
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
  });
});
