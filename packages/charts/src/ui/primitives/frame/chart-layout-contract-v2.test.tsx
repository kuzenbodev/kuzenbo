import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render } from "@testing-library/react";

import { Chart } from "../chart";

afterEach(cleanup);

describe("Chart layout contract v2", () => {
  it("uses the new frame defaults without forcing aspect-video", () => {
    const { container } = render(
      <Chart.Root config={{ visits: { color: "var(--color-chart-1)" } }}>
        <div />
      </Chart.Root>
    );

    const chartRoot = container.querySelector(
      "[data-slot='chart']"
    ) as HTMLElement;

    expect(chartRoot.className).toContain("w-full");
    expect(chartRoot.className).toContain("min-h-[240px]");
    expect(chartRoot.className).toContain("text-xs");
    expect(chartRoot.className).toContain(
      "[&_.recharts-surface]:outline-hidden"
    );
    expect(chartRoot.className).not.toContain("aspect-video");
  });

  it("supports opting out of ResponsiveContainer with autoSize=none", () => {
    const { container } = render(
      <Chart.Root
        autoSize="none"
        config={{ visits: { color: "var(--color-chart-1)" } }}
      >
        <div data-testid="chart-content" />
      </Chart.Root>
    );

    expect(
      container.querySelector(".recharts-responsive-container")
    ).toBeNull();
    expect(
      container.querySelector("[data-testid='chart-content']")
    ).not.toBeNull();
  });
});
