interface SparklineGradientStop {
  color: string;
  offset: number;
  opacity?: number;
}

const createDefaultSparklineGradientStops = (
  color: string
): readonly SparklineGradientStop[] => [
  { color, offset: 0, opacity: 0.4 },
  { color, offset: 100, opacity: 0.05 },
];

export { createDefaultSparklineGradientStops, type SparklineGradientStop };
