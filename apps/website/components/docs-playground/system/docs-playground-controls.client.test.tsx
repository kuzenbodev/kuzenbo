import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, mock } from "bun:test";

import type { DocsPlaygroundControl } from "./types";

import { DocsPlaygroundControls } from "./docs-playground-controls.client";

afterEach(cleanup);

interface DemoState {
  density: number;
}

const controls = [
  {
    key: "density",
    label: "Density",
    type: "option",
    options: [
      { label: "1x", value: 1 },
      { label: "2x", value: 2 },
    ],
  },
] as const satisfies readonly DocsPlaygroundControl<DemoState>[];

describe("DocsPlaygroundControls", () => {
  it("maps option toggle-group selections to scalar option values", () => {
    const onControlChange = mock();

    render(
      <DocsPlaygroundControls<DemoState>
        controls={controls}
        fixedKeys={new Set()}
        onControlChange={onControlChange}
        playgroundId="density-demo"
        state={{ density: 2 }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Density: 1x" }));

    expect(onControlChange).toHaveBeenCalledWith("density", 1);
  });

  it("disables option controls when they are fixed by a preset", () => {
    render(
      <DocsPlaygroundControls<DemoState>
        controls={controls}
        fixedKeys={new Set(["density"] as const)}
        onControlChange={mock()}
        playgroundId="density-demo"
        state={{ density: 2 }}
      />
    );

    expect(screen.getByRole("button", { name: "Density: 1x" })).toHaveProperty(
      "disabled",
      true
    );
  });
});
