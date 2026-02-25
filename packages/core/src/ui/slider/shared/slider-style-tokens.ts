import type { CSSProperties } from "react";

const PIXEL_UNIT = "px";

export const sliderStyleTokens = {
  color: "--slider-color",
  markSize: "--slider-mark-size",
  radius: "--slider-radius",
  size: "--slider-size",
  thumbLabelOffset: "--slider-thumb-label-offset",
  thumbLabelOffsetVertical: "--slider-thumb-label-offset-vertical",
  thumbSize: "--slider-thumb-size",
  trackColor: "--slider-track-color",
  trackSize: "--slider-track-size",
} as const;

const sliderSemanticSizes = {
  xs: { thumbSize: "0.875rem", trackSize: "0.25rem" },
  sm: { thumbSize: "1rem", trackSize: "0.375rem" },
  md: { thumbSize: "1.25rem", trackSize: "0.5rem" },
  lg: { thumbSize: "1.5rem", trackSize: "0.625rem" },
  xl: { thumbSize: "1.75rem", trackSize: "0.75rem" },
} as const;

const sliderSemanticRadii = {
  xs: "calc(var(--radius-sm) - 2px)",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
} as const;

const semanticSliderColorNames = new Set([
  "background",
  "border",
  "danger",
  "foreground",
  "info",
  "muted",
  "primary",
  "secondary",
  "success",
  "warning",
]);

export type SliderSemanticSize = keyof typeof sliderSemanticSizes;
export type SliderSemanticRadius = keyof typeof sliderSemanticRadii;
export type SliderStyleTokenLength = number | string | undefined;
export type SliderSize = SliderSemanticSize | number | string;
export type SliderRadius = SliderSemanticRadius | number | string;

export interface SliderRootStyleTokenOptions {
  color?: string;
  markSize?: SliderStyleTokenLength;
  radius?: SliderRadius | undefined;
  size?: SliderSize | undefined;
  thumbLabelOffset?: SliderStyleTokenLength;
  thumbLabelOffsetVertical?: SliderStyleTokenLength;
  thumbSize?: SliderSize | undefined;
  trackSize?: SliderSize | undefined;
}

const isSemanticSliderSize = (value: unknown): value is SliderSemanticSize =>
  typeof value === "string" && value in sliderSemanticSizes;

const isSemanticSliderRadius = (
  value: unknown
): value is SliderSemanticRadius =>
  typeof value === "string" && value in sliderSemanticRadii;

const toSliderStyleTokenValue = (value: SliderStyleTokenLength) => {
  if (value === undefined) {
    return;
  }

  return typeof value === "number" ? `${value}${PIXEL_UNIT}` : value;
};

const resolveSliderColorValue = (color: string | undefined) => {
  if (color === undefined) {
    return "var(--color-primary)";
  }

  return semanticSliderColorNames.has(color) ? `var(--color-${color})` : color;
};

const resolveSliderRadiusValue = (value: SliderRadius | undefined) => {
  if (value === undefined) {
    return "var(--radius-sm)";
  }

  if (isSemanticSliderRadius(value)) {
    return sliderSemanticRadii[value];
  }

  return toSliderStyleTokenValue(value);
};

const resolveSliderTrackSizeValue = (
  value: SliderSize | undefined,
  fallbackValue: SliderSize | undefined
) => {
  if (value !== undefined) {
    return isSemanticSliderSize(value)
      ? sliderSemanticSizes[value].trackSize
      : toSliderStyleTokenValue(value);
  }

  if (fallbackValue !== undefined) {
    return isSemanticSliderSize(fallbackValue)
      ? sliderSemanticSizes[fallbackValue].trackSize
      : toSliderStyleTokenValue(fallbackValue);
  }

  return sliderSemanticSizes.md.trackSize;
};

const resolveSliderThumbSizeValue = (
  value: SliderSize | undefined,
  fallbackValue: SliderSize | undefined
) => {
  if (value !== undefined) {
    return isSemanticSliderSize(value)
      ? sliderSemanticSizes[value].thumbSize
      : toSliderStyleTokenValue(value);
  }

  if (fallbackValue !== undefined) {
    return isSemanticSliderSize(fallbackValue)
      ? sliderSemanticSizes[fallbackValue].thumbSize
      : toSliderStyleTokenValue(fallbackValue);
  }

  return sliderSemanticSizes.md.thumbSize;
};

export const resolveSliderRootStyleTokens = ({
  color,
  markSize,
  radius,
  size,
  thumbLabelOffset,
  thumbLabelOffsetVertical,
  thumbSize,
  trackSize,
}: SliderRootStyleTokenOptions): CSSProperties => {
  const markSizeValue = toSliderStyleTokenValue(markSize);
  const thumbLabelOffsetValue = toSliderStyleTokenValue(thumbLabelOffset);
  const thumbLabelOffsetVerticalValue = toSliderStyleTokenValue(
    thumbLabelOffsetVertical
  );
  const trackSizeValue = resolveSliderTrackSizeValue(trackSize, size);
  const thumbSizeValue = resolveSliderThumbSizeValue(thumbSize, size);

  return {
    [sliderStyleTokens.color]: resolveSliderColorValue(color),
    [sliderStyleTokens.radius]: resolveSliderRadiusValue(radius),
    [sliderStyleTokens.size]: trackSizeValue,
    [sliderStyleTokens.thumbSize]: thumbSizeValue,
    [sliderStyleTokens.trackColor]: "var(--color-muted)",
    [sliderStyleTokens.trackSize]: trackSizeValue,
    ...(markSizeValue === undefined
      ? {}
      : { [sliderStyleTokens.markSize]: markSizeValue }),
    ...(thumbLabelOffsetValue === undefined
      ? {}
      : { [sliderStyleTokens.thumbLabelOffset]: thumbLabelOffsetValue }),
    ...(thumbLabelOffsetVerticalValue === undefined
      ? {}
      : {
          [sliderStyleTokens.thumbLabelOffsetVertical]:
            thumbLabelOffsetVerticalValue,
        }),
  } as CSSProperties;
};
