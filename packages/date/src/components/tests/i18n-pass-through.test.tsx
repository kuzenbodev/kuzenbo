import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { WeekdaysRow } from "../calendar/weekdays-row";
import { DatesProvider } from "../dates-provider";
import { DatePicker } from "../pickers/date-picker";

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

  it("wires locale, first day of week and weekend flags in weekdays row", () => {
    const { container } = render(
      <DatesProvider firstDayOfWeek={0} locale="fr-FR" weekendDays={[1]}>
        <WeekdaysRow format="short" />
      </DatesProvider>
    );

    const weekdayCells = [
      ...container.querySelectorAll("[data-weekday]"),
    ] as HTMLDivElement[];

    const firstWeekdayCell = weekdayCells[0];
    const secondWeekdayCell = weekdayCells[1];

    expect(firstWeekdayCell).toBeDefined();
    expect(secondWeekdayCell).toBeDefined();

    if (!firstWeekdayCell || !secondWeekdayCell) {
      throw new Error("Expected at least two weekday cells");
    }

    expect(firstWeekdayCell.dataset.weekday).toBe("0");
    expect(secondWeekdayCell.dataset.weekend).toBe("true");
    expect((firstWeekdayCell.textContent ?? "").toLowerCase()).toContain("dim");
  });
});
