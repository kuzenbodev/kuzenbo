import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { WeekdaysRow } from "../components/calendar/weekdays-row";
import { DatesProvider } from "../components/dates-provider";

afterEach(cleanup);

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
});
