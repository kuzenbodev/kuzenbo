interface ResolveAreaDotPropsOptions {
  dotProps: unknown;
  isDimmed: boolean;
  withDots: boolean;
}

const resolveAreaDotProps = ({
  dotProps,
  isDimmed,
  withDots,
}: ResolveAreaDotPropsOptions) => {
  if (withDots && dotProps && typeof dotProps === "object") {
    return {
      ...(dotProps as Record<string, unknown>),
      fillOpacity: isDimmed ? 0 : 1,
      strokeOpacity: isDimmed ? 0 : 1,
    };
  }

  return withDots;
};

export { resolveAreaDotProps };
