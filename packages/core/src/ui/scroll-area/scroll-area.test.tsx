import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { ScrollArea } from "./scroll-area";

afterEach(cleanup);

const ROOT_CLASS_NAME = () => "scroll-area-root-from-fn";
const VIEWPORT_CLASS_NAME = () => "scroll-area-viewport-from-fn";
const CONTENT_CLASS_NAME = () => "scroll-area-content-from-fn";
const BAR_CLASS_NAME = () => "scroll-area-bar-from-fn";
const THUMB_CLASS_NAME = () => "scroll-area-thumb-from-fn";
const CORNER_CLASS_NAME = () => "scroll-area-corner-from-fn";

describe("ScrollArea", () => {
  it("renders children", () => {
    render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    );
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("has data-slot on viewport", () => {
    render(
      <ScrollArea>
        <div>x</div>
      </ScrollArea>
    );
    expect(document.querySelector("[data-slot=scroll-area]")).toBeDefined();
  });

  it("exposes ScrollArea.Content and preserves className callback support", () => {
    render(
      <ScrollArea className={ROOT_CLASS_NAME}>
        <ScrollArea.Viewport className={VIEWPORT_CLASS_NAME}>
          <ScrollArea.Content className={CONTENT_CLASS_NAME}>
            <div>Composed Content</div>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Bar className={BAR_CLASS_NAME}>
          <ScrollArea.Thumb className={THUMB_CLASS_NAME} />
        </ScrollArea.Bar>
        <ScrollArea.Corner className={CORNER_CLASS_NAME} />
      </ScrollArea>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=scroll-area]");
    const viewport = document.querySelector<HTMLElement>(
      "[data-slot=scroll-area-viewport]"
    );
    const content = document.querySelector<HTMLElement>(
      "[data-slot=scroll-area-content]"
    );
    const scrollbar = document.querySelector<HTMLElement>(
      "[data-slot=scroll-area-scrollbar]"
    );
    const thumb = document.querySelector<HTMLElement>(
      "[data-slot=scroll-area-thumb]"
    );
    const corner = document.querySelector<HTMLElement>(
      "[data-slot=scroll-area-corner]"
    );

    expect(ScrollArea.Content).toBeDefined();
    expect(root?.className.includes("scroll-area-root-from-fn")).toBe(true);
    expect(viewport?.className.includes("scroll-area-viewport-from-fn")).toBe(
      true
    );
    expect(content?.className.includes("scroll-area-content-from-fn")).toBe(
      true
    );
    expect(scrollbar?.className.includes("scroll-area-bar-from-fn")).toBe(true);
    expect(thumb?.className.includes("scroll-area-thumb-from-fn")).toBe(true);
    expect(corner?.className.includes("scroll-area-corner-from-fn")).toBe(true);
    expect(screen.getByText("Composed Content")).toBeDefined();
  });
});
