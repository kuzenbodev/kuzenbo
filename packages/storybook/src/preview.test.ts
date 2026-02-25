import { describe, expect, it } from "bun:test";

import preview from "./preview";

describe("shared Storybook preview", () => {
  it("keeps shared decorators and parameters", () => {
    expect(preview.decorators).toHaveLength(2);
    expect(preview.parameters).toEqual({
      a11y: {
        test: "todo",
      },
      controls: {
        matchers: {
          color: /(background|color)$/i,
          date: /Date$/i,
        },
      },
      docs: {
        autodocs: "tag",
      },
    });
  });
});
