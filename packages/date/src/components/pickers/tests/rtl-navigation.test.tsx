import { afterEach, describe, expect, it } from "bun:test";

import { fireEvent, render, screen } from "@testing-library/react";

import { DatesProvider } from "../../dates-provider";
import { DatePicker } from "../date-picker";
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

describe("RTL navigation", () => {
  it("inverts horizontal day traversal in RTL mode", () => {
    render(
      <DatesProvider direction="rtl" locale="en-US">
        <DatePicker defaultMonth={new Date(2026, 1, 1)} />
      </DatesProvider>
    );

    const firstDayControl = screen.getByRole("button", {
      name: "February 1, 2026",
    });
    const secondDayControl = screen.getByRole("button", {
      name: "February 2, 2026",
    });

    secondDayControl.focus();
    fireEvent.keyDown(secondDayControl, { key: "ArrowRight" });

    expect(document.activeElement).toBe(firstDayControl);

    fireEvent.keyDown(firstDayControl, { key: "ArrowLeft" });

    expect(document.activeElement).toBe(secondDayControl);
  });

  it("inverts horizontal keyboard navigation in RTL mode", () => {
    const { container } = render(
      <DatesProvider direction="rtl" locale="en-US">
        <MonthPicker defaultMonth={new Date(2026, 0, 1)} />
      </DatesProvider>
    );

    const controls = [
      ...container.querySelectorAll("[data-slot='months-list'] button"),
    ] as HTMLButtonElement[];

    const secondControl = expectDefinedValue(
      controls[1],
      "Expected at least two month controls"
    );
    const firstControl = expectDefinedValue(
      controls[0],
      "Expected at least two month controls"
    );

    secondControl.focus();
    fireEvent.keyDown(secondControl, { key: "ArrowRight" });

    expect(document.activeElement).toBe(firstControl);

    fireEvent.keyDown(firstControl, { key: "ArrowLeft" });

    expect(document.activeElement).toBe(secondControl);
  });

  it("inverts horizontal year traversal in RTL mode", () => {
    const { container } = render(
      <DatesProvider direction="rtl" locale="en-US">
        <YearPicker defaultYear={new Date(2026, 0, 1)} />
      </DatesProvider>
    );

    const controls = [
      ...container.querySelectorAll("[data-slot='years-list'] button"),
    ] as HTMLButtonElement[];

    const firstControl = expectDefinedValue(
      controls[0],
      "Expected at least two year controls"
    );
    const secondControl = expectDefinedValue(
      controls[1],
      "Expected at least two year controls"
    );

    secondControl.focus();
    fireEvent.keyDown(secondControl, { key: "ArrowRight" });

    expect(document.activeElement).toBe(firstControl);

    fireEvent.keyDown(firstControl, { key: "ArrowLeft" });

    expect(document.activeElement).toBe(secondControl);
  });

  it("traverses between decade columns with inverted horizontal keys in RTL mode", () => {
    const { container } = render(
      <DatesProvider direction="rtl" locale="en-US">
        <YearPicker defaultYear={new Date(2026, 0, 1)} numberOfColumns={2} />
      </DatesProvider>
    );

    const decadeColumns = [
      ...container.querySelectorAll("[data-slot='decade-level']"),
    ] as HTMLDivElement[];

    const firstDecadeColumn = expectDefinedValue(
      decadeColumns[0],
      "Expected year picker to render two decade columns"
    );
    const secondDecadeColumn = expectDefinedValue(
      decadeColumns[1],
      "Expected year picker to render two decade columns"
    );

    const firstDecadeControls = [
      ...firstDecadeColumn.querySelectorAll("[data-slot='years-list'] button"),
    ] as HTMLButtonElement[];
    const secondDecadeControls = [
      ...secondDecadeColumn.querySelectorAll("[data-slot='years-list'] button"),
    ] as HTMLButtonElement[];

    const lastControlInFirstDecade = expectDefinedValue(
      firstDecadeControls.at(-1),
      "Expected controls in both decade columns"
    );
    const firstControlInSecondDecade = expectDefinedValue(
      secondDecadeControls[0],
      "Expected controls in both decade columns"
    );

    firstControlInSecondDecade.focus();
    fireEvent.keyDown(firstControlInSecondDecade, { key: "ArrowRight" });

    expect(document.activeElement).toBe(lastControlInFirstDecade);

    fireEvent.keyDown(lastControlInFirstDecade, { key: "ArrowLeft" });

    expect(document.activeElement).toBe(firstControlInSecondDecade);
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

  it("keeps modifier shortcuts deterministic in RTL mode", () => {
    render(
      <DatesProvider direction="rtl" locale="en-US">
        <MonthPicker defaultMonth={new Date(2026, 0, 1)} />
      </DatesProvider>
    );

    const januaryControl = screen.getByRole("button", { name: "January 2026" });
    januaryControl.focus();

    fireEvent.keyDown(januaryControl, { ctrlKey: true, key: "ArrowDown" });

    expect(screen.getByRole("button", { name: /^2027/ })).toBeDefined();

    const nextYearJanuaryControl = screen.getByRole("button", {
      name: "January 2027",
    });
    nextYearJanuaryControl.focus();

    fireEvent.keyDown(nextYearJanuaryControl, {
      ctrlKey: true,
      key: "ArrowUp",
    });

    expect(screen.getByRole("button", { name: /^2026/ })).toBeDefined();
  });
});
