import { afterEach, describe, expect, it, mock } from "bun:test";

/* eslint-disable func-style */
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Input } from "./input";

afterEach(cleanup);

function inputClassName() {
  return "input-callback";
}

const inputHeightClassBySize = {
  lg: "h-10",
  md: "h-9",
  sm: "h-8",
  xl: "h-11",
  xs: "h-6",
} as const;

describe("Input", () => {
  it("renders as an input element", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input.tagName).toBe("INPUT");
  });

  it("has the data-slot attribute", () => {
    render(<Input placeholder="Test" />);
    const input = screen.getByPlaceholderText("Test");
    expect(input.dataset.slot).toBe("input");
  });

  it("uses md as the default size token", () => {
    render(<Input aria-label="Sized input" />);
    const input = screen.getByLabelText("Sized input");
    expect(input.dataset.size).toBe("md");
    expect(input.className.includes(inputHeightClassBySize.md)).toBe(true);
  });

  const inputSizes = Object.entries(inputHeightClassBySize) as [
    keyof typeof inputHeightClassBySize,
    string,
  ][];

  it.each(inputSizes)("supports %s size token", (size, expectedHeightClass) => {
    render(<Input aria-label={`${size} input`} size={size} />);
    const input = screen.getByLabelText(`${size} input`);
    expect(input.dataset.size).toBe(size);
    expect(input.className.includes(expectedHeightClass)).toBe(true);
  });

  it("uses a taller height for lg than md", () => {
    render(
      <>
        <Input aria-label="Medium input" size="md" />
        <Input aria-label="Large input" size="lg" />
      </>
    );

    const mediumInput = screen.getByLabelText("Medium input");
    const largeInput = screen.getByLabelText("Large input");

    expect(mediumInput.className.includes("h-9")).toBe(true);
    expect(largeInput.className.includes("h-10")).toBe(true);
  });

  it("passes through value and onChange", async () => {
    const user = userEvent.setup();
    const handleChange = mock();
    render(<Input placeholder="Test" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Test");
    await user.type(input, "a");
    expect(handleChange).toHaveBeenCalled();
  });

  it("passes through disabled prop", () => {
    render(<Input placeholder="Test" disabled />);
    const input = screen.getByPlaceholderText("Test");
    expect(input).toHaveProperty("disabled", true);
  });

  it("passes through aria-label", () => {
    render(<Input aria-label="Search" placeholder="" />);
    expect(screen.getByLabelText("Search")).toBeDefined();
  });

  it("spreads rest props onto the input element", () => {
    render(<Input placeholder="Test" data-testid="my-input" />);
    expect(screen.getByTestId("my-input")).toBeDefined();
  });

  it("forwards htmlSize to native size attribute", () => {
    render(<Input aria-label="HTML-sized input" htmlSize={24} />);
    const input = screen.getByLabelText("HTML-sized input");
    expect(input.getAttribute("size")).toBe("24");
  });

  it("preserves callback className with base styles", () => {
    render(<Input aria-label="Styled input" className={inputClassName} />);
    const input = screen.getByLabelText("Styled input");
    expect(input.className.includes("input-callback")).toBe(true);
    expect(input.className.includes("border-input")).toBe(true);
  });
});
