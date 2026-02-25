/* eslint-disable func-style */
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";

import { Checkbox } from "./checkbox";

afterEach(cleanup);

function rootClassName() {
  return "root-callback";
}
function indicatorClassName() {
  return "indicator-callback";
}

describe("Checkbox", () => {
  it("renders as checkbox", () => {
    render(<Checkbox aria-label="Accept" />);
    expect(screen.getByRole("checkbox")).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(<Checkbox aria-label="Test" />);
    expect(document.querySelector("[data-slot=checkbox]")).toBeDefined();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Test" />);
    const cb = screen.getByRole("checkbox");
    expect(cb.getAttribute("aria-checked")).toBe("false");
    await user.click(cb);
    expect(cb.getAttribute("aria-checked")).toBe("true");
  });

  it("preserves callback className on root", () => {
    render(<Checkbox aria-label="Styled" className={rootClassName} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.className.includes("root-callback")).toBe(true);
    expect(checkbox.className.includes("rounded-[4px]")).toBe(true);
  });

  it("renders exposed indicator subprimitive when composed", () => {
    render(
      <Checkbox aria-label="Composed" defaultChecked>
        <Checkbox.Indicator className={indicatorClassName}>
          <span>icon</span>
        </Checkbox.Indicator>
      </Checkbox>
    );

    const indicator = document.querySelector("[data-slot=checkbox-indicator]");
    expect(indicator).not.toBeNull();

    const indicatorElement = indicator as HTMLElement;
    expect(indicatorElement.className.includes("indicator-callback")).toBe(
      true
    );
    expect(indicatorElement.className.includes("place-content-center")).toBe(
      true
    );
  });
});
