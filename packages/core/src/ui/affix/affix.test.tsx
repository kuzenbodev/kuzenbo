import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Affix } from "./affix";

afterEach(cleanup);

describe("Affix", () => {
  it("renders children correctly", () => {
    render(
      <Affix withinPortal={false}>
        <span>Fixed content</span>
      </Affix>
    );
    expect(screen.getByText("Fixed content")).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(
      <Affix withinPortal={false}>
        <span>Test</span>
      </Affix>
    );
    const el = document.querySelector("[data-slot=affix]");
    expect(el).toBeDefined();
  });

  it("uses semantic affix z-index token by default", () => {
    render(
      <Affix withinPortal={false}>
        <span>Token default</span>
      </Affix>
    );

    const el = document.querySelector("[data-slot=affix]");
    expect(el?.className.includes("z-affix")).toBe(true);
    expect((el as HTMLDivElement | null)?.style.zIndex).toBe("");
  });

  it("applies numeric z-index override", () => {
    render(
      <Affix withinPortal={false} zIndex={500}>
        <span>Numeric z-index</span>
      </Affix>
    );

    const el = document.querySelector(
      "[data-slot=affix]"
    ) as HTMLDivElement | null;
    expect(el?.style.zIndex).toBe("500");
  });

  it("applies string z-index override", () => {
    render(
      <Affix withinPortal={false} zIndex="var(--custom-z)">
        <span>String z-index</span>
      </Affix>
    );

    const el = document.querySelector(
      "[data-slot=affix]"
    ) as HTMLDivElement | null;
    expect(el?.style.zIndex).toBe("var(--custom-z)");
  });
});
