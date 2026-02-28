import { afterEach, describe, expect, it } from "bun:test";

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { useState } from "react";

import { DatesProvider } from "../../dates-provider";
import { DateInput } from "../date-input";

afterEach(() => {
  cleanup();
});

const toIsoDate = (date: Date | null): string | null => {
  if (!date) {
    return null;
  }

  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const TEST_DEFAULT_MONTH = new Date(2026, 1, 1);

const getDayLabel = (date: Date) => `day-${toIsoDate(date)}`;

const expectDefinedValue = <T,>(value: T | undefined, message: string): T => {
  expect(value).toBeDefined();
  if (value === undefined) {
    throw new Error(message);
  }
  return value;
};

const renderIsoDate = (value: Date | null): string => toIsoDate(value) ?? "";

describe("DateInput", () => {
  it("opens on focus and click and closes on outside interaction", async () => {
    render(
      <DatesProvider locale="en-US">
        <DateInput
          defaultMonth={TEST_DEFAULT_MONTH}
          getDayAriaLabel={getDayLabel}
          placeholder="Pick a date"
        />
      </DatesProvider>
    );

    const input = screen.getByPlaceholderText("Pick a date");

    fireEvent.focus(input);

    await waitFor(() => {
      expect(
        document.querySelector("[data-slot='popover-popup']")
      ).not.toBeNull();
    });

    fireEvent.click(document.body);

    await waitFor(() => {
      expect(document.querySelector("[data-slot='popover-popup']")).toBeNull();
    });

    fireEvent.click(input);

    await waitFor(() => {
      expect(
        document.querySelector("[data-slot='popover-popup']")
      ).not.toBeNull();
    });
  });

  it("does not open when readOnly or disabled", async () => {
    render(
      <DatesProvider locale="en-US">
        <div>
          <DateInput
            defaultMonth={TEST_DEFAULT_MONTH}
            getDayAriaLabel={getDayLabel}
            placeholder="Read only input"
            readOnly
          />
          <DateInput
            defaultMonth={TEST_DEFAULT_MONTH}
            getDayAriaLabel={getDayLabel}
            placeholder="Disabled input"
            disabled
          />
        </div>
      </DatesProvider>
    );

    const readOnlyInput = screen.getByPlaceholderText("Read only input");
    const disabledInput = screen.getByPlaceholderText("Disabled input");
    const toggleButtons = screen.getAllByLabelText("Toggle picker");

    const readOnlyToggle = expectDefinedValue(
      toggleButtons[0],
      "Expected toggle buttons for both date inputs"
    );
    const disabledToggle = expectDefinedValue(
      toggleButtons[1],
      "Expected toggle buttons for both date inputs"
    );

    fireEvent.focus(readOnlyInput);
    fireEvent.click(readOnlyInput);
    fireEvent.click(readOnlyToggle);

    fireEvent.click(disabledInput);
    fireEvent.click(disabledToggle);

    await waitFor(() => {
      expect(document.querySelector("[data-slot='popover-popup']")).toBeNull();
    });
  });

  it("keeps free typing parse with commit on blur and enter, and restores invalid input", () => {
    const changes: (string | null)[] = [];

    render(
      <DatesProvider locale="en-US">
        <DateInput
          defaultValue={new Date(2026, 1, 10)}
          placeholder="Typing date"
          onChange={(nextValue) => {
            changes.push(toIsoDate(nextValue));
          }}
        />
      </DatesProvider>
    );

    const input = screen.getByPlaceholderText(
      "Typing date"
    ) as HTMLInputElement;

    expect(input.value).toBe("2026-02-10");

    fireEvent.change(input, { target: { value: "2026-02-14" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input.value).toBe("2026-02-14");
    expect(changes.at(-1)).toBe("2026-02-14");

    fireEvent.change(input, { target: { value: "invalid-date" } });
    fireEvent.blur(input);

    expect(input.value).toBe("2026-02-14");
    expect(changes.at(-1)).toBe("2026-02-14");
  });

  it("selects from dropdown, closes after selection, and syncs hidden input serialization", async () => {
    render(
      <DatesProvider locale="en-US">
        <DateInput
          defaultMonth={TEST_DEFAULT_MONTH}
          form="external-date-form"
          getDayAriaLabel={getDayLabel}
          name="appointment"
          placeholder="Dropdown date"
        />
      </DatesProvider>
    );

    const input = screen.getByPlaceholderText(
      "Dropdown date"
    ) as HTMLInputElement;

    fireEvent.focus(input);

    await waitFor(() => {
      expect(
        document.querySelector("[data-slot='popover-popup']")
      ).not.toBeNull();
    });

    fireEvent.click(screen.getByRole("button", { name: "day-2026-02-14" }));

    await waitFor(() => {
      expect(document.querySelector("[data-slot='popover-popup']")).toBeNull();
    });

    const hiddenInput = document.querySelector(
      "input[type='hidden'][name='appointment']"
    ) as HTMLInputElement | null;

    expect(input.value).toBe("2026-02-14");
    expect(hiddenInput?.getAttribute("form")).toBe("external-date-form");
    expect(hiddenInput?.value).toBe("2026-02-14");
    expect(input.getAttribute("name")).toBeNull();
  });

  it("supports allowDeselect and clearable interactions", async () => {
    const changes: (string | null)[] = [];

    render(
      <DatesProvider locale="en-US">
        <DateInput
          allowDeselect
          clearable
          defaultMonth={TEST_DEFAULT_MONTH}
          defaultValue={new Date(2026, 1, 14)}
          getDayAriaLabel={getDayLabel}
          placeholder="Interactive date"
          onChange={(nextValue) => {
            changes.push(toIsoDate(nextValue));
          }}
        />
      </DatesProvider>
    );

    const input = screen.getByPlaceholderText(
      "Interactive date"
    ) as HTMLInputElement;

    expect(input.value).toBe("2026-02-14");
    expect(screen.getByRole("button", { name: "Clear date" })).toBeDefined();

    fireEvent.focus(input);

    await waitFor(() => {
      expect(
        document.querySelector("[data-slot='popover-popup']")
      ).not.toBeNull();
    });

    fireEvent.click(screen.getByRole("button", { name: "day-2026-02-14" }));

    await waitFor(() => {
      expect(document.querySelector("[data-slot='popover-popup']")).toBeNull();
    });

    expect(input.value).toBe("");
    expect(changes.at(-1)).toBeNull();

    fireEvent.change(input, { target: { value: "2026-02-18" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input.value).toBe("2026-02-18");
    expect(changes.at(-1)).toBe("2026-02-18");

    const clearButton = screen.getByRole("button", { name: "Clear date" });
    fireEvent.mouseDown(clearButton);
    fireEvent.click(clearButton);

    expect(input.value).toBe("");
    expect(changes.at(-1)).toBeNull();
  });

  it("keeps controlled value in sync for typed and dropdown interactions", async () => {
    const ControlledHarness = () => {
      const [value, setValue] = useState<Date | null>(new Date(2026, 1, 10));

      return (
        <DatesProvider locale="en-US">
          <DateInput
            defaultMonth={TEST_DEFAULT_MONTH}
            getDayAriaLabel={getDayLabel}
            placeholder="Controlled date"
            value={value}
            onChange={setValue}
          />
          <output data-testid="controlled-value">{renderIsoDate(value)}</output>
        </DatesProvider>
      );
    };

    render(<ControlledHarness />);

    const input = screen.getByPlaceholderText(
      "Controlled date"
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "2026-02-12" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input.value).toBe("2026-02-12");
    expect(screen.getByTestId("controlled-value").textContent).toBe(
      "2026-02-12"
    );

    fireEvent.focus(input);

    await waitFor(() => {
      expect(
        document.querySelector("[data-slot='popover-popup']")
      ).not.toBeNull();
    });

    fireEvent.click(screen.getByRole("button", { name: "day-2026-02-20" }));

    await waitFor(() => {
      expect(document.querySelector("[data-slot='popover-popup']")).toBeNull();
    });

    expect(input.value).toBe("2026-02-20");
    expect(screen.getByTestId("controlled-value").textContent).toBe(
      "2026-02-20"
    );
  });

  it("preserves picker accessibility labels", async () => {
    render(
      <DatesProvider locale="en-US">
        <DateInput
          ariaLabels={{
            nextMonth: "Next calendar month",
            previousMonth: "Previous calendar month",
          }}
          defaultMonth={TEST_DEFAULT_MONTH}
          getDayAriaLabel={getDayLabel}
          placeholder="Accessible date"
        />
      </DatesProvider>
    );

    const input = screen.getByPlaceholderText("Accessible date");

    fireEvent.focus(input);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Next calendar month" })
      ).toBeDefined();
    });

    expect(
      screen.getByRole("button", { name: "Previous calendar month" })
    ).toBeDefined();
    expect(
      screen.getByRole("button", { name: "day-2026-02-10" })
    ).toBeDefined();
  });
});
