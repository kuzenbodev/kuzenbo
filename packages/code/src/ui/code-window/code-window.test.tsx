import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { CodeWindow } from "./code-window";

afterEach(cleanup);

describe("CodeWindow", () => {
  it("renders title and children", () => {
    render(
      <CodeWindow title="Installation snippet">
        <code>npm install @kuzenbo/code</code>
      </CodeWindow>
    );

    expect(screen.getByText("Installation snippet")).toBeDefined();
    expect(screen.getByText("npm install @kuzenbo/code")).toBeDefined();
  });

  it("renders traffic lights by default", () => {
    render(
      <CodeWindow title="Code window">
        <code>const ok = true;</code>
      </CodeWindow>
    );

    expect(
      document.querySelector("[data-slot=code-window-traffic-lights]")
    ).toBeDefined();
  });

  it("hides traffic lights when disabled", () => {
    render(
      <CodeWindow showTrafficLights={false} title="Code window">
        <code>const ok = true;</code>
      </CodeWindow>
    );

    expect(
      document.querySelector("[data-slot=code-window-traffic-lights]")
    ).toBeNull();
  });
});
