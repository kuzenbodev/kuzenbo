import { afterEach, describe, expect, it } from "bun:test";

import { fireEvent, render } from "@testing-library/react";

import { DatesProvider } from "../../dates-provider";
import type { DatePickerValue } from "../../types";
import { MonthPicker } from "../month-picker";
import { YearPicker } from "../year-picker";

afterEach(() => {
  document.body.innerHTML = "";
});

const expectDefinedValue = <T,>(value: T | undefined, message: string): T => {
  expect(value).toBeDefined();
  if (value === undefined) {
    throw new Error(message);
  }
  return value;
};

const expectArrayPickerValue = (
  value: DatePickerValue,
  message: string
): (Date | null)[] => {
  expect(Array.isArray(value)).toBe(true);
  if (!Array.isArray(value)) {
    throw new TypeError(message);
  }
  return value;
};

describe("MonthPicker/YearPicker parity", () => {
  it("supports multiple selection in MonthPicker", () => {
    let latestValue: DatePickerValue = [];

    const { container } = render(
      <DatesProvider locale="en-US">
        <MonthPicker
          defaultMonth={new Date(2026, 0, 1)}
          selectionMode="multiple"
          onChange={(value) => {
            latestValue = value;
          }}
        />
      </DatesProvider>
    );

    const controls = [
      ...container.querySelectorAll("[data-slot='months-list'] button"),
    ] as HTMLButtonElement[];

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

    const resolvedLatestValue = expectArrayPickerValue(
      latestValue,
      "Expected month picker value to be an array"
    );
    expect(resolvedLatestValue.length).toBe(2);
  });

  it("supports range sorting and single-date ranges in YearPicker", () => {
    let latestValue: DatePickerValue = [null, null];

    const { container, rerender } = render(
      <DatesProvider locale="en-US">
        <YearPicker
          defaultYear={new Date(2026, 0, 1)}
          selectionMode="range"
          onChange={(value) => {
            latestValue = value;
          }}
        />
      </DatesProvider>
    );

    const controls = [
      ...container.querySelectorAll("[data-slot='years-list'] button"),
    ] as HTMLButtonElement[];

    const thirdControl = expectDefinedValue(
      controls[2],
      "Expected at least three year controls"
    );
    const firstControl = expectDefinedValue(
      controls[0],
      "Expected at least three year controls"
    );

    fireEvent.click(thirdControl);
    fireEvent.click(firstControl);

    const sortedRange = expectArrayPickerValue(
      latestValue,
      "Expected year picker range value to be an array"
    ) as [Date | null, Date | null];
    expect(sortedRange[0]).not.toBeNull();
    expect(sortedRange[1]).not.toBeNull();
    expect((sortedRange[0] as Date).getFullYear()).toBeLessThanOrEqual(
      (sortedRange[1] as Date).getFullYear()
    );

    rerender(
      <DatesProvider locale="en-US">
        <YearPicker
          allowSingleDateInRange
          defaultYear={new Date(2026, 0, 1)}
          selectionMode="range"
          onChange={(value) => {
            latestValue = value;
          }}
        />
      </DatesProvider>
    );

    const updatedControls = [
      ...container.querySelectorAll("[data-slot='years-list'] button"),
    ] as HTMLButtonElement[];

    const firstUpdatedControl = expectDefinedValue(
      updatedControls[0],
      "Expected at least one year control after rerender"
    );

    fireEvent.click(firstUpdatedControl);
    fireEvent.click(firstUpdatedControl);

    const singleRange = expectArrayPickerValue(
      latestValue,
      "Expected year picker single range value to be an array"
    ) as [Date | null, Date | null];
    expect(singleRange[0]).not.toBeNull();
    expect(singleRange[1]).not.toBeNull();
    expect((singleRange[0] as Date).getFullYear()).toBe(
      (singleRange[1] as Date).getFullYear()
    );
  });

  it("supports multi-column keyboard traversal for month controls", () => {
    const { container } = render(
      <DatesProvider locale="en-US">
        <MonthPicker defaultMonth={new Date(2026, 0, 1)} numberOfColumns={2} />
      </DatesProvider>
    );

    const columns = [
      ...container.querySelectorAll("[data-slot='year-level']"),
    ] as HTMLDivElement[];

    const firstColumn = expectDefinedValue(
      columns[0],
      "Expected month picker to render two columns"
    );
    const secondColumn = expectDefinedValue(
      columns[1],
      "Expected month picker to render two columns"
    );

    const firstColumnControls = [
      ...firstColumn.querySelectorAll("[data-slot='months-list'] button"),
    ] as HTMLButtonElement[];
    const secondColumnControls = [
      ...secondColumn.querySelectorAll("[data-slot='months-list'] button"),
    ] as HTMLButtonElement[];

    const lastControlInFirstColumn = expectDefinedValue(
      firstColumnControls.at(-1),
      "Expected controls in both month columns"
    );
    const firstControlInSecondColumn = expectDefinedValue(
      secondColumnControls[0],
      "Expected controls in both month columns"
    );

    lastControlInFirstColumn.focus();
    fireEvent.keyDown(lastControlInFirstColumn, { key: "ArrowRight" });

    expect(document.activeElement).toBe(firstControlInSecondColumn);
  });
});
