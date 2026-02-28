import { afterEach, describe, expect, it } from "bun:test";

import { fireEvent, render, screen, within } from "@testing-library/react";

import { createDateAdapter } from "../../../adapter";
import { DatesProvider } from "../../dates-provider";
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

const getRequiredElement = <T extends Element>(
  value: T | null,
  expectedType: new () => T,
  message: string
): T => {
  expect(value).toBeInstanceOf(expectedType);
  if (!(value instanceof expectedType)) {
    throw new Error(message);
  }
  return value;
};

const getRequiredAttribute = (
  element: Element,
  attributeName: string,
  message: string
): string => {
  const attributeValue = element.getAttribute(attributeName);
  expect(attributeValue).toBeTruthy();
  if (!attributeValue) {
    throw new Error(message);
  }
  return attributeValue;
};

const getRequiredWeekNumberCell = (weekRow: HTMLDivElement): HTMLDivElement =>
  getRequiredElement(
    weekRow.querySelector("[data-slot='week-number']"),
    HTMLDivElement,
    "Expected week-number cell in each week row"
  );

const getRequiredWeekNumberRowHeader = (
  weekRow: HTMLDivElement
): HTMLDivElement =>
  getRequiredElement(
    weekRow.querySelector("[data-slot='week-number'][role='rowheader']"),
    HTMLDivElement,
    "Expected week-number rowheader in each week row"
  );

const getRequiredFirstDayControl = (
  weekRow: HTMLDivElement
): HTMLButtonElement =>
  getRequiredElement(
    weekRow.querySelector("button[aria-pressed]"),
    HTMLButtonElement,
    "Expected first day control in each week row"
  );

const getWeekNumberText = (weekNumberCell: Element): string =>
  (weekNumberCell.textContent ?? "").trim();

const getExpectedWeekNumberAriaLabel = (
  weekNumberCell: Element,
  weekOfYearLabel: string,
  weekNumberFormatter: Intl.NumberFormat
): string => {
  const weekNumberText = getWeekNumberText(weekNumberCell);
  const parsedWeekNumber = Number(weekNumberText);
  if (weekNumberText.length === 0 || Number.isNaN(parsedWeekNumber)) {
    return weekOfYearLabel;
  }

  return `${weekOfYearLabel} ${weekNumberFormatter.format(parsedWeekNumber)}`;
};

