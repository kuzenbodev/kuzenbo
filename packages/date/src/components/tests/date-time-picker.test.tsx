/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { createDateAdapter } from "../../adapter";
import { DateTimePicker } from "../date-time-picker";
import { DatesProvider } from "../dates-provider";

afterEach(() => {
  document.body.innerHTML = "";
});

const expectDateValue = (value: Date | null): Date => {
  expect(value).toBeInstanceOf(Date);
  if (!(value instanceof Date)) {
    throw new TypeError("Expected latest value to be present");
  }
  return value;
};

describe("DateTimePicker", () => {
  it("updates combined datetime when time changes", () => {
    const adapter = createDateAdapter();
    let latestValue: unknown = null;
    const handleChange = (nextValue: Date | null) => {
      latestValue = nextValue;
    };

    render(
      <DatesProvider>
        <DateTimePicker
          defaultValue={new Date(2026, 1, 14, 9, 30, 0)}
          name="appointment"
          onChange={handleChange}
        />
      </DatesProvider>
    );

    const minutesInput = screen.getByLabelText("Minutes") as HTMLInputElement;

    fireEvent.change(minutesInput, { target: { value: "45" } });
    fireEvent.blur(minutesInput);

    expect(latestValue).toBeInstanceOf(Date);

    const resolvedValue = latestValue as Date;

    expect(resolvedValue.getMinutes()).toBe(45);
    expect(resolvedValue.getHours()).toBe(9);

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='appointment']"
    ) as HTMLInputElement | null;

    expect(hiddenInput?.value).toBe(
      adapter.toDateTimeString(resolvedValue) ?? ""
    );
  });

  it("preserves date and time composition and closes picker on date selection", () => {
    let latestValue: Date | null = null;

    render(
      <DatesProvider locale="en-US">
        <DateTimePicker
          defaultValue={new Date(2026, 1, 14, 9, 30, 0)}
          onChange={(nextValue) => {
            latestValue = nextValue;
          }}
        />
      </DatesProvider>
    );

    fireEvent.click(screen.getByLabelText("Toggle picker"));

    const dayButtons = [
      ...document.querySelectorAll("[data-slot='month'] button"),
    ] as HTMLButtonElement[];
    const targetDayButton = dayButtons.find(
      (button) =>
        button.dataset.selected !== "true" && !button.hasAttribute("disabled")
    );

    expect(targetDayButton).toBeDefined();
    if (!targetDayButton) {
      throw new Error("Expected at least one selectable day button");
    }

    fireEvent.click(targetDayButton);

    expect(screen.queryByRole("dialog")).toBeNull();
    const resolvedValue = expectDateValue(latestValue);
    expect(resolvedValue.getHours()).toBe(9);
    expect(resolvedValue.getMinutes()).toBe(30);
  });

  it("serializes hidden input through adapter formatter in provider timezone", () => {
    const timeZone = "America/New_York";
    const adapter = createDateAdapter({ timeZone });
    const value = new Date("2024-01-01T02:30:00.000Z");

    render(
      <DatesProvider timeZone={timeZone}>
        <DateTimePicker name="appointment" value={value} />
      </DatesProvider>
    );

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='appointment']"
    ) as HTMLInputElement | null;

    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput?.value).toBe(adapter.toDateTimeString(value) ?? "");
  });

  it("keeps DST boundary serialization timezone-safe", () => {
    const timeZone = "America/New_York";
    const adapter = createDateAdapter({ timeZone });
    const springForwardValue = new Date("2024-03-10T07:30:00.000Z");
    const fallBackValue = new Date("2024-11-03T05:30:00.000Z");

    const { rerender } = render(
      <DatesProvider timeZone={timeZone}>
        <DateTimePicker name="meeting" value={springForwardValue} />
      </DatesProvider>
    );

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='meeting']"
    ) as HTMLInputElement | null;

    expect(hiddenInput?.value).toBe("2024-03-10 03:30:00");
    expect(hiddenInput?.value).toBe(
      adapter.toDateTimeString(springForwardValue) ?? ""
    );

    rerender(
      <DatesProvider timeZone={timeZone}>
        <DateTimePicker name="meeting" value={fallBackValue} />
      </DatesProvider>
    );

    expect(hiddenInput?.value).toBe("2024-11-03 01:30:00");
    expect(hiddenInput?.value).toBe(
      adapter.toDateTimeString(fallBackValue) ?? ""
    );
  });

  it("enforces day-specific min time bound for selected date", () => {
    const adapter = createDateAdapter();
    let latestValue: Date | null = null;

    render(
      <DatesProvider locale="en-US">
        <DateTimePicker
          defaultValue={new Date(2026, 1, 14, 10, 30, 0)}
          minDate={new Date(2026, 1, 14, 10, 15, 0)}
          name="min-bound"
          onChange={(nextValue) => {
            latestValue = nextValue;
          }}
        />
      </DatesProvider>
    );

    const hoursInput = screen.getByLabelText("Hours") as HTMLInputElement;
    const minutesInput = screen.getByLabelText("Minutes") as HTMLInputElement;

    fireEvent.change(minutesInput, { target: { value: "00" } });
    fireEvent.blur(minutesInput);

    expect(hoursInput.value).toBe("10");
    expect(minutesInput.value).toBe("15");
    const resolvedValue = expectDateValue(latestValue);
    expect(resolvedValue.getHours()).toBe(10);
    expect(resolvedValue.getMinutes()).toBe(15);

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='min-bound']"
    ) as HTMLInputElement | null;

    expect(hiddenInput?.value).toBe(
      adapter.toDateTimeString(resolvedValue) ?? ""
    );
  });

  it("enforces day-specific max time bound for selected date", () => {
    const adapter = createDateAdapter();
    let latestValue: Date | null = null;

    render(
      <DatesProvider locale="en-US">
        <DateTimePicker
          defaultValue={new Date(2026, 1, 14, 16, 30, 0)}
          maxDate={new Date(2026, 1, 14, 16, 45, 0)}
          name="max-bound"
          onChange={(nextValue) => {
            latestValue = nextValue;
          }}
        />
      </DatesProvider>
    );

    const hoursInput = screen.getByLabelText("Hours") as HTMLInputElement;
    const minutesInput = screen.getByLabelText("Minutes") as HTMLInputElement;

    fireEvent.change(minutesInput, { target: { value: "59" } });
    fireEvent.blur(minutesInput);

    expect(hoursInput.value).toBe("16");
    expect(minutesInput.value).toBe("45");
    const resolvedValue = expectDateValue(latestValue);
    expect(resolvedValue.getHours()).toBe(16);
    expect(resolvedValue.getMinutes()).toBe(45);

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='max-bound']"
    ) as HTMLInputElement | null;

    expect(hiddenInput?.value).toBe(
      adapter.toDateTimeString(resolvedValue) ?? ""
    );
  });

  it("keeps hidden serialization adapter-driven in controlled mode", () => {
    const timeZone = "America/New_York";
    const adapter = createDateAdapter({ timeZone });
    const initialValue = new Date("2026-02-14T14:30:00.000Z");
    let nextControlledValue: Date | null = null;

    const { rerender } = render(
      <DatesProvider timeZone={timeZone}>
        <DateTimePicker
          name="meeting"
          value={initialValue}
          onChange={(nextValue) => {
            nextControlledValue = nextValue;
          }}
        />
      </DatesProvider>
    );

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='meeting']"
    ) as HTMLInputElement | null;

    expect(hiddenInput?.value).toBe(
      adapter.toDateTimeString(initialValue) ?? ""
    );

    fireEvent.change(screen.getByLabelText("Minutes"), {
      target: { value: "45" },
    });

    expect(nextControlledValue).toBeInstanceOf(Date);
    expect(hiddenInput?.value).toBe(
      adapter.toDateTimeString(initialValue) ?? ""
    );

    if (nextControlledValue === null) {
      throw new TypeError("Expected controlled value to be present");
    }

    const resolvedControlledValue = nextControlledValue;

    rerender(
      <DatesProvider timeZone={timeZone}>
        <DateTimePicker
          name="meeting"
          value={resolvedControlledValue}
          onChange={(nextValue) => {
            nextControlledValue = nextValue;
          }}
        />
      </DatesProvider>
    );

    const rerenderedHiddenInput = document.querySelector(
      "input[type='hidden'][name='meeting']"
    ) as HTMLInputElement | null;

    expect(rerenderedHiddenInput?.value).toBe(
      adapter.toDateTimeString(resolvedControlledValue) ?? ""
    );
  });
});
