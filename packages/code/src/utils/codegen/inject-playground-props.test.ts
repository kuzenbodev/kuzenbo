import { describe, expect, it } from "bun:test";

import { injectPlaygroundProps } from "./inject-playground-props";

describe("injectPlaygroundProps", () => {
  it("injects props into inline placeholder and replaces children", () => {
    const code = injectPlaygroundProps({
      template: "<Button{{props}}>{{children}}</Button>",
      props: {
        variant: "outline",
        disabled: true,
        children: "Save",
      },
      propOrder: ["disabled", "variant"],
    });

    expect(code).toBe('<Button disabled variant="outline">Save</Button>');
  });

  it("preserves multiline placeholder indentation", () => {
    const code = injectPlaygroundProps({
      template: `<Button\n  {{props}}\n>\n  {{children}}\n</Button>`,
      props: {
        size: "lg",
        radius: 12,
        children: "Multiline",
      },
      propOrder: ["size", "radius"],
    });

    expect(code).toBe(
      `<Button\n  size="lg"\n  radius={12}\n>\n  Multiline\n</Button>`
    );
  });

  it("clears placeholder when no props are provided", () => {
    const code = injectPlaygroundProps({
      template: "<Button{{props}}>X</Button>",
      props: {},
    });

    expect(code).toBe("<Button>X</Button>");
  });

  it("falls back to alphabetical order for unknown props", () => {
    const code = injectPlaygroundProps({
      template: "<Button{{props}} />",
      props: {
        zeta: "z",
        alpha: "a",
      },
      propOrder: ["size"],
    });

    expect(code).toBe('<Button alpha="a" zeta="z" />');
  });
});
