import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { useChartConfig } from "../context/use-chart";
import { ChartProvider } from "./chart-provider";

afterEach(cleanup);

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--color-chart-1)" },
};

describe("Chart provider value", () => {
  it("keeps context value reference stable when props are stable", () => {
    const contextValues: ReturnType<typeof useChartConfig>[] = [];

    const Probe = () => {
      contextValues.push(useChartConfig());
      return null;
    };

    const { rerender } = render(
      <ChartProvider config={chartConfig} id="stable-chart">
        <Probe />
      </ChartProvider>
    );

    rerender(
      <ChartProvider config={chartConfig} id="stable-chart">
        <Probe />
      </ChartProvider>
    );

    expect(contextValues).toHaveLength(2);
    expect(contextValues[0]).toBe(contextValues[1]);
    expect(contextValues[0]?.chartId).toBe("chart-stable-chart");
  });
});
