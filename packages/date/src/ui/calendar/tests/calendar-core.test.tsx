import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";
import { useCallback, useState } from "react";

import { Calendar } from "../calendar";

afterEach(cleanup);

describe("Calendar core behavior", () => {
  it("renders calendar root and month grid", () => {
    render(<Calendar defaultMonth={new Date(2025, 0)} />);

    expect(document.querySelector("[data-slot=calendar]")).not.toBeNull();
    expect(document.querySelector("table[role=grid]")).not.toBeNull();
  });

  it("renders non-interactive day cells without mode", () => {
    render(<Calendar defaultMonth={new Date(2025, 0)} />);

    const dayButtons = document.querySelectorAll(
      'td[role="gridcell"] > button'
    );
    const dayCell = document.querySelector(
      'td[role="gridcell"][data-day="2025-01-15"]'
    ) as HTMLElement;

    expect(dayButtons.length).toBe(0);
    expect(dayCell.className).toContain("group/day");
    expect(dayCell.className).toContain("size-(--cell-size)");
    expect(dayCell.className).toContain("items-center");
  });

  it("renders day buttons in single selection mode", () => {
    render(<Calendar defaultMonth={new Date(2025, 0)} mode="single" />);

    expect(
      screen.getByRole("button", { name: /January 15th, 2025/i })
    ).not.toBeNull();
  });

  it("selects a day on click in single mode", async () => {
    const user = userEvent.setup();

    render(<Calendar defaultMonth={new Date(2025, 0)} mode="single" />);
    await user.click(
      screen.getByRole("button", { name: /January 15th, 2025/i })
    );

    expect(
      document.querySelector('[data-selected-single="true"]')
    ).not.toBeNull();
  });

  it("supports controlled single selection updates", async () => {
    const user = userEvent.setup();

    const ControlledCalendar = () => {
      const [selected, setSelected] = useState<Date | undefined>(
        new Date(2025, 0, 10)
      );

      return (
        <>
          <Calendar
            defaultMonth={new Date(2025, 0)}
            mode="single"
            onSelect={setSelected}
            selected={selected}
          />
          <output data-testid="selected-day">
            {String(selected?.toISOString())}
          </output>
        </>
      );
    };

    render(<ControlledCalendar />);
    await user.click(
      screen.getByRole("button", { name: /January 15th, 2025/i })
    );

    expect(screen.getByTestId("selected-day").textContent).toContain(
      "2025-01-15"
    );
  });

  it("does not select disabled days", async () => {
    const user = userEvent.setup();

    render(
      <Calendar
        defaultMonth={new Date(2025, 0)}
        disabled={[new Date(2025, 0, 15)]}
        mode="single"
      />
    );

    const disabledDay = screen.getByRole("button", {
      name: /January 15th, 2025/i,
    });

    await user.click(disabledDay);

    expect(disabledDay.getAttribute("disabled")).not.toBeNull();
    expect(document.querySelector('[data-selected-single="true"]')).toBeNull();
  });

  it("keeps one day selected when required is enabled", async () => {
    const user = userEvent.setup();

    const RequiredCalendar = () => {
      const [selected, setSelected] = useState(new Date(2025, 0, 15));
      const handleSelect = useCallback((nextSelected: Date | undefined) => {
        setSelected(nextSelected as Date);
      }, []);

      return (
        <>
          <Calendar
            defaultMonth={new Date(2025, 0)}
            mode="single"
            onSelect={handleSelect}
            required
            selected={selected}
          />
          <output data-testid="required-selected">
            {selected.toISOString()}
          </output>
        </>
      );
    };

    render(<RequiredCalendar />);

    const day = screen.getByRole("button", { name: /January 15th, 2025/i });

    await user.click(day);
    await user.click(day);

    expect(screen.getByTestId("required-selected").textContent).toContain(
      "2025-01-15"
    );
    expect(
      document.querySelectorAll('[data-selected-single="true"]').length
    ).toBe(1);
  });

  it("toggles outside day visibility with showOutsideDays", () => {
    const { rerender } = render(
      <Calendar defaultMonth={new Date(2025, 0)} showOutsideDays={false} />
    );

    const hiddenOutsideCells = [
      ...document.querySelectorAll('td[data-outside="true"]'),
    ] as HTMLElement[];
    expect(hiddenOutsideCells.length).toBeGreaterThan(0);
    for (const cell of hiddenOutsideCells) {
      expect(cell.className).toContain("rdp-hidden");
    }

    rerender(<Calendar defaultMonth={new Date(2025, 0)} showOutsideDays />);

    const visibleOutsideCells = [
      ...document.querySelectorAll('td[data-outside="true"]'),
    ] as HTMLElement[];
    expect(visibleOutsideCells.length).toBeGreaterThan(0);
    const hasVisibleOutsideCell = visibleOutsideCells.some(
      (cell) => !cell.className.includes("rdp-hidden")
    );
    expect(hasVisibleOutsideCell).toBe(true);
  });
});
