import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { InputGroup } from "./input-group";

afterEach(cleanup);

describe("InputGroup", () => {
  it("uses md as the default size token", () => {
    render(
      <InputGroup>
        <InputGroup.Input placeholder="Default size input" />
      </InputGroup>
    );

    const group = document.querySelector<HTMLElement>(
      "[data-slot=input-group]"
    );
    expect(group?.dataset.size).toBe("md");
  });

  it("renders children", () => {
    render(
      <InputGroup>
        <InputGroup.Input placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText("Search")).toBeDefined();
  });

  it("has data-slot and role group", () => {
    render(
      <InputGroup>
        <InputGroup.Input placeholder="Test" />
      </InputGroup>
    );
    const el = document.querySelector("[data-slot=input-group]");
    expect(el).toBeDefined();
    expect(el?.getAttribute("role")).toBe("group");
  });

  it("supports explicit root size token", () => {
    render(
      <InputGroup size="xl">
        <InputGroup.Input placeholder="Sized root input" />
      </InputGroup>
    );

    const group = document.querySelector<HTMLElement>(
      "[data-slot=input-group]"
    );
    expect(group?.dataset.size).toBe("xl");
  });

  it("maps lg root height token above md", () => {
    render(
      <InputGroup size="lg">
        <InputGroup.Input placeholder="Large group input" />
      </InputGroup>
    );

    const group = document.querySelector<HTMLElement>(
      "[data-slot=input-group]"
    );
    expect(group?.dataset.size).toBe("lg");
    expect(group?.className.includes("data-[size=md]:h-9")).toBe(true);
    expect(group?.className.includes("data-[size=lg]:h-10")).toBe(true);
  });

  it("cascades root size to InputGroup.Input by default", () => {
    render(
      <InputGroup size="xl">
        <InputGroup.Input placeholder="Cascaded input" />
      </InputGroup>
    );

    const input = screen.getByPlaceholderText("Cascaded input");
    expect(input.dataset.size).toBe("xl");
  });

  it("prefers explicit InputGroup.Input size over root size", () => {
    render(
      <InputGroup size="xl">
        <InputGroup.Input placeholder="Overridden input" size="sm" />
      </InputGroup>
    );

    const input = screen.getByPlaceholderText("Overridden input");
    expect(input.dataset.size).toBe("sm");
  });

  it("maps default InputGroup.Button size from xl root to sm", () => {
    render(
      <InputGroup size="xl">
        <InputGroup.Input placeholder="Search input" />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button>Search</InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup>
    );

    const button = screen.getByRole("button", { name: /Search/ });
    expect(button.dataset.size).toBe("sm");
  });

  it("maps default InputGroup.Button size from md root to xs", () => {
    render(
      <InputGroup size="md">
        <InputGroup.Input placeholder="Search input md" />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button>Search MD</InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup>
    );

    const button = screen.getByRole("button", { name: /Search MD/ });
    expect(button.dataset.size).toBe("xs");
  });

  it("preserves explicit InputGroup.Button size over root mapping", () => {
    render(
      <InputGroup size="xl">
        <InputGroup.Input placeholder="Custom button size input" />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button size="icon-sm">Open</InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup>
    );

    const button = screen.getByRole("button", { name: /Open/ });
    expect(button.dataset.size).toBe("icon-sm");
  });

  it("cascades root size to addons", () => {
    render(
      <InputGroup size="xl">
        <InputGroup.Addon align="inline-start">
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="docs.kuzenbo.com" />
      </InputGroup>
    );

    const addon = document.querySelector<HTMLElement>(
      "[data-slot=input-group-addon]"
    );
    expect(addon?.dataset.size).toBe("xl");
  });

  it("keeps block and textarea h-auto behavior classes", () => {
    render(
      <InputGroup size="xl">
        <InputGroup.Addon align="block-start">
          <InputGroup.Text>Release notes</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Textarea placeholder="Write notes" rows={3} />
      </InputGroup>
    );

    const group = document.querySelector<HTMLElement>(
      "[data-slot=input-group]"
    );
    expect(
      group?.className.includes("has-[>[data-align=block-start]]:h-auto")
    ).toBe(true);
    expect(group?.className.includes("has-[>textarea]:h-auto")).toBe(true);
  });

  it("focuses the input when addon text is clicked", () => {
    render(
      <InputGroup>
        <InputGroup.Addon align="inline-start">
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Focus target" />
      </InputGroup>
    );

    const addon = document.querySelector<HTMLElement>(
      "[data-slot=input-group-addon]"
    );
    const input = screen.getByPlaceholderText("Focus target");

    expect(addon).not.toBeNull();
    fireEvent.mouseDown(addon as HTMLElement);

    expect(document.activeElement).toBe(input);
  });

  it("does not force focus when clicking an action button inside addon", () => {
    render(
      <InputGroup>
        <InputGroup.Addon align="inline-start">
          <button type="button">Prefix action</button>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Input with addon button" />
      </InputGroup>
    );

    const actionButton = screen.getByRole("button", { name: "Prefix action" });
    const input = screen.getByPlaceholderText("Input with addon button");
    fireEvent.click(actionButton);

    expect(document.activeElement).not.toBe(input);
  });
});
