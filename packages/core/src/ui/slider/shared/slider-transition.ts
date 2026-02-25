export interface SliderLabelTransitionProps {
  delay?: number;
  duration?: number;
  timingFunction?: string;
}

export const defaultSliderLabelTransitionProps = {
  delay: 0,
  duration: 0,
  timingFunction: "linear",
} as const satisfies Required<SliderLabelTransitionProps>;
