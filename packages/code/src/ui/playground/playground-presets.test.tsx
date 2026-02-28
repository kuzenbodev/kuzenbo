import { afterEach, describe, expect, it, mock } from "bun:test";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { PlaygroundPresets } from "./playground-presets";

afterEach(cleanup);

const presets = [
  { id: "compact", label: "Compact" },
  { id: "comfortable", label: "Comfortable" },
] as const;

describe("PlaygroundPresets", () => {
  it("maps the custom scalar value to the toggle-group selection", () => {
    const onPresetChange = mock();

    render(
      <PlaygroundPresets
        activePresetId={null}
        onPresetChange={onPresetChange}
        presets={presets}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Compact" }));

    expect(onPresetChange).toHaveBeenCalledWith("compact");
    expect(
      screen
        .getByRole("button", { name: "Custom" })
        .getAttribute("aria-pressed")
    ).toBe("true");
  });

  it("maps toggle-group values back to nullable preset ids", () => {
    const onPresetChange = mock();

    render(
      <PlaygroundPresets
        activePresetId="compact"
        onPresetChange={onPresetChange}
        presets={presets}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Custom" }));

    expect(onPresetChange).toHaveBeenCalledWith(null);
  });
});
