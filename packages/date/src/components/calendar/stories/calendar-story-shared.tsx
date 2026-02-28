import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useState } from "react";

import { DatesProvider } from "../../dates-provider";
import { Calendar } from "../calendar";

const excludeSunday = (date: Date): boolean => date.getDay() === 0;

export const baseMeta = {
  title: "Components/Date/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    selectionMode: "single",
  },
} satisfies Meta<typeof Calendar>;

type Story = StoryObj<typeof baseMeta>;

const LocaleRuntimeSwitchingExample = () => {
  const [locale, setLocale] = useState("en-US");
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(0);

  const setEnglish = useCallback(() => {
    setLocale("en-US");
    setFirstDayOfWeek(0);
  }, []);

  const setFrench = useCallback(() => {
    setLocale("fr-FR");
    setFirstDayOfWeek(1);
  }, []);

  const setGerman = useCallback(() => {
    setLocale("de-DE");
    setFirstDayOfWeek(1);
  }, []);

  return (
    <DatesProvider
      firstDayOfWeek={firstDayOfWeek}
      locale={locale}
      timeZone="UTC"
    >
      <div className="flex max-w-sm flex-col gap-3">
        <Calendar defaultMonth={new Date(2026, 1, 1)} selectionMode="single" />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={setEnglish}>
            en-US
          </button>
          <button type="button" onClick={setFrench}>
            fr-FR
          </button>
          <button type="button" onClick={setGerman}>
            de-DE
          </button>
        </div>
      </div>
    </DatesProvider>
  );
};

const RtlTraversalExample = () => {
  const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");

  const setLtrDirection = useCallback(() => {
    setDirection("ltr");
  }, []);

  const setRtlDirection = useCallback(() => {
    setDirection("rtl");
  }, []);

  return (
    <DatesProvider
      direction={direction}
      firstDayOfWeek={direction === "rtl" ? 6 : 1}
      locale={direction === "rtl" ? "ar-SA" : "en-US"}
      timeZone="UTC"
    >
      <div className="flex max-w-sm flex-col gap-3">
        <Calendar
          defaultDate={new Date(2026, 1, 14)}
          defaultMonth={new Date(2026, 1, 1)}
          numberOfColumns={2}
          selectionMode="single"
        />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={setRtlDirection}>
            RTL
          </button>
          <button type="button" onClick={setLtrDirection}>
            LTR
          </button>
        </div>
      </div>
    </DatesProvider>
  );
};

export const Default: Story = {
  args: {
    defaultMonth: new Date(2026, 1, 1),
  },
};

export const SelectionModes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Calendar defaultMonth={new Date(2026, 1, 1)} selectionMode="single" />
      <Calendar defaultMonth={new Date(2026, 1, 1)} selectionMode="multiple" />
      <Calendar defaultMonth={new Date(2026, 1, 1)} selectionMode="range" />
    </div>
  ),
};

export const Constraints: Story = {
  render: () => (
    <Calendar
      defaultMonth={new Date(2026, 1, 1)}
      excludeDate={excludeSunday}
      maxDate={new Date(2026, 1, 25)}
      minDate={new Date(2026, 1, 5)}
      selectionMode="single"
    />
  ),
};

export const Rtl: Story = {
  render: () => (
    <DatesProvider direction="rtl" firstDayOfWeek={6} locale="ar-SA">
      <Calendar defaultMonth={new Date(2026, 1, 1)} selectionMode="single" />
    </DatesProvider>
  ),
};

export const Locale: Story = {
  render: () => (
    <DatesProvider firstDayOfWeek={1} locale="fr-FR">
      <Calendar defaultMonth={new Date(2026, 1, 1)} selectionMode="single" />
    </DatesProvider>
  ),
};

export const TimezoneDst: Story = {
  render: () => (
    <div className="grid gap-3 md:grid-cols-2">
      <DatesProvider locale="en-US" timeZone="America/New_York">
        <Calendar defaultMonth={new Date("2026-03-08T00:00:00.000Z")} />
      </DatesProvider>
      <DatesProvider locale="en-GB" timeZone="Europe/Berlin">
        <Calendar defaultMonth={new Date("2026-03-29T00:00:00.000Z")} />
      </DatesProvider>
    </div>
  ),
};

export const WeekNumbers: Story = {
  render: () => (
    <DatesProvider firstDayOfWeek={1} locale="en-US">
      <div className="grid gap-3 md:grid-cols-2">
        <Calendar defaultMonth={new Date(2026, 1, 1)} selectionMode="single" />
        <Calendar
          defaultMonth={new Date(2026, 1, 1)}
          selectionMode="single"
          withWeekNumbers
        />
      </div>
    </DatesProvider>
  ),
};

export const LocaleRuntimeSwitching: Story = {
  render: LocaleRuntimeSwitchingExample,
};

export const RtlTraversal: Story = {
  render: RtlTraversalExample,
};
