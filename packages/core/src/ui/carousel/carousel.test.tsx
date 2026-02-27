import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Carousel } from "./carousel";

afterEach(cleanup);

describe("Carousel", () => {
  it("renders content", () => {
    render(
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>Slide 1</Carousel.Item>
          <Carousel.Item>Slide 2</Carousel.Item>
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>
    );
    expect(screen.getByText("Slide 1")).toBeDefined();
    expect(screen.getByText("Slide 2")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>Slide</Carousel.Item>
        </Carousel.Content>
      </Carousel>
    );
    expect(document.querySelector("[data-slot=carousel]")).toBeDefined();
  });

  it("has next button", () => {
    render(
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>Slide</Carousel.Item>
        </Carousel.Content>
        <Carousel.Next />
      </Carousel>
    );
    expect(document.querySelector("[data-slot=carousel-next]")).toBeDefined();
  });

  it("keeps carousel root keyboard-focusable", () => {
    render(
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>Slide</Carousel.Item>
        </Carousel.Content>
      </Carousel>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=carousel]");
    expect(root?.tabIndex).toBe(0);
  });

  it("handles horizontal arrow keys from the carousel root only", () => {
    render(
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>
            <button type="button">Nested control</button>
          </Carousel.Item>
        </Carousel.Content>
      </Carousel>
    );

    const root = document.querySelector<HTMLElement>(
      "[data-slot=carousel]"
    ) as HTMLElement;
    const nestedControl = screen.getByRole("button", {
      name: "Nested control",
    });
    expect(root).not.toBeNull();

    const rootEvent = new KeyboardEvent("keydown", {
      key: "ArrowRight",
      bubbles: true,
      cancelable: true,
    });
    const nestedEvent = new KeyboardEvent("keydown", {
      key: "ArrowRight",
      bubbles: true,
      cancelable: true,
    });

    const rootDispatchResult = root.dispatchEvent(rootEvent);
    const nestedDispatchResult = nestedControl.dispatchEvent(nestedEvent);

    expect(rootDispatchResult).toBe(false);
    expect(rootEvent.defaultPrevented).toBe(true);
    expect(nestedDispatchResult).toBe(true);
    expect(nestedEvent.defaultPrevented).toBe(false);
  });

  it("uses vertical arrow bindings for vertical carousels", () => {
    render(
      <Carousel orientation="vertical">
        <Carousel.Content>
          <Carousel.Item>Vertical slide</Carousel.Item>
        </Carousel.Content>
      </Carousel>
    );

    const root = document.querySelector<HTMLElement>(
      "[data-slot=carousel]"
    ) as HTMLElement;
    expect(root).not.toBeNull();

    const verticalEvent = new KeyboardEvent("keydown", {
      key: "ArrowDown",
      bubbles: true,
      cancelable: true,
    });
    const horizontalEvent = new KeyboardEvent("keydown", {
      key: "ArrowRight",
      bubbles: true,
      cancelable: true,
    });

    const verticalDispatchResult = root.dispatchEvent(verticalEvent);
    const horizontalDispatchResult = root.dispatchEvent(horizontalEvent);

    expect(verticalDispatchResult).toBe(false);
    expect(verticalEvent.defaultPrevented).toBe(true);
    expect(horizontalDispatchResult).toBe(true);
    expect(horizontalEvent.defaultPrevented).toBe(false);
  });
});
