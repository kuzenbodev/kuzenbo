import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { PreviewCard } from "./preview-card";

afterEach(cleanup);

describe("PreviewCard", () => {
  it("renders trigger", () => {
    render(
      <PreviewCard>
        <PreviewCard.Trigger>Hover me</PreviewCard.Trigger>
        <PreviewCard.Content>Preview content</PreviewCard.Content>
      </PreviewCard>
    );
    expect(screen.getByText("Hover me")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <PreviewCard>
        <PreviewCard.Trigger>Trigger</PreviewCard.Trigger>
        <PreviewCard.Content>Content</PreviewCard.Content>
      </PreviewCard>
    );
    expect(document.querySelector("[data-slot=preview-card]")).toBeDefined();
  });

  it("supports explicit Portal/Positioner/Popup/Arrow/Viewport composition", () => {
    render(
      <PreviewCard defaultOpen>
        <PreviewCard.Trigger>Open</PreviewCard.Trigger>
        <PreviewCard.Portal>
          <PreviewCard.Positioner sideOffset={8}>
            <PreviewCard.Popup>
              <PreviewCard.Arrow />
              <PreviewCard.Viewport>Composed Preview Card</PreviewCard.Viewport>
            </PreviewCard.Popup>
          </PreviewCard.Positioner>
        </PreviewCard.Portal>
      </PreviewCard>
    );

    expect(
      document.querySelector("[data-slot=preview-card-positioner]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=preview-card-popup]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=preview-card-arrow]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=preview-card-viewport]")
    ).toBeDefined();
    expect(screen.getByText("Composed Preview Card")).toBeDefined();
  });
});
