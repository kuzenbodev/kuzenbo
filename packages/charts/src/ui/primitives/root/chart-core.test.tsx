import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render } from "@testing-library/react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { Chart, useChartConfig } from "../chart";

afterEach(cleanup);

const data = [{ name: "A", value: 120 }];
const chartConfig = {
  value: { color: "var(--color-chart-1)", label: "Value" },
};

const getStyleTagContent = (container: HTMLElement) => {
  const styleTag = container.querySelector("style");
  return styleTag instanceof HTMLStyleElement
    ? (styleTag.textContent ?? "")
    : "";
};

const getChartFrameElement = (container: HTMLElement) => {
  const chartFrame = container.querySelector("[data-slot=chart]");

  if (!(chartFrame instanceof HTMLElement)) {
    throw new Error("Expected chart frame to be an HTML element");
  }

  return chartFrame;
};

describe("Chart core behavior", () => {
  it("mounts ResponsiveContainer when autoSize is omitted", () => {
    const { container } = render(
      <Chart.Root config={chartConfig}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="var(--color-value)" />
        </BarChart>
      </Chart.Root>
    );

    const responsiveContainer = container.querySelector(
      ".recharts-responsive-container"
    ) as HTMLElement | null;

    expect(responsiveContainer).not.toBeNull();
    expect(responsiveContainer?.style.width).toBe("100%");
    expect(responsiveContainer?.style.height).toBe("100%");
  });

  it("renders root slot marker", () => {
    const { container } = render(
      <Chart.Root config={chartConfig}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="var(--color-value)" />
        </BarChart>
      </Chart.Root>
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
  });

  it("preserves custom id in chart identity attributes", () => {
    const { container } = render(
      <Chart.Root config={chartConfig} id="exec-kpi">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="var(--color-value)" />
        </BarChart>
      </Chart.Root>
    );

    const chartFrame = getChartFrameElement(container);

    expect(chartFrame.dataset.chart).toBe("chart-exec-kpi");
  });

  it("passes responsive container props through Chart.Root", () => {
    const { container } = render(
      <Chart.Root
        config={chartConfig}
        responsiveContainerProps={{ debounce: 10, minHeight: 260 }}
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="var(--color-value)" />
        </BarChart>
      </Chart.Root>
    );

    const responsiveContainer = container.querySelector(
      ".recharts-responsive-container"
    ) as HTMLElement | null;

    expect(responsiveContainer).not.toBeNull();
    expect(responsiveContainer?.style.minHeight).toBe("260px");
  });

  it("updates css custom properties when config changes after rerender", () => {
    const { container, rerender } = render(
      <Chart.Root config={{ visits: { color: "var(--color-chart-1)" } }}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="var(--color-value)" />
        </BarChart>
      </Chart.Root>
    );

    rerender(
      <Chart.Root config={{ revenue: { color: "var(--color-chart-2)" } }}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="var(--color-value)" />
        </BarChart>
      </Chart.Root>
    );

    const styleContent = getStyleTagContent(container);

    expect(
      styleContent.includes("--color-revenue: var(--color-chart-2);")
    ).toBe(true);
    expect(styleContent.includes("--color-visits: var(--color-chart-1);")).toBe(
      false
    );
  });

  it("throws clear guard error outside Chart.Root", () => {
    const HookProbe = () => {
      useChartConfig();
      return null;
    };

    expect(() => render(<HookProbe />)).toThrow(
      "useChartConfig must be used within a <Chart.Provider /> or <Chart.Root />"
    );
  });

  it("injects css custom properties from chart config", () => {
    const { container } = render(
      <Chart.Root config={chartConfig}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="var(--color-value)" />
        </BarChart>
      </Chart.Root>
    );

    const styleTag = container.querySelector("style");

    expect(styleTag).not.toBeNull();
    expect(
      styleTag?.textContent?.includes("--color-value: var(--color-chart-1);")
    ).toBe(true);
  });
});
