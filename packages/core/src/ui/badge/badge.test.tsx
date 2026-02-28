import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Badge } from "./badge";

afterEach(cleanup);

describe("Badge", () => {
  it("renders children correctly", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(<Badge>Test</Badge>);
    const el = document.querySelector("[data-slot=badge]");
    expect(el).toBeDefined();
  });

  it("spreads rest props", () => {
    render(<Badge data-testid="my-badge">Test</Badge>);
    expect(screen.getByTestId("my-badge")).toBeDefined();
  });

  it("supports xs-to-xl size scaling", () => {
    const { rerender } = render(<Badge size="xs">XS</Badge>);
    let badge = screen.getByText("XS");

    expect(badge.dataset.size).toBe("xs");
    expect(badge.className.includes("h-4")).toBe(true);

    rerender(<Badge size="xl">XL</Badge>);
    badge = screen.getByText("XL");

    expect(badge.dataset.size).toBe("xl");
    expect(badge.className.includes("h-8")).toBe(true);
  });
});
