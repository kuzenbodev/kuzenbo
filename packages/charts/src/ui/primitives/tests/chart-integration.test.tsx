import { afterEach, describe, expect, it } from "bun:test";

import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts";

import { Chart } from "../chart";

afterEach(cleanup);

const data = [{ name: "Jan", visits: 120, revenue: 4500 }];
const chartConfig = {
  visits: { label: "Visits", color: "var(--color-chart-1)" },
  revenue: { label: "Revenue", color: "var(--color-chart-2)" },
};
const tooltipDollarFormatter = (value: number) => `$${value}`;
const RevenueIcon = () => (
  <svg aria-label="Revenue icon" data-testid="revenue-icon" />
);
const createHighlightCollector =
  (values: (string | null)[]) => (seriesName: string | null) => {
    values.push(seriesName);
  };

describe("Chart integration behavior", () => {
  it("renders custom tooltip content with payload", () => {
    const tooltipPayload = [
      {
        color: "var(--color-chart-1)",
        dataKey: "visits",
        name: "visits",
        payload: data[0],
        type: "line",
        value: 120,
      },
    ];

    const { container } = render(
      <Chart.Provider config={chartConfig}>
        <Chart.TooltipContent
          active
          label="Jan"
          payload={tooltipPayload as never}
        />
      </Chart.Provider>
    );

    const view = within(container);

    expect(view.queryAllByText("Visits").length).toBeGreaterThan(0);
    expect(view.queryByText("120")).not.toBeNull();

    const tooltipRoot = container.firstElementChild as HTMLElement;
    const dotIndicator = container.querySelector('div[style*="--color-bg"]');

    expect(tooltipRoot.className).toContain("grid");
    expect(tooltipRoot.className).toContain("min-w-32");
    expect(tooltipRoot.className).toContain("rounded-lg");
    expect(dotIndicator).not.toBeNull();
    expect((dotIndicator as HTMLElement).className).toContain("h-2.5");
    expect((dotIndicator as HTMLElement).className).toContain("w-2.5");
  });

  it("applies valueFormatter over unit formatting in tooltip rows", () => {
    const tooltipPayload = [
      {
        color: "var(--color-chart-1)",
        dataKey: "visits",
        name: "visits",
        payload: data[0],
        type: "line",
        value: 120,
      },
    ];

    const { container } = render(
      <Chart.Provider config={chartConfig}>
        <Chart.TooltipContent
          active
          payload={tooltipPayload as never}
          unit="USD"
          valueFormatter={tooltipDollarFormatter}
        />
      </Chart.Provider>
    );

    const view = within(container);

    expect(view.queryByText("$120")).not.toBeNull();
    expect(view.queryByText("120 USD")).toBeNull();
  });

  it("applies dashed indicator class contract for nested tooltip labels", () => {
    const tooltipPayload = [
      {
        color: "var(--color-chart-1)",
        dataKey: "visits",
        name: "visits",
        payload: data[0],
        type: "line",
        value: 120,
      },
    ];

    const { container } = render(
      <Chart.Provider config={chartConfig}>
        <Chart.TooltipContent
          active
          indicator="dashed"
          payload={tooltipPayload as never}
        />
      </Chart.Provider>
    );

    const dashedIndicator = container.querySelector('div[style*="--color-bg"]');

    expect(dashedIndicator).not.toBeNull();
    expect((dashedIndicator as HTMLElement).className).toContain(
      "border-dashed"
    );
    expect((dashedIndicator as HTMLElement).className).toContain("w-0");
    expect((dashedIndicator as HTMLElement).className).toContain("my-0.5");
  });

  it("prefers config labels over tooltip labels for tooltip rendering", () => {
    const tooltipPayload = [
      {
        color: "var(--color-chart-1)",
        dataKey: "visits",
        name: "Traffic",
        payload: data[0],
        type: "line",
        value: 120,
      },
    ];

    const { container } = render(
      <Chart.Provider config={chartConfig}>
        <Chart.TooltipContent
          active
          label="Fallback Tooltip Label"
          payload={tooltipPayload as never}
        />
      </Chart.Provider>
    );

    const view = within(container);

    expect(view.queryAllByText("Visits").length).toBeGreaterThan(0);
    expect(view.queryByText("Fallback Tooltip Label")).toBeNull();
  });

  it("falls back tooltip labels to tooltip label and payload name when config is missing", () => {
    const tooltipPayload = [
      {
        color: "var(--color-chart-1)",
        dataKey: "unknownMetric",
        name: "Payload Label",
        payload: { unknownMetric: 48 },
        type: "line",
        value: 48,
      },
    ];

    const { container, rerender } = render(
      <Chart.Provider config={{}}>
        <Chart.TooltipContent
          active
          label="Tooltip Label"
          payload={tooltipPayload as never}
        />
      </Chart.Provider>
    );

    const view = within(container);

    expect(view.queryAllByText("Tooltip Label").length).toBeGreaterThan(0);

    rerender(
      <Chart.Provider config={{}}>
        <Chart.TooltipContent active payload={tooltipPayload as never} />
      </Chart.Provider>
    );

    expect(view.queryAllByText("Payload Label").length).toBeGreaterThan(0);
  });

  it("renders custom legend content with metadata payload", () => {
    const legendPayload = [
      {
        color: "var(--color-chart-1)",
        dataKey: "visits",
        type: "line" as const,
        value: "visits",
      },
      {
        color: "var(--color-chart-2)",
        dataKey: "revenue",
        type: "line" as const,
        value: "revenue",
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

    const legendRoot = container.firstElementChild as HTMLElement;
    const visitsRow = screen
      .getByText("Visits")
      .closest("[data-slot=chart-legend-item]") as HTMLElement;

    expect(legendRoot.className).toContain("pt-3");
    expect(visitsRow.className).toContain("gap-1.5");
  });

  it("applies top-aligned legend spacing class contract", () => {
    const legendPayload = [
      {
        color: "var(--color-chart-1)",
        dataKey: "visits",
        type: "line" as const,
        value: "visits",
      },
    ];

    const { container } = render(
      <Chart.Provider config={chartConfig}>
        <Chart.LegendContent payload={legendPayload} verticalAlign="top" />
      </Chart.Provider>
    );

    const legendRoot = container.firstElementChild as HTMLElement;

    expect(legendRoot.className).toContain("pb-3");
    expect(legendRoot.className).not.toContain("pt-3");
  });

  it("hides legend rows when payload color is none", () => {
    const legendPayload = [
      {
        color: "none",
        dataKey: "visits",
        type: "line" as const,
        value: "visits",
      },
      {
        color: "var(--color-chart-2)",
        dataKey: "revenue",
        type: "line" as const,
        value: "revenue",
      },
    ];

    const { container } = render(
      <Chart.Provider config={chartConfig}>
        <Chart.LegendContent payload={legendPayload} />
      </Chart.Provider>
    );

    const view = within(container);

    expect(view.queryByText("Visits")).toBeNull();
    expect(view.queryAllByText("Revenue").length).toBeGreaterThan(0);
  });

  it("prioritizes config icon and label in legend content", () => {
    const legendPayload = [
      {
        color: "var(--color-chart-2)",
        dataKey: "revenue",
        type: "line" as const,
        value: "custom-revenue-label",
      },
    ];

    const { container } = render(
      <Chart.Provider
        config={{
          revenue: {
            color: "var(--color-chart-2)",
            icon: RevenueIcon,
            label: "Revenue",
          },
        }}
      >
        <Chart.LegendContent payload={legendPayload} />
      </Chart.Provider>
    );

    const view = within(container);

    expect(view.queryByText("Revenue")).not.toBeNull();
    expect(view.queryByText("custom-revenue-label")).toBeNull();
    expect(view.queryByTestId("revenue-icon")).not.toBeNull();
  });

  it("falls back legend labels to payload value then dataKey when config labels are missing", () => {
    const legendPayload = [
      {
        color: "var(--color-chart-1)",
        dataKey: "pipeline",
        type: "line" as const,
        value: "Pipeline",
      },
      {
        color: "var(--color-chart-2)",
        dataKey: "selfServe",
        type: "line" as const,
        value: undefined,
      },
    ];

    const { container } = render(
      <Chart.Provider config={{}}>
        <Chart.LegendContent payload={legendPayload} />
      </Chart.Provider>
    );

    const view = within(container);

    expect(view.queryByText("Pipeline")).not.toBeNull();
    expect(view.queryByText("selfServe")).not.toBeNull();
  });

  it("emits legend highlight callbacks on hover enter and leave", () => {
    const legendPayload = [
      {
        color: "var(--color-chart-1)",
        dataKey: "visits",
        type: "line" as const,
        value: "visits",
      },
    ];
    const highlightedSeries: (string | null)[] = [];
    const handleHighlightChange = createHighlightCollector(highlightedSeries);

    render(
      <Chart.Provider config={chartConfig}>
        <Chart.LegendContent
          onHighlightChange={handleHighlightChange}
          payload={legendPayload}
        />
      </Chart.Provider>
    );

    fireEvent.mouseEnter(screen.getByText("Visits"));
    fireEvent.mouseLeave(screen.getByText("Visits"));

    expect(highlightedSeries).toEqual(["visits", null]);
  });

  it("normalizes tooltip payload items that omit both name and dataKey", () => {
    const { container } = render(
      <Chart.Provider config={{}}>
        <Chart.TooltipContent
          active
          payload={[
            {
              payload: { miscMetric: 72 },
              type: "line",
              value: 72,
            },
          ]}
        />
      </Chart.Provider>
    );

    const view = within(container);

    expect(view.queryByText("Value")).not.toBeNull();
    expect(view.queryAllByText("72").length).toBeGreaterThan(0);
  });

  it("hides tooltip rows when payload type is none", () => {
    const tooltipPayload = [
      {
        color: "var(--color-chart-1)",
        dataKey: "visits",
        name: "visits",
        payload: data[0],
        type: "none",
        value: 120,
      },
      {
        color: "var(--color-chart-2)",
        dataKey: "revenue",
        name: "revenue",
        payload: data[0],
        type: "line",
        value: 4500,
      },
    ];

    const { container } = render(
      <Chart.Provider config={chartConfig}>
        <Chart.TooltipContent
          active
          label="Jan"
          payload={tooltipPayload as never}
        />
      </Chart.Provider>
    );
    const view = within(container);

    expect(view.queryByText("Visits")).toBeNull();
    expect(view.queryAllByText("Revenue").length).toBeGreaterThan(0);
  });

  it("hides tooltip rows when payload fill is none and explicit color exists", () => {
    const tooltipPayload = [
      {
        color: "var(--color-chart-1)",
        dataKey: "visits",
        name: "visits",
        payload: {
          ...data[0],
          fill: "none",
        },
        type: "line",
        value: 120,
      },
      {
        color: "var(--color-chart-2)",
        dataKey: "revenue",
        name: "revenue",
        payload: data[0],
        type: "line",
        value: 4500,
      },
    ];

    const { container } = render(
      <Chart.Provider config={chartConfig}>
        <Chart.TooltipContent
          active
          label="Jan"
          payload={tooltipPayload as never}
        />
      </Chart.Provider>
    );
    const view = within(container);

    expect(view.queryByText("Visits")).toBeNull();
    expect(view.queryAllByText("Revenue").length).toBeGreaterThan(0);
  });

  it("configures tooltip with an external portal target", () => {
    const tooltipPayload = [
      {
        color: "var(--color-chart-1)",
        dataKey: "visits",
        name: "visits",
        payload: data[0],
        type: "line",
        value: 120,
      },
    ];
    const portalTarget = document.createElement("div");
    portalTarget.setAttribute("id", "chart-tooltip-portal-target");
    document.body.append(portalTarget);

    const { container } = render(
      <Chart.Root autoSize="none" config={chartConfig}>
        <BarChart data={data} height={240} width={640}>
          <XAxis dataKey="name" />
          <YAxis />
          <Chart.Tooltip
            active
            content={
              <Chart.TooltipContent
                active
                label="Jan"
                payload={tooltipPayload}
              />
            }
            portal={portalTarget}
          />
          <Bar dataKey="visits" fill="var(--color-visits)" />
        </BarChart>
      </Chart.Root>
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
    expect(portalTarget.childNodes.length).toBeGreaterThan(0);
    portalTarget.remove();
  });

  it("configures legend with an external portal target", () => {
    const legendPayload = [
      {
        color: "var(--color-chart-1)",
        dataKey: "visits",
        type: "line" as const,
        value: "visits",
      },
    ];
    const portalTarget = document.createElement("div");
    portalTarget.setAttribute("id", "chart-legend-portal-target");
    document.body.append(portalTarget);

    const { container } = render(
      <Chart.Root autoSize="none" config={chartConfig}>
        <LineChart data={data} height={240} width={640}>
          <XAxis dataKey="name" />
          <YAxis />
          <Chart.Legend
            content={<Chart.LegendContent payload={legendPayload} />}
            portal={portalTarget}
          />
          <Line dataKey="visits" stroke="var(--color-visits)" />
        </LineChart>
      </Chart.Root>
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
    expect(portalTarget.childNodes.length).toBeGreaterThan(0);
    portalTarget.remove();
  });

  it("supports defaultIndex and trigger tooltip interaction props", () => {
    const { container } = render(
      <Chart.Root config={chartConfig}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Chart.Tooltip
            content={<Chart.TooltipContent />}
            defaultIndex={0}
            trigger="click"
          />
          <Line dataKey="visits" stroke="var(--color-visits)" />
        </LineChart>
      </Chart.Root>
    );

    expect(container.querySelector("[data-slot=chart]")).not.toBeNull();
  });
});
