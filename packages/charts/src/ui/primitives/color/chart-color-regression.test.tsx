import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render } from "@testing-library/react";

import { Chart } from "../chart";
import {
  createSeriesColorRegistry,
  getStyleDeclarationsForTheme,
  normalizeChartColor,
  resolveSeriesColorExpression,
} from "./chart-color-resolver";

afterEach(cleanup);

describe("Chart color regression", () => {
  it("normalizes chart color values by trimming only", () => {
    expect(normalizeChartColor("hsl(var(--kb-chart-1))")).toBe(
      "hsl(var(--kb-chart-1))"
    );
    expect(normalizeChartColor("hsl(var(--color-chart-2))")).toBe(
      "hsl(var(--color-chart-2))"
    );
    expect(normalizeChartColor("oklch(0.56 0.12 150)")).toBe(
      "oklch(0.56 0.12 150)"
    );
  });

  it("creates safe color variables with deterministic keys", () => {
    const registry = createSeriesColorRegistry({
      "Revenue Total": { color: "hsl(var(--kb-chart-1))" },
      revenue_total: { color: "var(--color-chart-2)" },
    });

    expect(registry.byKey["Revenue Total"]?.varName).toBe(
      "--color-revenue-total"
    );
    expect(registry.byKey.revenue_total?.varName).toBe(
      "--color-revenue-total-2"
    );
    expect(registry.byKey["Revenue Total"]?.colorByTheme.light).toBe(
      "hsl(var(--kb-chart-1))"
    );
  });

  it("prioritizes theme light/dark colors", () => {
    const registry = createSeriesColorRegistry({
      revenue: {
        theme: {
          dark: "var(--color-chart-4)",
          light: "hsl(var(--kb-chart-3))",
        },
      },
    });

    expect(registry.byKey.revenue?.colorByTheme.light).toBe(
      "hsl(var(--kb-chart-3))"
    );
    expect(registry.byKey.revenue?.colorByTheme.dark).toBe(
      "var(--color-chart-4)"
    );

    expect(getStyleDeclarationsForTheme(registry, "light")).toEqual([
      "  --color-revenue: hsl(var(--kb-chart-3));",
    ]);
    expect(getStyleDeclarationsForTheme(registry, "dark")).toEqual([
      "  --color-revenue: var(--color-chart-4);",
    ]);
  });

  it("cycles fallback colors deterministically for six series", () => {
    const registry = createSeriesColorRegistry({
      alpha: {},
      beta: {},
      gamma: {},
      delta: {},
      epsilon: {},
      zeta: {},
    });

    expect(registry.byKey.alpha?.colorByTheme.light).toBe(
      "var(--color-chart-1)"
    );
    expect(registry.byKey.epsilon?.colorByTheme.light).toBe(
      "var(--color-chart-5)"
    );
    expect(registry.byKey.zeta?.colorByTheme.light).toBe(
      "var(--color-chart-1)"
    );
  });

  it("falls back to deterministic chart tokens when config colors are unsafe", () => {
    const registry = createSeriesColorRegistry({
      revenue: { color: "var(--color-chart-4);background:red" },
      visits: { color: "rgb(11, 22, 33)\nvar(--color-chart-3)" },
    });

    const lightDeclarations = getStyleDeclarationsForTheme(registry, "light");
    const styleContent = lightDeclarations.join("\n");

    expect(registry.byKey.revenue?.colorByTheme.light).toBe(
      "var(--color-chart-1)"
    );
    expect(registry.byKey.visits?.colorByTheme.light).toBe(
      "var(--color-chart-2)"
    );
    expect(styleContent.includes("background:red")).toBe(false);
    expect(styleContent.includes("rgb(11, 22, 33)\n")).toBe(false);
    expect(
      styleContent.includes("--color-revenue: var(--color-chart-1);")
    ).toBe(true);
    expect(styleContent.includes("--color-visits: var(--color-chart-2);")).toBe(
      true
    );
  });

  it("preserves valid color expressions in style declarations", () => {
    const registry = createSeriesColorRegistry({
      cssvar: { color: "var(--brand-chart-color)" },
      oklch: { color: "oklch(0.56 0.12 150)" },
      rgb: { color: "rgb(11, 22, 33)" },
      hex: { color: "#1A2B3C" },
      named: { color: "rebeccapurple" },
    });

    const styleContent = getStyleDeclarationsForTheme(registry, "light").join(
      "\n"
    );

    expect(
      styleContent.includes("--color-cssvar: var(--brand-chart-color);")
    ).toBe(true);
    expect(styleContent.includes("--color-oklch: oklch(0.56 0.12 150);")).toBe(
      true
    );
    expect(styleContent.includes("--color-rgb: rgb(11, 22, 33);")).toBe(true);
    expect(styleContent.includes("--color-hex: #1A2B3C;")).toBe(true);
    expect(styleContent.includes("--color-named: rebeccapurple;")).toBe(true);
  });

  it("keeps valid non-token css colors unchanged during expression resolution", () => {
    const registry = createSeriesColorRegistry({
      revenue: { color: "var(--color-chart-1)" },
    });

    expect(
      resolveSeriesColorExpression({
        chartId: "chart-color-regression",
        registry,
        value: "rgb(11, 22, 33)",
      })
    ).toBe("rgb(11, 22, 33)");
  });

  it("resolves scoped series variables against dark theme tokens", () => {
    const registry = createSeriesColorRegistry({
      revenue: {
        theme: {
          dark: "var(--color-chart-5)",
          light: "var(--color-chart-2)",
        },
      },
    });
    document.documentElement.classList.add("dark");

    try {
      expect(
        resolveSeriesColorExpression({
          chartId: "chart-color-dark-theme",
          registry,
          value: "var(--color-revenue)",
        })
      ).toBe("var(--color-chart-5)");
    } finally {
      document.documentElement.classList.remove("dark");
    }
  });

  it("uses chart node ancestry to resolve fallback series color by theme", () => {
    const chartId = "chart-color-theme-from-dom";
    const registry = createSeriesColorRegistry({
      revenue: {
        theme: {
          dark: "var(--color-chart-4)",
          light: "var(--color-chart-1)",
        },
      },
    });
    const darkContainer = document.createElement("div");
    darkContainer.className = "dark";
    const chartNode = document.createElement("div");
    chartNode.dataset.chart = chartId;
    darkContainer.append(chartNode);
    document.body.append(darkContainer);

    try {
      expect(
        resolveSeriesColorExpression({
          chartId,
          fallbackSeriesKey: "revenue",
          registry,
          value: undefined,
        })
      ).toBe("var(--color-chart-4)");
    } finally {
      darkContainer.remove();
    }
  });

  it("injects css variable declarations through Chart.Root", () => {
    const { container } = render(
      <Chart.Root
        config={{
          visits: { color: "hsl(var(--kb-chart-1))", label: "Visits" },
        }}
      >
        <div />
      </Chart.Root>
    );

    const styleTag = container.querySelector("style");

    expect(styleTag).not.toBeNull();
    expect(
      styleTag?.textContent?.includes("--color-visits: hsl(var(--kb-chart-1));")
    ).toBe(true);
    expect(styleTag?.textContent?.includes("hsl(var(--kb-chart-1))")).toBe(
      true
    );
  });
});
