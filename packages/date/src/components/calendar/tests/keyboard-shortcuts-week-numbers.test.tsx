import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

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
      const weekNumberCell = weekRow.querySelector("[data-slot='week-number']");
      const firstDayControl = weekRow.querySelector("button[aria-pressed]");
      const dateLabel = firstDayControl?.getAttribute("aria-label");
      const parsedDate = dateLabel ? new Date(dateLabel) : null;
      const expectedWeekNumber = parsedDate
        ? adapter.getWeekNumber(parsedDate)
        : null;

      expect(weekNumberCell?.textContent).toBe(
        expectedWeekNumber ? String(expectedWeekNumber) : ""
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
      const weekNumberCell = weekRow.querySelector(
        "[data-slot='week-number'][role='rowheader']"
      );
      const weekNumberText = weekNumberCell?.textContent?.trim() ?? "";
      const parsedWeekNumber = Number(weekNumberText);
      const expectedAriaLabel =
        weekNumberText.length === 0 || Number.isNaN(parsedWeekNumber)
          ? weekOfYearLabel
          : `${weekOfYearLabel} ${weekNumberFormatter.format(parsedWeekNumber)}`;

      expect(weekNumberCell?.getAttribute("aria-label")).toBe(
        expectedAriaLabel
      );
    }
  });
});
