import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render } from "@testing-library/react";

import { Chart } from "../chart";

afterEach(cleanup);

const getElementStyleAttribute = (element: Element) =>
  element instanceof HTMLElement ? (element.getAttribute("style") ?? "") : "";

const getIndicatorStyleValues = (container: HTMLElement, selector: string) =>
  [...container.querySelectorAll(selector)].map((element) =>
    getElementStyleAttribute(element)
  );

describe("Chart portal color safety", () => {
  it("resolves legend indicator colors away from scoped series variables", () => {
    const { container } = render(
      <Chart.Provider
        config={{
          visits: { color: "var(--color-chart-1)", label: "Visits" },
        }}
      >
        <Chart.LegendContent
          payload={[
            {
              color: "var(--color-visits)",
              dataKey: "visits",
              type: "line",
              value: "visits",
            },
          ]}
        />
      </Chart.Provider>
    );

    const indicator = container.querySelector(
      "[style*='background-color']"
    ) as HTMLElement | null;

    expect(indicator).not.toBeNull();
    const indicatorStyle = getElementStyleAttribute(indicator as HTMLElement);

    expect(indicatorStyle).not.toContain("--color-visits");
    expect(indicatorStyle).toContain("var(--color-chart-1)");
  });

  it("resolves tooltip indicators to a chart-token color", () => {
    const { container } = render(
      <Chart.Provider
        config={{
          visits: { color: "var(--color-chart-1)", label: "Visits" },
        }}
      >
        <Chart.TooltipContent
          active
          payload={[
            {
              color: "var(--color-visits)",
              dataKey: "visits",
              name: "visits",
              payload: { visits: 120 },
              type: "line",
              value: 120,
            },
          ]}
        />
      </Chart.Provider>
    );

    const indicator = container.querySelector(
      "[style*='--color-bg']"
    ) as HTMLElement | null;

    expect(indicator).not.toBeNull();
    const indicatorStyle = getElementStyleAttribute(indicator as HTMLElement);

    expect(indicatorStyle).not.toContain("--color-visits");
    expect(indicatorStyle).toContain("var(--color-chart-1)");
  });

  it("resolves tooltip indicator color tokens for each payload row", () => {
    const { container } = render(
      <Chart.Provider
        config={{
          trials: {
            label: "Trials",
            theme: {
              dark: "var(--color-chart-5)",
              light: "var(--color-chart-4)",
            },
          },
          visits: { color: "var(--color-chart-1)", label: "Visits" },
        }}
      >
        <Chart.TooltipContent
          active
          payload={[
            {
              color: "var(--color-visits)",
              dataKey: "visits",
              name: "visits",
              payload: { visits: 120 },
              type: "line",
              value: 120,
            },
            {
              color: "var(--color-trials)",
              dataKey: "trials",
              name: "trials",
              payload: { trials: 42 },
              type: "line",
              value: 42,
            },
          ]}
        />
      </Chart.Provider>
    );

    const indicators = [
      ...container.querySelectorAll("[style*='--color-bg']"),
    ] as HTMLElement[];
    const indicatorStyles = getIndicatorStyleValues(
      container,
      "[style*='--color-bg']"
    );

    expect(indicators.length).toBe(2);
    for (const indicator of indicators) {
      const styleValue = getElementStyleAttribute(indicator);
      expect(styleValue.includes("--color-visits")).toBe(false);
      expect(styleValue.includes("--color-trials")).toBe(false);
    }
    expect(
      indicatorStyles.some((styleValue) =>
        styleValue.includes("var(--color-chart-1)")
      )
    ).toBe(true);
    expect(
      indicatorStyles.some((styleValue) =>
        styleValue.includes("var(--color-chart-4)")
      )
    ).toBe(true);
  });

  it("keeps legend indicator color resolution stable for mixed inputs", () => {
    const { container } = render(
      <Chart.Provider
        config={{
          revenue: {
            label: "Revenue",
            theme: {
              dark: "var(--color-chart-4)",
              light: "var(--color-chart-2)",
            },
          },
          trials: { color: "var(--color-chart-3)", label: "Trials" },
          visits: { label: "Visits" },
        }}
      >
        <Chart.LegendContent
          payload={[
            {
              color: "var(--color-revenue)",
              dataKey: "revenue",
              type: "line",
              value: "revenue",
            },
            {
              color: "var(--color-trials)",
              dataKey: "trials",
              type: "line",
              value: "trials",
            },
            {
              dataKey: "visits",
              type: "line",
              value: "visits",
            },
          ]}
        />
      </Chart.Provider>
    );

    const indicators = [
      ...container.querySelectorAll("[style*='background-color']"),
    ] as HTMLElement[];
    const indicatorStyles = getIndicatorStyleValues(
      container,
      "[style*='background-color']"
    );

    expect(indicators.length).toBe(3);
    for (const indicator of indicators) {
      const styleValue = getElementStyleAttribute(indicator);
      expect(styleValue.includes("--color-revenue")).toBe(false);
      expect(styleValue.includes("--color-trials")).toBe(false);
    }
    expect(
      indicatorStyles.some((styleValue) =>
        styleValue.includes("var(--color-chart-2)")
      )
    ).toBe(true);
    expect(
      indicatorStyles.some((styleValue) =>
        styleValue.includes("var(--color-chart-3)")
      )
    ).toBe(true);
  });
});
