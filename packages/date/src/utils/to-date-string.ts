import type { DateAdapter, DateInput } from "../adapter";
import { DEFAULT_DATE_ADAPTER } from "../adapter";
import type { DateStringValue, DateTimeStringValue } from "../types";

type ExactOptionalReturn<T, MainType> = T extends undefined
  ? undefined
  : T extends null
    ? null
    : T extends ""
      ? ""
      : MainType;

export type DateConvertibleInput =
  | Date
  | number
  | string
  | undefined
  | null
  | "";

const convertWithAdapter = <T extends DateConvertibleInput, Output>(
  value: T,
  converter: (input: DateInput) => Output | null
): ExactOptionalReturn<T, Output> => {
  if (value === null || value === undefined || value === "") {
    return value as unknown as ExactOptionalReturn<T, Output>;
  }

  return converter(value) as ExactOptionalReturn<T, Output>;
};

export const toDateString = <T extends DateConvertibleInput>(
  value: T,
  options?: {
    adapter?: DateAdapter;
  }
): ExactOptionalReturn<T, DateStringValue> => {
  const adapter = options?.adapter ?? DEFAULT_DATE_ADAPTER;

  return convertWithAdapter(value, adapter.toDateString);
};

export const toDateTimeString = <T extends DateConvertibleInput>(
  value: T,
  options?: {
    adapter?: DateAdapter;
  }
): ExactOptionalReturn<T, DateTimeStringValue> => {
  const adapter = options?.adapter ?? DEFAULT_DATE_ADAPTER;

  return convertWithAdapter(value, adapter.toDateTimeString);
};
