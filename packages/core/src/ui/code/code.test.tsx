import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Code } from "./code";

afterEach(cleanup);

describe("Code", () => {
  it("renders inline code element by default", () => {
    render(<Code>const ready = true;</Code>);

    const element = screen.getByText("const ready = true;");

    expect(element.tagName).toBe("CODE");
  });

  it("renders code element with block styling when block is enabled", () => {
    render(<Code block>const ready = true;</Code>);

    const element = screen.getByText("const ready = true;");

    expect(element.tagName).toBe("CODE");
    expect(element.dataset.block).toBe("true");
  });

  it("adds code slot attribute", () => {
    render(<Code>slot-test</Code>);

    expect(screen.getByText("slot-test").dataset.slot).toBe("code");
  });

  it("merges custom classes with default styles", () => {
    render(<Code className="custom-class">style-test</Code>);

    const element = screen.getByText("style-test");

    expect(element.className.includes("custom-class")).toBe(true);
    expect(element.className.includes("bg-muted")).toBe(true);
  });
});
