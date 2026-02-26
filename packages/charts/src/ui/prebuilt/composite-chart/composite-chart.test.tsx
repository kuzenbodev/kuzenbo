import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { resolveDefaultBarRadius } from "../shared/complete-helpers";
import { CompositeChart } from "./composite-chart";
import {
  completeCompositeMixedData,
  completeCompositeMixedSeries,
  completeCompositeNullZeroData,
  completeCompositeNullZeroSeries,
} from "./composite-chart-test-data";

afterEach(cleanup);

const chartSize = { height: 320, width: 720 };
const compositeAxisAwareFormatter = (value: number, seriesKey: string) =>
  `${seriesKey}:${value}`;
const compositeValueLabelWithDatumFormatter = (
  value: number,
  seriesKey: string,
  datum: { cohort: string }
) => `${seriesKey}:${datum.cohort}:${value}`;
const compositeLineStrokeOpacityBySeries = {
  conversionRate: 0.42,
} as const;
const compositeBarClassBySeries = {
  revenue: "composite-bar-series-revenue",
} as const;
const compositeAreaFillOpacityBySeries = {
  pipeline: 0.61,
} as const;
const getSeriesName = (seriesItem: { key?: string; name?: string }) =>
  seriesItem.name ?? seriesItem.key ?? "value";

const compositeLinePropsBySeries = (seriesItem: {
  key?: string;
  name?: string;
}) => ({
  strokeOpacity:
    compositeLineStrokeOpacityBySeries[
      getSeriesName(
        seriesItem
      ) as keyof typeof compositeLineStrokeOpacityBySeries
    ],
});

const createCompositeBarPropsBySeries =
  (callbackSeriesKeys: string[]) =>
  (seriesItem: { key?: string; name?: string }) => {
    const seriesName = getSeriesName(seriesItem);
    callbackSeriesKeys.push(seriesName);

    return {
      className:
        compositeBarClassBySeries[
          seriesName as keyof typeof compositeBarClassBySeries
        ],
    };
  };

const compositeAreaPropsBySeries = (seriesItem: {
  key?: string;
  name?: string;
}) => ({
  fillOpacity:
    compositeAreaFillOpacityBySeries[
      getSeriesName(seriesItem) as keyof typeof compositeAreaFillOpacityBySeries
    ],
});

