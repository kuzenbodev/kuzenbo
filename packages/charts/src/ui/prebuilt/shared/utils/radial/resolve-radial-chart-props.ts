import type { CSSProperties } from "react";

interface RadialChartPropsLike {
  responsive?: boolean;
  style?: CSSProperties;
}

const resolveRadialChartProps = <TProps extends RadialChartPropsLike>(
  chartProps: TProps | undefined,
  usesAutoSizeContainer: boolean
): TProps =>
  ({
    ...chartProps,
    responsive: chartProps?.responsive ?? !usesAutoSizeContainer,
    style: {
      height: "100%",
      width: "100%",
      ...chartProps?.style,
    },
  }) as TProps;

export { resolveRadialChartProps };
