import type { DateAdapter } from "../../../adapter";
import type {
  DatePickerValue,
  DateRangeValue,
  SelectionMode,
} from "../../types";

export const serializePickerValue = (
  adapter: DateAdapter,
  value: DatePickerValue,
  type: SelectionMode
): string => {
  if (type === "single") {
    const date = value as Date | null;
    return date ? (adapter.toISODate(date) ?? "") : "";
  }

  if (type === "multiple") {
    return (value as Date[])
      .map((date) => adapter.toISODate(date) ?? "")
      .join(",");
  }

  const [startDate, endDate] = value as DateRangeValue;
  const startDateValue = startDate ? (adapter.toISODate(startDate) ?? "") : "";
  const endDateValue = endDate ? (adapter.toISODate(endDate) ?? "") : "";

  return `${startDateValue}..${endDateValue}`;
};

export const formatPickerValue = (
  adapter: DateAdapter,
  value: DatePickerValue,
  type: SelectionMode,
  locale?: string,
  timeZone?: string
): string => {
  if (type === "single") {
    const date = value as Date | null;
    return date
      ? adapter.format(
          date,
          { day: "2-digit", month: "short", year: "numeric" },
          {
            locale,
            timeZone,
          }
        )
      : "";
  }

  if (type === "multiple") {
    const dates = value as Date[];

    return dates
      .map((date) =>
        adapter.format(
          date,
          { day: "2-digit", month: "short", year: "numeric" },
          {
            locale,
            timeZone,
          }
        )
      )
      .join(", ");
  }

  const [startDate, endDate] = value as DateRangeValue;

  if (!startDate) {
    return "";
  }

  const startValue = adapter.format(
    startDate,
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
    { locale, timeZone }
  );

  if (!endDate) {
    return `${startValue} -`;
  }

  const endValue = adapter.format(
    endDate,
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
    { locale, timeZone }
  );

  return `${startValue} - ${endValue}`;
};
