import { afterEach, describe, expect, it } from "bun:test";

import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Drawer } from "../drawer";

afterEach(cleanup);

describe("Drawer detached and imperative controls", () => {
  it("opens via detached trigger handle", async () => {
    const user = userEvent.setup();
    const handle = Drawer.createHandle<string>();

    render(
      <>
        <Drawer.Trigger handle={handle}>Open Detached</Drawer.Trigger>
        <Drawer.Root handle={handle}>
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Viewport>
              <Drawer.Popup>
                <Drawer.Content>
                  <Drawer.Title>Detached Drawer</Drawer.Title>
                </Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.Root>
      </>
    );

    await user.click(screen.getByRole("button", { name: "Open Detached" }));
    expect(screen.queryByText("Detached Drawer")).not.toBeNull();
  });

  it("supports detached handle payload through Root render prop", async () => {
    const user = userEvent.setup();
    const handle = Drawer.createHandle<{ title: string }>();

    render(
      <>
        <Drawer.Trigger handle={handle} payload={{ title: "Profile" }}>
          Open Profile
        </Drawer.Trigger>
        <Drawer.Root handle={handle}>
          {({ payload }) => (
            <Drawer.Portal>
              <Drawer.Backdrop />
              <Drawer.Viewport>
                <Drawer.Popup>
                  <Drawer.Content>
                    <Drawer.Title>{payload?.title}</Drawer.Title>
                  </Drawer.Content>
                </Drawer.Popup>
              </Drawer.Viewport>
            </Drawer.Portal>
          )}
        </Drawer.Root>
      </>
    );

    await user.click(screen.getByRole("button", { name: "Open Profile" }));
    expect(screen.queryByText("Profile")).not.toBeNull();
  });

  it("updates detached payload when different triggers are used", async () => {
    const user = userEvent.setup();
    const handle = Drawer.createHandle<{ title: string }>();

    render(
      <>
        <Drawer.Trigger handle={handle} payload={{ title: "Profile" }}>
          Profile
        </Drawer.Trigger>
        <Drawer.Trigger handle={handle} payload={{ title: "Settings" }}>
          Settings
        </Drawer.Trigger>
        <Drawer.Root handle={handle}>
          {({ payload }) => (
            <Drawer.Portal>
              <Drawer.Backdrop />
              <Drawer.Viewport>
                <Drawer.Popup>
                  <Drawer.Content>
                    <Drawer.Title>{payload?.title}</Drawer.Title>
                    <Drawer.Close>Close</Drawer.Close>
                  </Drawer.Content>
                </Drawer.Popup>
              </Drawer.Viewport>
            </Drawer.Portal>
          )}
        </Drawer.Root>
      </>
    );

    await user.click(screen.getByRole("button", { name: "Profile" }));
    expect(screen.queryByRole("heading", { name: "Profile" })).not.toBeNull();
    await user.click(screen.getByRole("button", { name: "Close" }));

    await user.click(screen.getByRole("button", { name: "Settings" }));
    expect(screen.queryByRole("heading", { name: "Settings" })).not.toBeNull();
  });

  it("exposes imperative actions via actionsRef", async () => {
    const actionsRef: {
      current: { close: () => void; unmount: () => void } | null;
    } = { current: null };

    render(
      <Drawer.Root actionsRef={actionsRef} defaultOpen>
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Viewport>
            <Drawer.Popup>
              <Drawer.Content>
                <Drawer.Title>Imperative</Drawer.Title>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    );

    await waitFor(() => {
      expect(actionsRef.current).not.toBeNull();
    });

    await act(async () => {
      actionsRef.current?.close();
    });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });

    await act(async () => {
      actionsRef.current?.unmount();
    });
  });
});
