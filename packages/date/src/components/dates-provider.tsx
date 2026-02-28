"use client";

import type { ReactNode } from "react";

import type {
  DatesProviderSettings as CoreDatesProviderSettings,
  DatesProviderValue,
} from "../context";
import type { DayOfWeek } from "../types";

import {
  DATES_PROVIDER_DEFAULT_SETTINGS,
  DatesProvider as CoreDatesProvider,
  DatesProviderContext,
} from "../context";

const normalizeDayOfWeek = (value: number): DayOfWeek => {
  const normalizedValue = value % 7;
  const resolvedValue =
    normalizedValue < 0 ? normalizedValue + 7 : normalizedValue;
  return resolvedValue as DayOfWeek;
};

export interface DatesProviderProps extends Omit<
  CoreDatesProviderSettings,
  "firstDayOfWeek"
> {
  children?: ReactNode;
  firstDayOfWeek?: number;
  settings?: CoreDatesProviderSettings;
}

export type DatesProviderSettings = CoreDatesProviderSettings;

export const DatesProvider = ({
  children,
  firstDayOfWeek,
  settings,
  ...providerProps
}: DatesProviderProps) => {
  const normalizedFirstDayOfWeek =
    typeof firstDayOfWeek === "number"
      ? normalizeDayOfWeek(firstDayOfWeek)
      : undefined;

  const resolvedSettings: CoreDatesProviderSettings = {
    ...providerProps,
    ...settings,
    firstDayOfWeek:
      settings?.firstDayOfWeek ??
      normalizedFirstDayOfWeek ??
      settings?.weekStartsOn ??
      providerProps.weekStartsOn,
    weekStartsOn:
      settings?.weekStartsOn ??
      normalizedFirstDayOfWeek ??
      providerProps.weekStartsOn,
  };

  return (
    <CoreDatesProvider settings={resolvedSettings}>
      {children}
    </CoreDatesProvider>
  );
};

export { DATES_PROVIDER_DEFAULT_SETTINGS, DatesProviderContext };
export type { DatesProviderValue };
