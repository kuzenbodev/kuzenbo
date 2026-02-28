import { describe, expect, it } from "bun:test";

import { definePlaygroundControls } from "../../playground/playground-control-model";
import { clearPlaygroundDefaultProps } from "./clear-playground-default-props";

const controls = definePlaygroundControls([
  {
    defaultValue: false,
    initialValue: false,
    prop: "disabled",
    type: "boolean",
  },
  {
    defaultValue: "md",
    initialValue: "md",
    prop: "size",
    type: "size",
  },
  {
    defaultValue: 2,
    initialValue: 2,
    prop: "radius",
    type: "number",
  },
  {
    defaultValue: "Button",
    initialValue: "Button",
    prop: "children",
    type: "string",
  },
] as const);

describe("clearPlaygroundDefaultProps", () => {
  it("returns only changed props in minimal mode", () => {
    const changed = clearPlaygroundDefaultProps({
      controls,
      mode: "minimal",
      state: {
        children: "Button",
        disabled: true,
        radius: 10,
        size: "md",
      },
    });

    expect(changed).toEqual({
      disabled: true,
      radius: 10,
    });
  });

  it("returns full prop payload in full mode", () => {
    const full = clearPlaygroundDefaultProps({
      controls,
      mode: "full",
      state: {
        children: "Large button",
        disabled: false,
        radius: 2,
        size: "lg",
      },
    });

    expect(full).toEqual({
      children: "Large button",
      disabled: false,
      radius: 2,
      size: "lg",
    });
  });
});
