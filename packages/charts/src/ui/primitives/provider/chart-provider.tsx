"use client";

import type { ReactNode } from "react";

import type { ChartConfig } from "../types/chart-types";

import { ChartContext } from "../context/use-chart";
import { useChartProviderValue } from "./hooks/use-chart-provider-value";

interface ChartProviderProps {
  children: ReactNode;
  config: ChartConfig;
  id?: string;
}

const ChartProvider = ({ children, config, id }: ChartProviderProps) => {
  const contextValue = useChartProviderValue({ config, id });

  return (
    <ChartContext.Provider value={contextValue}>
      {children}
    </ChartContext.Provider>
  );
};

export type { ChartProviderProps };
export { ChartProvider };
