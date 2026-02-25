import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";

import { Dialog } from "./dialog";

afterEach(cleanup);

describe("Dialog", () => {
  it("renders trigger and opens on click", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Test Dialog</Dialog.Title>
          <Dialog.Description>Dialog content</Dialog.Description>
        </Dialog.Content>
      </Dialog>
    );

    expect(screen.getByRole("button", { name: "Open" })).toBeDefined();
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toBeDefined();
    expect(screen.getByText("Test Dialog")).toBeDefined();
    expect(screen.getByText("Dialog content")).toBeDefined();
  });

  it("has data-slot on dialog root when open", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Title</Dialog.Title>
        </Dialog.Content>
      </Dialog>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog.closest("[data-slot=dialog-content]")).toBeDefined();
  });

  it("supports explicit Portal/Backdrop/Viewport/Popup composition", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Viewport>
            <Dialog.Popup>
              <Dialog.Title>Composed Dialog</Dialog.Title>
              <Dialog.Description>Composed content</Dialog.Description>
              <Dialog.Close>Close</Dialog.Close>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(document.querySelector("[data-slot=dialog-backdrop]")).toBeDefined();
    expect(document.querySelector("[data-slot=dialog-viewport]")).toBeDefined();
    expect(document.querySelector("[data-slot=dialog-popup]")).toBeDefined();
    expect(screen.getByRole("dialog")).toBeDefined();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
