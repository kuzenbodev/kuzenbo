import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { AreaChart } from "./area-chart";
import {
  completeAreaDualAxisData,
  completeAreaDualAxisSeries,
  completeAreaSeries,
  completeAreaSignedData,
  completeAreaSignedSeries,
  completeAreaTrendData,
} from "./area-chart-test-data";

afterEach(cleanup);

const chartSize = { height: 320, width: 720 };
const areaAxisAwareFormatter = (value: number, seriesKey: string) =>
  `${seriesKey}:${value}`;
const areaPointLabelWithDatumFormatter = (
  value: number,
  seriesKey: string,
  datum: { cohort: string }
) => `${seriesKey}:${datum.cohort}:${value}`;
const areaClassBySeries = {
  revenue: "area-props-series-revenue",
  target: "area-props-series-target",
} as const;
const getSeriesName = (seriesItem: { key?: string; name?: string }) =>
  seriesItem.name ?? seriesItem.key ?? "value";

const createAreaPropsBySeries =
  (callbackSeriesKeys: string[]) =>
  (seriesItem: { key?: string; name?: string }) => {
    const seriesName = getSeriesName(seriesItem);
    callbackSeriesKeys.push(seriesName);

    return {
      className:
        areaClassBySeries[seriesName as keyof typeof areaClassBySeries],
    };
  };

