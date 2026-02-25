import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { BubbleChart } from "./bubble-chart";
import { completeBubbleSeries } from "./bubble-chart-test-data";
import { createTooltipValueFormatter } from "./utils/create-tooltip-value-formatter";
import { resolveBubbleRange } from "./utils/resolve-bubble-range";

afterEach(cleanup);

const chartSize = { height: 320, width: 720 };
const bubbleXValueFormatter = (value: number | string): string => `x:${value}`;
const bubbleYValueFormatter = (value: number | string): string => `y:${value}`;
const bubbleLeftTickFormatter = (value: number | string): string =>
  `left:${value}`;
const bubbleRightTickFormatter = (value: number | string): string =>
  `right:${value}`;
const bubbleZValueFormatter = (value: number | string): string => `z:${value}`;
const bubblePointValueLabelFormatter = (value: number | string): string =>
  `V:${value}`;
const bubblePointValueLabelWithDatumFormatter = (
  value: number,
  _seriesKey: string,
  datum: Record<string, unknown>
) => `${typeof datum.cohort === "string" ? datum.cohort : ""}:${value}`;
const bubbleClassBySeries = {
  enterprise: "bubble-props-series-enterprise",
  smb: "bubble-props-series-smb",
} as const;
const getSeriesName = (seriesItem: { key?: string; name?: string }) =>
  seriesItem.name ?? seriesItem.key ?? "value";

const createBubblePropsBySeries =
  (callbackSeriesKeys: string[]) =>
  (seriesItem: { key?: string; name?: string }) => {
    const seriesName = getSeriesName(seriesItem);
    callbackSeriesKeys.push(seriesName);

    return {
      className:
        bubbleClassBySeries[seriesName as keyof typeof bubbleClassBySeries],
    };
  };

