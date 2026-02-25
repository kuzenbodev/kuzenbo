import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useState } from "react";

import { Button } from "../../button/button";
import { Drawer } from "../drawer";

const ghostButton = (
  <Button
    className="rounded px-1.5 py-0.5 font-medium text-primary-foreground hover:bg-primary/10"
    variant="ghost"
  />
);

const NestedDrawersDemo = () => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const handleFirstOpenChange = useCallback((nextOpen: boolean) => {
    setFirstOpen(nextOpen);
    if (!nextOpen) {
      setSecondOpen(false);
      setThirdOpen(false);
    }
  }, []);
  const handleSecondOpenChange = useCallback((nextOpen: boolean) => {
    setSecondOpen(nextOpen);
    if (!nextOpen) {
      setThirdOpen(false);
    }
  }, []);

  return (
    <div className="relative min-h-[36rem] w-[min(100%,56rem)] overflow-hidden rounded-2xl border border-border bg-background p-6">
      <Drawer.Root onOpenChange={handleFirstOpenChange} open={firstOpen}>
        <Drawer.Trigger render={<Button variant="outline" size="xl" />}>
          Open drawer stack
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] fixed inset-0 min-h-dvh bg-foreground opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:duration-0 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]" />
          <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
            <Drawer.Popup className="group/popup shadow-[0_2px_10px_rgb(0_0_0/0.1)] data-[ending-style]:shadow-[0_2px_10px_rgb(0_0_0/0)]">
              <Drawer.Handle className="transition-opacity duration-[200ms] group-data-[nested-drawer-open]/popup:opacity-0 group-data-[nested-drawer-swiping]/popup:opacity-100" />
              <Drawer.Content className="mx-auto w-full max-w-[32rem] transition-opacity duration-[300ms] ease-[cubic-bezier(0.45,1.005,0,1.005)] group-data-[nested-drawer-open]/popup:opacity-0 group-data-[nested-drawer-swiping]/popup:opacity-100">
                <Drawer.Title className="mb-1 text-center">
                  Account
                </Drawer.Title>
                <Drawer.Description className="mb-6 text-center">
                  Nested drawers stay independently focus managed.
                </Drawer.Description>
                <Drawer.Actions className="items-center justify-end">
                  <div className="mr-auto">
                    <Drawer.Root
                      onOpenChange={handleSecondOpenChange}
                      open={secondOpen}
                    >
                      <Drawer.Trigger render={ghostButton}>
                        Security settings
                      </Drawer.Trigger>
                      <Drawer.Portal>
                        <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
                          <Drawer.Popup className="group/popup shadow-[0_2px_10px_rgb(0_0_0/0.1)] data-[ending-style]:shadow-[0_2px_10px_rgb(0_0_0/0)]">
                            <Drawer.Handle className="transition-opacity duration-[200ms] group-data-[nested-drawer-open]/popup:opacity-0 group-data-[nested-drawer-swiping]/popup:opacity-100" />
                            <Drawer.Content className="mx-auto w-full max-w-[32rem] transition-opacity duration-[300ms] ease-[cubic-bezier(0.45,1.005,0,1.005)] group-data-[nested-drawer-open]/popup:opacity-0 group-data-[nested-drawer-swiping]/popup:opacity-100">
                              <Drawer.Title className="mb-1 text-center">
                                Security
                              </Drawer.Title>
                              <Drawer.Description className="mb-6 text-center">
                                Review sign-in activity and preferences.
                              </Drawer.Description>
                              <ul className="mb-6 list-disc pl-5 text-muted-foreground">
                                <li>Passkeys enabled</li>
                                <li>2FA enabled</li>
                                <li>3 signed-in devices</li>
                              </ul>
                              <Drawer.Actions className="items-center justify-end">
                                <div className="mr-auto">
                                  <Drawer.Root
                                    onOpenChange={setThirdOpen}
                                    open={thirdOpen}
                                  >
                                    <Drawer.Trigger render={ghostButton}>
                                      Advanced options
                                    </Drawer.Trigger>
                                    <Drawer.Portal>
                                      <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
                                        <Drawer.Popup className="group/popup shadow-[0_2px_10px_rgb(0_0_0/0.1)] data-[ending-style]:shadow-[0_2px_10px_rgb(0_0_0/0)]">
                                          <Drawer.Handle className="transition-opacity duration-[200ms] group-data-[nested-drawer-open]/popup:opacity-0 group-data-[nested-drawer-swiping]/popup:opacity-100" />
                                          <Drawer.Content className="mx-auto w-full max-w-[32rem] transition-opacity duration-[300ms] ease-[cubic-bezier(0.45,1.005,0,1.005)] group-data-[nested-drawer-open]/popup:opacity-0 group-data-[nested-drawer-swiping]/popup:opacity-100">
                                            <Drawer.Title className="mb-1 text-center">
                                              Advanced
                                            </Drawer.Title>
                                            <Drawer.Description className="mb-6 text-center">
                                              Variable-height nested drawer.
                                            </Drawer.Description>
                                            <div className="mb-4 grid gap-1.5">
                                              <label
                                                className="text-sm font-medium text-muted-foreground"
                                                htmlFor="device-name-story"
                                              >
                                                Device name
                                              </label>
                                              <input
                                                className="w-full rounded-md border border-border bg-background px-2.5 py-2 text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring"
                                                defaultValue="Personal laptop"
                                                id="device-name-story"
                                              />
                                            </div>
                                            <div className="mb-6 grid gap-1.5">
                                              <label
                                                className="text-sm font-medium text-muted-foreground"
                                                htmlFor="notes-story"
                                              >
                                                Notes
                                              </label>
                                              <textarea
                                                className="w-full rounded-md border border-border bg-background px-2.5 py-2 text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring"
                                                defaultValue="Rotate recovery codes and revoke older sessions."
                                                id="notes-story"
                                                rows={3}
                                              />
                                            </div>
                                            <Drawer.Actions>
                                              <Drawer.Close
                                                render={
                                                  <Button
                                                    size="xl"
                                                    variant="outline"
                                                  />
                                                }
                                              >
                                                Done
                                              </Drawer.Close>
                                            </Drawer.Actions>
                                          </Drawer.Content>
                                        </Drawer.Popup>
                                      </Drawer.Viewport>
                                    </Drawer.Portal>
                                  </Drawer.Root>
                                </div>
                                <Drawer.Close
                                  render={
                                    <Button size="xl" variant="outline" />
                                  }
                                >
                                  Close
                                </Drawer.Close>
                              </Drawer.Actions>
                            </Drawer.Content>
                          </Drawer.Popup>
                        </Drawer.Viewport>
                      </Drawer.Portal>
                    </Drawer.Root>
                  </div>
                  <Drawer.Close render={<Button size="xl" variant="outline" />}>
                    Close
                  </Drawer.Close>
                </Drawer.Actions>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

const meta: Meta = {
  title: "Components/Drawer/NestedDrawers",
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NestedDrawers: Story = {
  render: () => <NestedDrawersDemo />,
};
