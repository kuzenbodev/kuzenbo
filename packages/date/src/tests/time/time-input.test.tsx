import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { TimeInput } from "../../components/time/time-input";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("TimeInput", () => {
  it("handles keyboard navigation and segment editing", () => {
    render(<TimeInput defaultValue="08:00:40" withSeconds />);

    const hoursInput = screen.getByLabelText("Hours") as HTMLInputElement;
    const minutesInput = screen.getByLabelText("Minutes") as HTMLInputElement;
    const secondsInput = screen.getByLabelText("Seconds") as HTMLInputElement;

    fireEvent.focus(hoursInput);
    fireEvent.change(hoursInput, { target: { value: "8" } });
    expect(document.activeElement).toBe(minutesInput);

    fireEvent.change(minutesInput, { target: { value: "30" } });
    expect(document.activeElement).toBe(secondsInput);

    fireEvent.keyDown(secondsInput, { key: "Backspace" });
    expect(secondsInput.value).toBe("");

    fireEvent.keyDown(secondsInput, { key: "Backspace" });
    expect(document.activeElement).toBe(minutesInput);

    fireEvent.keyDown(minutesInput, { key: "Home" });
    expect(minutesInput.value).toBe("00");

    fireEvent.keyDown(minutesInput, { key: "End" });
    expect(minutesInput.value).toBe("59");

    fireEvent.keyDown(minutesInput, { key: "Delete" });
    expect(minutesInput.value).toBe("");

    fireEvent.keyDown(minutesInput, { key: "Delete" });
    expect(document.activeElement).toBe(hoursInput);
  });

  it("converts 12h input to 24h output", () => {
    const changes: string[] = [];

    render(
      <TimeInput
        format="12h"
        withSeconds
        onChange={(nextValue) => {
          changes.push(nextValue);
        }}
      />
    );

    const hoursInput = screen.getByLabelText("Hours") as HTMLInputElement;
    const minutesInput = screen.getByLabelText("Minutes") as HTMLInputElement;
    const secondsInput = screen.getByLabelText("Seconds") as HTMLInputElement;
    const amPmInput = screen.getByLabelText("AM/PM") as HTMLInputElement;

    fireEvent.change(hoursInput, { target: { value: "8" } });
    fireEvent.change(minutesInput, { target: { value: "30" } });
    fireEvent.change(secondsInput, { target: { value: "45" } });
    fireEvent.keyDown(amPmInput, { code: "KeyP", key: "p" });

    expect(changes.at(-1)).toBe("20:30:45");
  });

  it("clamps pasted values and keeps hidden value synced", () => {
    const changes: string[] = [];

    render(
      <TimeInput
        max="18:30:00"
        min="08:30:00"
        name="appointmentTime"
        withSeconds
        onChange={(nextValue) => {
          changes.push(nextValue);
        }}
      />
    );

    const hoursInput = screen.getByLabelText("Hours") as HTMLInputElement;

    fireEvent.paste(hoursInput, {
      clipboardData: {
        getData: () => "07:15:00",
      },
    });

    expect((screen.getByLabelText("Hours") as HTMLInputElement).value).toBe(
      "08"
    );
    expect((screen.getByLabelText("Minutes") as HTMLInputElement).value).toBe(
      "30"
    );
    expect((screen.getByLabelText("Seconds") as HTMLInputElement).value).toBe(
      "00"
    );
    expect(changes.at(-1)).toBe("08:30:00");

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='appointmentTime']"
    ) as HTMLInputElement | null;

    expect(hiddenInput?.value).toBe("08:30:00");
  });

  it("treats partially valid values as incomplete", () => {
    render(<TimeInput name="partial" value="12:34" withSeconds />);

    const secondsInput = screen.getByLabelText("Seconds") as HTMLInputElement;
    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='partial']"
    ) as HTMLInputElement | null;

    expect(secondsInput.value).toBe("");
    expect(hiddenInput?.value).toBe("");
  });
});
