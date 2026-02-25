import { describe, expect, it } from "bun:test";

import { definePlaygroundControls } from "../../playground/playground-control-model";
import { generatePlaygroundCode } from "./generate-playground-code";

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
    type: "string",
    prop: "children",
    initialValue: "Button",
    defaultValue: "Button",
  },
] as const);

describe("generatePlaygroundCode", () => {
  it("generates minimal output for string templates", () => {
    const files = generatePlaygroundCode({
      controls,
      state: {
        disabled: false,
        size: "lg",
        children: "Custom",
      },
      template: "<Button{{props}}>{{children}}</Button>",
      mode: "minimal",
    });

    expect(files).toEqual([
      {
        fileName: "Demo.tsx",
        language: "tsx",
        code: '<Button size="lg">Custom</Button>',
      },
    ]);
  });

  it("generates full output and keeps default values", () => {
    const files = generatePlaygroundCode({
      controls,
      state: {
        disabled: false,
        size: "md",
        children: "Button",
      },
      template: "<Button{{props}}>{{children}}</Button>",
      mode: "full",
    });

    expect(files[0]?.code).toBe(
      '<Button disabled={false} size="md">Button</Button>'
    );
  });

  it("supports multi-file templates with defaults", () => {
    const files = generatePlaygroundCode({
      controls,
      state: {
        disabled: true,
        size: "sm",
        children: "Primary",
      },
      template: [
        {
          code: `<Button\n  {{props}}\n>\n  {{children}}\n</Button>`,
        },
        {
          fileName: "demo.css",
          language: "css",
          code: ".demo { display: block; }",
        },
      ],
      mode: "minimal",
    });

    expect(files).toEqual([
      {
        fileName: "Demo.tsx",
        language: "tsx",
        code: `<Button\n  disabled\n  size="sm"\n>\n  Primary\n</Button>`,
      },
      {
        fileName: "demo.css",
        language: "css",
        code: ".demo { display: block; }",
      },
    ]);
  });
});
