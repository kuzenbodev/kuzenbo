import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Toolbar } from "./toolbar";

afterEach(cleanup);

const ROOT_CLASS_NAME = () => "toolbar-root-from-fn";
const GROUP_CLASS_NAME = () => "toolbar-group-from-fn";
const BUTTON_CLASS_NAME = () => "toolbar-button-from-fn";
const LINK_CLASS_NAME = () => "toolbar-link-from-fn";
const INPUT_CLASS_NAME = () => "toolbar-input-from-fn";
const SEPARATOR_CLASS_NAME = () => "toolbar-separator-from-fn";

describe("Toolbar", () => {
  it("renders children", () => {
    render(
      <Toolbar>
        <Toolbar.Button>Bold</Toolbar.Button>
      </Toolbar>
    );
    expect(screen.getByText("Bold")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Toolbar>
        <Toolbar.Button>Test</Toolbar.Button>
      </Toolbar>
    );
    expect(document.querySelector("[data-slot=toolbar]")).toBeDefined();
  });

  it("uses md as default size and cascades to toolbar descendants", () => {
    render(
      <Toolbar>
        <Toolbar.Group>
          <Toolbar.Button>Bold</Toolbar.Button>
          <Toolbar.Link href="/">Docs</Toolbar.Link>
          <Toolbar.Input aria-label="Search" />
          <Toolbar.Separator />
        </Toolbar.Group>
      </Toolbar>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=toolbar]");
    const group = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-group]"
    );
    const button = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-button]"
    );
    const link = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-link]"
    );
    const input = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-input]"
    );
    const separator = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-separator]"
    );

    expect(root?.dataset.size).toBe("md");
    expect(group?.dataset.size).toBe("md");
    expect(button?.dataset.size).toBe("md");
    expect(link?.dataset.size).toBe("md");
    expect(input?.dataset.size).toBe("md");
    expect(separator?.dataset.size).toBe("md");
  });

  it("applies explicit size precedence across root, group, and child slots", () => {
    render(
      <Toolbar size="xl">
        <Toolbar.Group size="sm">
          <Toolbar.Button size="xs">Bold</Toolbar.Button>
          <Toolbar.Link href="/">Docs</Toolbar.Link>
          <Toolbar.Input aria-label="Search" size="lg" />
          <Toolbar.Separator />
        </Toolbar.Group>
      </Toolbar>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=toolbar]");
    const group = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-group]"
    );
    const button = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-button]"
    );
    const link = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-link]"
    );
    const input = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-input]"
    );
    const separator = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-separator]"
    );

    expect(root?.dataset.size).toBe("xl");
    expect(group?.dataset.size).toBe("sm");
    expect(button?.dataset.size).toBe("xs");
    expect(link?.dataset.size).toBe("sm");
    expect(input?.dataset.size).toBe("lg");
    expect(separator?.dataset.size).toBe("sm");
  });

  it("preserves className callback support on toolbar parts", () => {
    render(
      <Toolbar className={ROOT_CLASS_NAME}>
        <Toolbar.Group className={GROUP_CLASS_NAME}>
          <Toolbar.Button className={BUTTON_CLASS_NAME}>Bold</Toolbar.Button>
        </Toolbar.Group>
        <Toolbar.Separator className={SEPARATOR_CLASS_NAME} />
        <Toolbar.Link className={LINK_CLASS_NAME} href="/">
          Docs
        </Toolbar.Link>
        <Toolbar.Input
          aria-label="Search"
          className={INPUT_CLASS_NAME}
          defaultValue="Kuzenbo"
        />
      </Toolbar>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=toolbar]");
    const group = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-group]"
    );
    const button = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-button]"
    );
    const separator = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-separator]"
    );
    const link = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-link]"
    );
    const input = document.querySelector<HTMLElement>(
      "[data-slot=toolbar-input]"
    );

    expect(root?.className.includes("toolbar-root-from-fn")).toBe(true);
    expect(group?.className.includes("toolbar-group-from-fn")).toBe(true);
    expect(button?.className.includes("toolbar-button-from-fn")).toBe(true);
    expect(separator?.className.includes("toolbar-separator-from-fn")).toBe(
      true
    );
    expect(link?.className.includes("toolbar-link-from-fn")).toBe(true);
    expect(input?.className.includes("toolbar-input-from-fn")).toBe(true);
  });
});
