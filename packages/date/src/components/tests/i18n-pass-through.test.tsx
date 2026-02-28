import { afterEach, describe, expect, it } from "bun:test";

import { render, screen } from "@testing-library/react";

import { WeekdaysRow } from "../calendar/weekdays-row";
import { DatesProvider } from "../dates-provider";
import { DatePicker } from "../pickers/date-picker";

const expectDefinedValue = <T,>(value: T | undefined, message: string): T => {
  expect(value).toBeDefined();
  if (value === undefined) {
    throw new Error(message);
  }
  return value;
};

const getRequiredWeekdayCell = (
  container: HTMLElement,
  weekday: string,
  message: string
): HTMLDivElement => {
  const weekdayCell = container.querySelector(`[data-weekday='${weekday}']`);
  expect(weekdayCell).toBeInstanceOf(HTMLDivElement);
  if (!(weekdayCell instanceof HTMLDivElement)) {
    throw new Error(message);
  }
  return weekdayCell;
};

const getLowercaseText = (element: HTMLElement): string =>
  (element.textContent ?? "").toLowerCase();

afterEach(() => {
  document.body.innerHTML = "";
});

describe("i18n pass-through", () => {
  it("passes custom aria labels through day controls", () => {
    render(
      <DatesProvider locale="en-US">
        <DatePicker
          defaultMonth={new Date(2026, 1, 1)}
          getDayAriaLabel={(date) => `day-${date.getDate()}`}
        />
      </DatesProvider>
    );

    const dayButtons = screen.getAllByRole("button", { name: /^day-/ });

    expect(dayButtons.length).toBeGreaterThan(0);
  });

  it("updates weekday labels when provider locale changes at runtime", () => {
    const { container, rerender } = render(
      <DatesProvider firstDayOfWeek={0} locale="en-US">
        <WeekdaysRow format="short" />
      </DatesProvider>
    );

    const firstWeekdayBefore = getRequiredWeekdayCell(
      container,
      "0",
      "Expected weekday cell before locale update"
    );

    expect(getLowercaseText(firstWeekdayBefore)).toContain("sun");

    rerender(
      <DatesProvider firstDayOfWeek={0} locale="fr-FR">
        <WeekdaysRow format="short" />
      </DatesProvider>
    );

    const firstWeekdayAfter = getRequiredWeekdayCell(
      container,
      "0",
      "Expected weekday cell after locale update"
    );

    expect(getLowercaseText(firstWeekdayAfter)).toContain("dim");
  });

  it("wires locale, first day of week and weekend flags in weekdays row", () => {
    const { container } = render(
      <DatesProvider firstDayOfWeek={0} locale="fr-FR" weekendDays={[1]}>
        <WeekdaysRow format="short" />
      </DatesProvider>
    );

    const weekdayCells = [
      ...container.querySelectorAll("[data-weekday]"),
    ] as HTMLDivElement[];

    const firstWeekdayCell = expectDefinedValue(
      weekdayCells[0],
      "Expected at least two weekday cells"
    );
    const secondWeekdayCell = expectDefinedValue(
      weekdayCells[1],
      "Expected at least two weekday cells"
    );

    expect(firstWeekdayCell.dataset.weekday).toBe("0");
    expect(secondWeekdayCell.dataset.weekend).toBe("true");
    expect(getLowercaseText(firstWeekdayCell)).toContain("dim");
  });
});
