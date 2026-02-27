import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { DatesProvider } from "../../dates-provider";
import { WeekdaysRow } from "../weekdays-row";

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
