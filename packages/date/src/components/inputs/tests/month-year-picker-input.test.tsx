import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { DatesProvider } from "../../dates-provider";
import { MonthPickerInput } from "../month-picker-input";
import { YearPickerInput } from "../year-picker-input";

afterEach(() => {
  cleanup();
});

const openPicker = () => {
  fireEvent.click(screen.getByLabelText("Toggle picker"));
};

const getPickerControls = (slot: "months-list" | "years-list") =>
  [
    ...document.querySelectorAll(`[data-slot='${slot}'] button`),
  ] as HTMLButtonElement[];

const expectDefinedValue = <T,>(value: T | undefined, message: string): T => {
  expect(value).toBeDefined();
  if (value === undefined) {
    throw new Error(message);
  }
  return value;
};

describe("MonthPickerInput/YearPickerInput", () => {
  it("serializes multiple month selections into hidden input", () => {
    render(
      <DatesProvider locale="en-US">
        <MonthPickerInput
          form="external-month-picker-form"
          name="months"
          placeholder="Pick months"
          selectionMode="multiple"
        />
      </DatesProvider>
    );

    openPicker();

    const controls = getPickerControls("months-list");

    const firstControl = expectDefinedValue(
      controls[0],
      "Expected at least two month controls"
    );
    const secondControl = expectDefinedValue(
      controls[1],
      "Expected at least two month controls"
    );

    fireEvent.click(firstControl);
    fireEvent.click(secondControl);

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='months']"
    ) as HTMLInputElement | null;

    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput?.getAttribute("form")).toBe(
      "external-month-picker-form"
    );
    expect(hiddenInput?.value.split(",")).toHaveLength(2);
  });

  it("serializes year range selection into hidden input", () => {
    render(
      <DatesProvider locale="en-US">
        <YearPickerInput
          form="external-year-picker-form"
          name="years"
          placeholder="Pick years"
          selectionMode="range"
        />
      </DatesProvider>
    );

    openPicker();

    const controls = getPickerControls("years-list");

    const firstControl = expectDefinedValue(
      controls[0],
      "Expected at least two year controls"
    );
    const secondControl = expectDefinedValue(
      controls[1],
      "Expected at least two year controls"
    );

    fireEvent.click(firstControl);
    fireEvent.click(secondControl);

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='years']"
    ) as HTMLInputElement | null;

    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput?.getAttribute("form")).toBe("external-year-picker-form");
    expect(hiddenInput?.value).toMatch(
      /^\d{4}-\d{2}-\d{2}\.\.\d{4}-\d{2}-\d{2}$/
    );
  });

  it("applies valueFormat in MonthPickerInput", () => {
    render(
      <DatesProvider locale="en-US">
        <MonthPickerInput
          placeholder="Pick month"
          valueFormat="'month-format:'MM-yyyy"
        />
      </DatesProvider>
    );

    openPicker();

    const controls = getPickerControls("months-list");
    const firstControl = expectDefinedValue(
      controls[0],
      "Expected at least one month control"
    );

    fireEvent.click(firstControl);

    const input = screen.getByPlaceholderText("Pick month") as HTMLInputElement;
    expect(input.value).toMatch(/^month-format:\d{2}-\d{4}$/);
  });

  it("applies valueFormat in YearPickerInput", () => {
    render(
      <DatesProvider locale="en-US">
        <YearPickerInput
          placeholder="Pick year"
          valueFormat="'year-format:'yyyy"
        />
      </DatesProvider>
    );

    openPicker();

    const controls = getPickerControls("years-list");
    const firstControl = expectDefinedValue(
      controls[0],
      "Expected at least one year control"
    );

    fireEvent.click(firstControl);

    const input = screen.getByPlaceholderText("Pick year") as HTMLInputElement;
    expect(input.value).toMatch(/^year-format:\d{4}$/);
  });

  it("applies valueFormatter in MonthPickerInput", () => {
    render(
      <DatesProvider locale="en-US">
        <MonthPickerInput
          placeholder="Pick month"
          valueFormatter={() => "custom-month-value"}
        />
      </DatesProvider>
    );

    openPicker();

    const controls = getPickerControls("months-list");
    const firstControl = expectDefinedValue(
      controls[0],
      "Expected at least one month control"
    );

    fireEvent.click(firstControl);

    const input = screen.getByPlaceholderText("Pick month") as HTMLInputElement;
    expect(input.value).toBe("custom-month-value");
  });

  it("applies valueFormatter in YearPickerInput", () => {
    render(
      <DatesProvider locale="en-US">
        <YearPickerInput
          placeholder="Pick year"
          valueFormatter={() => "custom-year-value"}
        />
      </DatesProvider>
    );

    openPicker();

    const controls = getPickerControls("years-list");
    const firstControl = expectDefinedValue(
      controls[0],
      "Expected at least one year control"
    );

    fireEvent.click(firstControl);

    const input = screen.getByPlaceholderText("Pick year") as HTMLInputElement;
    expect(input.value).toBe("custom-year-value");
  });

  it("applies labelSeparator in MonthPickerInput range display", () => {
    render(
      <DatesProvider locale="en-US">
        <MonthPickerInput
          labelSeparator="to"
          placeholder="Pick month range"
          selectionMode="range"
        />
      </DatesProvider>
    );

    openPicker();

    const controls = getPickerControls("months-list");
    const firstControl = expectDefinedValue(
      controls[0],
      "Expected at least two month controls"
    );
    const secondControl = expectDefinedValue(
      controls[1],
      "Expected at least two month controls"
    );

    fireEvent.click(firstControl);
    fireEvent.click(secondControl);

    const input = screen.getByPlaceholderText(
      "Pick month range"
    ) as HTMLInputElement;
    expect(input.value).toContain(" to ");
  });

  it("applies labelSeparator in YearPickerInput range display", () => {
    render(
      <DatesProvider locale="en-US">
        <YearPickerInput
          labelSeparator="to"
          placeholder="Pick year range"
          selectionMode="range"
        />
      </DatesProvider>
    );

    openPicker();

    const controls = getPickerControls("years-list");
    const firstControl = expectDefinedValue(
      controls[0],
      "Expected at least two year controls"
    );
    const secondControl = expectDefinedValue(
      controls[1],
      "Expected at least two year controls"
    );

    fireEvent.click(firstControl);
    fireEvent.click(secondControl);

    const input = screen.getByPlaceholderText(
      "Pick year range"
    ) as HTMLInputElement;
    expect(input.value).toContain(" to ");
  });

  it("uses provider labelSeparator for month range when prop is omitted", () => {
    render(
      <DatesProvider labelSeparator=" <> " locale="en-US">
        <MonthPickerInput
          defaultValue={[new Date(2026, 1, 1), new Date(2026, 3, 1)]}
          placeholder="Month range"
          selectionMode="range"
          valueFormat="MM/yyyy"
        />
      </DatesProvider>
    );

    const input = screen.getByPlaceholderText(
      "Month range"
    ) as HTMLInputElement;

    expect(input.value.includes(" <> ")).toBe(true);
  });

  it("uses provider labelSeparator for year range when prop is omitted", () => {
    render(
      <DatesProvider labelSeparator=" ~~ " locale="en-US">
        <YearPickerInput
          defaultValue={[new Date(2025, 1, 1), new Date(2027, 1, 1)]}
          placeholder="Year range"
          selectionMode="range"
          valueFormat="yyyy"
        />
      </DatesProvider>
    );

    const input = screen.getByPlaceholderText("Year range") as HTMLInputElement;

    expect(input.value.includes(" ~~ ")).toBe(true);
  });
});
