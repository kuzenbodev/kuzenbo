import { describe, expect, it } from "bun:test";

import { definePlaygroundControls } from "../../playground/playground-control-model";
import { generatePlaygroundCode } from "./generate-playground-code";

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
    defaultValue: "Button",
    initialValue: "Button",
    prop: "children",
    type: "string",
  },
] as const);

describe("generatePlaygroundCode", () => {
  it("generates minimal output for string templates", () => {
    const files = generatePlaygroundCode({
      controls,
      mode: "minimal",
      state: {
        children: "Custom",
        disabled: false,
        size: "lg",
      },
      template: "<Button{{props}}>{{children}}</Button>",
    });

    expect(files).toEqual([
      {
        code: '<Button size="lg">Custom</Button>',
        fileName: "Demo.tsx",
        language: "tsx",
      },
    ]);
  });

  it("generates full output and keeps default values", () => {
    const files = generatePlaygroundCode({
      controls,
      mode: "full",
      state: {
        children: "Button",
        disabled: false,
        size: "md",
      },
      template: "<Button{{props}}>{{children}}</Button>",
    });

    expect(files[0]?.code).toBe(
      '<Button disabled={false} size="md">Button</Button>'
    );
  });

  it("supports multi-file templates with defaults", () => {
    const files = generatePlaygroundCode({
      controls,
      mode: "minimal",
      state: {
        children: "Primary",
        disabled: true,
        size: "sm",
      },
      template: [
        {
          code: `<Button\n  {{props}}\n>\n  {{children}}\n</Button>`,
        },
        {
          code: ".demo { display: block; }",
          fileName: "demo.css",
          language: "css",
        },
      ],
    });

    expect(files).toEqual([
      {
        code: `<Button\n  disabled\n  size="sm"\n>\n  Primary\n</Button>`,
        fileName: "Demo.tsx",
        language: "tsx",
      },
      {
        code: ".demo { display: block; }",
        fileName: "demo.css",
        language: "css",
      },
    ]);
  });
});
