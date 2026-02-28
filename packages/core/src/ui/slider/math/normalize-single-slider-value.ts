import type { SliderMark } from "../shared/slider-types";
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
} from "./slider-math-utils";

interface NormalizeSliderValueOptions {
  current: number;
  domainMax: number;
  domainMin: number;
  marks?: readonly SliderMark[];
  max: number;
  min: number;
  precision: number;
  raw: number;
  reason?: string;
  restrictToMarks?: boolean;
}

export const normalizeSingleSliderValue = ({
  current,
  domainMax,
  domainMin,
  marks,
  max,
  min,
  precision,
  raw,
  reason,
  restrictToMarks,
}: NormalizeSliderValueOptions) => {
  const clampedRaw = clampNumber(raw, domainMin, domainMax);
  const clampedCurrent = clampNumber(current, min, max);

  if (!restrictToMarks) {
    return toFloatingValue(clampNumber(clampedRaw, min, max), precision);
  }

  const selectableMarks = getSortedSelectableMarks(marks, min, max);
  if (!selectableMarks.length) {
    return toFloatingValue(clampNumber(clampedRaw, min, max), precision);
  }

  if (!isKeyboardLikeReason(reason)) {
    return toFloatingValue(
      getNearestMarkValue(clampedRaw, selectableMarks),
      precision
    );
  }

  if (clampedRaw <= min) {
    return toFloatingValue(getFirstMarkValue(selectableMarks, min), precision);
  }

  if (clampedRaw >= max) {
    return toFloatingValue(getLastMarkValue(selectableMarks, max), precision);
  }

  if (clampedRaw > clampedCurrent) {
    return toFloatingValue(
      getNextMarkValue(clampedCurrent, selectableMarks),
      precision
    );
  }

  if (clampedRaw < clampedCurrent) {
    return toFloatingValue(
      getPreviousMarkValue(clampedCurrent, selectableMarks),
      precision
    );
  }

  return toFloatingValue(
    getNearestMarkValue(clampedRaw, selectableMarks),
    precision
  );
};
