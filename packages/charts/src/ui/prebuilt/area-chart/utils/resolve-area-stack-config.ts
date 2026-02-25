import type { AreaChartType } from "../area-chart-types";

interface ResolvedAreaStackConfig {
  shouldUseStack: boolean;
  stackOffset?: "expand" | "sign";
}

const resolveAreaStackConfig = (
  type: AreaChartType | undefined
): ResolvedAreaStackConfig => {
  if (type === "stacked") {
    return {
      shouldUseStack: true,
    };
  }

  if (type === "percent") {
    return {
      shouldUseStack: true,
      stackOffset: "expand",
    };
  }

  if (type === "split") {
    return {
      shouldUseStack: true,
      stackOffset: "sign",
    };
  }

  return {
    shouldUseStack: false,
  };
};

export { resolveAreaStackConfig };
