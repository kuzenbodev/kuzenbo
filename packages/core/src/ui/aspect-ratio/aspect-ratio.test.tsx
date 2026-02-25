import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { AspectRatio } from "./aspect-ratio";

afterEach(cleanup);

describe("AspectRatio", () => {
  it("renders children correctly", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <span>Content</span>
      </AspectRatio>
    );
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(<AspectRatio ratio={1}>x</AspectRatio>);
    const el = document.querySelector("[data-slot=aspect-ratio]");
    expect(el).toBeDefined();
  });

  it("applies ratio via style", () => {
    render(<AspectRatio ratio={16 / 9} data-testid="ar" />);
    const el = screen.getByTestId("ar") as HTMLElement;
    expect(el.style.getPropertyValue("--ratio")).toBe("1.7777777777777777");
  });
});
