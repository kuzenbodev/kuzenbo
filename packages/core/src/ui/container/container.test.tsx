import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Container } from "./container";

afterEach(cleanup);

describe("Container", () => {
  it("renders children", () => {
    render(<Container>Content</Container>);
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(<Container>Content</Container>);
    expect(document.querySelector("[data-slot=container]")).toBeDefined();
  });

  it("applies centered container classes", () => {
    render(<Container>Content</Container>);
    const element = document.querySelector("[data-slot=container]");

    expect(element?.className.includes("mx-auto")).toBe(true);
    expect(element?.className.includes("max-w-[86rem]")).toBe(true);
    expect(element?.className.includes("px-4")).toBe(true);
  });

  it("spreads rest props", () => {
    render(<Container data-testid="container">Content</Container>);
    expect(screen.getByTestId("container")).toBeDefined();
  });
});
