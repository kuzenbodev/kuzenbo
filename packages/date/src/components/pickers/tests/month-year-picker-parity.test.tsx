import { fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import type { DatePickerValue } from "../../types";

import { DatesProvider } from "../../dates-provider";
import { MonthPicker } from "../month-picker";
import { YearPicker } from "../year-picker";

afterEach(() => {
  document.body.innerHTML = "";
});

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

    const firstControl = controls[0];
    const secondControl = controls[1];

    expect(firstControl).toBeDefined();
    expect(secondControl).toBeDefined();

    if (!firstControl || !secondControl) {
      throw new Error("Expected at least two month controls");
    }

    fireEvent.click(firstControl);
    fireEvent.click(secondControl);

    expect(Array.isArray(latestValue)).toBe(true);
    if (!Array.isArray(latestValue)) {
      throw new TypeError("Expected month picker value to be an array");
    }

    expect(latestValue.length).toBe(2);
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

    const thirdControl = controls[2];
    const firstControl = controls[0];

    expect(thirdControl).toBeDefined();
    expect(firstControl).toBeDefined();

    if (!thirdControl || !firstControl) {
      throw new Error("Expected at least three year controls");
    }

    fireEvent.click(thirdControl);
    fireEvent.click(firstControl);

    if (!Array.isArray(latestValue)) {
      throw new TypeError("Expected year picker range value to be an array");
    }

    const sortedRange = latestValue as [Date | null, Date | null];
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

    const firstUpdatedControl = updatedControls[0];

    expect(firstUpdatedControl).toBeDefined();

    if (!firstUpdatedControl) {
      throw new Error("Expected at least one year control after rerender");
    }

    fireEvent.click(firstUpdatedControl);
    fireEvent.click(firstUpdatedControl);

    if (!Array.isArray(latestValue)) {
      throw new TypeError(
        "Expected year picker single range value to be an array"
      );
    }

    const singleRange = latestValue as [Date | null, Date | null];
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

    const firstColumn = columns[0];
    const secondColumn = columns[1];

    expect(firstColumn).toBeDefined();
    expect(secondColumn).toBeDefined();

    if (!firstColumn || !secondColumn) {
      throw new Error("Expected month picker to render two columns");
    }

    const firstColumnControls = [
      ...firstColumn.querySelectorAll("[data-slot='months-list'] button"),
    ] as HTMLButtonElement[];
    const secondColumnControls = [
      ...secondColumn.querySelectorAll("[data-slot='months-list'] button"),
    ] as HTMLButtonElement[];

    const lastControlInFirstColumn = firstColumnControls.at(-1);
    const firstControlInSecondColumn = secondColumnControls[0];

    expect(lastControlInFirstColumn).toBeDefined();
    expect(firstControlInSecondColumn).toBeDefined();

    if (!lastControlInFirstColumn || !firstControlInSecondColumn) {
      throw new Error("Expected controls in both month columns");
    }

    lastControlInFirstColumn.focus();
    fireEvent.keyDown(lastControlInFirstColumn, { key: "ArrowRight" });

    expect(document.activeElement).toBe(firstControlInSecondColumn);
  });
});
