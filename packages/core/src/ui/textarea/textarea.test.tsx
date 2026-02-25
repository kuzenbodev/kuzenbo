import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, mock } from "bun:test";

import { KuzenboProvider } from "../shared/size/size-provider";
import { Textarea } from "./textarea";

afterEach(cleanup);

describe("Textarea", () => {
  it("renders as textarea element", () => {
    render(<Textarea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText("Enter text");
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("has data-slot attribute", () => {
    render(<Textarea placeholder="Test" />);
    const textarea = screen.getByPlaceholderText("Test");
    expect(textarea.dataset.slot).toBe("textarea");
  });

  it("uses md as the default size token", () => {
    render(<Textarea placeholder="Default size" />);
    const textarea = screen.getByPlaceholderText("Default size");
    expect(textarea.dataset.size).toBe("md");
    expect(textarea.className.includes("min-h-16")).toBe(true);
  });

  it("uses global size when local prop is omitted", () => {
    render(
      <KuzenboProvider defaultSize="lg">
        <Textarea placeholder="Global size" />
      </KuzenboProvider>
    );

    const textarea = screen.getByPlaceholderText("Global size");
    expect(textarea.dataset.size).toBe("lg");
    expect(textarea.className.includes("min-h-18")).toBe(true);
  });

  it("supports explicit size tokens", () => {
    render(<Textarea placeholder="XL size" size="xl" />);
    const textarea = screen.getByPlaceholderText("XL size");
    expect(textarea.dataset.size).toBe("xl");
    expect(textarea.className.includes("min-h-20")).toBe(true);
  });

  it("prefers explicit size over global size", () => {
    render(
      <KuzenboProvider defaultSize="lg">
        <Textarea placeholder="Explicit size" size="sm" />
      </KuzenboProvider>
    );

    const textarea = screen.getByPlaceholderText("Explicit size");
    expect(textarea.dataset.size).toBe("sm");
    expect(textarea.className.includes("min-h-14")).toBe(true);
  });

  it("uses a taller lg min-height step than md", () => {
    render(
      <>
        <Textarea placeholder="MD size" size="md" />
        <Textarea placeholder="LG size" size="lg" />
      </>
    );

    const mdTextarea = screen.getByPlaceholderText("MD size");
    const lgTextarea = screen.getByPlaceholderText("LG size");

    expect(mdTextarea.className.includes("min-h-16")).toBe(true);
    expect(lgTextarea.className.includes("min-h-18")).toBe(true);
  });

  it("passes through value and onChange", async () => {
    const user = userEvent.setup();
    const handleChange = mock();
    render(<Textarea placeholder="Test" onChange={handleChange} />);
    const textarea = screen.getByPlaceholderText("Test");
    await user.type(textarea, "a");
    expect(handleChange).toHaveBeenCalled();
  });

  it("spreads rest props", () => {
    render(<Textarea placeholder="Test" data-testid="my-textarea" />);
    expect(screen.getByTestId("my-textarea")).toBeDefined();
  });
});
