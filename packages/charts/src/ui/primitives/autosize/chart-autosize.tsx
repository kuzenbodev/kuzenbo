"use client";

import type { ComponentProps, ReactNode } from "react";

import { ResponsiveContainer } from "recharts";

interface ChartAutoSizeProps {
  children: ReactNode;
  enabled?: boolean;
  responsiveContainerProps?: Omit<
    ComponentProps<typeof ResponsiveContainer>,
    "children"
  >;
}

const ChartAutoSize = ({
  children,
  enabled = true,
  responsiveContainerProps,
}: ChartAutoSizeProps) => {
  if (!enabled) {
    return children;
  }

  return (
    <ResponsiveContainer
      height="100%"
      minHeight={240}
      width="100%"
      {...responsiveContainerProps}
    >
      {children as ComponentProps<typeof ResponsiveContainer>["children"]}
    </ResponsiveContainer>
  );
};

export type { ChartAutoSizeProps };
export { ChartAutoSize };
