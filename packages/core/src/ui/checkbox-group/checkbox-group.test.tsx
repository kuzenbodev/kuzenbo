/* eslint-disable func-style */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { CheckboxGroup } from "./checkbox-group";

afterEach(cleanup);

function groupClassName() {
  return "group-callback";
}

describe("CheckboxGroup", () => {
  it("renders children", () => {
    render(
      <CheckboxGroup>
        <label>
          <input type="checkbox" />
          Option A
        </label>
      </CheckboxGroup>
    );
    expect(screen.getByText("Option A")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <CheckboxGroup>
        <input type="checkbox" />
      </CheckboxGroup>
    );
    expect(document.querySelector("[data-slot=checkbox-group]")).toBeDefined();
  });

  it("preserves callback className on root", () => {
    render(<CheckboxGroup className={groupClassName} />);
    const group = document.querySelector("[data-slot=checkbox-group]");
    expect(group).toBeDefined();
    expect(group?.className.includes("group-callback")).toBe(true);
    expect(group?.className.includes("flex-col")).toBe(true);
  });
});
