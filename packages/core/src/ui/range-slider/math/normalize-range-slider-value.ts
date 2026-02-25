import type { SliderMark } from "../../slider/shared/slider-types";

import {
  clampNumber,
  getFirstMarkValue,
  getLastMarkValue,
  getNearestMarkValue,
  getNextMarkValue,
  getPreviousMarkValue,
  getSortedSelectableMarks,
  isKeyboardLikeReason,
  toFloatingValue,
} from "../../slider/math/slider-math-utils";

interface NormalizeRangeSliderValueOptions {
  activeThumbIndex?: number;
  current: readonly number[];
  domainMax: number;
  domainMin: number;
  marks?: readonly SliderMark[];
  max: number;
  maxRange: number;
  min: number;
  minRange: number;
  precision: number;
  pushOnOverlap: boolean;
  raw: readonly number[];
  reason?: string;
  restrictToMarks?: boolean;
}

const getResolvedActiveThumbIndex = (
  current: readonly number[],
  raw: readonly number[],
  activeThumbIndex?: number
) => {
  if (activeThumbIndex === 0 || activeThumbIndex === 1) {
    return activeThumbIndex;
  }

  const currentFrom = current[0] ?? 0;
  const currentTo = current[1] ?? 0;
  const rawFrom = raw[0] ?? currentFrom;
  const rawTo = raw[1] ?? currentTo;

  return Math.abs(rawFrom - currentFrom) >= Math.abs(rawTo - currentTo) ? 0 : 1;
};

export const normalizeRangeSliderValue = ({
  activeThumbIndex,
  current,
  domainMax,
  domainMin,
  marks,
  max,
  maxRange,
  min,
  minRange,
  precision,
  pushOnOverlap,
  raw,
  reason,
  restrictToMarks,
}: NormalizeRangeSliderValueOptions): [number, number] => {
  const currentFrom = clampNumber(current[0] ?? min, min, max);
  const currentTo = clampNumber(current[1] ?? max, min, max);
  const currentValues: [number, number] = [currentFrom, currentTo];

  const clampedRawFrom = clampNumber(
    raw[0] ?? currentFrom,
    domainMin,
    domainMax
  );
  const clampedRawTo = clampNumber(raw[1] ?? currentTo, domainMin, domainMax);

  const resolvedActiveIndex = getResolvedActiveThumbIndex(
    [currentFrom, currentTo],
    [clampedRawFrom, clampedRawTo],
    activeThumbIndex
  );

  const clone: [number, number] = [
    clampNumber(clampedRawFrom, min, max),
    clampNumber(clampedRawTo, min, max),
  ];

  if (restrictToMarks) {
    const selectableMarks = getSortedSelectableMarks(marks, min, max);
    if (selectableMarks.length) {
      const firstMarkValue = getFirstMarkValue(selectableMarks, min);
      const lastMarkValue = getLastMarkValue(selectableMarks, max);
      const index = resolvedActiveIndex;
      const otherIndex = index === 0 ? 1 : 0;
      const currentAtIndex = currentValues[index];
      const rawAtIndex = index === 0 ? clampedRawFrom : clampedRawTo;

      if (isKeyboardLikeReason(reason)) {
        if (rawAtIndex <= min) {
          clone[index] = firstMarkValue;
        } else if (rawAtIndex >= max) {
          clone[index] = lastMarkValue;
        } else if (rawAtIndex > currentAtIndex) {
          clone[index] = getNextMarkValue(currentAtIndex, selectableMarks);
        } else if (rawAtIndex < currentAtIndex) {
          clone[index] = getPreviousMarkValue(currentAtIndex, selectableMarks);
        } else {
          clone[index] = getNearestMarkValue(rawAtIndex, selectableMarks);
        }
      } else {
        clone[index] = getNearestMarkValue(rawAtIndex, selectableMarks);
      }

      if (
        clone[index] === lastMarkValue &&
        clone[otherIndex] === lastMarkValue
      ) {
        clone[index] = currentAtIndex;
      } else if (
        clone[index] === firstMarkValue &&
        clone[otherIndex] === firstMarkValue
      ) {
        clone[index] = currentAtIndex;
      } else if (clone[index] === clone[otherIndex]) {
        if (currentAtIndex > clone[otherIndex]) {
          clone[otherIndex] = getPreviousMarkValue(
            clone[index],
            selectableMarks
          );
        } else {
          clone[otherIndex] = getNextMarkValue(clone[index], selectableMarks);
        }
      }
    }
  } else {
    const safeMinRange = Number.isFinite(minRange) ? Math.max(minRange, 0) : 0;
    const safeMaxRange = Number.isFinite(maxRange)
      ? Math.max(maxRange, safeMinRange)
      : Number.POSITIVE_INFINITY;

    if (resolvedActiveIndex === 0) {
      const [clamped] = clone;

      if (clamped > clone[1] - (safeMinRange - 1e-9)) {
        if (pushOnOverlap) {
          clone[1] = Math.min(clamped + safeMinRange, max);
        } else {
          clone[0] = currentFrom;
        }
      }

      if (clamped > clone[1] - (safeMinRange - 1e-9)) {
        if (pushOnOverlap) {
          clone[0] = clone[1] - safeMinRange;
        } else {
          clone[0] = currentFrom;
        }
      }

      if (clone[1] - clamped > safeMaxRange) {
        if (pushOnOverlap) {
          clone[1] = clamped + safeMaxRange;
        } else {
          clone[0] = currentFrom;
        }
      }
    }

    if (resolvedActiveIndex === 1) {
      const [, clamped] = clone;

      if (clamped < clone[0] + safeMinRange) {
        if (pushOnOverlap) {
          clone[0] = Math.max(clamped - safeMinRange, min);
        } else {
          clone[1] = currentTo;
        }
      }

      if (clamped < clone[0] + safeMinRange) {
        if (pushOnOverlap) {
          clone[1] = clone[0] + safeMinRange;
        } else {
          clone[1] = currentTo;
        }
      }

      if (clamped - clone[0] > safeMaxRange) {
        if (pushOnOverlap) {
          clone[0] = clamped - safeMaxRange;
        } else {
          clone[1] = currentTo;
        }
      }
    }
  }

  const rounded: [number, number] = [
    toFloatingValue(clampNumber(clone[0], min, max), precision),
    toFloatingValue(clampNumber(clone[1], min, max), precision),
  ];

  if (rounded[0] > rounded[1]) {
    return [rounded[1], rounded[0]];
  }

  return rounded;
};
