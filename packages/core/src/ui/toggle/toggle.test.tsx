import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Toggle } from "./toggle";

afterEach(cleanup);

const TOGGLE_CLASS_NAME = () => "toggle-from-fn";

describe("Toggle", () => {
  it("renders as button", () => {
    render(<Toggle aria-label="Toggle">Off</Toggle>);
    expect(screen.getByRole("button", { name: "Toggle" })).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(<Toggle aria-label="Test">T</Toggle>);
    expect(document.querySelector("[data-slot=toggle]")).toBeDefined();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Toggle aria-label="Test">T</Toggle>);
    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(btn.getAttribute("aria-pressed")).toBe("true");
  });

  it("merges className callback output with base classes", () => {
    render(
      <Toggle aria-label="Toggle callback" className={TOGGLE_CLASS_NAME}>
        T
      </Toggle>
    );

    const btn = screen.getByRole("button", { name: "Toggle callback" });
    expect(btn.className.includes("toggle-from-fn")).toBe(true);
    expect(btn.className.includes("group/toggle")).toBe(true);
  });

  it("uses md as the default size token", () => {
    render(<Toggle aria-label="Toggle size">T</Toggle>);

    const btn = screen.getByRole("button", { name: "Toggle size" });
    expect(btn.className.includes("h-8")).toBe(true);
  });
});
