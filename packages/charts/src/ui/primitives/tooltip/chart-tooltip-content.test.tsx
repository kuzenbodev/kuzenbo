import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render } from "@testing-library/react";

import type { UISize } from "../legend/chart-size";
import { ChartProvider } from "../provider/chart-provider";
import type { ChartConfig } from "../types/chart-types";
import { ChartTooltipContent } from "./chart-tooltip-content";

afterEach(cleanup);

const chartConfig: ChartConfig = {
  value: {
    color: "var(--color-chart-1)",
    label: "Value",
  },
};

const tooltipPayload = [
  {
    color: "#22c55e",
    dataKey: "value",
    name: "Value",
    payload: {
      fill: "#22c55e",
      value: 42,
    },
    value: 42,
  },
] as const;

const renderTooltip = ({
  indicator,
  size,
}: {
  indicator?: "line" | "dot" | "dashed";
  size?: UISize;
} = {}) =>
  render(
    <ChartProvider config={chartConfig}>
      <ChartTooltipContent
        active
        indicator={indicator}
        label="Q1"
        payload={tooltipPayload}
        size={size}
      />
    </ChartProvider>
  );

describe("ChartTooltipContent size contract", () => {
  it("defaults to md size and marks tooltip root with data-size", () => {
    renderTooltip();

    const tooltip = document.querySelector(
      "[data-slot=chart-tooltip-content]"
    ) as HTMLElement;

    expect(tooltip).not.toBeNull();
    expect(tooltip.dataset.size).toBe("md");
    expect(tooltip.className).toContain("rounded-lg");
    expect(tooltip.className).toContain("px-2.5");
  });

  it("applies xs sizing classes when size is xs", () => {
    renderTooltip({ size: "xs" });

    const tooltip = document.querySelector(
      "[data-slot=chart-tooltip-content]"
    ) as HTMLElement;
    const indicator = tooltip.querySelector(
      "[style*='--color-bg']"
    ) as HTMLElement;

    expect(tooltip.dataset.size).toBe("xs");
    expect(tooltip.className).toContain("rounded-md");
    expect(tooltip.className).toContain("px-2");
    expect(indicator.className).toContain("h-2");
    expect(indicator.className).toContain("w-2");
  });

  it("scales line indicator width for xl size", () => {
    renderTooltip({
      indicator: "line",
      size: "xl",
    });

    const tooltip = document.querySelector(
      "[data-slot=chart-tooltip-content]"
    ) as HTMLElement;
    const indicator = tooltip.querySelector(
      "[style*='--color-bg']"
    ) as HTMLElement;

    expect(tooltip.dataset.size).toBe("xl");
    expect(tooltip.className).toContain("rounded-xl");
    expect(indicator.className).toContain("w-2");
  });
});
