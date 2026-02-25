import type { ReactNode } from "react";

const MIN_STEP_TOLERANCE_MULTIPLIER = 10;

export const getMinStepsBetweenValues = ({
  minRange,
  restrictToMarks,
  step,
}: {
  minRange: number;
  restrictToMarks: boolean;
  step: number;
}) => {
  if (restrictToMarks || step <= 0 || !Number.isFinite(minRange)) {
    return;
  }

  const steps = minRange / step;
  if (!Number.isFinite(steps) || steps < 0) {
    return;
  }

  const roundedSteps = Math.round(steps);
  return Math.abs(steps - roundedSteps) <
    Number.EPSILON * MIN_STEP_TOLERANCE_MULTIPLIER
    ? roundedSteps
    : undefined;
};

export const getThumbChildrenByIndex = (
  thumbChildren: ReactNode | [ReactNode, ReactNode] | undefined,
  index: 0 | 1
) => {
  if (!Array.isArray(thumbChildren)) {
    return thumbChildren;
  }

  return thumbChildren[index];
};
