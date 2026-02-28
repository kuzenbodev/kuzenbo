import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Breadcrumb } from "./breadcrumb";

afterEach(cleanup);

describe("Breadcrumb", () => {
  it("renders breadcrumb items", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Page</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Page")).toBeDefined();
  });

  it("has nav with aria-label", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Page>Home</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByRole("navigation")).toBeDefined();
  });

  it("uses md as the default root and descendant size token", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis />
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Current</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=breadcrumb]");
    const list = document.querySelector<HTMLElement>(
      "[data-slot=breadcrumb-list]"
    );
    const items = document.querySelectorAll<HTMLElement>(
      "[data-slot=breadcrumb-item]"
    );
    const link = document.querySelector<HTMLElement>(
      "[data-slot=breadcrumb-link]"
    );
    const page = document.querySelector<HTMLElement>(
      "[data-slot=breadcrumb-page]"
    );
    const separator = document.querySelector<HTMLElement>(
      "[data-slot=breadcrumb-separator]"
    );
    const ellipsis = document.querySelector<HTMLElement>(
      "[data-slot=breadcrumb-ellipsis]"
    );

    expect(root?.dataset.size).toBe("md");
    expect(list?.dataset.size).toBe("md");
    expect(items[0]?.dataset.size).toBe("md");
    expect(link?.dataset.size).toBe("md");
    expect(page?.dataset.size).toBe("md");
    expect(separator?.dataset.size).toBe("md");
    expect(ellipsis?.dataset.size).toBe("md");
  });

  it("cascades explicit root size to descendant slots", () => {
    render(
      <Breadcrumb size="xl">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis />
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Current</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );

    const list = document.querySelector<HTMLElement>(
      "[data-slot=breadcrumb-list]"
    );
    const separator = document.querySelector<HTMLElement>(
      "[data-slot=breadcrumb-separator]"
    );
    const ellipsis = document.querySelector<HTMLElement>(
      "[data-slot=breadcrumb-ellipsis]"
    );

    expect(list?.dataset.size).toBe("xl");
    expect(list?.className.includes("text-base")).toBe(true);
    expect(separator?.dataset.size).toBe("xl");
    expect(separator?.className.includes("[&>svg]:size-5")).toBe(true);
    expect(ellipsis?.dataset.size).toBe("xl");
    expect(ellipsis?.className.includes("size-7")).toBe(true);
  });

  it("prefers explicit child size overrides over root size", () => {
    render(
      <Breadcrumb size="xl">
        <Breadcrumb.List size="sm">
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/" size="xs">
              Home
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator size="xs" />
          <Breadcrumb.Item size="sm">
            <Breadcrumb.Page size="xs">Current</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );

    const list = document.querySelector<HTMLElement>(
      "[data-slot=breadcrumb-list]"
    );
    const items = document.querySelectorAll<HTMLElement>(
      "[data-slot=breadcrumb-item]"
    );
    const link = document.querySelector<HTMLElement>(
      "[data-slot=breadcrumb-link]"
    );
    const page = document.querySelector<HTMLElement>(
      "[data-slot=breadcrumb-page]"
    );
    const separator = document.querySelector<HTMLElement>(
      "[data-slot=breadcrumb-separator]"
    );

    expect(list?.dataset.size).toBe("sm");
    expect(list?.className.includes("text-xs")).toBe(true);
    expect(items[0]?.dataset.size).toBe("xl");
    expect(items[1]?.dataset.size).toBe("sm");
    expect(items[1]?.className.includes("gap-0.5")).toBe(true);
    expect(link?.dataset.size).toBe("xs");
    expect(link?.className.includes("text-xs")).toBe(true);
    expect(page?.dataset.size).toBe("xs");
    expect(separator?.dataset.size).toBe("xs");
    expect(separator?.className.includes("[&>svg]:size-3")).toBe(true);
  });
});
