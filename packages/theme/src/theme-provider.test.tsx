import { describe, expect, it } from "bun:test";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { ThemeProvider } from "./theme-provider";

describe("ThemeProvider", () => {
  it("renders children", () => {
    const markup = renderToStaticMarkup(
      createElement(
        ThemeProvider,
        null,
        createElement("span", null, "theme-provider-content")
      )
    );

    expect(markup).toContain("theme-provider-content");
  });
});
