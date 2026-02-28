import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Kbd } from "./kbd";

afterEach(cleanup);

const UI_SIZE_TOKENS = ["xs", "sm", "md", "lg", "xl"] as const;

const queryRequiredKbdGroup = () => {
  const group = document.querySelector<HTMLElement>("[data-slot=kbd-group]");

  if (!group) {
    throw new Error("Expected kbd group to render");
  }

  return group;
};

describe("Kbd", () => {
  it("renders children correctly", () => {
    render(<Kbd>⌘</Kbd>);
    expect(screen.getByText("⌘")).toBeDefined();
  });

  it("renders as kbd element", () => {
    render(<Kbd>K</Kbd>);
    const kbd = screen.getByText("K");
    expect(kbd.tagName).toBe("KBD");
  });

  it("has data-slot attribute", () => {
    render(<Kbd>K</Kbd>);
    expect(screen.getByText("K").dataset.slot).toBe("kbd");
  });

  it("uses md as the default size token", () => {
    render(<Kbd>K</Kbd>);

    expect(screen.getByText("K").dataset.size).toBe("md");
  });

  it("supports all UISize tokens", () => {
    for (const size of UI_SIZE_TOKENS) {
      const { unmount } = render(<Kbd size={size}>{size}</Kbd>);

      expect(screen.getByText(size).dataset.size).toBe(size);

      unmount();
    }
  });

  it("inherits size from group and allows item overrides", () => {
    render(
      <Kbd.Group size="xl">
        <Kbd>G</Kbd>
        <Kbd size="sm">S</Kbd>
      </Kbd.Group>
    );

    const group = queryRequiredKbdGroup();
    const inheritedItem = screen.getByText("G");
    const overriddenItem = screen.getByText("S");

    expect(group.dataset.size).toBe("xl");
    expect(inheritedItem.dataset.size).toBe("xl");
    expect(overriddenItem.dataset.size).toBe("sm");
  });
});
