import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Fieldset } from "./fieldset";

afterEach(cleanup);

describe("Fieldset", () => {
  it("renders root and legend parts", () => {
    render(
      <Fieldset>
        <Fieldset.Legend>Preferences</Fieldset.Legend>
      </Fieldset>
    );

    expect(document.querySelector("[data-slot=fieldset]")).toBeDefined();
    expect(screen.getByText("Preferences")).toBeDefined();
    expect(document.querySelector("[data-slot=fieldset-legend]")).toBeDefined();
  });

  it("passes disabled state to the native fieldset", () => {
    render(
      <Fieldset disabled>
        <Fieldset.Legend>Notifications</Fieldset.Legend>
      </Fieldset>
    );

    const fieldset = document.querySelector<HTMLElement>(
      "[data-slot=fieldset]"
    );
    expect(fieldset?.dataset.disabled).toBe("");
  });
});
