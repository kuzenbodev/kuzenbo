import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Portal } from "./portal";

afterEach(() => {
  cleanup();
  for (const node of document.querySelectorAll<HTMLElement>(
    "[data-portal=true]"
  )) {
    if (node.parentElement === document.body) {
      node.remove();
    }
  }
});

describe("Portal", () => {
  it("renders children to document body", () => {
    render(
      <Portal>
        <div data-testid="portaled">Portaled content</div>
      </Portal>
    );
    expect(screen.getByTestId("portaled")).toBeDefined();
  });

  it("renders inside a provided selector target", () => {
    const host = document.createElement("div");
    host.id = "portal-host";
    document.body.append(host);

    render(
      <Portal target="#portal-host">
        <div data-testid="inside-target">Target content</div>
      </Portal>
    );

    const content = screen.getByTestId("inside-target");
    expect(host.contains(content)).toBe(true);
  });

  it("falls back to a body-mounted node when selector target is missing", () => {
    render(
      <Portal target="#missing-target">
        <div data-testid="missing-target-content">Fallback content</div>
      </Portal>
    );

    const content = screen.getByTestId("missing-target-content");
    const portalNode = content.parentElement;

    expect(portalNode?.dataset.portal).toBe("true");
    expect(portalNode?.parentElement).toBe(document.body);
  });

  it("creates and cleans dedicated nodes when reuseTargetNode is false", () => {
    const { unmount } = render(
      <Portal reuseTargetNode={false}>
        <div data-testid="dedicated">Dedicated content</div>
      </Portal>
    );

    const content = screen.getByTestId("dedicated");
    const portalNode = content.parentElement;
    expect(portalNode?.parentElement).toBe(document.body);

    unmount();

    expect(portalNode?.isConnected).toBe(false);
  });
});
