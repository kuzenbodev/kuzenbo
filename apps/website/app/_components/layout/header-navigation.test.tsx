import { cleanup, render, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { HeaderNavigation } from "./header-navigation";

afterEach(cleanup);

describe("HeaderNavigation", () => {
  it("uses NavigationMenu composition for desktop navigation", () => {
    render(<HeaderNavigation pathname="/docs" />);

    const primaryNavigation = document.querySelector(
      'nav[aria-label="Primary navigation"]'
    ) as HTMLElement;

    expect(primaryNavigation).not.toBeNull();
    expect(
      primaryNavigation.querySelector('[data-slot="navigation-menu"]')
    ).not.toBeNull();
    expect(
      primaryNavigation.querySelector('[data-slot="navigation-menu-list"]')
    ).not.toBeNull();
  });

  it("applies location/page active semantics per route match mode", () => {
    const { rerender } = render(
      <HeaderNavigation pathname="/docs/components/button" />
    );

    const primaryNavigation = document.querySelector(
      'nav[aria-label="Primary navigation"]'
    ) as HTMLElement;

    const componentsLink = within(primaryNavigation).getByRole("link", {
      name: "Components",
    });
    const docsLink = within(primaryNavigation).getByRole("link", {
      name: "Docs",
    });

    expect((componentsLink as HTMLElement).dataset.active).toBe("true");
    expect(componentsLink.getAttribute("aria-current")).toBe("location");
    expect((docsLink as HTMLElement).dataset.active).toBeUndefined();
    expect(docsLink.getAttribute("aria-current")).toBeNull();

    rerender(<HeaderNavigation pathname="/showcase" />);

    const showcaseLink = within(primaryNavigation).getByRole("link", {
      name: "Showcase",
    });
    const playgroundLink = within(primaryNavigation).getByRole("link", {
      name: "Playground",
    });

    expect((showcaseLink as HTMLElement).dataset.active).toBe("true");
    expect(showcaseLink.getAttribute("aria-current")).toBe("page");
    expect((playgroundLink as HTMLElement).dataset.active).toBeUndefined();
    expect(playgroundLink.getAttribute("aria-current")).toBeNull();
  });
});