describe("Complete CompositeChart", () => {
  it("passes canonical composedChartProps through to Recharts", () => {
    const { container } = render(
      <CompositeChart
        composedChartProps={{ className: "composite-chart-canonical-props" }}
        data={completeCompositeMixedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeCompositeMixedSeries}
      />
    );

    expect(
      container.querySelector(".composite-chart-canonical-props")
    ).not.toBeNull();
  });

  it("keeps chartProps alias support during migration", () => {
    const { container } = render(
      <CompositeChart
        chartProps={{ className: "composite-chart-alias-props" }}
        data={completeCompositeMixedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeCompositeMixedSeries}
      />
    );

    expect(
      container.querySelector(".composite-chart-alias-props")
    ).not.toBeNull();
  });

  it("renders line, bar, and area series in one chart", () => {
    const { container } = render(
      <CompositeChart
        data={completeCompositeMixedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeCompositeMixedSeries}
        withLegend
        withRightYAxis
        yAxisProps={{ yAxisId: "revenue-axis" }}
        rightYAxisProps={{ yAxisId: "conversion-axis" }}
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
    expect(
      container.querySelectorAll(".recharts-line-curve").length
    ).toBeGreaterThan(0);
    expect(
      container.querySelectorAll(".recharts-area-area").length
    ).toBeGreaterThan(0);
    expect(
      container.querySelectorAll(".recharts-bar-rectangle").length
    ).toBeGreaterThan(0);
  });

  it("supports point and bar value labels", () => {
    const { container } = render(
      <CompositeChart
        data={completeCompositeMixedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={[
          { key: "revenue", label: "Revenue", type: "bar" },
          { key: "conversionRate", label: "Conversion", type: "line" },
        ]}
        withBarValueLabel
        withPointLabels
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
    expect(
      container.querySelectorAll(".recharts-bar-rectangle").length
    ).toBeGreaterThan(0);
  });

  it("uses row datum metadata in line, area, and bar value labels", async () => {
    render(
      <CompositeChart
        data={[
          {
            cohort: "alpha",
            conversionRate: 12.4,
            month: "Jan",
            pipeline: 143_000,
            revenue: 91_000,
          },
          {
            cohort: "beta",
            conversionRate: 12.9,
            month: "Feb",
            pipeline: 149_000,
            revenue: 97_600,
          },
        ]}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeCompositeMixedSeries}
        areaProps={{ isAnimationActive: false }}
        barProps={{ isAnimationActive: false }}
        lineProps={{ isAnimationActive: false }}
        valueFormatter={compositeValueLabelWithDatumFormatter}
        withBarValueLabel
        withPointLabels
      />
    );

    await waitFor(() => {
      expect(
        screen.queryAllByText("revenue:beta:97600").length
      ).toBeGreaterThan(0);
      expect(
        screen.queryAllByText("conversionRate:beta:12.9").length
      ).toBeGreaterThan(0);
      expect(
        screen.queryAllByText("pipeline:beta:149000").length
      ).toBeGreaterThan(0);
    });
  });

  it("does not render legend or tooltip wrappers when disabled", () => {
    const { container } = render(
      <CompositeChart
        data={completeCompositeMixedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={[
          { key: "revenue", label: "Revenue", type: "bar" },
          { key: "conversionRate", label: "Conversion", type: "line" },
        ]}
        withLegend={false}
        withTooltip={false}
      />
    );

    expect(container.querySelector(".recharts-legend-wrapper")).toBeNull();
    expect(container.querySelector(".recharts-tooltip-wrapper")).toBeNull();
  });

  it("passes Recharts v3 tooltip props through", () => {
    const { container } = render(
      <CompositeChart
        data={completeCompositeMixedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={[
          { key: "revenue", label: "Revenue", type: "bar", yAxisId: "left" },
          {
            key: "conversionRate",
            label: "Conversion",
            type: "line",
            yAxisId: "right",
          },
        ]}
        tooltipProps={{
          axisId: "right",
          defaultIndex: 0,
          shared: true,
          trigger: "click",
        }}
        withRightYAxis
        yAxisProps={{ yAxisId: "left" }}
        rightYAxisProps={{ yAxisId: "right" }}
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
  });

  it("applies lineProps callback only to line series", () => {
    const { container } = render(
      <CompositeChart
        data={completeCompositeMixedData}
        dataKey="month"
        lineProps={compositeLinePropsBySeries}
        responsiveContainerProps={chartSize}
        series={completeCompositeMixedSeries}
      />
    );

    expect(
      container.querySelectorAll(".recharts-line-curve[stroke-opacity='0.42']")
        .length
    ).toBeGreaterThan(0);
  });

  it("applies barProps callback only to bar series", () => {
    const callbackSeriesKeys: string[] = [];
    const compositeBarPropsBySeries =
      createCompositeBarPropsBySeries(callbackSeriesKeys);
    const { container } = render(
      <CompositeChart
        barProps={compositeBarPropsBySeries}
        data={completeCompositeMixedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeCompositeMixedSeries}
      />
    );

    expect(callbackSeriesKeys).toEqual(["revenue"]);
    expect(
      container.querySelector(".composite-bar-series-revenue")
    ).not.toBeNull();
  });

  it("applies areaProps callback only to area series", () => {
    const { container } = render(
      <CompositeChart
        areaProps={compositeAreaPropsBySeries}
        data={completeCompositeMixedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeCompositeMixedSeries}
      />
    );

    expect(
      container.querySelectorAll(".recharts-area-area[fill-opacity='0.61']")
        .length
    ).toBeGreaterThan(0);
  });

  it("removes line dots when withDots is false", () => {
    const { container } = render(
      <CompositeChart
        data={completeCompositeMixedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeCompositeMixedSeries}
        withDots={false}
      />
    );

    expect(
      container.querySelectorAll(".recharts-line-dots circle").length
    ).toBe(0);
  });

  it("resolves composite bar radius defaults deterministically", () => {
    expect(resolveDefaultBarRadius([{ stackId: undefined }])).toBe(6);

    expect(
      resolveDefaultBarRadius([{ stackId: "revenue" }, { stackId: "revenue" }])
    ).toBe(0);

    expect(
      resolveDefaultBarRadius(
        [{ stackId: "revenue" }, { stackId: "revenue" }],
        8
      )
    ).toBe(8);
  });

  it("maps y-axis formatters to left and right axis ids", () => {
    render(
      <CompositeChart
        data={completeCompositeMixedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        rightYAxisProps={{ ticks: [13.5], yAxisId: "conversion-axis" }}
        series={completeCompositeMixedSeries}
        valueFormatter={compositeAxisAwareFormatter}
        withRightYAxis
        yAxisProps={{ ticks: [91_000], yAxisId: "revenue-axis" }}
      />
    );

    expect(screen.queryAllByText("revenue:91000").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("conversionRate:13.5").length).toBeGreaterThan(
      0
    );
  });

  it("keeps explicit y-axis tickFormatter overrides as highest precedence", () => {
    render(
      <CompositeChart
        data={completeCompositeMixedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        rightYAxisProps={{
          tickFormatter: (value) => `right:${value}`,
          ticks: [13.5],
          yAxisId: "conversion-axis",
        }}
        series={completeCompositeMixedSeries}
        valueFormatter={compositeAxisAwareFormatter}
        withRightYAxis
        yAxisProps={{
          tickFormatter: (value) => `left:${value}`,
          ticks: [91_000],
          yAxisId: "revenue-axis",
        }}
      />
    );

    expect(screen.queryAllByText("left:91000").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("right:13.5").length).toBeGreaterThan(0);
    expect(screen.queryByText("revenue:91000")).toBeNull();
    expect(screen.queryByText("conversionRate:13.5")).toBeNull();
  });

  it("renders null and zero datasets with connectNulls disabled and zero baseline", () => {
    const { container } = render(
      <CompositeChart
        connectNulls={false}
        data={completeCompositeNullZeroData}
        dataKey="month"
        referenceLines={[{ label: "Zero Baseline", x: "Feb" }]}
        responsiveContainerProps={chartSize}
        series={completeCompositeNullZeroSeries}
        withRightYAxis
        yAxisProps={{ yAxisId: "revenue-axis" }}
        rightYAxisProps={{ yAxisId: "conversion-axis" }}
      />
    );

    expect(
      container.querySelectorAll(".recharts-bar-rectangle").length
    ).toBeGreaterThan(0);
    expect(
      container.querySelectorAll(".recharts-line-curve").length
    ).toBeGreaterThan(0);
    expect(
      container.querySelectorAll(".recharts-area-area").length
    ).toBeGreaterThan(0);
    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
  });

  it("applies dotProps and activeDotProps to mixed line and area series", () => {
    const { container } = render(
      <CompositeChart
        activeDotProps={{ r: 6 }}
        data={completeCompositeMixedData}
        dataKey="month"
        dotProps={{ r: 4 }}
        responsiveContainerProps={chartSize}
        series={completeCompositeMixedSeries}
        withDots
      />
    );

    expect(
      container.querySelectorAll(".recharts-line-dots circle[r='4']").length
    ).toBeGreaterThan(0);
  });

  it("dims non-highlighted series on legend hover by default", () => {
    const { container } = render(
      <CompositeChart
        data={completeCompositeMixedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeCompositeMixedSeries}
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
      <CompositeChart
        data={completeCompositeMixedData}
        dataKey="month"
        enableLegendHighlight={false}
        responsiveContainerProps={chartSize}
        series={completeCompositeMixedSeries}
        withLegend
      />
    );

    fireEvent.mouseEnter(screen.getByText("Revenue"));

    expect(
      container.querySelectorAll(".recharts-line-curve[stroke-opacity='0.45']")
        .length
    ).toBe(0);
  });
});
