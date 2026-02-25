import type { TooltipProps } from "recharts";

type RechartsTooltipProps = Omit<
  TooltipProps<number, string>,
  "content" | "ref"
>;

type CompleteTooltipSourceMode = "all" | "segment";

const resolveTooltipSourceShared = (
  tooltipSource: CompleteTooltipSourceMode,
  tooltipProps: RechartsTooltipProps | undefined
): RechartsTooltipProps | undefined => {
  if (tooltipProps?.shared !== undefined) {
    return tooltipProps;
  }

  return {
    ...tooltipProps,
    shared: tooltipSource === "all",
  };
};

export type { CompleteTooltipSourceMode, RechartsTooltipProps };
export { resolveTooltipSourceShared };
