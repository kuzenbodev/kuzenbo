import { afterEach, describe, expect, it, mock } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { ActionIcon } from "./action-icon";

afterEach(cleanup);

const ACTION_ICON_CLASS_NAME = () => "action-icon-from-fn";

describe("ActionIcon", () => {
  it("renders children correctly", () => {
    render(<ActionIcon>+</ActionIcon>);
    expect(screen.getByText("+")).toBeDefined();
  });

  it("renders as a button element", () => {
    render(<ActionIcon>+</ActionIcon>);
    const button = screen.getByRole("button");
    expect(button.tagName).toBe("BUTTON");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = mock();
    render(<ActionIcon onClick={handleClick}>+</ActionIcon>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has the data-slot attribute", () => {
    render(<ActionIcon>+</ActionIcon>);
    const button = screen.getByRole("button");
    expect(button.dataset.slot).toBe("action-icon");
  });

  it("passes through aria-label", () => {
    render(<ActionIcon aria-label="Open actions">+</ActionIcon>);
    expect(screen.getByLabelText("Open actions")).toBeDefined();
  });

  it("applies semantic variant classes", () => {
    render(<ActionIcon variant="danger">+</ActionIcon>);
    const button = screen.getByRole("button");
    expect(button.className.includes("bg-danger")).toBe(true);
  });

  it("spreads rest props onto the button element", () => {
    render(<ActionIcon data-testid="my-action-icon">+</ActionIcon>);
    expect(screen.getByTestId("my-action-icon")).toBeDefined();
  });

  it("preserves className callback support", () => {
    render(
      <ActionIcon className={ACTION_ICON_CLASS_NAME}>Callback Icon</ActionIcon>
    );
    const button = document.querySelector<HTMLElement>(
      "[data-slot=action-icon]"
    );
    expect(button?.className.includes("action-icon-from-fn")).toBe(true);
  });

  it("maps each size token to the expected icon box size", () => {
    render(
      <>
        <ActionIcon data-testid="xs" size="xs">
          +
        </ActionIcon>
        <ActionIcon data-testid="sm" size="sm">
          +
        </ActionIcon>
        <ActionIcon data-testid="md" size="md">
          +
        </ActionIcon>
        <ActionIcon data-testid="lg" size="lg">
          +
        </ActionIcon>
        <ActionIcon data-testid="xl" size="xl">
          +
        </ActionIcon>
      </>
    );

    expect(screen.getByTestId("xs").className.includes("size-6")).toBe(true);
    expect(screen.getByTestId("sm").className.includes("size-8")).toBe(true);
    expect(screen.getByTestId("md").className.includes("size-9")).toBe(true);
    expect(screen.getByTestId("lg").className.includes("size-10")).toBe(true);
    expect(screen.getByTestId("xl").className.includes("size-11")).toBe(true);
  });

  it("disables interaction while loading", () => {
    render(<ActionIcon isLoading>+</ActionIcon>);
    const button = screen.getByRole("button");
    expect(button.dataset.loading).toBe("true");
    expect(button.getAttribute("aria-disabled")).toBe("true");
  });
});
