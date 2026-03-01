import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

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

  it("applies centered container classes and tokenized max width", () => {
    render(<Container>Content</Container>);
    const element = document.querySelector<HTMLElement>(
      "[data-slot=container]"
    );

    expect(element?.className.includes("mx-auto")).toBe(true);
    expect(element?.className.includes("px-4")).toBe(true);
    expect(element?.style.maxWidth).toBe(
      "var(--kb-container-max-width, 86rem)"
    );
  });

  it("spreads rest props", () => {
    render(<Container data-testid="container">Content</Container>);
    expect(screen.getByTestId("container")).toBeDefined();
  });

  it("lets inline style overrides win over the default max width token", () => {
    render(<Container style={{ maxWidth: "40rem" }}>Content</Container>);
    const element = document.querySelector<HTMLElement>(
      "[data-slot=container]"
    );

    expect(element?.style.maxWidth).toBe("40rem");
  });
});
