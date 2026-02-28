import { afterEach, describe, expect, it } from "bun:test";

import { fireEvent, render, screen } from "@testing-library/react";

import { DatesProvider } from "../../dates-provider";
import { DatePicker } from "../../pickers/date-picker";
import { Calendar } from "../calendar";

afterEach(() => {
  document.body.innerHTML = "";
});

const getWeekOfYearLabel = (locale: string): string => {
  try {
    return (
      new Intl.DisplayNames(locale, { type: "dateTimeField" }).of(
        "weekOfYear"
      ) ?? "#"
    );
  } catch {
    return "#";
  }
};

const DISABLED_DAY_TIMESTAMP = new Date(2026, 1, 2).getTime();

const getDisabledDayProps = (date: Date) => ({
  disabled: date.getTime() === DISABLED_DAY_TIMESTAMP,
});

describe("calendar keyboard focus", () => {
  it("keeps roving tab order with one tabbable day control", () => {
    render(
      <DatesProvider locale="en-US">
        <DatePicker defaultMonth={new Date(2026, 1, 1)} />
      </DatesProvider>
    );

    const tabbableDays = [
      ...document.querySelectorAll(
        "[data-slot='month'] button[aria-pressed][tabindex='0']"
      ),
    ];

    expect(tabbableDays).toHaveLength(1);
  });

  it("skips disabled day controls while moving focus with keyboard", () => {
    render(
      <DatesProvider locale="en-US">
        <DatePicker
          defaultMonth={new Date(2026, 1, 1)}
          getDayProps={getDisabledDayProps}
        />
      </DatesProvider>
    );

    const dayOne = screen.getByRole("button", { name: "February 1, 2026" });
    const dayThree = screen.getByRole("button", { name: "February 3, 2026" });

    dayOne.focus();
    fireEvent.keyDown(dayOne, { key: "ArrowRight" });

    const activeElement = document.activeElement as HTMLButtonElement | null;

    expect(activeElement?.disabled).toBe(false);
    expect(activeElement?.getAttribute("aria-label")).toBe(
      dayThree.getAttribute("aria-label")
    );
  });

  it("exposes month surface as a semantic grid with deterministic tabbing", () => {
    const { container } = render(
      <DatesProvider locale="en-US">
        <Calendar defaultMonth={new Date(2026, 1, 1)} withWeekNumbers />
      </DatesProvider>
    );

    const monthGrid = container.querySelector("[data-slot='month']");
    const dayTabStops = [
      ...container.querySelectorAll(
        "[data-slot='month'] button[aria-pressed][tabindex='0']"
      ),
    ];
    const weekNumberRowHeaders = container.querySelectorAll(
      "[data-slot='month'] [data-slot='week-number'][role='rowheader']"
    );

    expect(monthGrid?.getAttribute("role")).toBe("grid");
    expect(dayTabStops).toHaveLength(1);
    expect(weekNumberRowHeaders.length).toBeGreaterThan(0);
  });

  it("keeps week numbers out of the tab sequence", () => {
    const locale = "en-US";
    const { container } = render(
      <DatesProvider locale="en-US">
        <Calendar defaultMonth={new Date(2026, 1, 1)} withWeekNumbers />
      </DatesProvider>
    );

    const weekNumberButtons = container.querySelectorAll(
      "[data-slot='week-number'] button"
    );

    expect(weekNumberButtons).toHaveLength(0);
    expect(
      screen.getByRole("columnheader", {
        name: getWeekOfYearLabel(locale),
      })
    ).toBeDefined();
  });
});
