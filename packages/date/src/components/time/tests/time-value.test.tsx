import { afterEach, describe, expect, it } from "bun:test";

import { render, screen } from "@testing-library/react";

import { TimeValue } from "../time-value";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("TimeValue", () => {
  it("renders string values in 24h and 12h formats", () => {
    const { rerender } = render(<TimeValue value="18:30" />);

    expect(screen.getByText("18:30")).toBeDefined();

    rerender(<TimeValue format="12h" value="18:30" />);
    expect(screen.getByText("6:30 PM")).toBeDefined();

    rerender(<TimeValue format="12h" value="18:30" withSeconds />);
    expect(screen.getByText("6:30:00 PM")).toBeDefined();
  });

  it("handles 12h edge cases for midnight and date objects", () => {
    const { rerender } = render(<TimeValue format="12h" value="00:05" />);

    expect(screen.getByText("12:05 AM")).toBeDefined();

    rerender(
      <TimeValue format="12h" value={new Date(2026, 1, 27, 23, 45, 10)} />
    );
    expect(screen.getByText("11:45 PM")).toBeDefined();
  });
});
