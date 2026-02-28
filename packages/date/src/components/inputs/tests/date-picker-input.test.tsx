import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { DatesProvider } from "../../dates-provider";
import { DatePickerInput } from "../date-picker-input";

afterEach(() => {
  cleanup();
});

const openPicker = () => {
  fireEvent.click(screen.getByLabelText("Toggle picker"));
};

const getDayButtons = () =>
  [
    ...document.querySelectorAll("[data-slot='month'] button[aria-pressed]"),
  ].filter(
    (button): button is HTMLButtonElement =>
      button instanceof HTMLButtonElement && !button.disabled
  );

const expectPickerOpened = async (opened: boolean) => {
  await waitFor(() => {
    if (opened) {
      expect(
        document.querySelector("[data-slot='popover-popup']")
      ).not.toBeNull();
      return;
    }

    expect(document.querySelector("[data-slot='popover-popup']")).toBeNull();
  });
};

describe("DatePickerInput", () => {
  it("selects a date and syncs hidden input serialization", () => {
    render(
      <DatesProvider locale="en-US">
        <DatePickerInput
          form="external-date-picker-form"
          name="appointment"
          selectionMode="single"
          placeholder="Pick a date"
        />
      </DatesProvider>
    );

    openPicker();

    const [dateButton] = getDayButtons();

    expect(dateButton).toBeDefined();
    if (!dateButton) {
      throw new Error("Expected at least one day button in the month grid");
    }

    fireEvent.click(dateButton);

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='appointment']"
    ) as HTMLInputElement | null;

    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput?.getAttribute("form")).toBe("external-date-picker-form");
    expect(hiddenInput?.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(screen.getByPlaceholderText("Pick a date")).toBeDefined();
  });

  it("uses provider labelSeparator when prop is omitted", () => {
    render(
      <DatesProvider labelSeparator=" :: " locale="en-US">
        <DatePickerInput
          defaultValue={[new Date(2026, 1, 10), new Date(2026, 1, 14)]}
          placeholder="Range input"
          selectionMode="range"
          valueFormat="yyyy/MM/dd"
        />
      </DatesProvider>
    );

    const input = screen.getByPlaceholderText(
      "Range input"
    ) as HTMLInputElement;

    expect(input.value.includes(" :: ")).toBe(true);
  });

  it("closes after single selection when closeOnChange is true", async () => {
    render(
      <DatesProvider locale="en-US">
        <DatePickerInput closeOnChange placeholder="Pick a date" />
      </DatesProvider>
    );

    openPicker();

    const [firstDayControl] = getDayButtons();

    expect(firstDayControl).toBeDefined();
    if (!firstDayControl) {
      throw new Error("Expected at least one day control");
    }

    fireEvent.click(firstDayControl);

    await expectPickerOpened(false);
  });

  it("keeps open after single selection when closeOnChange is false", async () => {
    render(
      <DatesProvider locale="en-US">
        <DatePickerInput closeOnChange={false} placeholder="Pick a date" />
      </DatesProvider>
    );

    openPicker();

    const [firstDayControl] = getDayButtons();

    expect(firstDayControl).toBeDefined();
    if (!firstDayControl) {
      throw new Error("Expected at least one day control");
    }

    fireEvent.click(firstDayControl);

    await expectPickerOpened(true);
  });

  it("closes range picker only after full range when closeOnChange is true", async () => {
    render(
      <DatesProvider locale="en-US">
        <DatePickerInput
          closeOnChange
          placeholder="Pick range"
          selectionMode="range"
        />
      </DatesProvider>
    );

    openPicker();

    const [firstDayControl, secondDayControl] = getDayButtons();

    expect(firstDayControl).toBeDefined();
    expect(secondDayControl).toBeDefined();
    if (!firstDayControl || !secondDayControl) {
      throw new Error("Expected at least two day controls");
    }

    fireEvent.click(firstDayControl);
    await expectPickerOpened(true);

    fireEvent.click(secondDayControl);
    await expectPickerOpened(false);
  });

  it("keeps range picker open after full range when closeOnChange is false", async () => {
    render(
      <DatesProvider locale="en-US">
        <DatePickerInput
          closeOnChange={false}
          placeholder="Pick range"
          selectionMode="range"
        />
      </DatesProvider>
    );

    openPicker();

    const [firstDayControl, secondDayControl] = getDayButtons();

    expect(firstDayControl).toBeDefined();
    expect(secondDayControl).toBeDefined();
    if (!firstDayControl || !secondDayControl) {
      throw new Error("Expected at least two day controls");
    }

    fireEvent.click(firstDayControl);
    fireEvent.click(secondDayControl);

    await expectPickerOpened(true);
  });

  it("serializes sorted values for multiple selection when sortDates is true", () => {
    render(
      <DatesProvider locale="en-US">
        <DatePickerInput name="dates" selectionMode="multiple" sortDates />
      </DatesProvider>
    );

    openPicker();

    const [firstDayControl, secondDayControl] = getDayButtons();

    expect(firstDayControl).toBeDefined();
    expect(secondDayControl).toBeDefined();
    if (!firstDayControl || !secondDayControl) {
      throw new Error("Expected at least two day controls");
    }

    fireEvent.click(secondDayControl);
    fireEvent.click(firstDayControl);

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='dates']"
    ) as HTMLInputElement | null;

    expect(hiddenInput).not.toBeNull();
    const values = hiddenInput?.value.split(",") ?? [];

    expect(values).toHaveLength(2);
    expect(values).toEqual([...values].toSorted());
  });
});
