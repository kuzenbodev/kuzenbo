import { describe, expect, it } from "bun:test";

import { definePlaygroundControls } from "../../playground/playground-control-model";
import { clearPlaygroundDefaultProps } from "./clear-playground-default-props";

const controls = definePlaygroundControls([
  {
    type: "boolean",
    prop: "disabled",
    initialValue: false,
    defaultValue: false,
  },
  {
    type: "size",
    prop: "size",
    initialValue: "md",
    defaultValue: "md",
  },
  {
    type: "number",
    prop: "radius",
    initialValue: 2,
    defaultValue: 2,
  },
  {
    type: "string",
    prop: "children",
    initialValue: "Button",
    defaultValue: "Button",
  },
] as const);

describe("clearPlaygroundDefaultProps", () => {
  it("returns only changed props in minimal mode", () => {
    const changed = clearPlaygroundDefaultProps({
      controls,
      state: {
        disabled: true,
        size: "md",
        radius: 10,
        children: "Button",
      },
      mode: "minimal",
    });

    expect(changed).toEqual({
      disabled: true,
      radius: 10,
    });
  });

  it("returns full prop payload in full mode", () => {
    const full = clearPlaygroundDefaultProps({
      controls,
      state: {
        disabled: false,
        size: "lg",
        radius: 2,
        children: "Large button",
      },
      mode: "full",
    });

    expect(full).toEqual({
      disabled: false,
      size: "lg",
      radius: 2,
      children: "Large button",
    });
  });
});
