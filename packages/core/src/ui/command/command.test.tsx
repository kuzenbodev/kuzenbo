import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";

import { Command } from "./command";

afterEach(cleanup);

const commandItemClassName = "command-item-callback";

describe("Command", () => {
  it("renders input and items", () => {
    render(
      <Command>
        <Command.Input placeholder="Search" />
        <Command.List>
          <Command.Group>
            <Command.Item>Item 1</Command.Item>
            <Command.Item>Item 2</Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    );
    expect(screen.getByPlaceholderText("Search")).toBeDefined();
    expect(screen.getByText("Item 1")).toBeDefined();
    expect(screen.getByText("Item 2")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Command>
        <Command.List>
          <Command.Item>x</Command.Item>
        </Command.List>
      </Command>
    );
    expect(document.querySelector("[data-slot=command]")).toBeDefined();
  });

  it("uses md as the default root and input size token", () => {
    render(
      <Command>
        <Command.Input placeholder="Command search" />
      </Command>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=command]");
    const group = document.querySelector<HTMLElement>(
      "[data-slot=input-group]"
    );
    expect(root?.dataset.size).toBe("md");
    expect(group?.dataset.size).toBe("md");
  });

  it("cascades root size to input and command child surfaces", () => {
    render(
      <Command size="xl">
        <Command.Input placeholder="Command search" />
        <Command.List>
          <Command.Group heading="Actions">
            <Command.Item>
              Open settings
              <Command.Shortcut>⌘,</Command.Shortcut>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    );

    const group = document.querySelector<HTMLElement>(
      "[data-slot=input-group]"
    );
    const list = document.querySelector<HTMLElement>(
      "[data-slot=command-list]"
    );
    const commandGroup = document.querySelector<HTMLElement>(
      "[data-slot=command-group]"
    );
    const item = document.querySelector<HTMLElement>(
      "[data-slot=command-item]"
    );
    const shortcut = document.querySelector<HTMLElement>(
      "[data-slot=command-shortcut]"
    );

    expect(group?.dataset.size).toBe("xl");
    expect(list?.dataset.size).toBe("xl");
    expect(commandGroup?.dataset.size).toBe("xl");
    expect(item?.dataset.size).toBe("xl");
    expect(shortcut?.dataset.size).toBe("xl");
  });

  it("supports explicit command input size override over root size", () => {
    render(
      <Command size="xl">
        <Command.Input placeholder="Command search" size="sm" />
      </Command>
    );

    const group = document.querySelector<HTMLElement>(
      "[data-slot=input-group]"
    );
    expect(group?.dataset.size).toBe("sm");
  });

  it("uses the lg input-group height step above md", () => {
    render(
      <Command>
        <Command.Input placeholder="Command search" size="lg" />
      </Command>
    );

    const group = document.querySelector<HTMLElement>(
      "[data-slot=input-group]"
    );
    expect(group?.dataset.size).toBe("lg");
    expect(group?.className.includes("data-[size=lg]:h-10")).toBe(true);
  });

  it("prefers explicit command item size and cascades it to shortcut", () => {
    render(
      <Command size="sm">
        <Command.List>
          <Command.Item size="xl">
            Open settings
            <Command.Shortcut>⌘,</Command.Shortcut>
          </Command.Item>
        </Command.List>
      </Command>
    );

    const item = document.querySelector<HTMLElement>(
      "[data-slot=command-item]"
    );
    const shortcut = document.querySelector<HTMLElement>(
      "[data-slot=command-shortcut]"
    );

    expect(item?.dataset.size).toBe("xl");
    expect(shortcut?.dataset.size).toBe("xl");
  });

  it("cascades root size to empty state", () => {
    render(
      <Command size="xl">
        <Command.Input placeholder="Command search" />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
        </Command.List>
      </Command>
    );

    const empty = document.querySelector<HTMLElement>(
      "[data-slot=command-empty]"
    );
    expect(empty?.dataset.size).toBe("xl");
  });

  it("filters items on input", async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <Command.Input placeholder="Search" />
        <Command.List>
          <Command.Item>Apple</Command.Item>
          <Command.Item>Banana</Command.Item>
          <Command.Item>Cherry</Command.Item>
        </Command.List>
      </Command>
    );
    const input = screen.getByPlaceholderText("Search");
    await user.type(input, "ap");
    expect(screen.getByText("Apple")).toBeDefined();
  });

  it("preserves class contract on command item", () => {
    render(
      <Command>
        <Command.List>
          <Command.Item className={commandItemClassName}>
            Open settings
            <Command.Shortcut>⌘,</Command.Shortcut>
          </Command.Item>
        </Command.List>
      </Command>
    );

    const item = document.querySelector<HTMLElement>(
      "[data-slot=command-item]"
    );
    expect(item?.className.includes("group/command-item")).toBe(true);
    expect(item?.className.includes("command-item-callback")).toBe(true);
    expect(item?.className.includes("data-[selected=true]:bg-muted")).toBe(
      true
    );
    expect(item?.className.includes("data-selected:bg-muted")).toBe(false);
    expect(item?.dataset.size).toBe("md");
    expect(
      item?.className.includes("[[data-slot=dialog-content]_&]:rounded-lg!")
    ).toBe(true);

    const indicator = item?.querySelector("svg");
    const indicatorClassName = indicator?.getAttribute("class");
    expect(
      indicatorClassName?.includes(
        "group-has-[[data-slot=command-shortcut]]/command-item:hidden"
      )
    ).toBe(true);
  });
});
