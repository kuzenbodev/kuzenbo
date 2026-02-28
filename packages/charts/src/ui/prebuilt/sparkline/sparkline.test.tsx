import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render } from "@testing-library/react";

import { DEFAULT_TREND_COLORS } from "./hooks/use-sparkline-runtime";
import { Sparkline } from "./sparkline";
import {
  sparklineDowntrendWithNullsData,
  sparklineFlatTrendData,
  sparklineUptrendData,
} from "./sparkline-test-data";

afterEach(cleanup);

const chartSize = { height: 160, width: 420 };

describe("Sparkline", () => {
  it("renders a minimal area chart surface", () => {
    const { container } = render(
      <Sparkline
        data={sparklineUptrendData}
        dataKey="day"
        responsiveContainerProps={chartSize}
        valueKey="value"
      />
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
    expect(container.querySelector(".recharts-area")).not.toBeNull();
  });

  it("resolves trend direction for up/down/flat datasets", () => {
    const { container: upContainer } = render(
      <Sparkline
        data={sparklineUptrendData}
        dataKey="day"
        responsiveContainerProps={chartSize}
        valueKey="value"
      />
    );
    const { container: downContainer } = render(
      <Sparkline
        data={sparklineDowntrendWithNullsData}
        dataKey="day"
        responsiveContainerProps={chartSize}
        valueKey="value"
      />
    );
    const { container: flatContainer } = render(
      <Sparkline
        data={sparklineFlatTrendData}
        dataKey="day"
        responsiveContainerProps={chartSize}
        valueKey="value"
      />
    );

    expect(
      upContainer.querySelector("[data-trend-direction='up']")
    ).not.toBeNull();
    expect(
      downContainer.querySelector("[data-trend-direction='down']")
    ).not.toBeNull();
    expect(
      flatContainer.querySelector("[data-trend-direction='flat']")
    ).not.toBeNull();
  });

  it("uses accessible semantic trend colors by default", () => {
    expect(DEFAULT_TREND_COLORS.up).toBe("var(--color-success-foreground)");
    expect(DEFAULT_TREND_COLORS.down).toBe("var(--color-danger-foreground)");
  });

  it("disables gradient defs when withGradient is false", () => {
    const { container } = render(
      <Sparkline
        data={sparklineUptrendData}
        dataKey="day"
        responsiveContainerProps={chartSize}
        valueKey="value"
        withGradient={false}
      />
    );

    expect(container.querySelector("linearGradient")).toBeNull();

    const areaShape = container.querySelector(".recharts-area-area");
    expect(areaShape).not.toBeNull();
    const areaFill = (areaShape as Element).getAttribute("fill");
    expect(areaFill).not.toBeNull();

    expect((areaFill as string).startsWith("url(#")).toBe(false);
  });

  it("supports custom curve types", () => {
    const { container: defaultContainer } = render(
      <Sparkline
        data={sparklineUptrendData}
        dataKey="day"
        responsiveContainerProps={chartSize}
        valueKey="value"
      />
    );
    const { container: stepContainer } = render(
      <Sparkline
        curveType="stepAfter"
        data={sparklineUptrendData}
        dataKey="day"
        responsiveContainerProps={chartSize}
        valueKey="value"
      />
    );
    const defaultAreaPath = defaultContainer.querySelector(
      ".recharts-area-area"
    );
    const stepAreaPath = stepContainer.querySelector(".recharts-area-area");

    expect(defaultAreaPath).not.toBeNull();
    expect(stepAreaPath).not.toBeNull();
    const defaultPathDefinition = (defaultAreaPath as Element).getAttribute(
      "d"
    );
    const stepPathDefinition = (stepAreaPath as Element).getAttribute("d");
    expect(defaultPathDefinition).not.toBeNull();
    expect(stepPathDefinition).not.toBeNull();
    expect(defaultPathDefinition).not.toBe(stepPathDefinition);
  });

  it("keeps gap segments when connectNulls is false", () => {
    const { container } = render(
      <Sparkline
        connectNulls={false}
        data={sparklineDowntrendWithNullsData}
        dataKey="day"
        responsiveContainerProps={chartSize}
        valueKey="value"
      />
    );

    const strokePath = container.querySelector(".recharts-area-curve");
    expect(strokePath).not.toBeNull();
    const strokePathDefinition = (strokePath as Element).getAttribute("d");
    expect(strokePathDefinition).not.toBeNull();
    const moveCommandCount =
      (strokePathDefinition as string).split("M").length - 1;
    expect(moveCommandCount).toBeGreaterThan(1);
  });
});
