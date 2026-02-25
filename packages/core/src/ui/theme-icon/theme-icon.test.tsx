import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { ThemeIcon } from "./theme-icon";

afterEach(cleanup);

describe("ThemeIcon", () => {
  it("renders children", () => {
    render(<ThemeIcon>★</ThemeIcon>);
    expect(screen.getByText("★")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(<ThemeIcon>x</ThemeIcon>);
    expect(document.querySelector("[data-slot=theme-icon]")).toBeDefined();
  });

  it("supports the full xs-sm-md-lg-xl size scale", () => {
    render(
      <>
        <ThemeIcon data-testid="theme-icon-xs" size="xs">
          xs
        </ThemeIcon>
        <ThemeIcon data-testid="theme-icon-sm" size="sm">
          sm
        </ThemeIcon>
        <ThemeIcon data-testid="theme-icon-md" size="md">
          md
        </ThemeIcon>
        <ThemeIcon data-testid="theme-icon-lg" size="lg">
          lg
        </ThemeIcon>
        <ThemeIcon data-testid="theme-icon-xl" size="xl">
          xl
        </ThemeIcon>
      </>
    );

    expect(
      screen.getByTestId("theme-icon-xs").className.includes("size-6")
    ).toBe(true);
    expect(
      screen.getByTestId("theme-icon-sm").className.includes("size-8")
    ).toBe(true);
    expect(
      screen.getByTestId("theme-icon-md").className.includes("size-9")
    ).toBe(true);
    expect(
      screen.getByTestId("theme-icon-lg").className.includes("size-10")
    ).toBe(true);
    expect(
      screen.getByTestId("theme-icon-xl").className.includes("size-11")
    ).toBe(true);
  });
});
