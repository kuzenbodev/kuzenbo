import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { InlineCodeHighlight } from "./inline-code-highlight";

afterEach(cleanup);

describe("InlineCodeHighlight", () => {
  it("renders raw inline code", () => {
    render(<InlineCodeHighlight code="const sample = 1;" language="ts" />);

    expect(screen.getByText("const sample = 1;")).toBeDefined();
    expect(
      document.querySelector("[data-slot=inline-code-highlight]")
    ).toBeDefined();
  });

  it("renders pre-highlighted inline html", () => {
    render(
      <InlineCodeHighlight
        highlightedHtml="<span class='token keyword'>const</span> value = 1;"
        language="ts"
      />
    );

    expect(screen.getByText("const")).toBeDefined();
    expect(screen.getByText("value = 1;")).toBeDefined();
  });
});
