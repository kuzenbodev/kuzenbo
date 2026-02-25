import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";

import { Popover } from "./popover";

afterEach(cleanup);

describe("Popover", () => {
  it("renders trigger", () => {
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
        </Popover.Content>
      </Popover>
    );
    expect(screen.getByRole("button", { name: "Open" })).toBeDefined();
  });

  it("opens and shows content on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>
          <Popover.Title>Popover Title</Popover.Title>
        </Popover.Content>
      </Popover>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Popover Title")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Content</Popover.Content>
      </Popover>
    );
    expect(document.querySelector("[data-slot=popover]")).toBeDefined();
  });

  it("supports explicit Portal/Positioner/Popup/Arrow/Viewport composition", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={8}>
            <Popover.Popup>
              <Popover.Arrow />
              <Popover.Viewport>
                <Popover.Title>Composed Popover</Popover.Title>
                <Popover.Close>Close</Popover.Close>
              </Popover.Viewport>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(
      document.querySelector("[data-slot=popover-positioner]")
    ).toBeDefined();
    expect(document.querySelector("[data-slot=popover-popup]")).toBeDefined();
    expect(document.querySelector("[data-slot=popover-arrow]")).toBeDefined();
    expect(
      document.querySelector("[data-slot=popover-viewport]")
    ).toBeDefined();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByText("Composed Popover")).toBeNull();
  });

  it("inherits root size in Popover.Content by default", async () => {
    const user = userEvent.setup();
    render(
      <Popover size="xs">
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Sized content</Popover.Content>
      </Popover>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    const content = document.querySelector(
      "[data-slot=popover-content]"
    ) as HTMLElement;

    expect(content.dataset.size).toBe("xs");
    expect(content.className.includes("w-64")).toBe(true);
  });

  it("lets content size override root size", async () => {
    const user = userEvent.setup();
    render(
      <Popover size="sm">
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content size="xl">Sized content</Popover.Content>
      </Popover>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    const content = document.querySelector(
      "[data-slot=popover-content]"
    ) as HTMLElement;

    expect(content.dataset.size).toBe("xl");
    expect(content.className.includes("w-[28rem]")).toBe(true);
  });

  it("inherits root size in composed Popup when size is omitted", async () => {
    const user = userEvent.setup();
    render(
      <Popover size="lg">
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Popup>
              <Popover.Viewport>Composed sized content</Popover.Viewport>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    const popup = document.querySelector(
      "[data-slot=popover-popup]"
    ) as HTMLElement;

    expect(popup.dataset.size).toBe("lg");
    expect(popup.className.includes("w-96")).toBe(true);
  });
});
