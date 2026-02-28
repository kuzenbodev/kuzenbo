import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { AiWidget } from "./ai-widget";

afterEach(cleanup);

describe("AiWidget", () => {
  it("renders title and content", () => {
    render(<AiWidget title="Mock">Body</AiWidget>);

    expect(screen.getByText("Mock")).toBeDefined();
    expect(screen.getByText("Body")).toBeDefined();

    const widget = document.querySelector(
      "[data-slot=ai-widget]"
    ) as HTMLElement;
    const heading = screen.getByRole("heading", { level: 3, name: "Mock" });
    const content = screen.getByText("Body");

    expect(widget.className).toContain("rounded-lg");
    expect(widget.className).toContain("bg-card");
    expect(heading.className).toContain("text-sm");
    expect(content.className).toContain("mt-2");
    expect(content.className).toContain("text-muted-foreground");
  });

  it("renders title as semantic heading", () => {
    render(<AiWidget title="Assistant">Body</AiWidget>);

    const heading = screen.getByRole("heading", {
      name: "Assistant",
      level: 3,
    });

    expect(heading).toBeDefined();
  });
});
