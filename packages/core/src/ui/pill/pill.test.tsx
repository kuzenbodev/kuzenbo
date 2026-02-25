import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Pill, PillDelta, PillIndicator } from "./pill";

afterEach(cleanup);

describe("Pill", () => {
  it("renders children", () => {
    render(<Pill>Label</Pill>);
    expect(screen.getByText("Label")).toBeDefined();
  });

  it("has data-slot from Badge", () => {
    render(<Pill>Test</Pill>);
    expect(document.querySelector("[data-slot=badge]")).toBeDefined();
  });

  it("uses semantic status tokens for indicator variants", () => {
    const rawPalettePattern = /bg-[a-z]+-\d{2,3}/;

    render(<PillIndicator pulse variant="success" />);
    const successMarkup = document.body.innerHTML;
    expect(successMarkup.includes("bg-success")).toBe(true);
    expect(successMarkup.includes("bg-success/70")).toBe(true);
    expect(rawPalettePattern.test(successMarkup)).toBe(false);

    cleanup();
    render(<PillIndicator pulse variant="error" />);
    const errorMarkup = document.body.innerHTML;
    expect(errorMarkup.includes("bg-danger")).toBe(true);
    expect(errorMarkup.includes("bg-danger/70")).toBe(true);
    expect(rawPalettePattern.test(errorMarkup)).toBe(false);
  });

  it("uses semantic delta colors", () => {
    const rawPalettePattern = /text-[a-z]+-\d{2,3}/;

    render(<PillDelta delta={2} />);
    expect(document.body.innerHTML.includes("text-success-foreground")).toBe(
      true
    );
    expect(rawPalettePattern.test(document.body.innerHTML)).toBe(false);

    cleanup();
    render(<PillDelta delta={-2} />);
    expect(document.body.innerHTML.includes("text-danger-foreground")).toBe(
      true
    );
    expect(rawPalettePattern.test(document.body.innerHTML)).toBe(false);
  });

  it("supports size scaling across root and key subparts", () => {
    render(
      <Pill size="xl" variant="secondary">
        <Pill.Status>
          <Pill.Indicator variant="success" />
          Active
        </Pill.Status>
        Team
        <Pill.Button aria-label="Remove team">x</Pill.Button>
      </Pill>
    );

    const root = document.querySelector("[data-slot=badge]") as HTMLElement;
    expect(root.dataset.size).toBe("xl");
    expect(root.className.includes("data-[size=xl]:px-4")).toBe(true);
    expect(
      document.body.innerHTML.includes("group-data-[size=xl]/badge:size-8")
    ).toBe(true);
    expect(
      document.body.innerHTML.includes("group-data-[size=xl]/badge:size-3")
    ).toBe(true);
  });
});
