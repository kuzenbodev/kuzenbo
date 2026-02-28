import { afterEach, describe, expect, it, mock } from "bun:test";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { definePlaygroundControls } from "../../playground/playground-control-model";
import { PlaygroundControls } from "./playground-controls";

afterEach(cleanup);

const controls = definePlaygroundControls([
  {
    defaultValue: false,
    initialValue: false,
    prop: "disabled",
    type: "boolean",
  },
  {
    defaultValue: "Click me",
    initialValue: "Click me",
    prop: "children",
    type: "string",
  },
] as const);

describe("PlaygroundControls", () => {
  it("renders controls and forwards prop/value updates", () => {
    const onChange = mock();

    render(
      <PlaygroundControls
        controls={controls}
        onChange={onChange}
        state={{
          children: "Click me",
          disabled: false,
        }}
      />
    );

    fireEvent.click(screen.getByRole("switch", { name: "Disabled" }));
    fireEvent.change(screen.getByLabelText("Children"), {
      target: { value: "Submit" },
    });

    expect(onChange).toHaveBeenCalledWith("disabled", true);
    expect(onChange).toHaveBeenCalledWith("children", "Submit");
  });

  it("disables locked controls", () => {
    const onChange = mock();

    render(
      <PlaygroundControls
        controls={controls}
        lockedProps={new Set(["children"] as const)}
        onChange={onChange}
        state={{
          children: "Click me",
          disabled: false,
        }}
      />
    );

    expect(screen.getByLabelText("Children")).toHaveProperty("disabled", true);
    expect(
      screen.getByRole("switch", { name: "Disabled" }).dataset.disabled
    ).toBeUndefined();
  });
});
