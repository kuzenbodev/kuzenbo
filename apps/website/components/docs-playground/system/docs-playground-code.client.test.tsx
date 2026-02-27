import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, mock } from "bun:test";

import { DocsPlaygroundCode } from "./docs-playground-code.client";

afterEach(cleanup);

describe("DocsPlaygroundCode", () => {
  it("maps toggle-group code mode changes back to scalar mode values", () => {
    const onModeChange = mock();

    render(
      <DocsPlaygroundCode
        code="const value = true;"
        filename="demo.tsx"
        language="tsx"
        mode="minimal"
        onModeChange={onModeChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Full code" }));

    expect(onModeChange).toHaveBeenCalledWith("full");
  });
});
