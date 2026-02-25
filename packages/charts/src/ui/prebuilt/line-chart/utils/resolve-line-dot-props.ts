interface ResolveLineDotPropsOptions {
  dotProps: unknown;
  isDimmed: boolean;
  withDots: boolean;
}

const resolveLineDotProps = ({
  dotProps,
  isDimmed,
  withDots,
}: ResolveLineDotPropsOptions) => {
  if (withDots && dotProps && typeof dotProps === "object") {
    return {
      ...(dotProps as Record<string, unknown>),
      fillOpacity: isDimmed ? 0 : 1,
      strokeOpacity: isDimmed ? 0 : 1,
    };
  }

  return withDots;
};

export { resolveLineDotProps };
