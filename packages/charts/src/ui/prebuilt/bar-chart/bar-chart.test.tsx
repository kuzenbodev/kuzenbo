import { afterEach, describe, expect, it } from "bun:test";

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import {
  calculateWaterfallData,
  resolveDefaultBarRadius,
} from "../shared/complete-helpers";
import { BarChart } from "./bar-chart";
import {
  completeBarDualAxisData,
  completeBarDualAxisSeries,
  completeBarGroupedData,
  completeBarGroupedSeries,
  completeBarNegativeData,
  completeBarNegativeSeries,
  completeBarStackedSeries,
} from "./bar-chart-test-data";

afterEach(cleanup);

const chartSize = { height: 320, width: 720 };
const barAxisAwareFormatter = (value: number, seriesKey: string) =>
  `${seriesKey}:${value}`;
const barValueLabelWithDatumFormatter = (
  value: number,
  seriesKey: string,
  datum: { cohort: string }
) => `${seriesKey}:${datum.cohort}:${value}`;
const verticalCategoryValueFormatter = (value: number) => `VALUE:${value}`;
const barClassBySeries = {
  organic: "bar-props-series-organic",
  paid: "bar-props-series-paid",
} as const;
const getSeriesName = (seriesItem: { key?: string; name?: string }) =>
  seriesItem.name ?? seriesItem.key ?? "value";

const createBarPropsBySeries =
  (callbackSeriesKeys: string[]) =>
  (seriesItem: { key?: string; name?: string }) => {
    const seriesName = getSeriesName(seriesItem);
    callbackSeriesKeys.push(seriesName);

    return {
      className: barClassBySeries[seriesName as keyof typeof barClassBySeries],
    };
  };

const createObservedBarColorResolver = (observedValues: number[]) => {
  const paletteBySign = ["#00aa55", "#dd2255"] as const;

  return (value: number) => {
    observedValues.push(value);
    const isNegative = value < 0;

    if (isNegative) {
      return paletteBySign[1];
    }

    return paletteBySign[0];
  };
};

