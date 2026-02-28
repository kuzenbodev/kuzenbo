import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, fireEvent, render, renderHook } from "@testing-library/react";

import { DonutChart } from "./donut-chart";
import {
  completeDonutLabelData,
  completeDonutLabelSeries,
  completeDonutTrafficData,
  completeDonutTrafficSeries,
} from "./donut-chart-test-data";
import { useDonutChartRuntime } from "./hooks/use-donut-chart-runtime";

afterEach(cleanup);

const chartSize = { height: 320, width: 720 };

describe("Complete DonutChart", () => {
  it("passes canonical pieChartProps through to Recharts", () => {
    const { container } = render(
      <DonutChart
        data={completeDonutTrafficData}
        dataKey="value"
        pieChartProps={{ className: "donut-chart-canonical-props" }}
        responsiveContainerProps={chartSize}
        series={completeDonutTrafficSeries}
      />
    );

    expect(
      container.querySelector(".donut-chart-canonical-props")
    ).not.toBeNull();
  });

  it("keeps chartProps alias support during migration", () => {
    const { container } = render(
      <DonutChart
        chartProps={{ className: "donut-chart-alias-props" }}
        data={completeDonutTrafficData}
        dataKey="value"
        responsiveContainerProps={chartSize}
        series={completeDonutTrafficSeries}
      />
    );

    expect(container.querySelector(".donut-chart-alias-props")).not.toBeNull();
  });

  it("passes pieProps through to the donut pie element", () => {
    const { container } = render(
      <DonutChart
        data={completeDonutTrafficData}
        dataKey="value"
        pieProps={{ className: "donut-pie-pass-through" }}
        responsiveContainerProps={chartSize}
        series={completeDonutTrafficSeries}
      />
    );

    expect(container.querySelector(".donut-pie-pass-through")).not.toBeNull();
  });

  it("formats labels with percent mode in runtime", () => {
    const { result } = renderHook(() =>
      useDonutChartRuntime({
        chartProps: undefined,
        data: completeDonutLabelData,
        dataKey: "value",
        endAngle: undefined,
        fallbackNameKey: "name",
        isSemicircle: false,
        labelMode: "percent",
        nameKey: undefined,
        series: completeDonutLabelSeries,
        startAngle: undefined,
        tooltipProps: undefined,
        tooltipSource: "segment",
        valueFormatter: undefined,
      })
    );

    expect(result.current.labelFormatter(60, completeDonutLabelData[0])).toBe(
      "60%"
    );
    expect(result.current.labelFormatter(40, completeDonutLabelData[1])).toBe(
      "40%"
    );
  });

  it("supports value label formatter in runtime", () => {
    const { result } = renderHook(() =>
      useDonutChartRuntime({
        chartProps: undefined,
        data: completeDonutLabelData,
        dataKey: "value",
        endAngle: undefined,
        fallbackNameKey: "name",
        isSemicircle: false,
        labelMode: "value",
        nameKey: undefined,
        series: completeDonutLabelSeries,
        startAngle: undefined,
        tooltipProps: undefined,
        tooltipSource: "segment",
        valueFormatter: (value) => `VALUE:${value}`,
      })
    );

    expect(result.current.labelFormatter(60, completeDonutLabelData[0])).toBe(
      "VALUE:60"
    );
  });

  it("resolves donut radii from size and thickness in runtime", () => {
    const { result } = renderHook(() =>
      useDonutChartRuntime({
        chartProps: undefined,
        data: completeDonutLabelData,
        dataKey: "value",
        endAngle: undefined,
        fallbackNameKey: "name",
        isSemicircle: false,
        labelMode: "value",
        nameKey: undefined,
        series: completeDonutLabelSeries,
        size: "92%",
        startAngle: undefined,
        thickness: 17,
        tooltipProps: undefined,
        tooltipSource: "segment",
        valueFormatter: undefined,
      })
    );

    expect(result.current.resolvedRadii).toEqual({
      innerRadius: "75%",
      outerRadius: "92%",
    });
  });

  it("maps tooltipSource to shared tooltip behavior in runtime", () => {
    const { result } = renderHook(() =>
      useDonutChartRuntime({
        chartProps: undefined,
        data: completeDonutLabelData,
        dataKey: "value",
        endAngle: undefined,
        fallbackNameKey: "name",
        isSemicircle: false,
        labelMode: "value",
        nameKey: undefined,
        series: completeDonutLabelSeries,
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
      <DonutChart
        data={completeDonutTrafficData}
        dataKey="value"
        responsiveContainerProps={chartSize}
        series={completeDonutTrafficSeries}
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
      <DonutChart
        data={completeDonutTrafficData}
        dataKey="value"
        enableLegendHighlight={false}
        responsiveContainerProps={chartSize}
        series={completeDonutTrafficSeries}
        withLegend
      />
    );

    expect(container.querySelector(".recharts-legend-wrapper")).not.toBeNull();
  });

  it("accepts radial style props without breaking render", () => {
    const { container } = render(
      <DonutChart
        data={completeDonutTrafficData}
        dataKey="value"
        paddingAngle={2}
        responsiveContainerProps={chartSize}
        series={completeDonutTrafficSeries}
        size="84%"
        strokeColor="var(--color-border)"
        strokeWidth={2}
        thickness={22}
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
  });
});
