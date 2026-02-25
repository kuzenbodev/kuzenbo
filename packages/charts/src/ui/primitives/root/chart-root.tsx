"use client";

import type { ComponentProps, ReactNode } from "react";

import type { ChartConfig } from "../types/chart-types";

import { ChartAutoSize } from "../autosize/chart-autosize";
import { ChartFrame } from "../frame/chart-frame";
import { ChartProvider } from "../provider/chart-provider";

type ChartRootProps = Omit<ComponentProps<typeof ChartFrame>, "children"> & {
  autoSize?: "container" | "none";
  children: ReactNode;
  config: ChartConfig;
  responsiveContainerProps?: ComponentProps<
    typeof ChartAutoSize
  >["responsiveContainerProps"];
};

const ChartRoot = ({
  autoSize = "container",
  children,
  config,
  id,
  responsiveContainerProps,
  ...frameProps
}: ChartRootProps) => (
  <ChartProvider config={config} id={id}>
    <ChartFrame {...frameProps}>
      <ChartAutoSize
        enabled={autoSize === "container"}
        responsiveContainerProps={responsiveContainerProps}
      >
        {children}
      </ChartAutoSize>
    </ChartFrame>
  </ChartProvider>
);

export type { ChartRootProps };
export { ChartRoot };
