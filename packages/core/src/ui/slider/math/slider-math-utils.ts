import type { SliderMark } from "../shared/slider-types";

const EPSILON = 1e-9;

export const clampNumber = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const getPrecisionFromStep = (step: number) => {
  if (!Number.isFinite(step) || step <= 0) {
    return 0;
  }

  const [, decimals] = step.toString().split(".");
  return decimals?.length ?? 0;
};

export const toFloatingValue = (value: number, precision: number) =>
  Number.parseFloat(value.toFixed(precision));

export const getPositionPercent = (value: number, min: number, max: number) => {
  if (min === max) {
    return 0;
  }

  const percent = ((value - min) / (max - min)) * 100;
  return clampNumber(percent, 0, 100);
};

export const getSortedSelectableMarks = (
  marks: readonly SliderMark[] | undefined,
  min: number,
  max: number
) => {
  if (!marks?.length) {
    return [] as number[];
  }

  const uniqueMarks = new Set<number>();
  for (const mark of marks) {
    if (!Number.isFinite(mark.value)) {
      continue;
    }

    if (mark.value < min || mark.value > max) {
      continue;
    }

    uniqueMarks.add(mark.value);
  }

  const sortedMarks = [...uniqueMarks];
  sortedMarks.sort((a, b) => a - b);
  return sortedMarks;
};

export const getNearestMarkValue = (
  value: number,
  marks: readonly number[]
) => {
  if (!marks.length) {
    return value;
  }

  let nearest = marks[0] ?? value;
  let nearestDistance = Math.abs(value - nearest);

  for (const mark of marks) {
    const distance = Math.abs(value - mark);
    if (distance + EPSILON < nearestDistance) {
      nearest = mark;
      nearestDistance = distance;
    }
  }

  return nearest;
};

export const getNextMarkValue = (current: number, marks: readonly number[]) => {
  for (const mark of marks) {
    if (mark > current + EPSILON) {
      return mark;
    }
  }

  return current;
};

export const getPreviousMarkValue = (
  current: number,
  marks: readonly number[]
) => {
  for (let index = marks.length - 1; index >= 0; index -= 1) {
    const mark = marks[index];
    if (mark !== undefined && mark < current - EPSILON) {
      return mark;
    }
  }

  return current;
};

export const getFirstMarkValue = (marks: readonly number[], fallback: number) =>
  marks[0] ?? fallback;

export const getLastMarkValue = (marks: readonly number[], fallback: number) =>
  marks.at(-1) ?? fallback;

export const isMarkFilled = ({
  inverted = false,
  mark,
  values,
}: {
  inverted?: boolean;
  mark: number;
  values: readonly number[];
}) => {
  if (!values.length) {
    return false;
  }

  if (values.length === 1) {
    const [singleValue] = values;
    if (singleValue === undefined) {
      return false;
    }

    return inverted ? mark >= singleValue : mark <= singleValue;
  }

  const sortedValues = [...values];
  sortedValues.sort((a, b) => a - b);
  const [from = 0, to = 0] = sortedValues;

  if (inverted) {
    return mark <= from || mark >= to;
  }

  return mark >= from && mark <= to;
};

export const isKeyboardLikeReason = (reason: string | null | undefined) =>
  reason === "input-change" || reason === "keyboard";
