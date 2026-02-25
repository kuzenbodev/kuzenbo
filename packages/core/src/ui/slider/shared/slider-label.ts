import type { SliderLabel } from "./slider-types";

export const resolveSliderLabel = (
  label: SliderLabel | undefined,
  value: number
) => {
  if (typeof label === "function") {
    return label(value);
  }

  return label;
};
