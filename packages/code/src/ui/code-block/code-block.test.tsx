import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { CodeBlock } from "./code-block";

afterEach(cleanup);

describe("CodeBlock", () => {
  it("renders raw code when highlighted html is not provided", () => {
    render(<CodeBlock code="const value = 42;" language="ts" />);

    expect(screen.getByText("const value = 42;")).toBeDefined();
    expect(document.querySelector("[data-slot=code-block-pre]")).toBeDefined();
    expect(document.querySelector("[data-language=ts]")).toBeDefined();
  });

  it("renders pre-highlighted html output when provided", () => {
    render(
      <CodeBlock
        highlightedHtml={
          "<pre class='shiki'><code><span class='line'>const highlighted = true;</span></code></pre>"
        }
        language="ts"
      />
    );

    expect(screen.getByText("const highlighted = true;")).toBeDefined();
    expect(document.querySelector("[data-slot=code-block-pre]")).toBeNull();
  });

  it("renders a toolbar region when toolbar content is provided", () => {
    render(
      <CodeBlock
        code="echo hi"
        toolbar={<div data-testid="toolbar-content">toolbar</div>}
      />
    );

    expect(screen.getByTestId("toolbar-content")).toBeDefined();
    expect(
      document.querySelector("[data-slot=code-block-toolbar]")
    ).toBeDefined();
  });
});