describe("calendar keyboard shortcuts", () => {
  it("supports Ctrl+ArrowUp/Down year navigation from month view", () => {
    render(
      <DatesProvider locale="en-US">
        <Calendar defaultMonth={new Date(2026, 1, 1)} />
      </DatesProvider>
    );

    const dayControl = screen.getByRole("button", { name: "February 1, 2026" });
    dayControl.focus();

    fireEvent.keyDown(dayControl, { ctrlKey: true, key: "ArrowDown" });
    expect(
      screen.getByRole("button", { name: /^February 2027/ })
    ).toBeDefined();

    const nextYearDayControl = screen.getByRole("button", {
      name: "February 1, 2027",
    });
    nextYearDayControl.focus();
    fireEvent.keyDown(nextYearDayControl, { ctrlKey: true, key: "ArrowUp" });

    expect(
      screen.getByRole("button", { name: /^February 2026/ })
    ).toBeDefined();
  });

  it("supports Cmd+Shift+ArrowUp/Down decade navigation from month view", () => {
    render(
      <DatesProvider locale="en-US">
        <Calendar defaultMonth={new Date(2026, 1, 1)} />
      </DatesProvider>
    );

    const dayControl = screen.getByRole("button", { name: "February 1, 2026" });
    dayControl.focus();

    fireEvent.keyDown(dayControl, {
      key: "ArrowDown",
      metaKey: true,
      shiftKey: true,
    });
    expect(
      screen.getByRole("button", { name: /^February 2036/ })
    ).toBeDefined();

    const nextDecadeDayControl = screen.getByRole("button", {
      name: "February 1, 2036",
    });
    nextDecadeDayControl.focus();
    fireEvent.keyDown(nextDecadeDayControl, {
      key: "ArrowUp",
      metaKey: true,
      shiftKey: true,
    });
    expect(
      screen.getByRole("button", { name: /^February 2026/ })
    ).toBeDefined();
  });

  it("switches to year level on Y key while in month view", () => {
    const { container } = render(
      <DatesProvider locale="en-US">
        <Calendar defaultMonth={new Date(2026, 1, 1)} />
      </DatesProvider>
    );

    const dayControl = screen.getByRole("button", { name: "February 1, 2026" });
    dayControl.focus();

    fireEvent.keyDown(dayControl, { key: "y" });

    expect(
      container.querySelector("[data-slot='year-level-group']")
    ).toBeTruthy();
    expect(
      container.querySelector("[data-slot='month-level-group']")
    ).toBeNull();
  });

  it("keeps keyboard shortcuts scoped to the focused calendar instance", () => {
    render(
      <DatesProvider locale="en-US">
        <div>
          <Calendar
            data-testid="calendar-a"
            defaultMonth={new Date(2026, 1, 1)}
          />
          <Calendar
            data-testid="calendar-b"
            defaultMonth={new Date(2030, 1, 1)}
          />
        </div>
      </DatesProvider>
    );

    const firstCalendar = screen.getByTestId("calendar-a");
    const secondCalendar = screen.getByTestId("calendar-b");

    const firstDay = within(firstCalendar).getByRole("button", {
      name: "February 1, 2026",
    });

    firstDay.focus();
    fireEvent.keyDown(firstDay, { ctrlKey: true, key: "ArrowDown" });

    expect(
      within(firstCalendar).getByRole("button", { name: /^February 2027/ })
    ).toBeDefined();
    expect(
      within(secondCalendar).getByRole("button", { name: /^February 2030/ })
    ).toBeDefined();
  });
});

describe("calendar week numbers", () => {
  it("renders week numbers using adapter.getWeekNumber", () => {
    const adapter = createDateAdapter();
    const { container } = render(
      <DatesProvider locale="en-US">
        <Calendar defaultMonth={new Date(2026, 1, 1)} withWeekNumbers />
      </DatesProvider>
    );

    const weekRows = [
      ...container.querySelectorAll("[data-slot='month'] [data-week]"),
    ] as HTMLDivElement[];

    expect(weekRows.length).toBeGreaterThan(0);

    for (const weekRow of weekRows) {
      const weekNumberCell = getRequiredWeekNumberCell(weekRow);
      const firstDayControl = getRequiredFirstDayControl(weekRow);
      const dateLabel = getRequiredAttribute(
        firstDayControl,
        "aria-label",
        "Expected aria-label on week row day control"
      );
      const parsedDate = new Date(dateLabel);

      expect(Number.isNaN(parsedDate.getTime())).toBe(false);
      expect(weekNumberCell.textContent).toBe(
        String(adapter.getWeekNumber(parsedDate))
      );
    }
  });

  it("localizes week-number rowheader aria labels", () => {
    const locale = "fr-FR";
    const weekOfYearLabel = getWeekOfYearLabel(locale);
    const weekNumberFormatter = new Intl.NumberFormat(locale);
    const { container } = render(
      <DatesProvider locale={locale}>
        <Calendar defaultMonth={new Date(2026, 1, 1)} withWeekNumbers />
      </DatesProvider>
    );

    const weekRows = [
      ...container.querySelectorAll("[data-slot='month'] [data-week]"),
    ] as HTMLDivElement[];

    expect(weekRows.length).toBeGreaterThan(0);

    for (const weekRow of weekRows) {
      const weekNumberCell = getRequiredWeekNumberRowHeader(weekRow);
      const expectedAriaLabel = getExpectedWeekNumberAriaLabel(
        weekNumberCell,
        weekOfYearLabel,
        weekNumberFormatter
      );

      expect(weekNumberCell.getAttribute("aria-label")).toBe(expectedAriaLabel);
    }
  });
});
