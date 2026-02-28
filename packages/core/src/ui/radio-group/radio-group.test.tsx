import { afterEach, describe, expect, it } from "bun:test";

/* eslint-disable func-style */
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { RadioGroup } from "./radio-group";

afterEach(cleanup);

function groupClassName() {
  return "group-callback";
}
function itemClassName() {
  return "item-callback";
}
function indicatorClassName() {
  return "indicator-callback";
}

describe("RadioGroup", () => {
  it("renders radio items", () => {
    render(
      <RadioGroup>
        <RadioGroup.Item value="a" aria-label="Option A" />
        <RadioGroup.Item value="b" aria-label="Option B" />
      </RadioGroup>
    );
    expect(screen.getByRole("radio", { name: "Option A" })).toBeDefined();
    expect(screen.getByRole("radio", { name: "Option B" })).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <RadioGroup>
        <RadioGroup.Item value="a" aria-label="A" />
      </RadioGroup>
    );
    expect(document.querySelector("[data-slot=radio-group]")).toBeDefined();
  });

  it("selects item on click", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup>
        <RadioGroup.Item value="a" aria-label="A" />
        <RadioGroup.Item value="b" aria-label="B" />
      </RadioGroup>
    );
    await user.click(screen.getByRole("radio", { name: "B" }));
    expect(
      screen.getByRole("radio", { name: "B" }).getAttribute("aria-checked")
    ).toBe("true");
  });

  it("preserves callback className on root and item", () => {
    render(
      <RadioGroup className={groupClassName}>
        <RadioGroup.Item aria-label="A" className={itemClassName} value="a" />
      </RadioGroup>
    );

    const group = document.querySelector("[data-slot=radio-group]");
    expect(group).toBeDefined();
    expect(group?.className.includes("group-callback")).toBe(true);
    expect(group?.className.includes("grid")).toBe(true);

    const item = screen.getByRole("radio", { name: "A" });
    expect(item.className.includes("item-callback")).toBe(true);
    expect(item.className.includes("rounded-full")).toBe(true);
  });

  it("renders exposed indicator subprimitive when composed", () => {
    render(
      <RadioGroup defaultValue="custom">
        <RadioGroup.Item aria-label="Custom" value="custom">
          <RadioGroup.Indicator className={indicatorClassName}>
            <span>dot</span>
          </RadioGroup.Indicator>
        </RadioGroup.Item>
      </RadioGroup>
    );

    const indicator = document.querySelector(
      "[data-slot=radio-group-indicator]"
    );
    expect(indicator).not.toBeNull();

    const indicatorElement = indicator as HTMLElement;
    expect(indicatorElement.className.includes("indicator-callback")).toBe(
      true
    );
    expect(indicatorElement.className.includes("items-center")).toBe(true);
  });
});
