/* eslint-disable func-style */
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";

import { Switch } from "./switch";

afterEach(cleanup);

function rootClassName() {
  return "root-callback";
}
function thumbClassName() {
  return "thumb-callback";
}

describe("Switch", () => {
  it("renders as switch", () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(<Switch aria-label="Test" />);
    expect(document.querySelector("[data-slot=switch]")).toBeDefined();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Test" />);
    const sw = screen.getByRole("switch");
    expect(sw.getAttribute("aria-checked")).toBe("false");
    await user.click(sw);
    expect(sw.getAttribute("aria-checked")).toBe("true");
  });

  it("preserves callback className on root", () => {
    render(<Switch aria-label="Styled" className={rootClassName} />);
    const sw = screen.getByRole("switch");
    expect(sw.className.includes("root-callback")).toBe(true);
    expect(sw.className.includes("rounded-full")).toBe(true);
  });

  it("renders exposed thumb subprimitive when composed", () => {
    render(
      <Switch aria-label="Composed">
        <Switch.Thumb className={thumbClassName} />
      </Switch>
    );

    const thumb = document.querySelector("[data-slot=switch-thumb]");
    expect(thumb).toBeDefined();
    expect(thumb?.className.includes("thumb-callback")).toBe(true);
    expect(thumb?.className.includes("rounded-full")).toBe(true);
  });
});
