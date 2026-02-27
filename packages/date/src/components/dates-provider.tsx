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
  ...legacySettings
}: DatesProviderProps) => {
  const normalizedFirstDayOfWeek =
    typeof firstDayOfWeek === "number"
      ? normalizeDayOfWeek(firstDayOfWeek)
      : undefined;

  const resolvedSettings: CoreDatesProviderSettings = {
    ...legacySettings,
    ...settings,
    firstDayOfWeek:
      settings?.firstDayOfWeek ??
      normalizedFirstDayOfWeek ??
      settings?.weekStartsOn ??
      legacySettings.weekStartsOn,
    weekStartsOn:
      settings?.weekStartsOn ??
      normalizedFirstDayOfWeek ??
      legacySettings.weekStartsOn,
  };

  return (
    <CoreDatesProvider settings={resolvedSettings}>
      {children}
    </CoreDatesProvider>
  );
};

export { DATES_PROVIDER_DEFAULT_SETTINGS, DatesProviderContext };
export type { DatesProviderValue };
