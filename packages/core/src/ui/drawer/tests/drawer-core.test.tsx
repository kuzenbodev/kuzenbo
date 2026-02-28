import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useCallback, useState } from "react";

import { Drawer } from "../drawer";

afterEach(cleanup);

const UI_SIZE_TOKENS = ["xs", "sm", "md", "lg", "xl"] as const;

const queryRequiredDrawerPopup = () => {
  const popup = document.querySelector<HTMLElement>("[data-slot=drawer-popup]");

  if (!popup) {
    throw new Error("Expected drawer popup to render");
  }

  return popup;
};

describe("Drawer core behavior", () => {
  it("opens and closes in uncontrolled mode via Trigger and Close", async () => {
    const user = userEvent.setup();

    render(
      <Drawer.Root>
        <Drawer.Trigger>Open</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Viewport>
            <Drawer.Popup>
              <Drawer.Content>
                <Drawer.Title>Drawer</Drawer.Title>
                <Drawer.Description>Drawer content</Drawer.Description>
                <Drawer.Close>Close</Drawer.Close>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.queryByRole("dialog")).not.toBeNull();
    expect(screen.queryByText("Drawer")).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("supports controlled open state with onOpenChange", async () => {
    const user = userEvent.setup();

    const ControlledDrawer = () => {
      const [open, setOpen] = useState(false);

      return (
        <Drawer.Root onOpenChange={setOpen} open={open}>
          <Drawer.Trigger>Open Controlled</Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Viewport>
              <Drawer.Popup>
                <Drawer.Content>
                  <Drawer.Title>Controlled</Drawer.Title>
                  <Drawer.Close>Close</Drawer.Close>
                </Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.Root>
      );
    };

    render(<ControlledDrawer />);

    await user.click(screen.getByRole("button", { name: "Open Controlled" }));
    expect(screen.queryByText("Controlled")).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("calls onOpenChangeComplete after opening and closing", async () => {
    const user = userEvent.setup();

    const DrawerWithOpenChangeComplete = () => {
      const [lastCompletedState, setLastCompletedState] = useState("none");
      const handleOpenChangeComplete = useCallback((open: boolean) => {
        setLastCompletedState(String(open));
      }, []);

      return (
        <>
          <Drawer.Root onOpenChangeComplete={handleOpenChangeComplete}>
            <Drawer.Trigger>Open</Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Backdrop />
              <Drawer.Viewport>
                <Drawer.Popup>
                  <Drawer.Content>
                    <Drawer.Title>Complete callback</Drawer.Title>
                    <Drawer.Close>Close</Drawer.Close>
                  </Drawer.Content>
                </Drawer.Popup>
              </Drawer.Viewport>
            </Drawer.Portal>
          </Drawer.Root>
          <output data-testid="completed-state">{lastCompletedState}</output>
        </>
      );
    };

    render(<DrawerWithOpenChangeComplete />);

    await user.click(screen.getByRole("button", { name: "Open" }));
    await waitFor(() => {
      expect(screen.getByTestId("completed-state").textContent).toBe("true");
    });

    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => {
      expect(screen.getByTestId("completed-state").textContent).toBe("false");
    });
  });

  it("supports explicit Portal/Backdrop/Viewport/Popup/Content composition", async () => {
    const user = userEvent.setup();

    render(
      <Drawer.Root>
        <Drawer.Trigger>Open</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Viewport>
            <Drawer.Popup>
              <Drawer.Content>
                <Drawer.Title>Composed</Drawer.Title>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(
      document.querySelector("[data-slot=drawer-backdrop]")
    ).not.toBeNull();
    expect(
      document.querySelector("[data-slot=drawer-viewport]")
    ).not.toBeNull();
    expect(document.querySelector("[data-slot=drawer-popup]")).not.toBeNull();
    expect(document.querySelector("[data-slot=drawer-content]")).not.toBeNull();
  });

  it("applies default popup wrapper style contract markers", () => {
    render(
      <Drawer.Root defaultOpen>
        <Drawer.Portal>
          <Drawer.Viewport>
            <Drawer.Popup>
              <Drawer.Content>Body</Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    );

    const popup = document.querySelector("[data-slot=drawer-popup]");
    expect(popup).not.toBeNull();
    const popupElement = popup as HTMLElement;
    expect(popupElement.dataset.slot).toBe("drawer-popup");
    const popupClass = popupElement.className;

    expect(popupClass.includes("--drawer-swipe-movement-y")).toBe(true);
    expect(popupClass.includes("data-nested-drawer-open")).toBe(true);
    expect(popupClass.includes("data-nested-drawer-swiping")).toBe(true);
    expect(popupClass.includes("[transition:transform_450ms")).toBe(true);
  });

  it("uses md as the default drawer size token and cascades to child surfaces", () => {
    render(
      <Drawer.Root defaultOpen>
        <Drawer.Trigger>Open</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Viewport>
            <Drawer.Popup>
              <Drawer.Handle />
              <Drawer.Header>
                <Drawer.Title>Body</Drawer.Title>
                <Drawer.Description>Description</Drawer.Description>
              </Drawer.Header>
              <Drawer.Content>
                <Drawer.Actions>
                  <Drawer.Close>Close</Drawer.Close>
                </Drawer.Actions>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    );

    const trigger = document.querySelector<HTMLElement>(
      "[data-slot=drawer-trigger]"
    );
    const popup = queryRequiredDrawerPopup();
    const handle = document.querySelector<HTMLElement>(
      "[data-slot=drawer-handle]"
    );
    const header = document.querySelector<HTMLElement>(
      "[data-slot=drawer-header]"
    );
    const title = document.querySelector<HTMLElement>(
      "[data-slot=drawer-title]"
    );
    const description = document.querySelector<HTMLElement>(
      "[data-slot=drawer-description]"
    );
    const content = document.querySelector<HTMLElement>(
      "[data-slot=drawer-content]"
    );
    const actions = document.querySelector<HTMLElement>(
      "[data-slot=drawer-actions]"
    );
    const close = document.querySelector<HTMLElement>(
      "[data-slot=drawer-close]"
    );

    expect(trigger?.dataset.size).toBe("md");
    expect(popup.dataset.size).toBe("md");
    expect(handle?.dataset.size).toBe("md");
    expect(header?.dataset.size).toBe("md");
    expect(title?.dataset.size).toBe("md");
    expect(description?.dataset.size).toBe("md");
    expect(content?.dataset.size).toBe("md");
    expect(actions?.dataset.size).toBe("md");
    expect(close?.dataset.size).toBe("md");
  });

  it("prefers explicit child size over inherited root size", () => {
    render(
      <Drawer.Root defaultOpen size="xl">
        <Drawer.Portal>
          <Drawer.Viewport>
            <Drawer.Popup size="sm">
              <Drawer.Content size="sm">
                <Drawer.Actions size="sm">
                  <Drawer.Close size="xs">Close</Drawer.Close>
                </Drawer.Actions>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    );

    const popup = queryRequiredDrawerPopup();
    const content = document.querySelector<HTMLElement>(
      "[data-slot=drawer-content]"
    );
    const actions = document.querySelector<HTMLElement>(
      "[data-slot=drawer-actions]"
    );
    const close = document.querySelector<HTMLElement>(
      "[data-slot=drawer-close]"
    );

    expect(popup.dataset.size).toBe("sm");
    expect(content?.dataset.size).toBe("sm");
    expect(actions?.dataset.size).toBe("sm");
    expect(close?.dataset.size).toBe("xs");
    expect(close?.className.includes("size-6")).toBe(true);
  });

  it("supports all UISize tokens on popup", () => {
    for (const size of UI_SIZE_TOKENS) {
      const { unmount } = render(
        <Drawer.Root defaultOpen size="md">
          <Drawer.Portal>
            <Drawer.Viewport>
              <Drawer.Popup size={size}>
                <Drawer.Content>{size}</Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.Root>
      );

      const popup = queryRequiredDrawerPopup();

      expect(popup.dataset.size).toBe(size);

      unmount();
    }
  });

  it("merges custom popup className without dropping wrapper behavior markers", () => {
    render(
      <Drawer.Root defaultOpen>
        <Drawer.Portal>
          <Drawer.Viewport>
            <Drawer.Popup className="custom-popup-sentinel">
              <Drawer.Content>
                <Drawer.Title>Custom Popup Class</Drawer.Title>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    );

    const popup = document.querySelector("[data-slot=drawer-popup]");
    expect(popup).not.toBeNull();
    const popupElement = popup as HTMLElement;
    expect(popupElement.dataset.slot).toBe("drawer-popup");
    const popupClass = popupElement.className;

    expect(popupClass.includes("custom-popup-sentinel")).toBe(true);
    expect(popupClass.includes("--drawer-swipe-movement-y")).toBe(true);
    expect(popupClass.includes("data-nested-drawer-open")).toBe(true);
  });

  it("does not render a root DOM node by itself", () => {
    const { container } = render(<Drawer.Root />);
    expect(container.firstElementChild).toBeNull();
  });
});
