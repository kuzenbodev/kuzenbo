import { asRecord } from "./as-record";

interface ChartPayloadLike {
  color?: string;
  payload?: unknown;
}

const getShapeColor = (item: ChartPayloadLike) => {
  const payloadData = asRecord(item.payload);
  const fill = payloadData?.fill;
  const stroke = payloadData?.stroke;

  if (typeof fill === "string") {
    return fill;
  }

  if (typeof stroke === "string") {
    return stroke;
  }

  return typeof item.color === "string" ? item.color : undefined;
};

export { getShapeColor };
