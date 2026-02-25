import { cleanup, fireEvent, render, within } from "@testing-library/react";
import { afterEach, expect, test } from "bun:test";

import { ButtonPlayground } from "./button-playground.client";

const getRawCode = (container: HTMLElement): string => {
  const element = container.querySelector(
    '[data-slot="docs-playground-code-raw"]'
  );
  if (!(element instanceof HTMLElement)) {
    throw new Error("Raw code element not found");
  }

  return element.textContent ?? "";
};

const getSlotElement = (container: HTMLElement, slot: string): HTMLElement => {
  const element = container.querySelector(`[data-slot="${slot}"]`);
  if (!(element instanceof HTMLElement)) {
    throw new Error(`Element with slot "${slot}" not found`);
  }

  return element;
};

afterEach(() => {
  cleanup();
});

test("playground updates generated code for presets and code mode", () => {
  const { container } = render(<ButtonPlayground />);
  const view = within(container);

  expect(getRawCode(container)).toContain("<Button>Button</Button>");

  fireEvent.click(view.getByRole("button", { name: "Preset Danger" }));
  expect(getRawCode(container)).toContain('variant="danger"');
  expect(getRawCode(container)).toContain("Delete project");

  const variantDefaultButton = view.getByRole("button", {
    name: "Variant: Default",
  });
  expect((variantDefaultButton as HTMLButtonElement).disabled).toBe(true);

  fireEvent.click(view.getByRole("button", { name: "Full code" }));
  expect(getRawCode(container)).toContain('size="md"');
  expect(getRawCode(container)).toContain("disabled={false}");
});

test("playground reflects control changes in generated code", () => {
  const { container } = render(<ButtonPlayground />);

  const controls = getSlotElement(container, "docs-playground-controls");
  const loadingSwitch = within(controls).getByRole("switch", {
    name: "Loading",
  });

  expect(getRawCode(container)).not.toContain("isLoading");
  fireEvent.click(loadingSwitch);
  expect(getRawCode(container)).toContain("isLoading");

  fireEvent.change(within(controls).getByRole("textbox", { name: "Label" }), {
    target: { value: "Save workspace" },
  });
  expect(getRawCode(container)).toContain("Save workspace");
});

test("playground preserves docs-playground class output", () => {
  const { container } = render(<ButtonPlayground />);

  const playground = getSlotElement(container, "docs-playground");
  expect(playground.className).toBe(
    "not-prose overflow-hidden rounded-xl border border-border bg-card text-card-foreground"
  );

  const controls = getSlotElement(container, "docs-playground-controls");
  expect(controls.className).toBe("space-y-5");

  const presets = getSlotElement(container, "docs-playground-presets");
  for (const classToken of ["flex", "w-fit", "items-stretch"]) {
    expect(presets.className.includes(classToken)).toBe(true);
  }

  const optionControl = getSlotElement(container, "playground-option-control");
  for (const classToken of ["flex", "w-full", "flex-wrap", "gap-2"]) {
    expect(optionControl.className.includes(classToken)).toBe(true);
  }

  const code = getSlotElement(container, "docs-playground-code");
  expect(code.className).toBe("border-border");
});