describe("Complete BarChart", () => {
  it("passes canonical barChartProps through to Recharts", () => {
    const { container } = render(
      <BarChart
        barChartProps={{ className: "bar-chart-canonical-props" }}
        data={completeBarGroupedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeBarGroupedSeries}
      />
    );

    expect(
      container.querySelector(".bar-chart-canonical-props")
    ).not.toBeNull();
  });

  it("keeps chartProps alias support during migration", () => {
    const { container } = render(
      <BarChart
        chartProps={{ className: "bar-chart-alias-props" }}
        data={completeBarGroupedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeBarGroupedSeries}
      />
    );

    expect(container.querySelector(".bar-chart-alias-props")).not.toBeNull();
  });

  it("renders grouped bars with legend enabled", () => {
    const { container } = render(
      <BarChart
        data={completeBarGroupedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeBarGroupedSeries}
        withLegend
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
    expect(container.querySelectorAll(".recharts-bar").length).toBeGreaterThan(
      0
    );
  });

  it("renders stacked bars when stackId is provided", () => {
    const { container } = render(
      <BarChart
        data={completeBarGroupedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeBarStackedSeries}
      />
    );

    expect(
      container.querySelectorAll(".recharts-bar-rectangle").length
    ).toBeGreaterThan(0);
  });

  it("does not render legend or tooltip wrappers when disabled", () => {
    const { container } = render(
      <BarChart
        data={completeBarGroupedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeBarGroupedSeries}
        withLegend={false}
        withTooltip={false}
      />
    );

    expect(container.querySelector(".recharts-legend-wrapper")).toBeNull();
    expect(container.querySelector(".recharts-tooltip-wrapper")).toBeNull();
  });

  it("passes Recharts v3 tooltip props through", () => {
    const { container } = render(
      <BarChart
        data={completeBarGroupedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeBarGroupedSeries}
        tooltipProps={{
          defaultIndex: 0,
          shared: true,
          trigger: "click",
        }}
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
  });

  it("renders bars in vertical layout with categorical y-axis", () => {
    const { container } = render(
      <BarChart
        barChartProps={{ layout: "vertical" }}
        data={[
          { enterprise: 420, region: "North America", smb: 580 },
          { enterprise: 360, region: "Europe", smb: 490 },
        ]}
        dataKey="region"
        responsiveContainerProps={chartSize}
        series={[
          { key: "enterprise", label: "Enterprise" },
          { key: "smb", label: "SMB" },
        ]}
        xAxisProps={{ type: "number" }}
        yAxisProps={{ type: "category" }}
      />
    );

    expect(
      container.querySelectorAll(".recharts-bar-rectangle").length
    ).toBeGreaterThan(0);
  });

  it("does not apply numeric value formatting to vertical category y-axis labels", () => {
    render(
      <BarChart
        barChartProps={{ layout: "vertical" }}
        data={[
          { bucket: "1000", enterprise: 420, smb: 580 },
          { bucket: "1200", enterprise: 360, smb: 490 },
        ]}
        dataKey="bucket"
        responsiveContainerProps={chartSize}
        series={[
          { key: "enterprise", label: "Enterprise" },
          { key: "smb", label: "SMB" },
        ]}
        valueFormatter={verticalCategoryValueFormatter}
        xAxisProps={{ type: "number" }}
        yAxisProps={{ type: "category" }}
      />
    );

    expect(screen.queryAllByText("1000").length).toBeGreaterThan(0);
    expect(screen.queryByText("VALUE:1000")).toBeNull();
  });

  it("resolves grouped bars to rounded radius defaults", () => {
    expect(
      resolveDefaultBarRadius([{ stackId: undefined }, { stackId: undefined }])
    ).toBe(6);
  });

  it("resolves stacked bars to square radius defaults", () => {
    expect(
      resolveDefaultBarRadius([{ stackId: "acq" }, { stackId: "acq" }])
    ).toBe(0);
  });

  it("lets explicit radius override stacked defaults deterministically", () => {
    expect(
      resolveDefaultBarRadius([{ stackId: "acq" }, { stackId: "acq" }], 9)
    ).toBe(9);
  });

  it("applies barProps object overrides to all bars", () => {
    const { container } = render(
      <BarChart
        barProps={{ className: "bar-props-object" }}
        data={completeBarGroupedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeBarGroupedSeries}
      />
    );

    expect(
      container.querySelectorAll(".bar-props-object").length
    ).toBeGreaterThan(0);
  });

  it("applies barProps callback overrides per series", () => {
    const callbackSeriesKeys: string[] = [];
    const barPropsBySeries = createBarPropsBySeries(callbackSeriesKeys);
    const { container } = render(
      <BarChart
        barProps={barPropsBySeries}
        data={completeBarGroupedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeBarGroupedSeries}
      />
    );

    expect(callbackSeriesKeys).toEqual(["organic", "paid"]);
    expect(container.querySelector(".bar-props-series-organic")).not.toBeNull();
    expect(container.querySelector(".bar-props-series-paid")).not.toBeNull();
  });

  it("removes cartesian grid when gridAxis is none", () => {
    const { container } = render(
      <BarChart
        data={completeBarGroupedData}
        dataKey="month"
        gridAxis="none"
        responsiveContainerProps={chartSize}
        series={completeBarGroupedSeries}
      />
    );

    expect(container.querySelector(".recharts-cartesian-grid")).toBeNull();
  });

  it("removes x and y axes when toggles are disabled", () => {
    const { container } = render(
      <BarChart
        data={completeBarGroupedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeBarGroupedSeries}
        withXAxis={false}
        withYAxis={false}
      />
    );

    expect(container.querySelectorAll(".recharts-xAxis").length).toBe(0);
    expect(container.querySelectorAll(".recharts-yAxis").length).toBe(0);
  });

  it("renders negative values with a zero baseline reference line", () => {
    const { container } = render(
      <BarChart
        data={completeBarNegativeData}
        dataKey="month"
        referenceLines={[{ label: "Zero Baseline", y: 0 }]}
        responsiveContainerProps={chartSize}
        series={completeBarNegativeSeries}
      />
    );

    expect(container.querySelectorAll(".recharts-reference-line").length).toBe(
      1
    );
    expect(screen.queryByText("Zero Baseline")).not.toBeNull();
  });

  it("maps y-axis formatters to left and right axis ids", () => {
    render(
      <BarChart
        data={completeBarDualAxisData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        rightYAxisProps={{ ticks: [1006], width: 64, yAxisId: "right-axis" }}
        series={completeBarDualAxisSeries}
        valueFormatter={barAxisAwareFormatter}
        withRightYAxis
        yAxisProps={{ ticks: [41_000], width: 64, yAxisId: "left-axis" }}
      />
    );

    expect(screen.queryAllByText("spend:41000").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("leads:1006").length).toBeGreaterThan(0);
  });

  it("keeps explicit y-axis tickFormatter overrides as highest precedence", () => {
    render(
      <BarChart
        data={completeBarDualAxisData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        rightYAxisProps={{
          tickFormatter: (value) => `right:${value}`,
          ticks: [1006],
          yAxisId: "right-axis",
        }}
        series={completeBarDualAxisSeries}
        valueFormatter={barAxisAwareFormatter}
        withRightYAxis
        yAxisProps={{
          tickFormatter: (value) => `left:${value}`,
          ticks: [41_000],
          yAxisId: "left-axis",
        }}
      />
    );

    expect(screen.queryAllByText("left:41000").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("right:1006").length).toBeGreaterThan(0);
    expect(screen.queryByText("spend:41000")).toBeNull();
    expect(screen.queryByText("leads:1006")).toBeNull();
  });

  it("formats y-axis labels as percentages when type is percent", () => {
    render(
      <BarChart
        data={completeBarGroupedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeBarGroupedSeries}
        type="percent"
        yAxisProps={{ ticks: [0, 0.5, 1], width: 64 }}
      />
    );

    expect(screen.queryAllByText("50%").length).toBeGreaterThan(0);
  });

  it("uses row datum metadata in bar value labels", async () => {
    render(
      <BarChart
        data={[
          { cohort: "alpha", month: "Jan", organic: 320, paid: 180 },
          { cohort: "beta", month: "Feb", organic: 360, paid: 210 },
        ]}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeBarGroupedSeries}
        valueFormatter={barValueLabelWithDatumFormatter}
        withBarValueLabel
      />
    );

    await waitFor(() => {
      expect(screen.queryAllByText("organic:beta:360").length).toBeGreaterThan(
        0
      );
      expect(screen.queryAllByText("paid:beta:210").length).toBeGreaterThan(0);
    });
  });

  it("transforms waterfall data internally for negative and standalone rows", () => {
    const waterfallSource = [
      { month: "Jan", net: 100 },
      { month: "Feb", net: -30 },
      { month: "Mar", net: 50, standalone: true },
    ] as const;
    const transformed = calculateWaterfallData({
      data: waterfallSource,
      dataKey: "month",
      series: [{ name: "net" }],
    });

    expect(transformed[0]?.net as unknown).toEqual([0, 100]);
    expect(transformed[1]?.net as unknown).toEqual([100, 70]);
    expect(transformed[2]?.net as unknown).toEqual([0, 50]);

    const { container } = render(
      <BarChart
        data={waterfallSource}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={[{ label: "Net", name: "net" }]}
        type="waterfall"
        withBarValueLabel
      />
    );

    expect(
      container.querySelectorAll(".recharts-bar-rectangle").length
    ).toBeGreaterThan(0);
  });

  it("uses accessible semantic waterfall colors by default when getBarColor is omitted", async () => {
    const { container } = render(
      <BarChart
        data={[
          { month: "Jan", net: 120 },
          { month: "Feb", net: -90 },
        ]}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={[{ label: "Net", name: "net" }]}
        type="waterfall"
      />
    );

    await waitFor(() => {
      expect(
        container.querySelector('[fill="var(--color-success-foreground)"]')
      ).not.toBeNull();
      expect(
        container.querySelector('[fill="var(--color-danger-foreground)"]')
      ).not.toBeNull();
    });
  });

  it("supports per-datum dynamic bar colors via getBarColor", () => {
    const observedValues: number[] = [];
    const getBarColorBySign = createObservedBarColorResolver(observedValues);

    const { container } = render(
      <BarChart
        data={[
          { month: "Jan", net: 120 },
          { month: "Feb", net: -90 },
        ]}
        dataKey="month"
        getBarColor={getBarColorBySign}
        responsiveContainerProps={chartSize}
        series={[{ label: "Net", name: "net" }]}
      />
    );

    expect(observedValues).toContain(120);
    expect(observedValues).toContain(-90);
    expect(
      container.querySelectorAll(".recharts-bar-rectangle").length
    ).toBeGreaterThan(0);
  });

  it("re-renders bars on legend hover when highlighting is enabled", () => {
    const callbackSeriesKeys: string[] = [];
    const barPropsBySeries = createBarPropsBySeries(callbackSeriesKeys);
    render(
      <BarChart
        barProps={barPropsBySeries}
        data={completeBarGroupedData}
        dataKey="month"
        responsiveContainerProps={chartSize}
        series={completeBarGroupedSeries}
        withLegend
      />
    );
    const initialInvocationCount = callbackSeriesKeys.length;

    fireEvent.mouseEnter(screen.getByText("Organic"));

    expect(callbackSeriesKeys.length).toBeGreaterThan(initialInvocationCount);
  });

  it("does not re-render bars on legend hover when highlighting is disabled", () => {
    const callbackSeriesKeys: string[] = [];
    const barPropsBySeries = createBarPropsBySeries(callbackSeriesKeys);
    render(
      <BarChart
        barProps={barPropsBySeries}
        data={completeBarGroupedData}
        dataKey="month"
        enableLegendHighlight={false}
        responsiveContainerProps={chartSize}
        series={completeBarGroupedSeries}
        withLegend
      />
    );
    const initialInvocationCount = callbackSeriesKeys.length;

    fireEvent.mouseEnter(screen.getByText("Organic"));

    expect(callbackSeriesKeys.length).toBe(initialInvocationCount);
  });
});
