import { afterEach, describe, expect, it } from "bun:test";

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

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

const expectDefinedValue = <T,>(value: T | undefined, message: string): T => {
  expect(value).toBeDefined();
  if (value === undefined) {
    throw new Error(message);
  }
  return value;
};

const expectNotNullValue = <T,>(value: T | null, message: string): T => {
  expect(value).not.toBeNull();
  if (value === null) {
    throw new Error(message);
  }
  return value;
};

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

    const dateButton = expectDefinedValue(
      getDayButtons()[0],
      "Expected at least one day button in the month grid"
    );

    fireEvent.click(dateButton);

    const hiddenInput = expectNotNullValue(
      document.querySelector(
        "input[type='hidden'][name='appointment']"
      ) as HTMLInputElement | null,
      "Expected hidden input for appointment field"
    );

    expect(hiddenInput.getAttribute("form")).toBe("external-date-picker-form");
    expect(hiddenInput.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
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

    const firstDayControl = expectDefinedValue(
      getDayButtons()[0],
      "Expected at least one day control"
    );

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

    const firstDayControl = expectDefinedValue(
      getDayButtons()[0],
      "Expected at least one day control"
    );

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

    const dayButtons = getDayButtons();
    const firstDayControl = expectDefinedValue(
      dayButtons[0],
      "Expected at least two day controls"
    );
    const secondDayControl = expectDefinedValue(
      dayButtons[1],
      "Expected at least two day controls"
    );

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

    const dayButtons = getDayButtons();
    const firstDayControl = expectDefinedValue(
      dayButtons[0],
      "Expected at least two day controls"
    );
    const secondDayControl = expectDefinedValue(
      dayButtons[1],
      "Expected at least two day controls"
    );

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

    const dayButtons = getDayButtons();
    const firstDayControl = expectDefinedValue(
      dayButtons[0],
      "Expected at least two day controls"
    );
    const secondDayControl = expectDefinedValue(
      dayButtons[1],
      "Expected at least two day controls"
    );

    fireEvent.click(secondDayControl);
    fireEvent.click(firstDayControl);

    const hiddenInput = expectNotNullValue(
      document.querySelector(
        "input[type='hidden'][name='dates']"
      ) as HTMLInputElement | null,
      "Expected hidden input for multiple dates"
    );
    const values = hiddenInput.value.split(",");

    expect(values).toHaveLength(2);
    expect(values).toEqual([...values].toSorted());
  });
});
