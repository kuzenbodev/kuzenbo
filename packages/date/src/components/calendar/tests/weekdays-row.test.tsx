import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { DatesProvider } from "../../dates-provider";
import { WeekdaysRow } from "../weekdays-row";

afterEach(cleanup);

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

describe("WeekdaysRow", () => {
  it("respects firstDayOfWeek from DatesProvider", () => {
    const { container } = render(
      <DatesProvider firstDayOfWeek={1} locale="en-US">
        <WeekdaysRow />
      </DatesProvider>
    );

    const weekdayCells = container.querySelectorAll("[data-weekday]");

    expect(weekdayCells[0]?.textContent).toBe("Mon");
    expect(weekdayCells).toHaveLength(7);
  });

  it("renders a localized week-number heading label", () => {
    const locale = "fr-FR";
    const { container } = render(
      <DatesProvider firstDayOfWeek={1} locale={locale}>
        <WeekdaysRow withWeekNumbers />
      </DatesProvider>
    );

    expect(
      screen.getByRole("columnheader", { name: getWeekOfYearLabel(locale) })
    ).toBeDefined();

    const columnHeaders = container.querySelectorAll("[role='columnheader']");
    expect(columnHeaders).toHaveLength(8);
  });
});
