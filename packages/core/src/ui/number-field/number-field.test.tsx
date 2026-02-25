/* eslint-disable func-style */
import type { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Label } from "../label/label";
import { NumberField } from "./number-field";
import {
  NumberFieldScrubAreaCursor,
  type NumberFieldScrubAreaCursorProps,
} from "./number-field-scrub-area-cursor";

afterEach(cleanup);

function rootDynamicClassName(_state: BaseNumberField.Root.State) {
  return "root-dynamic";
}

function scrubDynamicClassName(_state: BaseNumberField.ScrubArea.State) {
  return "scrub-dynamic";
}

function scrubCursorDynamicClassName(
  _state: BaseNumberField.ScrubAreaCursor.State
) {
  return "cursor-dynamic";
}

function groupDynamicClassName(_state: BaseNumberField.Group.State) {
  return "group-dynamic";
}

function decrementDynamicClassName(_state: BaseNumberField.Decrement.State) {
  return "decrement-dynamic";
}

function inputDynamicClassName(_state: BaseNumberField.Input.State) {
  return "input-dynamic";
}

function incrementDynamicClassName(_state: BaseNumberField.Increment.State) {
  return "increment-dynamic";
}

const getSlot = (slot: string) => {
  const element = document.querySelector(`[data-slot=${slot}]`);
  expect(element).not.toBeNull();
  return element as HTMLElement;
};

