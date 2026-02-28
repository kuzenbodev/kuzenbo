"use client";

import type { ReactNode } from "react";
import { createContext, useMemo } from "react";

import {
  createDateAdapter,
  DEFAULT_DATE_ADAPTER,
  type DateAdapter,
  type DateAdapterContext,
} from "../adapter";
import type { DayOfWeek } from "../types";

export interface DatesProviderValue extends DateAdapterContext {
  adapter: DateAdapter;
  direction: "ltr" | "rtl";
  firstDayOfWeek: DayOfWeek;
  labelSeparator: string;
}

export interface DatesProviderSettings extends Partial<
  Omit<DatesProviderValue, "adapter" | "firstDayOfWeek">
> {
  adapter?: DateAdapter;
  firstDayOfWeek?: DayOfWeek;
}

export const DATES_PROVIDER_DEFAULT_SETTINGS: Omit<
  DatesProviderValue,
  "adapter"
> = {
  consistentWeeks: false,
  dateFnsLocale: undefined,
  direction: "ltr",
  firstDayOfWeek: 1,
  labelSeparator: "–",
  locale: "en",
  timeZone: undefined,
  weekStartsOn: 1,
  weekendDays: [0, 6],
};

const DEFAULT_ADAPTER_CONTEXT: DateAdapterContext = {
  consistentWeeks: DATES_PROVIDER_DEFAULT_SETTINGS.consistentWeeks,
  dateFnsLocale: DATES_PROVIDER_DEFAULT_SETTINGS.dateFnsLocale,
  locale: DATES_PROVIDER_DEFAULT_SETTINGS.locale,
  timeZone: DATES_PROVIDER_DEFAULT_SETTINGS.timeZone,
  weekStartsOn: DATES_PROVIDER_DEFAULT_SETTINGS.weekStartsOn,
  weekendDays: DATES_PROVIDER_DEFAULT_SETTINGS.weekendDays,
};

const DEFAULT_DATES_PROVIDER_VALUE: DatesProviderValue = {
  ...DATES_PROVIDER_DEFAULT_SETTINGS,
  adapter: DEFAULT_DATE_ADAPTER.withContext(DEFAULT_ADAPTER_CONTEXT),
};

export const DatesProviderContext = createContext<DatesProviderValue>(
  DEFAULT_DATES_PROVIDER_VALUE
);

export interface DatesProviderProps {
  children?: ReactNode;
  settings?: DatesProviderSettings;
}

export const DatesProvider = ({
  children,
  settings = {},
}: DatesProviderProps) => {
  const resolvedWeekStartsOn =
    settings.weekStartsOn ??
    settings.firstDayOfWeek ??
    DATES_PROVIDER_DEFAULT_SETTINGS.weekStartsOn;

  const adapterContext = useMemo<DateAdapterContext>(
    () => ({
      consistentWeeks:
        settings.consistentWeeks ??
        DATES_PROVIDER_DEFAULT_SETTINGS.consistentWeeks,
      dateFnsLocale:
        settings.dateFnsLocale ?? DATES_PROVIDER_DEFAULT_SETTINGS.dateFnsLocale,
      locale: settings.locale ?? DATES_PROVIDER_DEFAULT_SETTINGS.locale,
      timeZone: settings.timeZone ?? DATES_PROVIDER_DEFAULT_SETTINGS.timeZone,
      weekStartsOn: resolvedWeekStartsOn,
      weekendDays:
        settings.weekendDays ?? DATES_PROVIDER_DEFAULT_SETTINGS.weekendDays,
    }),
    [
      resolvedWeekStartsOn,
      settings.consistentWeeks,
      settings.dateFnsLocale,
      settings.locale,
      settings.timeZone,
      settings.weekendDays,
    ]
  );

  const adapter = useMemo<DateAdapter>(
    () => settings.adapter ?? createDateAdapter(adapterContext),
    [adapterContext, settings.adapter]
  );

  const contextValue = useMemo<DatesProviderValue>(
    () => ({
      ...adapterContext,
      adapter,
      direction:
        settings.direction ?? DATES_PROVIDER_DEFAULT_SETTINGS.direction,
      firstDayOfWeek: resolvedWeekStartsOn,
      labelSeparator:
        settings.labelSeparator ??
        DATES_PROVIDER_DEFAULT_SETTINGS.labelSeparator,
    }),
    [
      adapter,
      adapterContext,
      resolvedWeekStartsOn,
      settings.direction,
      settings.labelSeparator,
    ]
  );

  return (
    <DatesProviderContext.Provider value={contextValue}>
      {children}
    </DatesProviderContext.Provider>
  );
};
