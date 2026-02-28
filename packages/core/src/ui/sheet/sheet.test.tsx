import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Sheet } from "./sheet";

afterEach(cleanup);

describe("Sheet", () => {
  it("renders trigger", () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Title>Side panel</Sheet.Title>
        </Sheet.Content>
      </Sheet>
    );
    expect(screen.getByRole("button", { name: "Open" })).toBeDefined();
  });

  it("opens and shows content on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Title>Sheet Title</Sheet.Title>
        </Sheet.Content>
      </Sheet>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Sheet Title")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open</Sheet.Trigger>
        <Sheet.Content>Content</Sheet.Content>
      </Sheet>
    );
    expect(document.querySelector("[data-slot=sheet]")).toBeDefined();
  });

  it("supports explicit Portal/Backdrop/Viewport/Popup composition", async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open</Sheet.Trigger>
        <Sheet.Portal>
          <Sheet.Backdrop />
          <Sheet.Viewport>
            <Sheet.Popup side="right">
              <Sheet.Title>Composed Sheet</Sheet.Title>
              <Sheet.Close>Close</Sheet.Close>
            </Sheet.Popup>
          </Sheet.Viewport>
        </Sheet.Portal>
      </Sheet>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(document.querySelector("[data-slot=sheet-backdrop]")).toBeDefined();
    expect(document.querySelector("[data-slot=sheet-viewport]")).toBeDefined();
    expect(document.querySelector("[data-slot=sheet-popup]")).toBeDefined();
    expect(screen.getByText("Composed Sheet")).toBeDefined();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
