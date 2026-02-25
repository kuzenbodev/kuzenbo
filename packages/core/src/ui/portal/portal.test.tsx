import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Portal } from "./portal";

afterEach(cleanup);

describe("Portal", () => {
  it("renders children to document body", () => {
    render(
      <Portal>
        <div data-testid="portaled">Portaled content</div>
      </Portal>
    );
    expect(screen.getByTestId("portaled")).toBeDefined();
  });
});
