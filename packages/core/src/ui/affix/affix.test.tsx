import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

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
});
