import { cleanup, fireEvent, render, within } from "@testing-library/react";
import { afterEach, expect, test } from "bun:test";

import { ButtonPlayground } from "./button-playground.client";

const getSlotElement = (container: HTMLElement, slot: string): HTMLElement => {
  const element = container.querySelector(`[data-slot="${slot}"]`);
  if (!(element instanceof HTMLElement)) {
    throw new Error(`Element with slot "${slot}" not found`);
  }

  return element;
};

const getLoadingPresetButton = (container: HTMLElement): HTMLElement => {
  const presets = within(getSlotElement(container, "playground-presets"));
  const loadingPresetButton = presets
    .getAllByRole("button")
    .find((button) => button.textContent?.trim().startsWith("Loading"));

  if (!loadingPresetButton) {
    throw new Error("Loading preset button not found");
  }

  return loadingPresetButton;
};

afterEach(() => {
  cleanup();
});

test("playground updates generated code for presets and code mode", () => {
  const { container } = render(<ButtonPlayground />);
  const view = within(getSlotElement(container, "button-playground"));
  const presets = within(getSlotElement(container, "playground-presets"));
  const code = getSlotElement(container, "playground-code");

  expect(code.textContent).toContain("Button");
  expect(code.textContent).not.toContain("variant=");

  fireEvent.click(presets.getByRole("button", { name: /Danger/ }));
  expect(code.textContent).toContain('variant="danger"');
  expect(code.textContent).toContain("Delete project");

  fireEvent.click(view.getByRole("button", { name: "Full code" }));
  expect(code.textContent).toContain("disabled={false}");
  expect(code.textContent).toContain("isLoading={false}");
});

test("playground locks and unlocks controls based on selected preset", () => {
  const { container } = render(<ButtonPlayground />);

  const shell = getSlotElement(container, "playground-shell");
  const view = within(shell);
  const presets = within(getSlotElement(container, "playground-presets"));
  const controls = getSlotElement(container, "playground-controls");
  const controlsView = within(controls);

  fireEvent.click(presets.getByRole("button", { name: /Danger/ }));

  const variantTrigger = controlsView.getByRole("combobox", {
    name: "Variant",
  });
  expect((variantTrigger as HTMLButtonElement).disabled).toBe(true);

  fireEvent.click(view.getByRole("button", { name: /Custom/ }));
  expect((variantTrigger as HTMLButtonElement).disabled).toBe(false);
});

test("playground reflects control changes in generated code", () => {
  const { container } = render(<ButtonPlayground />);
  const code = getSlotElement(container, "playground-code");

  expect(code.textContent).not.toContain("isLoading");
  fireEvent.click(getLoadingPresetButton(container));
  expect(code.textContent).toContain("isLoading");

  const controls = getSlotElement(container, "playground-controls");

  fireEvent.change(within(controls).getByRole("textbox", { name: "Label" }), {
    target: { value: "Save workspace" },
  });
  expect(code.textContent).toContain("Save workspace");
});

test("code mode toggle buttons update pressed state", () => {
  const { container } = render(<ButtonPlayground />);
  const modeToggle = getSlotElement(container, "button-playground-code-mode");
  const modeToggleView = within(modeToggle);

  const minimalButton = modeToggleView.getByRole("button", {
    name: "Minimal code",
  });
  const fullButton = modeToggleView.getByRole("button", { name: "Full code" });

  expect(minimalButton.getAttribute("aria-pressed")).toBe("true");
  expect(fullButton.getAttribute("aria-pressed")).toBe("false");

  fireEvent.click(fullButton);

  expect(minimalButton.getAttribute("aria-pressed")).toBe("false");
  expect(fullButton.getAttribute("aria-pressed")).toBe("true");
});
