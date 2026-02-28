import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Spinner } from "./spinner";

afterEach(cleanup);

describe("Spinner", () => {
  it("renders without crashing", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeDefined();
  });

  it("has accessible loading indication", () => {
    render(<Spinner />);
    expect(screen.getByLabelText("Loading")).toBeDefined();
  });

  it("spreads rest props", () => {
    render(<Spinner data-testid="my-spinner" />);
    expect(screen.getByTestId("my-spinner")).toBeDefined();
  });

  it("uses md size by default", () => {
    render(<Spinner data-testid="spinner-default-size" />);
    const spinner = screen.getByTestId("spinner-default-size");

    expect(spinner.className.includes("size-4")).toBe(true);
  });

  it("supports xs-to-xl token sizes", () => {
    const { rerender } = render(
      <Spinner data-testid="spinner-size" size="xs" />
    );
    let spinner = screen.getByTestId("spinner-size");

    expect(spinner.className.includes("size-3")).toBe(true);

    rerender(<Spinner data-testid="spinner-size" size="xl" />);
    spinner = screen.getByTestId("spinner-size");
    expect(spinner.className.includes("size-5")).toBe(true);
  });

  it("keeps className override support", () => {
    render(
      <Spinner
        className="text-primary size-10"
        data-testid="spinner-override"
      />
    );
    const spinner = screen.getByTestId("spinner-override");

    expect(spinner.className.includes("size-10")).toBe(true);
    expect(spinner.className.includes("text-primary")).toBe(true);
  });
});
