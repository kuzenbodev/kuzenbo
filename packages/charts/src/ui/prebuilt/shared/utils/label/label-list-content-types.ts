import type { CSSProperties, ReactElement, SVGAttributes } from "react";

interface LabelListContentCoordinateProps {
  dx?: number | string;
  dy?: number | string;
  x?: number | string;
  y?: number | string;
}

interface LabelListContentStyleProps {
  className?: string;
  dominantBaseline?: SVGAttributes<SVGTextElement>["dominantBaseline"];
  fill?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  style?: CSSProperties;
  textAnchor?: SVGAttributes<SVGTextElement>["textAnchor"];
}

export interface LabelListContentProps
  extends LabelListContentCoordinateProps, LabelListContentStyleProps {
  [key: string]: unknown;
  index?: number;
  payload?: unknown;
  value?: unknown;
}

export type LabelListContentRenderer = (
  props: unknown
) => ReactElement | string | number;
