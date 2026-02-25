"use client";

import type { ComponentProps } from "react";

import { useCallback, useState } from "react";

type ChartPortalTargetProps = ComponentProps<"div">;

interface UseChartPortalTargetResult {
  target: HTMLElement | null;
  targetRef: (node: HTMLElement | null) => void;
}

const ChartPortalTarget = ({ ...props }: ChartPortalTargetProps) => (
  <div data-slot="chart-portal-target" {...props} />
);

const useChartPortalTarget = (): UseChartPortalTargetResult => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  const targetRef = useCallback((node: HTMLElement | null) => {
    setTarget(node);
  }, []);

  return { target, targetRef };
};

export type { ChartPortalTargetProps, UseChartPortalTargetResult };
export { ChartPortalTarget, useChartPortalTarget };
