"use client";

import { useCallback, useContext } from "react";

import type { DateAdapter, DateAdapterContext } from "../adapter";
import type { DayOfWeek } from "../types";

import { DatesProviderContext } from "./dates-provider";

export const useDatesContext = () => {
  const context = useContext(DatesProviderContext);

  const getAdapter = useCallback(
    (overrides?: Partial<DateAdapterContext>): DateAdapter => {
      if (!overrides) {
        return context.adapter;
      }

      return context.adapter.withContext(overrides);
    },
    [context.adapter]
  );

  const getLocale = useCallback(
    (input?: string): string => input ?? context.locale,
    [context.locale]
  );

  const getWeekStartsOn = useCallback(
    (input?: DayOfWeek): DayOfWeek =>
      typeof input === "number" ? input : context.weekStartsOn,
    [context.weekStartsOn]
  );

  const getFirstDayOfWeek = useCallback(
    (input?: DayOfWeek): DayOfWeek =>
      typeof input === "number" ? input : context.firstDayOfWeek,
    [context.firstDayOfWeek]
  );

  const getWeekendDays = useCallback(
    (input?: DayOfWeek[]): DayOfWeek[] =>
      Array.isArray(input) ? input : context.weekendDays,
    [context.weekendDays]
  );

  const getLabelSeparator = useCallback(
    (input?: string): string =>
      typeof input === "string" ? input : context.labelSeparator,
    [context.labelSeparator]
  );

  const getTimeZone = useCallback(
    (input?: string): string | undefined => input ?? context.timeZone,
    [context.timeZone]
  );

  const getDirection = useCallback(
    (input?: "ltr" | "rtl"): "ltr" | "rtl" => input ?? context.direction,
    [context.direction]
  );

  const getConsistentWeeks = useCallback(
    (input?: boolean): boolean =>
      typeof input === "boolean" ? input : context.consistentWeeks,
    [context.consistentWeeks]
  );

  return {
    ...context,
    getAdapter,
    getConsistentWeeks,
    getDirection,
    getFirstDayOfWeek,
    getLabelSeparator,
    getLocale,
    getTimeZone,
    getWeekStartsOn,
    getWeekendDays,
  };
};