describe("Complete BubbleChart", () => {
  it("passes canonical bubbleChartProps through to Recharts", () => {
    const { container } = render(
      <BubbleChart
        bubbleChartProps={{ className: "bubble-chart-canonical-props" }}
        responsiveContainerProps={chartSize}
        series={completeBubbleSeries}
        xKey="satisfaction"
        yKey="velocity"
        zKey="volume"
      />
    );

    expect(
      container.querySelector(".bubble-chart-canonical-props")
    ).not.toBeNull();
  });

  it("keeps chartProps alias support during migration", () => {
    const { container } = render(
      <BubbleChart
        chartProps={{ className: "bubble-chart-legacy-props" }}
        responsiveContainerProps={chartSize}
        series={completeBubbleSeries}
        xKey="satisfaction"
        yKey="velocity"
        zKey="volume"
      />
    );

    expect(
      container.querySelector(".bubble-chart-legacy-props")
    ).not.toBeNull();
  });

  it("renders multi-series bubbles, z-axis, and chart root slot", () => {
    const { container } = render(
      <BubbleChart
        responsiveContainerProps={chartSize}
        series={completeBubbleSeries}
        withLegend
        xKey="satisfaction"
        yKey="velocity"
        zKey="volume"
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
      <BubbleChart
        responsiveContainerProps={chartSize}
        series={completeBubbleSeries}
        xKey="satisfaction"
        xValueFormatter={bubbleXValueFormatter}
        yKey="velocity"
        yValueFormatter={bubbleYValueFormatter}
        zKey="volume"
        xAxisProps={{ ticks: [72], width: 64 }}
        yAxisProps={{ ticks: [3.1], width: 64 }}
      />
    );

    expect(screen.queryAllByText("x:72").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("y:3.1").length).toBeGreaterThan(0);
  });

  it("keeps explicit axis tickFormatter overrides as highest precedence", () => {
    render(
      <BubbleChart
        responsiveContainerProps={chartSize}
        series={completeBubbleSeries}
        xKey="satisfaction"
        xValueFormatter={bubbleXValueFormatter}
        yKey="velocity"
        yValueFormatter={bubbleYValueFormatter}
        zKey="volume"
        xAxisProps={{
          tickFormatter: bubbleLeftTickFormatter,
          ticks: [72],
          width: 64,
        }}
        yAxisProps={{
          tickFormatter: bubbleRightTickFormatter,
          ticks: [3.1],
          width: 64,
        }}
      />
    );

    expect(screen.queryAllByText("left:72").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("right:3.1").length).toBeGreaterThan(0);
    expect(screen.queryByText("x:72")).toBeNull();
    expect(screen.queryByText("y:3.1")).toBeNull();
  });

  it("normalizes bubble range sizing values safely", () => {
    expect(resolveBubbleRange()).toEqual([80, 320]);
    expect(resolveBubbleRange([420, 40])).toEqual([40, 420]);
    expect(resolveBubbleRange([0, 120])).toEqual([1, 120]);
  });

  it("applies z formatter for tooltip values keyed by zKey", () => {
    const formatter = createTooltipValueFormatter({
      fallbackDatum: {
        satisfaction: 72,
        velocity: 3.1,
        volume: 140,
      },
      xKey: "satisfaction",
      yKey: "velocity",
      zKey: "volume",
      zValueFormatter: bubbleZValueFormatter,
    });

    expect(
      formatter(140, "volume", {
        satisfaction: 72,
        velocity: 3.1,
        volume: 140,
      })
    ).toBe("z:140");
  });

  it("supports point labels and reference lines", () => {
    const { container } = render(
      <BubbleChart
        pointLabelDataKey="volume"
        pointLabelFormatter={bubblePointValueLabelFormatter}
        referenceLines={[
          { label: "Satisfaction Goal", x: 80 },
          { label: "Velocity Goal", y: 3.5 },
        ]}
        responsiveContainerProps={chartSize}
        series={completeBubbleSeries}
        withPointLabels
        xKey="satisfaction"
        yKey="velocity"
        zKey="volume"
      />
    );

    expect(screen.queryAllByText("V:140").length).toBeGreaterThan(0);
    expect(container.querySelectorAll(".recharts-reference-line").length).toBe(
      2
    );
  });

  it("uses row datum metadata in point-label valueFormatter fallback", () => {
    render(
      <BubbleChart
        pointLabelDataKey="volume"
        responsiveContainerProps={chartSize}
        series={[
          {
            data: [
              {
                cohort: "enterprise-0",
                satisfaction: 72,
                velocity: 3.1,
                volume: 140,
              },
              {
                cohort: "enterprise-1",
                satisfaction: 78,
                velocity: 3.4,
                volume: 180,
              },
            ],
            label: "Enterprise",
            name: "enterprise",
          },
        ]}
        valueFormatter={bubblePointValueLabelWithDatumFormatter}
        withPointLabels
        xKey="satisfaction"
        yKey="velocity"
        zKey="volume"
      />
    );

    expect(screen.queryAllByText("enterprise-1:180").length).toBeGreaterThan(0);
  });

  it("passes Recharts v3 tooltip props through", () => {
    const { container } = render(
      <BubbleChart
        responsiveContainerProps={chartSize}
        series={completeBubbleSeries}
        tooltipProps={{ defaultIndex: 0, trigger: "click" }}
        withTooltip
        xKey="satisfaction"
        yKey="velocity"
        zKey="volume"
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
  });

  it("applies bubbleProps callback overrides per series", () => {
    const callbackSeriesKeys: string[] = [];
    const bubblePropsBySeries = createBubblePropsBySeries(callbackSeriesKeys);
    const { container } = render(
      <BubbleChart
        bubbleProps={bubblePropsBySeries}
        responsiveContainerProps={chartSize}
        series={completeBubbleSeries}
        xKey="satisfaction"
        yKey="velocity"
        zKey="volume"
      />
    );

    expect(callbackSeriesKeys).toEqual(["enterprise", "smb"]);
    expect(
      container.querySelector(".bubble-props-series-enterprise")
    ).not.toBeNull();
    expect(container.querySelector(".bubble-props-series-smb")).not.toBeNull();
  });

  it("dims non-highlighted series on legend hover by default", () => {
    const { container } = render(
      <BubbleChart
        responsiveContainerProps={chartSize}
        series={completeBubbleSeries}
        withLegend
        xKey="satisfaction"
        yKey="velocity"
        zKey="volume"
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
      <BubbleChart
        enableLegendHighlight={false}
        responsiveContainerProps={chartSize}
        series={completeBubbleSeries}
        withLegend
        xKey="satisfaction"
        yKey="velocity"
        zKey="volume"
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
});
