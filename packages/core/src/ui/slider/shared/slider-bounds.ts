import { getPrecisionFromStep } from "../math/slider-math-utils";

interface ResolveSliderBoundsOptions {
  domain?: [number, number];
  max: number;
  min: number;
  precision?: number;
  step: number;
}

interface ResolvedSliderBounds {
  domainMax: number;
  domainMin: number;
  max: number;
  min: number;
  precision: number;
}

export const resolveSliderBounds = ({
  domain,
  max,
  min,
  precision,
  step,
}: ResolveSliderBoundsOptions): ResolvedSliderBounds => {
  const normalizedMin = Math.min(min, max);
  const normalizedMax = Math.max(min, max);

  const domainMin = Math.min(
    domain?.[0] ?? normalizedMin,
    domain?.[1] ?? normalizedMax
  );
  const domainMax = Math.max(
    domain?.[0] ?? normalizedMin,
    domain?.[1] ?? normalizedMax
  );

  return {
    domainMax,
    domainMin,
    max: normalizedMax,
    min: normalizedMin,
    precision: precision ?? getPrecisionFromStep(step),
  };
};
