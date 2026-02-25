import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { ScatterChart } from "./scatter-chart";
import { completeScatterSeries } from "./scatter-chart-test-data";

afterEach(cleanup);

const chartSize = { height: 320, width: 720 };
const scatterValueFormatter = (value: number, seriesKey: string) =>
  `${seriesKey}:${value}`;
const scatterXValueFormatter = (value: number | string): string => `x:${value}`;
const scatterYValueFormatter = (value: number | string): string => `y:${value}`;
const scatterLeftTickFormatter = (value: number | string): string =>
  `left:${value}`;
const scatterRightTickFormatter = (value: number | string): string =>
  `right:${value}`;
const scatterPointValueLabelFormatter = (value: number | string): string =>
  `P:${value}`;
const scatterPointValueLabelWithDatumFormatter = (
  value: number,
  _seriesName: string,
  datum: Record<string, unknown>
) => `${typeof datum.cohort === "string" ? datum.cohort : ""}:${value}`;
const scatterClassBySeries = {
  enterprise: "scatter-props-series-enterprise",
  smb: "scatter-props-series-smb",
} as const;
const getSeriesName = (seriesItem: { key?: string; name?: string }) =>
  seriesItem.name ?? seriesItem.key ?? "value";

const createScatterPropsBySeries =
  (callbackSeriesKeys: string[]) =>
  (seriesItem: { key?: string; name?: string }) => {
    const seriesName = getSeriesName(seriesItem);
    callbackSeriesKeys.push(seriesName);

    return {
      className:
        scatterClassBySeries[seriesName as keyof typeof scatterClassBySeries],
    };
  };

