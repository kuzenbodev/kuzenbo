import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { TimeGrid } from "../../components/time/time-grid";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("TimeGrid", () => {
  it("calls onChange with selected value", () => {
    const changes: (string | null)[] = [];

    render(
      <TimeGrid
        data={["10:00", "15:00"]}
        onChange={(nextValue) => {
          changes.push(nextValue);
        }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /10:00/i }));

    expect(changes.at(-1)).toBe("10:00");
  });

  it("supports deselection when allowDeselect is enabled", () => {
    const changes: (string | null)[] = [];

    render(
      <TimeGrid
        allowDeselect
        data={["10:00", "15:00"]}
        defaultValue="10:00"
        onChange={(nextValue) => {
          changes.push(nextValue);
        }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /10:00/i }));

    expect(changes.at(-1)).toBeNull();
  });

  it("applies disable matrix with min/max and disableTime", () => {
    render(
      <TimeGrid
        data={["10:00", "15:00", "18:00"]}
        disableTime={["15:00"]}
        maxTime="17:00"
        minTime="12:00"
      />
    );

    expect(
      (screen.getByRole("button", { name: /10:00/i }) as HTMLButtonElement)
        .disabled
    ).toBe(true);
    expect(
      (screen.getByRole("button", { name: /15:00/i }) as HTMLButtonElement)
        .disabled
    ).toBe(true);
    expect(
      (screen.getByRole("button", { name: /18:00/i }) as HTMLButtonElement)
        .disabled
    ).toBe(true);
  });

  it("renders formatted labels in 12h mode", () => {
    render(<TimeGrid data={["15:00"]} format="12h" />);

    expect(screen.getByRole("button", { name: /3:00 PM/i })).toBeDefined();
  });
});
