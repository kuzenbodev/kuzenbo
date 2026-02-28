import { describe, expect, it } from "bun:test";

import { injectPlaygroundProps } from "./inject-playground-props";

describe("injectPlaygroundProps", () => {
  it("injects props into inline placeholder and replaces children", () => {
    const code = injectPlaygroundProps({
      propOrder: ["disabled", "variant"],
      props: {
        children: "Save",
        disabled: true,
        variant: "outline",
      },
      template: "<Button{{props}}>{{children}}</Button>",
    });

    expect(code).toBe('<Button disabled variant="outline">Save</Button>');
  });

  it("preserves multiline placeholder indentation", () => {
    const code = injectPlaygroundProps({
      propOrder: ["size", "radius"],
      props: {
        children: "Multiline",
        radius: 12,
        size: "lg",
      },
      template: `<Button\n  {{props}}\n>\n  {{children}}\n</Button>`,
    });

    expect(code).toBe(
      `<Button\n  size="lg"\n  radius={12}\n>\n  Multiline\n</Button>`
    );
  });

  it("clears placeholder when no props are provided", () => {
    const code = injectPlaygroundProps({
      props: {},
      template: "<Button{{props}}>X</Button>",
    });

    expect(code).toBe("<Button>X</Button>");
  });

  it("falls back to alphabetical order for unknown props", () => {
    const code = injectPlaygroundProps({
      propOrder: ["size"],
      props: {
        alpha: "a",
        zeta: "z",
      },
      template: "<Button{{props}} />",
    });

    expect(code).toBe('<Button alpha="a" zeta="z" />');
  });
});
