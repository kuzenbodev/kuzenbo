import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { DatesProvider } from "../../components/dates-provider";
import { MonthPicker } from "../../components/pickers/month-picker";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("RTL navigation", () => {
  it("inverts horizontal keyboard navigation in RTL mode", () => {
    const { container } = render(
      <DatesProvider direction="rtl" locale="en-US">
        <MonthPicker defaultMonth={new Date(2026, 0, 1)} />
      </DatesProvider>
    );

    const controls = [
      ...container.querySelectorAll("[data-slot='months-list'] button"),
    ] as HTMLButtonElement[];

    const secondControl = controls[1];
    const firstControl = controls[0];

    expect(firstControl).toBeDefined();
    expect(secondControl).toBeDefined();

    if (!firstControl || !secondControl) {
      throw new Error("Expected at least two month controls");
    }

    secondControl.focus();
    fireEvent.keyDown(secondControl, { key: "ArrowRight" });

    expect(document.activeElement).toBe(firstControl);

    fireEvent.keyDown(firstControl, { key: "ArrowLeft" });

    expect(document.activeElement).toBe(secondControl);
  });

  it("inverts previous/next header icon direction in RTL mode", () => {
    render(
      <DatesProvider direction="rtl" locale="en-US">
        <MonthPicker defaultMonth={new Date(2026, 0, 1)} />
      </DatesProvider>
    );

    const previousButton = screen.getByRole("button", { name: "Previous" });
    const nextButton = screen.getByRole("button", { name: "Next" });

    expect(previousButton.querySelector("[data-arrow='right']")).not.toBeNull();
    expect(nextButton.querySelector("[data-arrow='left']")).not.toBeNull();
  });
});
