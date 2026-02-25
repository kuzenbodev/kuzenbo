import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Spacer } from "./spacer";

afterEach(cleanup);

describe("Spacer", () => {
  it("renders without crashing", () => {
    render(<Spacer />);
    const el = document.querySelector("[data-slot=spacer]");
    expect(el).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(<Spacer />);
    expect(document.querySelector("[data-slot=spacer]")).toBeDefined();
  });

  it("spreads rest props", () => {
    render(<Spacer data-testid="my-spacer" />);
    expect(screen.getByTestId("my-spacer")).toBeDefined();
  });
});
