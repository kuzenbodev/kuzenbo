import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Empty } from "./empty";

afterEach(cleanup);

describe("Empty", () => {
  it("renders children", () => {
    render(
      <Empty>
        <Empty.Title>No data</Empty.Title>
      </Empty>
    );
    expect(screen.getByText("No data")).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(<Empty>Content</Empty>);
    expect(document.querySelector("[data-slot=empty]")).toBeDefined();
  });

  it("uses md as the default root and descendant size token", () => {
    render(
      <Empty>
        <Empty.Header>
          <Empty.Media variant="icon">M</Empty.Media>
          <Empty.Title>No data</Empty.Title>
          <Empty.Description>Nothing to show yet.</Empty.Description>
        </Empty.Header>
        <Empty.Content>Action area</Empty.Content>
      </Empty>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=empty]");
    const header = document.querySelector<HTMLElement>(
      "[data-slot=empty-header]"
    );
    const media = document.querySelector<HTMLElement>("[data-slot=empty-icon]");
    const title = document.querySelector<HTMLElement>(
      "[data-slot=empty-title]"
    );
    const description = document.querySelector<HTMLElement>(
      "[data-slot=empty-description]"
    );
    const content = document.querySelector<HTMLElement>(
      "[data-slot=empty-content]"
    );

    expect(root?.dataset.size).toBe("md");
    expect(header?.dataset.size).toBe("md");
    expect(media?.dataset.size).toBe("md");
    expect(title?.dataset.size).toBe("md");
    expect(description?.dataset.size).toBe("md");
    expect(content?.dataset.size).toBe("md");
  });

  it("cascades explicit root size to descendant slots", () => {
    render(
      <Empty size="xl">
        <Empty.Header>
          <Empty.Media variant="icon">M</Empty.Media>
          <Empty.Title>No data</Empty.Title>
        </Empty.Header>
        <Empty.Content>Action area</Empty.Content>
      </Empty>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=empty]");
    const media = document.querySelector<HTMLElement>("[data-slot=empty-icon]");
    const title = document.querySelector<HTMLElement>(
      "[data-slot=empty-title]"
    );
    const content = document.querySelector<HTMLElement>(
      "[data-slot=empty-content]"
    );

    expect(root?.dataset.size).toBe("xl");
    expect(root?.className.includes("p-12")).toBe(true);
    expect(media?.dataset.size).toBe("xl");
    expect(media?.className.includes("size-10")).toBe(true);
    expect(title?.dataset.size).toBe("xl");
    expect(title?.className.includes("text-lg")).toBe(true);
    expect(content?.dataset.size).toBe("xl");
    expect(content?.className.includes("text-base")).toBe(true);
  });

  it("prefers explicit slot size overrides over root size", () => {
    render(
      <Empty size="xl">
        <Empty.Header size="sm">
          <Empty.Media size="xs" variant="icon">
            M
          </Empty.Media>
          <Empty.Title size="xs">No data</Empty.Title>
          <Empty.Description size="sm">Nothing to show yet.</Empty.Description>
        </Empty.Header>
        <Empty.Content size="sm">Action area</Empty.Content>
      </Empty>
    );

    const header = document.querySelector<HTMLElement>(
      "[data-slot=empty-header]"
    );
    const media = document.querySelector<HTMLElement>("[data-slot=empty-icon]");
    const title = document.querySelector<HTMLElement>(
      "[data-slot=empty-title]"
    );
    const description = document.querySelector<HTMLElement>(
      "[data-slot=empty-description]"
    );
    const content = document.querySelector<HTMLElement>(
      "[data-slot=empty-content]"
    );

    expect(header?.dataset.size).toBe("sm");
    expect(header?.className.includes("gap-2")).toBe(true);
    expect(media?.dataset.size).toBe("xs");
    expect(media?.className.includes("size-6")).toBe(true);
    expect(title?.dataset.size).toBe("xs");
    expect(title?.className.includes("text-xs")).toBe(true);
    expect(description?.dataset.size).toBe("sm");
    expect(content?.dataset.size).toBe("sm");
    expect(content?.className.includes("text-sm")).toBe(true);
  });

  it("maps Empty.Button size from Empty root size by default", () => {
    render(
      <Empty size="xl">
        <Empty.Button>Create issue</Empty.Button>
      </Empty>
    );

    const button = document.querySelector<HTMLElement>(
      "[data-slot=empty-button]"
    );

    expect(button?.dataset.size).toBe("xl");
    expect(button?.className.includes("h-11")).toBe(true);
  });

  it("prefers explicit Empty.Button size override over root size", () => {
    render(
      <Empty size="xl">
        <Empty.Button size="sm">Create issue</Empty.Button>
      </Empty>
    );

    const button = document.querySelector<HTMLElement>(
      "[data-slot=empty-button]"
    );

    expect(button?.dataset.size).toBe("sm");
    expect(button?.className.includes("h-8")).toBe(true);
  });
});
