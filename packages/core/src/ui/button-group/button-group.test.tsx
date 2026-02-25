import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Button } from "../button/button";
import { ButtonGroup } from "./button-group";

afterEach(cleanup);

describe("ButtonGroup", () => {
  it("renders buttons", () => {
    render(
      <ButtonGroup>
        <Button>Left</Button>
        <Button>Right</Button>
      </ButtonGroup>
    );
    expect(screen.getByText("Left")).toBeDefined();
    expect(screen.getByText("Right")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <ButtonGroup>
        <Button>Test</Button>
      </ButtonGroup>
    );
    expect(document.querySelector("[data-slot=button-group]")).toBeDefined();
  });

  it("inherits group size for child buttons by default", () => {
    render(
      <ButtonGroup size="xs">
        <Button>Small action</Button>
      </ButtonGroup>
    );

    const button = screen.getByRole("button", { name: /small action/i });
    expect(button.dataset.size).toBe("xs");
    expect(button.className.includes("h-6")).toBe(true);
  });

  it("keeps explicit button size over inherited group size", () => {
    render(
      <ButtonGroup size="sm">
        <Button size="xl">Large action</Button>
      </ButtonGroup>
    );

    const button = screen.getByRole("button", { name: /large action/i });
    expect(button.dataset.size).toBe("xl");
    expect(button.className.includes("h-11")).toBe(true);
  });
});