describe("Complete ScatterChart", () => {
  it("passes canonical scatterChartProps through to Recharts", () => {
    const { container } = render(
      <ScatterChart
        scatterChartProps={{ className: "scatter-chart-canonical-props" }}
        responsiveContainerProps={chartSize}
        series={completeScatterSeries}
        xKey="effort"
        yKey="impact"
      />
    );

    expect(
      container.querySelector(".scatter-chart-canonical-props")
    ).not.toBeNull();
  });

  it("keeps chartProps alias support during migration", () => {
    const { container } = render(
      <ScatterChart
        chartProps={{ className: "scatter-chart-legacy-props" }}
        responsiveContainerProps={chartSize}
        series={completeScatterSeries}
        xKey="effort"
        yKey="impact"
      />
    );

    expect(
      container.querySelector(".scatter-chart-legacy-props")
    ).not.toBeNull();
  });

  it("renders multi-series scatter points and chart root slot", () => {
    const { container } = render(
      <ScatterChart
        responsiveContainerProps={chartSize}
        series={completeScatterSeries}
        withLegend
        xKey="effort"
        yKey="impact"
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
    expect(container.querySelectorAll(".recharts-scatter").length).toBe(2);
    expect(
      container.querySelectorAll(".recharts-scatter-symbol").length
    ).toBeGreaterThan(0);
  });

  it("applies axis-specific x and y formatter behavior", () => {
    render(
      <ScatterChart
        responsiveContainerProps={chartSize}
        series={completeScatterSeries}
        xKey="effort"
        xValueFormatter={scatterXValueFormatter}
        yKey="impact"
        yValueFormatter={scatterYValueFormatter}
        xAxisProps={{ ticks: [1.2], width: 64 }}
        yAxisProps={{ ticks: [42], width: 64 }}
      />
    );

    expect(screen.queryAllByText("x:1.2").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("y:42").length).toBeGreaterThan(0);
  });

  it("keeps explicit axis tickFormatter overrides as highest precedence", () => {
    render(
      <ScatterChart
        responsiveContainerProps={chartSize}
        series={completeScatterSeries}
        xKey="effort"
        xValueFormatter={scatterXValueFormatter}
        yKey="impact"
        yValueFormatter={scatterYValueFormatter}
        xAxisProps={{
          tickFormatter: scatterLeftTickFormatter,
          ticks: [1.2],
          width: 64,
        }}
        yAxisProps={{
          tickFormatter: scatterRightTickFormatter,
          ticks: [42],
          width: 64,
        }}
      />
    );

    expect(screen.queryAllByText("left:1.2").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("right:42").length).toBeGreaterThan(0);
    expect(screen.queryByText("x:1.2")).toBeNull();
    expect(screen.queryByText("y:42")).toBeNull();
  });

  it("supports point labels", () => {
    render(
      <ScatterChart
        pointLabelDataKey="impact"
        pointLabelFormatter={scatterPointValueLabelFormatter}
        responsiveContainerProps={chartSize}
        series={completeScatterSeries}
        withPointLabels
        xKey="effort"
        yKey="impact"
      />
    );

    expect(screen.queryAllByText("P:42").length).toBeGreaterThan(0);
  });

  it("uses row datum metadata in pointLabelFormatter", () => {
    render(
      <ScatterChart
        pointLabelDataKey="impact"
        pointLabelFormatter={scatterPointValueLabelWithDatumFormatter}
        responsiveContainerProps={chartSize}
        series={[
          {
            data: [
              { cohort: "enterprise-0", effort: 1.2, impact: 42 },
              { cohort: "enterprise-1", effort: 2.1, impact: 56 },
            ],
            label: "Enterprise",
            name: "enterprise",
          },
        ]}
        withPointLabels
        xKey="effort"
        yKey="impact"
      />
    );

    expect(screen.queryAllByText("enterprise-1:56").length).toBeGreaterThan(0);
  });

  it("renders x and y reference lines", () => {
    const { container } = render(
      <ScatterChart
        referenceLines={[
          { label: "Effort Target", x: 2.5 },
          { label: "Impact Goal", y: 60 },
        ]}
        responsiveContainerProps={chartSize}
        series={completeScatterSeries}
        xKey="effort"
        yKey="impact"
      />
    );

    expect(container.querySelectorAll(".recharts-reference-line").length).toBe(
      2
    );
    expect(screen.queryByText("Effort Target")).not.toBeNull();
    expect(screen.queryByText("Impact Goal")).not.toBeNull();
  });

  it("passes Recharts v3 tooltip props through", () => {
    const { container } = render(
      <ScatterChart
        responsiveContainerProps={chartSize}
        series={completeScatterSeries}
        tooltipProps={{ defaultIndex: 0, trigger: "click" }}
        withTooltip
        xKey="effort"
        yKey="impact"
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
  });

  it("applies scatterProps callback overrides per series", () => {
    const callbackSeriesKeys: string[] = [];
    const scatterPropsBySeries = createScatterPropsBySeries(callbackSeriesKeys);
    const { container } = render(
      <ScatterChart
        responsiveContainerProps={chartSize}
        scatterProps={scatterPropsBySeries}
        series={completeScatterSeries}
        xKey="effort"
        yKey="impact"
      />
    );

    expect(callbackSeriesKeys).toEqual(["enterprise", "smb"]);
    expect(
      container.querySelector(".scatter-props-series-enterprise")
    ).not.toBeNull();
    expect(container.querySelector(".scatter-props-series-smb")).not.toBeNull();
  });

  it("dims non-highlighted series on legend hover by default", () => {
    const { container } = render(
      <ScatterChart
        responsiveContainerProps={chartSize}
        series={completeScatterSeries}
        withLegend
        xKey="effort"
        yKey="impact"
      />
    );
    const symbolCountBeforeHover = container.querySelectorAll(
      ".recharts-scatter-symbol"
    ).length;

    fireEvent.mouseEnter(screen.getByText("Enterprise"));
    const symbolCountAfterHover = container.querySelectorAll(
      ".recharts-scatter-symbol"
    ).length;

    expect(symbolCountAfterHover).toBeLessThan(symbolCountBeforeHover);
  });

  it("does not dim series when legend highlighting is disabled", () => {
    const { container } = render(
      <ScatterChart
        enableLegendHighlight={false}
        responsiveContainerProps={chartSize}
        series={completeScatterSeries}
        withLegend
        xKey="effort"
        yKey="impact"
      />
    );
    const symbolCountBeforeHover = container.querySelectorAll(
      ".recharts-scatter-symbol"
    ).length;

    fireEvent.mouseEnter(screen.getByText("Enterprise"));
    const symbolCountAfterHover = container.querySelectorAll(
      ".recharts-scatter-symbol"
    ).length;

    expect(symbolCountAfterHover).toBe(symbolCountBeforeHover);
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
        <ScatterChart
          gridAxis={scenario.mode}
          responsiveContainerProps={chartSize}
          series={completeScatterSeries}
          tickLine={scenario.mode}
          xKey="effort"
          yKey="impact"
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

  it("removes x and y axes when toggles are disabled", () => {
    const { container } = render(
      <ScatterChart
        responsiveContainerProps={chartSize}
        series={completeScatterSeries}
        withXAxis={false}
        withYAxis={false}
        xKey="effort"
        yKey="impact"
      />
    );

    expect(container.querySelectorAll(".recharts-xAxis").length).toBe(0);
    expect(container.querySelectorAll(".recharts-yAxis").length).toBe(0);
  });

  it("uses composed tooltip value formatter for x and y keys", () => {
    render(
      <ScatterChart
        responsiveContainerProps={chartSize}
        series={completeScatterSeries}
        valueFormatter={scatterValueFormatter}
        xAxisProps={{ ticks: [1.2], width: 64 }}
        xKey="effort"
        yAxisProps={{ ticks: [42], width: 64 }}
        yKey="impact"
      />
    );

    expect(screen.queryAllByText("1.2").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("42").length).toBeGreaterThan(0);
  });
});
