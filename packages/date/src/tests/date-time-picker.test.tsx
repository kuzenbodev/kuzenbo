/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { createDateAdapter } from "../adapter";
import { DateTimePicker } from "../components/date-time-picker";
import { DatesProvider } from "../components/dates-provider";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("DateTimePicker", () => {
  it("updates combined datetime when time changes", () => {
    let latestValue: unknown = null;
    const handleChange = (nextValue: Date | null) => {
      latestValue = nextValue;
    };

    render(
      <DatesProvider>
        <DateTimePicker
          defaultValue={new Date(2026, 1, 14, 9, 30, 0)}
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
});