describe("Complete AreaChart", () => {
  it("passes canonical areaChartProps through to Recharts", () => {
    const { container } = render(
      <AreaChart
        areaChartProps={{ className: "area-chart-canonical-props" }}
        data={completeAreaTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeAreaSeries}
      />
    );

    expect(
      container.querySelector(".area-chart-canonical-props")
    ).not.toBeNull();
  });

  it("keeps chartProps alias support during migration", () => {
    const { container } = render(
      <AreaChart
        chartProps={{ className: "area-chart-alias-props" }}
        data={completeAreaTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeAreaSeries}
      />
    );

    expect(container.querySelector(".area-chart-alias-props")).not.toBeNull();
  });

  it("renders area series and chart root slot", () => {
    const { container } = render(
      <AreaChart
        data={completeAreaTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeAreaSeries}
        withLegend
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
    expect(container.querySelectorAll(".recharts-area-area").length).toBe(2);
  });

  it("maps y-axis formatters to left and right axis ids", () => {
    render(
      <AreaChart
        data={completeAreaDualAxisData}
        dataKey="month"
        rightYAxisProps={{ ticks: [13.9], width: 64, yAxisId: "right-axis" }}
        responsiveContainerProps={chartSize}
        series={completeAreaDualAxisSeries}
        valueFormatter={areaAxisAwareFormatter}
        withRightYAxis
        yAxisProps={{ ticks: [92_000], width: 64, yAxisId: "left-axis" }}
      />
    );

    expect(screen.queryAllByText("mrr:92000").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("conversionRate:13.9").length).toBeGreaterThan(
      0
    );
  });

  it("keeps explicit y-axis tickFormatter overrides as highest precedence", () => {
    render(
      <AreaChart
        data={completeAreaDualAxisData}
        dataKey="month"
        rightYAxisProps={{
          tickFormatter: (value) => `right:${value}`,
          ticks: [13.9],
          yAxisId: "right-axis",
        }}
        responsiveContainerProps={chartSize}
        series={completeAreaDualAxisSeries}
        valueFormatter={areaAxisAwareFormatter}
        withRightYAxis
        yAxisProps={{
          tickFormatter: (value) => `left:${value}`,
          ticks: [92_000],
          yAxisId: "left-axis",
        }}
      />
    );

    expect(screen.queryAllByText("left:92000").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("right:13.9").length).toBeGreaterThan(0);
    expect(screen.queryByText("mrr:92000")).toBeNull();
    expect(screen.queryByText("conversionRate:13.9")).toBeNull();
  });

  it("supports stacked, percent, and split types", () => {
    render(
      <AreaChart
        data={completeAreaTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeAreaSeries}
        type="stacked"
      />
    );
    render(
      <AreaChart
        data={completeAreaTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeAreaSeries}
        type="percent"
        yAxisProps={{ ticks: [0, 0.5, 1], width: 64 }}
      />
    );
    const { container } = render(
      <AreaChart
        data={completeAreaSignedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeAreaSignedSeries}
        type="split"
      />
    );

    expect(screen.queryAllByText("50%").length).toBeGreaterThan(0);
    expect(container.querySelectorAll(".recharts-area-area").length).toBe(2);
  });

  it("renders gradients and keeps per-series curve overrides", () => {
    const { container } = render(
      <AreaChart
        curveType="linear"
        data={completeAreaTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={[
          { curveType: "stepAfter", label: "Revenue", name: "revenue" },
          { label: "Target", name: "target" },
        ]}
        withGradient
      />
    );

    expect(container.querySelectorAll("linearGradient").length).toBe(2);
    expect(
      container.querySelectorAll(".recharts-area-area[fill^='url(#']").length
    ).toBe(2);
  });

  it("removes dots when withDots is false", () => {
    const { container } = render(
      <AreaChart
        data={completeAreaTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeAreaSeries}
        withDots={false}
      />
    );

    expect(
      container.querySelectorAll(".recharts-line-dots circle").length
    ).toBe(0);
  });

  it("applies areaProps object overrides to all area series", () => {
    const { container } = render(
      <AreaChart
        areaProps={{ className: "area-props-object" }}
        data={completeAreaTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeAreaSeries}
      />
    );

    expect(
      container.querySelectorAll(".area-props-object").length
    ).toBeGreaterThan(0);
  });

  it("applies areaProps callback overrides per series", () => {
    const callbackSeriesKeys: string[] = [];
    const areaPropsBySeries = createAreaPropsBySeries(callbackSeriesKeys);
    const { container } = render(
      <AreaChart
        areaProps={areaPropsBySeries}
        data={completeAreaTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeAreaSeries}
      />
    );

    expect(callbackSeriesKeys).toEqual(["revenue", "target"]);
    expect(
      container.querySelector(".area-props-series-revenue")
    ).not.toBeNull();
    expect(container.querySelector(".area-props-series-target")).not.toBeNull();
  });

  it("renders point labels when enabled", () => {
    render(
      <AreaChart
        data={completeAreaTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeAreaSeries}
        valueFormatter={areaAxisAwareFormatter}
        withPointLabels
      />
    );

    expect(screen.queryAllByText("revenue:1280").length).toBeGreaterThan(0);
  });

  it("uses row datum metadata in point label valueFormatter", () => {
    render(
      <AreaChart
        data={[
          { cohort: "alpha", month: "Jan", revenue: 1280, target: 1360 },
          { cohort: "beta", month: "Feb", revenue: 1340, target: 1420 },
        ]}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeAreaSeries}
        valueFormatter={areaPointLabelWithDatumFormatter}
        withPointLabels
      />
    );

    expect(screen.queryAllByText("revenue:beta:1340").length).toBeGreaterThan(
      0
    );
    expect(screen.queryAllByText("target:beta:1420").length).toBeGreaterThan(0);
  });

  it("renders x and y reference lines", () => {
    const { container } = render(
      <AreaChart
        data={completeAreaTrendData}
        dataKey="month"
        referenceLines={[
          { label: "Target", y: 1400 },
          { label: "Milestone", x: "Mar" },
        ]}
        responsiveContainerProps={chartSize}
        series={completeAreaSeries}
      />
    );

    expect(container.querySelectorAll(".recharts-reference-line").length).toBe(
      2
    );
    expect(screen.queryByText("Target")).not.toBeNull();
    expect(screen.queryByText("Milestone")).not.toBeNull();
  });

  it("dims non-highlighted series on legend hover by default", () => {
    const { container } = render(
      <AreaChart
        data={completeAreaTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeAreaSeries}
        withLegend
      />
    );

    fireEvent.mouseEnter(screen.getByText("Revenue"));

    expect(
      container.querySelectorAll(".recharts-area-area[fill-opacity='0.45']")
        .length
    ).toBeGreaterThan(0);
  });

  it("does not dim series when legend highlighting is disabled", () => {
    const { container } = render(
      <AreaChart
        data={completeAreaTrendData}
        dataKey="month"
        enableLegendHighlight={false}
        responsiveContainerProps={chartSize}
        series={completeAreaSeries}
        withLegend
      />
    );

    fireEvent.mouseEnter(screen.getByText("Revenue"));

    expect(
      container.querySelectorAll(".recharts-area-area[fill-opacity='0.45']")
        .length
    ).toBe(0);
  });
});
