import { cleanup, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";
import { arSA } from "react-day-picker/locale";

import { Calendar } from "../calendar";

afterEach(cleanup);

describe("Calendar integration behavior", () => {
  it("applies range start, middle, and end states in range mode", async () => {
    const user = userEvent.setup();

    render(<Calendar defaultMonth={new Date(2025, 0)} mode="range" />);

    const start = document.querySelector(
      'button[aria-label*="January 10th, 2025"]'
    ) as HTMLButtonElement;
    const middle = document.querySelector(
      'button[aria-label*="January 11th, 2025"]'
    ) as HTMLButtonElement;
    const end = document.querySelector(
      'button[aria-label*="January 13th, 2025"]'
    ) as HTMLButtonElement;

    await user.click(start);
    await user.click(end);

    expect(start.dataset.rangeStart).toBe("true");
    expect(middle.dataset.rangeMiddle).toBe("true");
    expect(end.dataset.rangeEnd).toBe("true");
  });

  it("renders week number header and cells when showWeekNumber is enabled", () => {
    render(<Calendar defaultMonth={new Date(2025, 0)} showWeekNumber />);

    expect(document.querySelectorAll("th.rdp-week_number_header").length).toBe(
      1
    );
    expect(
      document.querySelectorAll("td.rdp-week_number").length
    ).toBeGreaterThan(0);
  });

  it("renders multiple month grids when numberOfMonths is two", () => {
    render(<Calendar defaultMonth={new Date(2025, 0)} numberOfMonths={2} />);

    expect(document.querySelectorAll("table[role=grid]").length).toBe(2);
  });

  it("renders month and year dropdown controls when captionLayout is dropdown", () => {
    render(
      <Calendar captionLayout="dropdown" defaultMonth={new Date(2025, 0)} />
    );

    expect(
      document.querySelectorAll("select.rdp-dropdown").length
    ).toBeGreaterThan(0);
  });

  it("supports locale + rtl mode with interactive selection", async () => {
    const user = userEvent.setup();

    render(
      <Calendar
        defaultMonth={new Date(2025, 0)}
        dir="rtl"
        locale={arSA}
        mode="single"
      />
    );

    const root = document.querySelector("[data-slot=calendar]");
    const dayButton = document.querySelector("button[data-day]");

    expect(root).not.toBeNull();
    expect(root?.getAttribute("dir")).toBe("rtl");
    expect(dayButton).not.toBeNull();

    await user.click(dayButton as HTMLButtonElement);

    expect(
      document.querySelector('[data-selected-single="true"]')
    ).not.toBeNull();
  });
});
