import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { LineChart } from "./line-chart";
import {
  completeLineDualAxisSeries,
  completeLineGapData,
  completeLineSeries,
  completeLineTrendData,
} from "./line-chart-test-data";

afterEach(cleanup);

const lineAxisAwareFormatter = (value: number, seriesKey: string) =>
  `${seriesKey}:${value}`;
const linePointLabelWithDatumFormatter = (
  value: number,
  seriesKey: string,
  datum: { cohort: string }
) => `${seriesKey}:${datum.cohort}:${value}`;
const chartSize = { height: 320, width: 720 };
const lineStrokeWidthBySeries = {
  revenue: 5,
  target: 1,
} as const;
const getSeriesName = (seriesItem: { key?: string; name?: string }) =>
  seriesItem.name ?? seriesItem.key ?? "value";

const linePropsBySeries = (seriesItem: { key?: string; name?: string }) => ({
  strokeWidth:
    lineStrokeWidthBySeries[
      getSeriesName(seriesItem) as keyof typeof lineStrokeWidthBySeries
    ],
});

const strokeDasharrayPattern = /stroke-dasharray=(?:"|')?[^>"']*6(?:\s|,)+3/;

describe("Complete LineChart", () => {
  it("passes canonical lineChartProps through to Recharts", () => {
    const { container } = render(
      <LineChart
        data={completeLineTrendData}
        dataKey="month"
        lineChartProps={{ className: "line-chart-canonical-props" }}
        responsiveContainerProps={chartSize}
        series={completeLineSeries}
      />
    );

    expect(
      container.querySelector(".line-chart-canonical-props")
    ).not.toBeNull();
  });

  it("keeps chartProps alias support during migration", () => {
    const { container } = render(
      <LineChart
        chartProps={{ className: "line-chart-alias-props" }}
        data={completeLineTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeLineSeries}
      />
    );

    expect(container.querySelector(".line-chart-alias-props")).not.toBeNull();
  });

  it("renders line series and chart root slot", () => {
    const { container } = render(
      <LineChart
        data={completeLineTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeLineSeries}
        withLegend
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
    expect(container.querySelectorAll(".recharts-line-curve").length).toBe(2);
  });

  it("maps y-axis formatters to left and right axis ids", () => {
    const { container } = render(
      <LineChart
        data={completeLineTrendData}
        dataKey="month"
        rightYAxisProps={{
          yAxisId: "right-axis",
          ticks: [1400, 1500],
          width: 64,
        }}
        responsiveContainerProps={chartSize}
        series={completeLineDualAxisSeries}
        valueFormatter={lineAxisAwareFormatter}
        withRightYAxis
        yAxisProps={{ ticks: [1200, 1300], width: 64, yAxisId: "left-axis" }}
      />
    );

    expect(screen.queryAllByText("revenue:1200").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("target:1500").length).toBeGreaterThan(0);
    expect(
      container.querySelectorAll(".recharts-yAxis").length
    ).toBeGreaterThan(1);
  });

  it("keeps explicit y-axis tickFormatter overrides as highest precedence", () => {
    render(
      <LineChart
        data={completeLineTrendData}
        dataKey="month"
        rightYAxisProps={{
          tickFormatter: (value) => `right:${value}`,
          ticks: [1500],
          yAxisId: "right-axis",
        }}
        responsiveContainerProps={chartSize}
        series={completeLineDualAxisSeries}
        valueFormatter={lineAxisAwareFormatter}
        withRightYAxis
        yAxisProps={{
          tickFormatter: (value) => `left:${value}`,
          ticks: [1200],
          yAxisId: "left-axis",
        }}
      />
    );

    expect(screen.queryAllByText("left:1200").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("right:1500").length).toBeGreaterThan(0);
    expect(screen.queryByText("revenue:1200")).toBeNull();
    expect(screen.queryByText("target:1500")).toBeNull();
  });

  it("does not render legend or tooltip wrappers when disabled", () => {
    const { container } = render(
      <LineChart
        data={completeLineTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeLineSeries}
        withLegend={false}
        withTooltip={false}
      />
    );

    expect(container.querySelector(".recharts-legend-wrapper")).toBeNull();
    expect(container.querySelector(".recharts-tooltip-wrapper")).toBeNull();
  });

  it("passes Recharts v3 tooltip props through", () => {
    const { container } = render(
      <LineChart
        data={completeLineTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeLineDualAxisSeries}
        tooltipProps={{
          axisId: "right-axis",
          defaultIndex: 0,
          shared: true,
          trigger: "click",
        }}
        withRightYAxis
        yAxisProps={{ yAxisId: "left-axis" }}
        rightYAxisProps={{ yAxisId: "right-axis" }}
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
  });

  it("removes dots when withDots is false", () => {
    const { container } = render(
      <LineChart
        data={completeLineTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeLineSeries}
        withDots={false}
      />
    );

    expect(
      container.querySelectorAll(".recharts-line-dots circle").length
    ).toBe(0);
  });

  it("applies lineProps object overrides to all line series", () => {
    const { container } = render(
      <LineChart
        data={completeLineTrendData}
        dataKey="month"
        lineProps={{ strokeOpacity: 0.35 }}
        responsiveContainerProps={chartSize}
        series={completeLineSeries}
      />
    );

    expect(
      container.querySelectorAll(".recharts-line-curve[stroke-opacity='0.35']")
        .length
    ).toBe(2);
  });

  it("applies lineProps callback overrides per series", () => {
    const { container } = render(
      <LineChart
        data={completeLineTrendData}
        dataKey="month"
        lineProps={linePropsBySeries}
        responsiveContainerProps={chartSize}
        series={completeLineSeries}
      />
    );

    const strokeWidths = new Set(
      [...container.querySelectorAll(".recharts-line-curve")].map((element) =>
        element.getAttribute("stroke-width")
      )
    );

    expect(strokeWidths.has("5")).toBe(true);
    expect(strokeWidths.has("1")).toBe(true);
  });

  it("uses row datum metadata in point label valueFormatter", async () => {
    render(
      <LineChart
        data={[
          { cohort: "alpha", month: "Jan", revenue: 1200, target: 1400 },
          { cohort: "beta", month: "Feb", revenue: 1320, target: 1500 },
        ]}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeLineSeries}
        lineProps={{ isAnimationActive: false }}
        valueFormatter={linePointLabelWithDatumFormatter}
        withPointLabels
      />
    );

    await waitFor(() => {
      expect(screen.queryAllByText("revenue:beta:1320").length).toBeGreaterThan(
        0
      );
      expect(screen.queryAllByText("target:beta:1500").length).toBeGreaterThan(
        0
      );
    });
  });

  it("supports gradient mode and series-level curve overrides", () => {
    const { container } = render(
      <LineChart
        curveType="linear"
        data={completeLineTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={[
          { curveType: "stepAfter", label: "Revenue", name: "revenue" },
          { label: "Target", name: "target" },
        ]}
        type="gradient"
      />
    );

    expect(container.querySelector("linearGradient")).not.toBeNull();
    expect(
      container.querySelectorAll(".recharts-line-curve[stroke^='url(#']").length
    ).toBe(2);
  });

  it("dims non-highlighted series on legend hover by default", () => {
    const { container } = render(
      <LineChart
        data={completeLineTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeLineSeries}
        withLegend
      />
    );

    fireEvent.mouseEnter(screen.getByText("Revenue"));

    expect(
      container.querySelectorAll(".recharts-line-curve[stroke-opacity='0.45']")
        .length
    ).toBeGreaterThan(0);
  });

  it("does not dim series when legend highlighting is disabled", () => {
    const { container } = render(
      <LineChart
        data={completeLineTrendData}
        dataKey="month"
        enableLegendHighlight={false}
        responsiveContainerProps={chartSize}
        series={completeLineSeries}
        withLegend
      />
    );

    fireEvent.mouseEnter(screen.getByText("Revenue"));

    expect(
      container.querySelectorAll(".recharts-line-curve[stroke-opacity='0.45']")
        .length
    ).toBe(0);
  });

  it("supports full gridAxis and tickLine matrix behavior", () => {
    const matrix = [
      {
        expectedGridHorizontal: false,
        expectedGridVertical: true,
        expectedXAxisTicks: true,
        expectedYAxisTicks: false,
        mode: "x" as const,
      },
      {
        expectedGridHorizontal: true,
        expectedGridVertical: false,
        expectedXAxisTicks: false,
        expectedYAxisTicks: true,
        mode: "y" as const,
      },
      {
        expectedGridHorizontal: true,
        expectedGridVertical: true,
        expectedXAxisTicks: true,
        expectedYAxisTicks: true,
        mode: "xy" as const,
      },
      {
        expectedGridHorizontal: false,
        expectedGridVertical: false,
        expectedXAxisTicks: false,
        expectedYAxisTicks: false,
        mode: "none" as const,
      },
    ];

    for (const scenario of matrix) {
      const { container, unmount } = render(
        <LineChart
          data={completeLineTrendData}
          dataKey="month"
          gridAxis={scenario.mode}
          responsiveContainerProps={chartSize}
          series={completeLineSeries}
          tickLine={scenario.mode}
        />
      );

      expect(container.querySelector(".recharts-cartesian-grid") !== null).toBe(
        scenario.mode !== "none"
      );
      expect(
        container.querySelectorAll(".recharts-cartesian-grid-horizontal line")
          .length > 0
      ).toBe(scenario.expectedGridHorizontal);
      expect(
        container.querySelectorAll(".recharts-cartesian-grid-vertical line")
          .length > 0
      ).toBe(scenario.expectedGridVertical);
      expect(
        container.querySelectorAll(
          ".recharts-xAxis .recharts-cartesian-axis-tick-line"
        ).length > 0
      ).toBe(scenario.expectedXAxisTicks);
      expect(
        container.querySelectorAll(
          ".recharts-yAxis .recharts-cartesian-axis-tick-line"
        ).length > 0
      ).toBe(scenario.expectedYAxisTicks);

      unmount();
    }
  });

  it("removes x and y axes when withXAxis and withYAxis are false", () => {
    const { container } = render(
      <LineChart
        data={completeLineTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeLineSeries}
        withXAxis={false}
        withYAxis={false}
      />
    );

    expect(container.querySelectorAll(".recharts-xAxis").length).toBe(0);
    expect(container.querySelectorAll(".recharts-yAxis").length).toBe(0);
  });

  it("renders reference lines for both x and y references", () => {
    const { container } = render(
      <LineChart
        data={completeLineGapData}
        dataKey="month"
        referenceLines={[
          { label: "Goal", y: 1500 },
          { label: "Milestone", x: "Mar" },
        ]}
        responsiveContainerProps={chartSize}
        series={completeLineSeries}
      />
    );

    expect(container.querySelectorAll(".recharts-reference-line").length).toBe(
      2
    );
    expect(screen.queryByText("Goal")).not.toBeNull();
    expect(screen.queryByText("Milestone")).not.toBeNull();
  });

  it("applies global strokeWidth and per-series strokeDasharray", () => {
    const { container } = render(
      <LineChart
        data={completeLineTrendData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeLineSeries}
        strokeWidth={4}
      />
    );

    const lineCurves = [...container.querySelectorAll(".recharts-line-curve")];
    const strokeWidths = lineCurves.map((element) =>
      element.getAttribute("stroke-width")
    );
    const chartMarkup = container.innerHTML;

    expect(strokeWidths.every((value) => value === "4")).toBe(true);
    expect(strokeDasharrayPattern.test(chartMarkup)).toBe(true);
  });
});
