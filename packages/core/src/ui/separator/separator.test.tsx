import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render } from "@testing-library/react";

import { Separator } from "./separator";

afterEach(cleanup);

const SEPARATOR_CLASS_NAME = () => "separator-from-fn";

describe("Separator", () => {
  it("renders without crashing", () => {
    render(<Separator />);
    const el = document.querySelector("[data-slot=separator]");
    expect(el).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(<Separator />);
    const el = document.querySelector("[data-slot=separator]");
    expect(el).toBeDefined();
  });

  it("renders with vertical orientation", () => {
    render(<Separator orientation="vertical" />);
    const el = document.querySelector("[data-slot=separator]");
    expect(el).toBeDefined();
  });

  it("preserves className callback support", () => {
    render(<Separator className={SEPARATOR_CLASS_NAME} />);
    const el = document.querySelector<HTMLElement>("[data-slot=separator]");
    expect(el?.className.includes("separator-from-fn")).toBe(true);
  });
});
