import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Skeleton } from "./skeleton";

afterEach(cleanup);

describe("Skeleton", () => {
  it("renders without crashing", () => {
    render(<Skeleton />);
    const el = document.querySelector("[data-slot=skeleton]");
    expect(el).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(<Skeleton />);
    expect(document.querySelector("[data-slot=skeleton]")).toBeDefined();
  });

  it("spreads rest props", () => {
    render(<Skeleton data-testid="my-skeleton" />);
    expect(screen.getByTestId("my-skeleton")).toBeDefined();
  });
});
