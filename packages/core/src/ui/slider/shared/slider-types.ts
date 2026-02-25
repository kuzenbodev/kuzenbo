import type { ReactNode } from "react";

export type SliderValue = number;

export interface SliderMark {
  label?: ReactNode;
  value: number;
}

export type SliderLabel = ((value: number) => ReactNode) | ReactNode | null;
