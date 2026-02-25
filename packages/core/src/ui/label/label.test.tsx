import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Label } from "./label";

afterEach(cleanup);

describe("Label", () => {
  it("renders children correctly", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toBeDefined();
  });

  it("renders as label element", () => {
    render(<Label>Test</Label>);
    const label = screen.getByText("Test");
    expect(label.tagName).toBe("LABEL");
  });

  it("has data-slot attribute", () => {
    render(<Label>Test</Label>);
    expect(screen.getByText("Test").dataset.slot).toBe("label");
  });

  it("associates with input via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>
    );
    expect(screen.getByLabelText("Email")).toBeDefined();
  });
});
