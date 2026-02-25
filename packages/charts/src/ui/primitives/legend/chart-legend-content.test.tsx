import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, mock } from "bun:test";

import { ChartProvider } from "../provider/chart-provider";
import { ChartLegendContent } from "./chart-legend-content";

afterEach(cleanup);

const chartConfig = {
  visits: { color: "var(--color-chart-1)", label: "Visits" },
};

const legendPayload = [
  {
    color: "var(--color-chart-1)",
    dataKey: "visits",
    type: "line" as const,
    value: "visits",
  },
];

describe("ChartLegendContent size contract", () => {
  it("defaults to md surface sizing", () => {
    const { container } = render(
      <ChartProvider config={chartConfig}>
        <ChartLegendContent payload={legendPayload} />
      </ChartProvider>
    );

    const root = container.querySelector(
      "[data-slot=chart-legend-content]"
    ) as HTMLElement;
    const item = container.querySelector(
      "[data-slot=chart-legend-item]"
    ) as HTMLElement;
    const swatch = container.querySelector(
      '[data-slot=chart-legend-item] div[style*="background-color"]'
    ) as HTMLElement;

    expect(root.dataset.size).toBe("md");
    expect(root.className).toContain("gap-4");
    expect(item.className).toContain("[&>svg]:h-3");
    expect(swatch.className).toContain("h-2");
    expect(screen.getByText("Visits")).toBeDefined();
  });

  it("supports compact and expanded legend sizes", () => {
    const { container, rerender } = render(
      <ChartProvider config={chartConfig}>
        <ChartLegendContent payload={legendPayload} size="xs" />
      </ChartProvider>
    );

    const xsRoot = container.querySelector(
      "[data-slot=chart-legend-content]"
    ) as HTMLElement;
    const xsItem = container.querySelector(
      "[data-slot=chart-legend-item]"
    ) as HTMLElement;
    const xsSwatch = container.querySelector(
      '[data-slot=chart-legend-item] div[style*="background-color"]'
    ) as HTMLElement;

    expect(xsRoot.dataset.size).toBe("xs");
    expect(xsRoot.className).toContain("gap-2");
    expect(xsItem.className).toContain("[&>svg]:h-2.5");
    expect(xsSwatch.className).toContain("h-1.5");

    rerender(
      <ChartProvider config={chartConfig}>
        <ChartLegendContent payload={legendPayload} size="xl" />
      </ChartProvider>
    );

    const xlRoot = container.querySelector(
      "[data-slot=chart-legend-content]"
    ) as HTMLElement;
    const xlItem = container.querySelector(
      "[data-slot=chart-legend-item]"
    ) as HTMLElement;
    const xlSwatch = container.querySelector(
      '[data-slot=chart-legend-item] div[style*="background-color"]'
    ) as HTMLElement;

    expect(xlRoot.dataset.size).toBe("xl");
    expect(xlRoot.className).toContain("gap-6");
    expect(xlItem.className).toContain("[&>svg]:h-4");
    expect(xlSwatch.className).toContain("h-3");
  });

  it("supports keyboard-focus highlight lifecycle for legend items", () => {
    const onHighlightChange = mock<(seriesName: string | null) => void>();

    render(
      <ChartProvider config={chartConfig}>
        <ChartLegendContent
          onHighlightChange={onHighlightChange}
          payload={legendPayload}
        />
      </ChartProvider>
    );

    const legendItem = screen.getByRole("button", { name: "Visits" });

    fireEvent.focus(legendItem);
    expect(onHighlightChange).toHaveBeenLastCalledWith("visits");

    fireEvent.blur(legendItem);
    expect(onHighlightChange).toHaveBeenLastCalledWith(null);
  });
});
