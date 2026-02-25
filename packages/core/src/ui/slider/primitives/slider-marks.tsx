"use client";

import { useMemo } from "react";

import type { SliderMark as SliderMarkType } from "../shared/slider-types";

import { getPositionPercent, isMarkFilled } from "../math/slider-math-utils";
import { SliderMark } from "./slider-mark";

export interface SliderMarksProps {
  disabled?: boolean;
  inverted?: boolean;
  marks?: readonly SliderMarkType[];
  max: number;
  min: number;
  orientation?: "horizontal" | "vertical";
  values: readonly number[];
}

const SliderMarks = ({
  disabled,
  inverted,
  marks,
  max,
  min,
  orientation = "horizontal",
  values,
}: SliderMarksProps) => {
  const normalizedMarks = useMemo(() => {
    if (!marks?.length) {
      return [];
    }

    return marks
      .filter((mark) => Number.isFinite(mark.value))
      .map((mark) => ({
        ...mark,
        position: getPositionPercent(mark.value, min, max),
      }));
  }, [marks, max, min]);

  if (!normalizedMarks.length) {
    return null;
  }

  return (
    <>
      {normalizedMarks.map((mark) => (
        <SliderMark
          disabled={disabled}
          filled={isMarkFilled({
            inverted,
            mark: mark.value,
            values,
          })}
          key={`${mark.value}-${String(mark.label)}`}
          label={mark.label}
          orientation={orientation}
          position={mark.position}
        />
      ))}
    </>
  );
};

export { SliderMarks };
