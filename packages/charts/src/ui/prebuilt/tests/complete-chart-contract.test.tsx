import { describe, expect, it } from "bun:test";

import {
  AreaChart,
  BarChart,
  BubbleChart,
  Chart,
  ChartAutoSize,
  ChartFrame,
  ChartProvider,
  CompositeChart,
  DonutChart,
  FunnelChart,
  Heatmap,
  LineChart,
  PieChart,
  RadarChart,
  RadialBarChart,
  ScatterChart,
  Sparkline,
  useChartConfig,
  useSeriesColor,
  useSeriesColorVar,
} from "../../chart/chart";
import { AreaChart as CompleteAreaChart } from "../area-chart/area-chart";
import { BarChart as CompleteBarChart } from "../bar-chart/bar-chart";
import { BubbleChart as CompleteBubbleChart } from "../bubble-chart/bubble-chart";
import { CompositeChart as CompleteCompositeChart } from "../composite-chart/composite-chart";
import { DonutChart as CompleteDonutChart } from "../donut-chart/donut-chart";
import { FunnelChart as CompleteFunnelChart } from "../funnel-chart/funnel-chart";
import { Heatmap as CompleteHeatmap } from "../heatmap/heatmap";
import {
  AreaChart as CompleteSubpathAreaChart,
  BarChart as CompleteSubpathBarChart,
  BubbleChart as CompleteSubpathBubbleChart,
  CompositeChart as CompleteSubpathCompositeChart,
  DonutChart as CompleteSubpathDonutChart,
  FunnelChart as CompleteSubpathFunnelChart,
  Heatmap as CompleteSubpathHeatmap,
  LineChart as CompleteSubpathLineChart,
  PieChart as CompleteSubpathPieChart,
  RadarChart as CompleteSubpathRadarChart,
  RadialBarChart as CompleteSubpathRadialBarChart,
  ScatterChart as CompleteSubpathScatterChart,
  Sparkline as CompleteSubpathSparkline,
} from "../index";
import { LineChart as CompleteLineChart } from "../line-chart/line-chart";
import { PieChart as CompletePieChart } from "../pie-chart/pie-chart";
import { RadarChart as CompleteRadarChart } from "../radar-chart/radar-chart";
import { RadialBarChart as CompleteRadialBarChart } from "../radial-bar-chart/radial-bar-chart";
import { ScatterChart as CompleteScatterChart } from "../scatter-chart/scatter-chart";
import {
  createCompleteChartConfig,
  createTooltipValueFormatter,
  createYAxisTickFormatter,
} from "../shared/complete-helpers";
import { Sparkline as CompleteSparkline } from "../sparkline/sparkline";

const buildSeries = () =>
  [
    { label: "Revenue", name: "revenue" },
    {
      label: "Growth",
      name: "growth",
      theme: {
        dark: "var(--color-chart-4)",
        light: "var(--color-chart-3)",
      },
    },
    { color: "var(--color-chart-5)", name: "pipeline" },
  ] as const;

