import type { ChartThemeName } from "./constants";

const getChartThemeFromDom = (chartId: string): ChartThemeName => {
  if (typeof document === "undefined") {
    return "light";
  }

  const escapedChartId = chartId.replaceAll('"', '\\"');
  const chartNode = document.querySelector(
    `[data-chart="${escapedChartId}"]`
  ) as HTMLElement | null;

  if (
    chartNode?.closest(".dark") ||
    document.documentElement.classList.contains("dark")
  ) {
    return "dark";
  }

  return "light";
};

export { getChartThemeFromDom };
