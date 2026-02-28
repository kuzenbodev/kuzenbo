import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { AlertDialog } from "./alert-dialog";

afterEach(cleanup);

const UI_SIZE_TOKENS = ["xs", "sm", "md", "lg", "xl"] as const;

const queryRequiredAlertDialogContent = () => {
  const content = document.querySelector<HTMLElement>(
    "[data-slot=alert-dialog-content]"
  );

  if (!content) {
    throw new Error("Expected alert-dialog content to render");
  }

  return content;
};

describe("AlertDialog", () => {
  it("renders trigger and opens on click", async () => {
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialog.Trigger>Open</AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm</AlertDialog.Title>
          <AlertDialog.Description>Are you sure?</AlertDialog.Description>
        </AlertDialog.Content>
      </AlertDialog>
    );
    expect(screen.getByRole("button", { name: "Open" })).toBeDefined();
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("alertdialog")).toBeDefined();
    expect(screen.getByText("Confirm")).toBeDefined();
    expect(screen.getByText("Are you sure?")).toBeDefined();
  });

  it("has data-slot on content when open", async () => {
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialog.Trigger>Open</AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Title</AlertDialog.Title>
        </AlertDialog.Content>
      </AlertDialog>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(
      document.querySelector("[data-slot=alert-dialog-content]")
    ).toBeDefined();
  });

  it("uses md as the default size token on content", async () => {
    const user = userEvent.setup();

    render(
      <AlertDialog>
        <AlertDialog.Trigger>Open</AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm</AlertDialog.Title>
        </AlertDialog.Content>
      </AlertDialog>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));

    const content = queryRequiredAlertDialogContent();

    expect(content.dataset.size).toBe("md");
  });

  it("supports all UISize tokens on content", async () => {
    const user = userEvent.setup();

    for (const size of UI_SIZE_TOKENS) {
      const { unmount } = render(
        <AlertDialog>
          <AlertDialog.Trigger>Open</AlertDialog.Trigger>
          <AlertDialog.Content size={size}>
            <AlertDialog.Title>{size}</AlertDialog.Title>
          </AlertDialog.Content>
        </AlertDialog>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      const content = queryRequiredAlertDialogContent();

      expect(content.dataset.size).toBe(size);

      unmount();
    }
  });

  it("supports explicit Portal/Backdrop/Viewport/Popup composition", async () => {
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialog.Trigger>Open</AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop />
          <AlertDialog.Viewport>
            <AlertDialog.Popup>
              <AlertDialog.Title>Composed Alert</AlertDialog.Title>
              <AlertDialog.Description>
                Composed description
              </AlertDialog.Description>
              <AlertDialog.Close>Close</AlertDialog.Close>
            </AlertDialog.Popup>
          </AlertDialog.Viewport>
        </AlertDialog.Portal>
      </AlertDialog>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(
      document.querySelector("[data-slot=alert-dialog-backdrop]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=alert-dialog-viewport]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=alert-dialog-popup]")
    ).toBeDefined();
    expect(screen.getByRole("alertdialog")).toBeDefined();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });
});