describe("Complete charts contract", () => {
  it("builds config labels and deterministic color fallbacks", () => {
    const config = createCompleteChartConfig(buildSeries());

    expect(config.revenue?.label).toBe("Revenue");
    expect(config.revenue?.color).toBe("var(--color-chart-1)");
    expect(config.growth?.theme?.light).toBe("var(--color-chart-3)");
    expect(config.pipeline?.color).toBe("var(--color-chart-5)");
  });

  it("keeps key-only series as migration alias", () => {
    const config = createCompleteChartConfig([
      { key: "revenueSeries", label: "Revenue Series" },
    ]);

    expect(config.revenueSeries?.label).toBe("Revenue Series");
    expect(config.revenueSeries?.color).toBe("var(--color-chart-1)");
  });

  it("cycles fallback colors deterministically after five series", () => {
    const config = createCompleteChartConfig([
      { name: "seriesA" },
      { name: "seriesB" },
      { name: "seriesC" },
      { name: "seriesD" },
      { name: "seriesE" },
      { name: "seriesF" },
    ]);

    expect(config.seriesA?.color).toBe("var(--color-chart-1)");
    expect(config.seriesE?.color).toBe("var(--color-chart-5)");
    expect(config.seriesF?.color).toBe("var(--color-chart-1)");
  });

  it("uses valueFormatter in y-axis tick formatter", () => {
    const tickFormatter = createYAxisTickFormatter({
      data: [{ month: "Jan", revenue: 1200 }],
      series: [{ name: "revenue" }],
      unit: "USD",
      valueFormatter: (value, key) => `${key.toUpperCase()}:${value}`,
    });

    expect(tickFormatter(1200)).toBe("REVENUE:1200");
  });

  it("falls back to unit formatting when valueFormatter is missing", () => {
    const tickFormatter = createYAxisTickFormatter({
      data: [{ month: "Jan", revenue: 1200 }],
      series: [{ name: "revenue" }],
      unit: "USD",
      valueFormatter: undefined,
    });

    expect(tickFormatter(1200)).toBe("1,200 USD");
  });

  it("exports complete charts from the chart subpath", () => {
    expect(AreaChart).toBe(CompleteAreaChart);
    expect(BubbleChart).toBe(CompleteBubbleChart);
    expect(LineChart).toBe(CompleteLineChart);
    expect(BarChart).toBe(CompleteBarChart);
    expect(CompositeChart).toBe(CompleteCompositeChart);
    expect(DonutChart).toBe(CompleteDonutChart);
    expect(FunnelChart).toBe(CompleteFunnelChart);
    expect(Heatmap).toBe(CompleteHeatmap);
    expect(PieChart).toBe(CompletePieChart);
    expect(RadarChart).toBe(CompleteRadarChart);
    expect(RadialBarChart).toBe(CompleteRadialBarChart);
    expect(ScatterChart).toBe(CompleteScatterChart);
    expect(Sparkline).toBe(CompleteSparkline);
  });

  it("exports complete charts from the complete subpath index", () => {
    expect(CompleteSubpathAreaChart).toBe(CompleteAreaChart);
    expect(CompleteSubpathBubbleChart).toBe(CompleteBubbleChart);
    expect(CompleteSubpathLineChart).toBe(CompleteLineChart);
    expect(CompleteSubpathBarChart).toBe(CompleteBarChart);
    expect(CompleteSubpathCompositeChart).toBe(CompleteCompositeChart);
    expect(CompleteSubpathDonutChart).toBe(CompleteDonutChart);
    expect(CompleteSubpathFunnelChart).toBe(CompleteFunnelChart);
    expect(CompleteSubpathHeatmap).toBe(CompleteHeatmap);
    expect(CompleteSubpathPieChart).toBe(CompletePieChart);
    expect(CompleteSubpathRadarChart).toBe(CompleteRadarChart);
    expect(CompleteSubpathRadialBarChart).toBe(CompleteRadialBarChart);
    expect(CompleteSubpathScatterChart).toBe(CompleteScatterChart);
    expect(CompleteSubpathSparkline).toBe(CompleteSparkline);
  });

  it("attaches complete presets to Chart namespace", () => {
    expect(Chart.Preset.Area).toBe(CompleteAreaChart);
    expect(Chart.Preset.Bubble).toBe(CompleteBubbleChart);
    expect(Chart.Preset.Line).toBe(CompleteLineChart);
    expect(Chart.Preset.Bar).toBe(CompleteBarChart);
    expect(Chart.Preset.Composite).toBe(CompleteCompositeChart);
    expect(Chart.Preset.Donut).toBe(CompleteDonutChart);
    expect(Chart.Preset.Funnel).toBe(CompleteFunnelChart);
    expect(Chart.Preset.Heatmap).toBe(CompleteHeatmap);
    expect(Chart.Preset.Pie).toBe(CompletePieChart);
    expect(Chart.Preset.Radar).toBe(CompleteRadarChart);
    expect(Chart.Preset.RadialBar).toBe(CompleteRadialBarChart);
    expect(Chart.Preset.Scatter).toBe(CompleteScatterChart);
    expect(Chart.Preset.Sparkline).toBe(CompleteSparkline);
  });

  it("keeps primitive kernel namespace members on Chart", () => {
    expect(Chart.Provider).toBe(ChartProvider);
    expect(Chart.Frame).toBe(ChartFrame);
    expect(Chart.AutoSize).toBe(ChartAutoSize);
    expect(Chart.useConfig).toBe(useChartConfig);
  });

  it("exports series color hooks from package root and namespace", () => {
    expect(Chart.useSeriesColor).toBe(useSeriesColor);
    expect(Chart.useSeriesColorVar).toBe(useSeriesColorVar);
  });

  it("creates deterministic tooltip formatter bridges", () => {
    const formatter = createTooltipValueFormatter(
      (value, key) => `${key.toUpperCase()}:${value.toFixed(1)}`
    );

    expect(formatter?.(42.5, "revenue", {})).toBe("REVENUE:42.5");
    expect(createTooltipValueFormatter()).toBeUndefined();
  });
});
