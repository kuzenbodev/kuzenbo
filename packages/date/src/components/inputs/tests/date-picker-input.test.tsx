import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { DatesProvider } from "../../dates-provider";
import { DatePickerInput } from "../date-picker-input";

afterEach(() => {
  cleanup();
});

describe("DatePickerInput", () => {
  it("selects a date and syncs hidden input serialization", () => {
    render(
      <DatesProvider locale="en-US">
        <DatePickerInput
          name="appointment"
          pickerType="default"
          placeholder="Pick a date"
        />
      </DatesProvider>
    );

    fireEvent.click(screen.getByLabelText("Toggle picker"));

    const [dateButton] = [
      ...document.querySelectorAll("[data-slot='month'] button[aria-pressed]"),
    ] as HTMLButtonElement[];

    expect(dateButton).toBeDefined();
    if (!dateButton) {
      throw new Error("Expected at least one day button in the month grid");
    }

    fireEvent.click(dateButton);

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='appointment']"
    ) as HTMLInputElement | null;

    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput?.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(screen.getByPlaceholderText("Pick a date")).toBeDefined();
  });
});
