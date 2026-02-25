import type {
  LabelListContentProps,
  LabelListContentRenderer,
} from "./label-list-content-types";

import { resolveLabelDatum } from "./resolve-label-datum";

interface CreateLabelListContentRendererOptions<TData> {
  datumByIndex?: readonly TData[];
  fallbackDatum: TData;
  resolveLabelValue: (value: unknown, datum: TData) => number | string;
}

const createLabelListContentRenderer = <TData,>({
  datumByIndex,
  fallbackDatum,
  resolveLabelValue,
}: CreateLabelListContentRendererOptions<TData>): LabelListContentRenderer =>
  function LabelListContentRenderer(props: unknown) {
    const {
      content: _content,
      index,
      payload,
      value,
      ...labelProps
    } = props as LabelListContentProps;
    const datumFromIndex =
      typeof index === "number" ? datumByIndex?.[index] : undefined;
    const datum = resolveLabelDatum(payload, datumFromIndex ?? fallbackDatum);
    const resolvedLabelValue = resolveLabelValue(value, datum);
    const {
      className,
      dominantBaseline,
      dx,
      dy,
      fill,
      fontSize,
      fontWeight,
      style,
      textAnchor,
      x,
      y,
    } = labelProps;

    if (x === undefined || y === undefined) {
      return "";
    }

    return (
      <text
        className={typeof className === "string" ? className : undefined}
        dominantBaseline={
          typeof dominantBaseline === "string" ? dominantBaseline : undefined
        }
        dx={typeof dx === "number" || typeof dx === "string" ? dx : undefined}
        dy={typeof dy === "number" || typeof dy === "string" ? dy : undefined}
        fill={typeof fill === "string" ? fill : undefined}
        fontSize={
          typeof fontSize === "number" || typeof fontSize === "string"
            ? fontSize
            : undefined
        }
        fontWeight={
          typeof fontWeight === "number" || typeof fontWeight === "string"
            ? fontWeight
            : undefined
        }
        style={style}
        textAnchor={typeof textAnchor === "string" ? textAnchor : undefined}
        x={typeof x === "number" || typeof x === "string" ? x : undefined}
        y={typeof y === "number" || typeof y === "string" ? y : undefined}
      >
        {resolvedLabelValue}
      </text>
    );
  };

export { createLabelListContentRenderer };
