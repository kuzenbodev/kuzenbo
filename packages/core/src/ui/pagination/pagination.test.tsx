import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Pagination } from "./pagination";

afterEach(cleanup);

describe("Pagination", () => {
  it("renders with content", () => {
    render(
      <Pagination>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous href="#" />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    );
    expect(document.querySelector("[data-slot=pagination]")).toBeDefined();
  });

  it("has aria-label pagination", () => {
    render(
      <Pagination>
        <Pagination.Content />
      </Pagination>
    );
    expect(
      screen.getByRole("navigation", { name: "pagination" })
    ).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(<Pagination>Content</Pagination>);
    expect(document.querySelector("[data-slot=pagination]")).toBeDefined();
  });

  it("uses md as the default root and descendant size token", () => {
    render(
      <Pagination>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Link href="#">1</Pagination.Link>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=pagination]");
    const content = document.querySelector<HTMLElement>(
      "[data-slot=pagination-content]"
    );
    const link = document.querySelector<HTMLElement>(
      "[data-slot=pagination-link]"
    );

    expect(root?.dataset.size).toBe("md");
    expect(content?.dataset.size).toBe("md");
    expect(link?.dataset.size).toBe("md");
  });

  it("cascades root size to pagination child surfaces", () => {
    render(
      <Pagination size="xl">
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous href="#" />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link href="#" isActive>
              1
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Next href="#" />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=pagination]");
    const content = document.querySelector<HTMLElement>(
      "[data-slot=pagination-content]"
    );
    const previous = screen.getByRole("button", {
      name: /go to previous page/i,
    });
    const next = screen.getByRole("button", { name: /go to next page/i });
    const ellipsis = document.querySelector<HTMLElement>(
      "[data-slot=pagination-ellipsis]"
    );
    const links = document.querySelectorAll<HTMLElement>(
      "[data-slot=pagination-link]"
    );

    expect(root?.dataset.size).toBe("xl");
    expect(content?.dataset.size).toBe("xl");
    expect(previous.dataset.size).toBe("xl");
    expect(next.dataset.size).toBe("xl");
    expect(ellipsis?.dataset.size).toBe("xl");
    expect(links[0]?.dataset.size).toBe("xl");
    expect(links[1]?.dataset.size).toBe("xl");
    expect([...links].some((link) => link.className.includes("size-11"))).toBe(
      true
    );
  });

  it("prefers explicit child size over root size", () => {
    render(
      <Pagination size="xl">
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Link href="#" size="sm">
              1
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Ellipsis size="sm" />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    );

    const button = document.querySelector<HTMLElement>(
      "[data-slot=pagination-link]"
    );
    const ellipsis = document.querySelector<HTMLElement>(
      "[data-slot=pagination-ellipsis]"
    );

    expect(button?.dataset.size).toBe("sm");
    expect(button?.className.includes("size-8")).toBe(true);
    expect(ellipsis?.dataset.size).toBe("sm");
    expect(ellipsis?.className.includes("size-7")).toBe(true);
  });
});
