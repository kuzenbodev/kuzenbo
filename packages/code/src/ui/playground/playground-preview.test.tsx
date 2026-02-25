import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { PlaygroundPreview } from "./playground-preview";

afterEach(cleanup);

interface PreviewButtonProps {
  id?: string;
  size: string;
  disabled?: boolean;
}

const PreviewButton = ({ id, size, disabled = false }: PreviewButtonProps) => (
  <button data-id={id} data-size={size} disabled={disabled} type="button">
    Preview
  </button>
);

describe("PlaygroundPreview", () => {
  it("injects state and merges static props", () => {
    render(
      <PlaygroundPreview
        state={{
          size: "lg",
          disabled: true,
        }}
        staticProps={{
          id: "demo",
        }}
      >
        <PreviewButton size="sm" />
      </PlaygroundPreview>
    );

    const button = screen.getByRole("button", { name: "Preview" });

    expect(button.dataset.size).toBe("lg");
    expect(button.dataset.id).toBe("demo");
    expect(button).toHaveProperty("disabled", true);
  });
});
