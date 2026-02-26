import { cleanup, render, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { Chart } from "../chart";

afterEach(cleanup);

const data = [{ name: "Jan", visits: 100, revenue: 3200 }];
const chartConfig = {
  visits: { label: "Visits", color: "var(--color-chart-1)" },
  revenue: { label: "Revenue", color: "var(--color-chart-2)" },
};

const getStyleTagContent = (container: HTMLElement) => {
  const styleTag = container.querySelector("style");
  return styleTag instanceof HTMLStyleElement
    ? (styleTag.textContent ?? "")
    : "";
};

const countMatches = (content: string, pattern: RegExp) => {
  const matches = content.match(pattern);
  return Array.isArray(matches) ? matches.length : 0;
};

describe("Chart style contracts", () => {
  it("keeps root wrapper style markers", () => {
    const { container } = render(
      <Chart.Root config={chartConfig}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="visits" fill="var(--color-visits)" />
        </BarChart>
      </Chart.Root>
    );

    const root = container.querySelector("[data-slot=chart]") as HTMLElement;

    expect(root.className).toContain("w-full");
    expect(root.className).toContain("min-h-[240px]");
    expect(root.className).toContain("text-xs");
  });

  it("merges custom className with default style contract", () => {
    const { container } = render(
      <Chart.Root className="custom-chart-shell" config={chartConfig}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="visits" fill="var(--color-visits)" />
        </BarChart>
      </Chart.Root>
    );

    const root = container.querySelector("[data-slot=chart]") as HTMLElement;

    expect(root.className).toContain("custom-chart-shell");
    expect(root.className).toContain("min-h-[240px]");
  });

  it("keeps style injection stable for multi-series config without unsafe duplicates", () => {
    const { container } = render(
      <Chart.Root
        config={{
          "Revenue Total": { color: "hsl(var(--kb-chart-1))" },
          revenue_total: { color: "var(--color-chart-2)" },
          visits: {},
        }}
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="visits" fill="var(--color-visits)" />
        </BarChart>
      </Chart.Root>
    );

    const styleTag = container.querySelector("style");
    const styleContent = getStyleTagContent(container);
    const revenueVarMatchCount = countMatches(
      styleContent,
      /--color-revenue-total:/g
    );

    expect(styleTag).not.toBeNull();
    expect(styleContent.includes("hsl(var(--kb-chart-1))")).toBe(true);
    expect(
      styleContent.includes("--color-revenue-total: hsl(var(--kb-chart-1));")
    ).toBe(true);
    expect(revenueVarMatchCount).toBe(2);
  });

  it("asserts legend labels without relying on item order", () => {
    const legendPayload = [
      {
        color: "var(--color-chart-2)",
        dataKey: "revenue",
        type: "line" as const,
        value: "revenue",
      },
      {
        color: "var(--color-chart-1)",
        dataKey: "visits",
        type: "line" as const,
        value: "visits",
      },
    ];

    const { container } = render(
      <Chart.Provider config={chartConfig}>
        <Chart.LegendContent payload={legendPayload} />
      </Chart.Provider>
    );

    const view = within(container);

    expect(view.queryByText("Visits")).not.toBeNull();
    expect(view.queryByText("Revenue")).not.toBeNull();
  });
});
