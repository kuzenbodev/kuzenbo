import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { DatesProvider } from "../../dates-provider";
import { DatePicker } from "../../pickers/date-picker";

afterEach(() => {
  document.body.innerHTML = "";
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
          getDayProps={(date) => ({
            disabled: date.getMonth() === 1 && date.getDate() === 2,
          })}
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
});