describe("NumberField", () => {
  it("renders a composable root without auto-injected controls", () => {
    render(<NumberField />);
    expect(document.querySelector("[data-slot=number-field]")).toBeDefined();
    expect(document.querySelector("[data-slot=number-field-input]")).toBeNull();
    expect(screen.queryAllByRole("button").length).toBe(0);
  });

  it("renders composed parts with stable data-slot hooks", () => {
    render(
      <NumberField defaultValue={0}>
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField>
    );

    expect(
      document.querySelector("[data-slot=number-field-group]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=number-field-decrement]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=number-field-input]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=number-field-increment]")
    ).toBeDefined();
  });

  it("uses md as the default size token for field controls", () => {
    render(
      <NumberField defaultValue={0}>
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField>
    );

    const root = getSlot("number-field");
    const decrement = getSlot("number-field-decrement");
    const input = getSlot("number-field-input");
    const increment = getSlot("number-field-increment");

    expect(root.dataset.size).toBe("md");
    expect(decrement.dataset.size).toBe("md");
    expect(input.dataset.size).toBe("md");
    expect(increment.dataset.size).toBe("md");
    expect(input.className).toContain("h-9");
    expect(decrement.className).toContain("size-9");
    expect(increment.className).toContain("size-9");
  });

  it("cascades root size to input and steppers", () => {
    render(
      <NumberField defaultValue={0} size="xl">
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField>
    );

    const decrement = getSlot("number-field-decrement");
    const input = getSlot("number-field-input");
    const increment = getSlot("number-field-increment");

    expect(decrement.dataset.size).toBe("xl");
    expect(input.dataset.size).toBe("xl");
    expect(increment.dataset.size).toBe("xl");
    expect(input.className).toContain("h-11");
    expect(decrement.className).toContain("size-11");
    expect(increment.className).toContain("size-11");
  });

  it("prefers explicit child size over root size", () => {
    render(
      <NumberField defaultValue={0} size="xl">
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input size="sm" />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField>
    );

    const input = getSlot("number-field-input");
    expect(input.dataset.size).toBe("sm");
    expect(input.className).toContain("h-8");
  });

  it("uses a taller lg height step than md for input and steppers", () => {
    render(
      <NumberField defaultValue={0} size="lg">
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField>
    );

    const decrement = getSlot("number-field-decrement");
    const input = getSlot("number-field-input");
    const increment = getSlot("number-field-increment");

    expect(input.className).toContain("h-10");
    expect(decrement.className).toContain("size-10");
    expect(increment.className).toContain("size-10");
  });

  it("renders custom scrub area children without forced defaults", () => {
    render(
      <NumberField>
        <NumberField.ScrubArea>
          <span>Custom scrub label</span>
        </NumberField.ScrubArea>
      </NumberField>
    );

    expect(screen.getByText("Custom scrub label")).toBeDefined();
    expect(screen.queryByText("Amount")).toBeNull();
    expect(
      document.querySelector("[data-slot=number-field-scrub-area-cursor]")
    ).toBeNull();
  });

  it("renders consumer-provided stepper children", () => {
    render(
      <NumberField>
        <NumberField.Group>
          <NumberField.Decrement>Down</NumberField.Decrement>
          <NumberField.Input aria-label="Quantity" />
          <NumberField.Increment>Up</NumberField.Increment>
        </NumberField.Group>
      </NumberField>
    );

    expect(screen.getByText("Down")).toBeDefined();
    expect(screen.getByText("Up")).toBeDefined();
  });

  it("supports accessible labeling through htmlFor/id composition", () => {
    const id = "number-field-a11y";

    render(
      <NumberField defaultValue={0} id={id}>
        <Label htmlFor={id}>Quantity</Label>
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField>
    );

    expect(screen.getByRole("textbox", { name: "Quantity" })).toBeDefined();
  });

  it("merges callback className on root with default classes", () => {
    render(<NumberField className={rootDynamicClassName} />);

    const root = getSlot("number-field");
    expect(root.className).toContain("root-dynamic");
    expect(root.className).toContain("flex-col");
  });

  it("merges callback className on composed parts with default classes", () => {
    render(
      <NumberField defaultValue={5}>
        <NumberField.ScrubArea className={scrubDynamicClassName}>
          <Label htmlFor="number-field-callback-parts">Amount</Label>
          <NumberField.ScrubAreaCursor
            className={scrubCursorDynamicClassName}
          />
        </NumberField.ScrubArea>
        <NumberField.Group className={groupDynamicClassName}>
          <NumberField.Decrement className={decrementDynamicClassName} />
          <NumberField.Input
            className={inputDynamicClassName}
            id="number-field-callback-parts"
          />
          <NumberField.Increment className={incrementDynamicClassName} />
        </NumberField.Group>
      </NumberField>
    );

    const scrubArea = getSlot("number-field-scrub-area");
    expect(scrubArea.className).toContain("scrub-dynamic");
    expect(scrubArea.className).toContain("cursor-ew-resize");

    expect(
      document.querySelector("[data-slot=number-field-scrub-area-cursor]")
    ).toBeNull();

    const group = getSlot("number-field-group");
    expect(group.className).toContain("group-dynamic");
    expect(group.className).toContain("rounded-md");
    expect(group.className).toContain("focus-within:ring-[3px]");

    const decrement = getSlot("number-field-decrement");
    expect(decrement.className).toContain("decrement-dynamic");
    expect(decrement.className).toContain("rounded-l-md");

    const input = getSlot("number-field-input");
    expect(input.className).toContain("input-dynamic");
    expect(input.className).toContain("tabular-nums");
    expect(input.className).not.toContain("focus-visible:ring-[3px]");
    expect(input.className).not.toContain("hover:border-ring/70");

    const increment = getSlot("number-field-increment");
    expect(increment.className).toContain("increment-dynamic");
    expect(increment.className).toContain("rounded-r-md");
  });

  it("merges string className on root and parts with default classes", () => {
    render(
      <NumberField className="root-string" defaultValue={3}>
        <NumberField.Group className="group-string">
          <NumberField.Decrement className="decrement-string" />
          <NumberField.Input className="input-string" />
          <NumberField.Increment className="increment-string" />
        </NumberField.Group>
      </NumberField>
    );

    const root = getSlot("number-field");
    expect(root.className).toContain("root-string");
    expect(root.className).toContain("flex-col");

    const group = getSlot("number-field-group");
    expect(group.className).toContain("group-string");
    expect(group.className).toContain("rounded-md");

    const decrement = getSlot("number-field-decrement");
    expect(decrement.className).toContain("decrement-string");
    expect(decrement.className).toContain("rounded-l-md");

    const input = getSlot("number-field-input");
    expect(input.className).toContain("input-string");
    expect(input.className).toContain("tabular-nums");

    const increment = getSlot("number-field-increment");
    expect(increment.className).toContain("increment-string");
    expect(increment.className).toContain("rounded-r-md");
  });

  it("preserves callback className composition for scrub area cursor", () => {
    const callbackClassName: NumberFieldScrubAreaCursorProps["className"] =
      scrubCursorDynamicClassName;
    const element = NumberFieldScrubAreaCursor({
      className: callbackClassName,
    });
    const mergedClassName = element.props.className as
      | ((state: { disabled: boolean }) => string | undefined)
      | undefined;

    expect(typeof mergedClassName).toBe("function");
    expect(mergedClassName?.({ disabled: false })).toContain("cursor-dynamic");
    expect(mergedClassName?.({ disabled: false })).toContain("drop-shadow-sm");
  });
});
