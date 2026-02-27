import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { DatesProvider } from "../../components/dates-provider";
import { MonthPickerInput } from "../../components/inputs/month-picker-input";
import { YearPickerInput } from "../../components/inputs/year-picker-input";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("MonthPickerInput/YearPickerInput", () => {
  it("serializes multiple month selections into hidden input", () => {
    render(
      <DatesProvider locale="en-US">
        <MonthPickerInput
          name="months"
          placeholder="Pick months"
          selectionMode="multiple"
        />
      </DatesProvider>
    );

    fireEvent.click(screen.getByLabelText("Toggle picker"));

    const controls = [
      ...document.querySelectorAll("[data-slot='months-list'] button"),
    ] as HTMLButtonElement[];

    const firstControl = controls[0];
    const secondControl = controls[1];

    expect(firstControl).toBeDefined();
    expect(secondControl).toBeDefined();

    if (!firstControl || !secondControl) {
      throw new Error("Expected at least two month controls");
    }

    fireEvent.click(firstControl);
    fireEvent.click(secondControl);

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='months']"
    ) as HTMLInputElement | null;

    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput?.value.split(",")).toHaveLength(2);
  });

  it("serializes year range selection into hidden input", () => {
    render(
      <DatesProvider locale="en-US">
        <YearPickerInput
          name="years"
          placeholder="Pick years"
          selectionMode="range"
        />
      </DatesProvider>
    );

    fireEvent.click(screen.getByLabelText("Toggle picker"));

    const controls = [
      ...document.querySelectorAll("[data-slot='years-list'] button"),
    ] as HTMLButtonElement[];

    const firstControl = controls[0];
    const secondControl = controls[1];

    expect(firstControl).toBeDefined();
    expect(secondControl).toBeDefined();

    if (!firstControl || !secondControl) {
      throw new Error("Expected at least two year controls");
    }

    fireEvent.click(firstControl);
    fireEvent.click(secondControl);

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='years']"
    ) as HTMLInputElement | null;

    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput?.value).toMatch(
      /^\d{4}-\d{2}-\d{2}\.\.\d{4}-\d{2}-\d{2}$/
    );
  });
});
