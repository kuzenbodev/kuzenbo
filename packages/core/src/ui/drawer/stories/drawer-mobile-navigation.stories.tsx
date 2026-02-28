import { ScrollArea } from "@base-ui/react/scroll-area";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Drawer } from "../drawer";

const listItems = [
  { href: "#", label: "Overview" },
  { href: "#", label: "Components" },
  { href: "#", label: "Utilities" },
  { href: "#", label: "Releases" },
] as const;

const longList = Array.from({ length: 30 }, (_, index) => ({
  href: "#",
  label: `Item ${index + 1}`,
}));

const MobileNavigationDemo = () => (
  <div className="border-border bg-background relative min-h-[36rem] w-[min(100%,56rem)] overflow-hidden rounded-2xl border p-6">
    <Drawer.Root>
      <Drawer.Trigger render={<Button variant="outline" size="xl" />}>
        Open mobile menu
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="data-[starting-style]:backdrop-blur-0 data-[ending-style]:backdrop-blur-0 fixed inset-0 min-h-[100dvh] bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--color-foreground),transparent_95%)_0,color-mix(in_oklch,var(--color-foreground),transparent_90%)_50%)] opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] backdrop-blur-[1.5px] transition-[backdrop-filter,opacity] duration-[600ms] ease-[cubic-bezier(0.45,1.005,0,1.005)] [--backdrop-opacity:1] data-[ending-style]:opacity-0 data-[ending-style]:duration-[350ms] data-[ending-style]:ease-[cubic-bezier(0.375,0.015,0.545,0.455)] data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]" />
        <Drawer.Viewport className="group fixed inset-0">
          <ScrollArea.Root
            className="box-border h-full overscroll-contain transition-[transform,translate] duration-[600ms] ease-[cubic-bezier(0.45,1.005,0,1.005)] group-data-[ending-style]:pointer-events-none group-data-[starting-style]:translate-y-[100dvh]"
            style={{ position: undefined }}
          >
            <ScrollArea.Viewport className="box-border h-full touch-auto overscroll-contain">
              <ScrollArea.Content className="flex min-h-full items-end justify-center pt-8">
                <Drawer.Popup className="group box-border w-full max-w-[42rem] [transform:translateY(var(--drawer-swipe-movement-y))] transition-transform duration-[800ms] ease-[cubic-bezier(0.45,1.005,0,1.005)] outline-none data-[ending-style]:[transform:translateY(max(100dvh,100%))] data-[ending-style]:duration-[350ms] data-[ending-style]:ease-[cubic-bezier(0.375,0.015,0.545,0.455)] data-[swiping]:select-none">
                  <nav
                    aria-label="Navigation"
                    className="bg-card text-card-foreground outline-border relative flex flex-col rounded-t-2xl px-6 pt-4 pb-6 shadow-[0_10px_64px_-10px_rgb(0_0_0/20%)] outline outline-1 transition-shadow duration-[350ms] ease-[cubic-bezier(0.375,0.015,0.545,0.455)] group-data-[ending-style]:shadow-none"
                  >
                    <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center">
                      <div aria-hidden className="h-9 w-9" />
                      <Drawer.Handle className="mx-0 mb-0 justify-self-center" />
                    </div>
                    <Drawer.Content className="w-full">
                      <Drawer.Title className="mb-1">Menu</Drawer.Title>
                      <Drawer.Description className="mb-5">
                        Scroll the long list. Flick down from the top to
                        dismiss.
                      </Drawer.Description>
                      <div className="pb-8">
                        <ul className="m-0 grid list-none gap-1 p-0">
                          {listItems.map((item) => (
                            <li className="flex" key={item.label}>
                              <a
                                className="bg-muted text-foreground focus-visible:outline-ring w-full rounded-xl px-4 py-3 no-underline focus-visible:outline focus-visible:-outline-offset-1"
                                href={item.href}
                              >
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                        <ul
                          aria-label="Long list"
                          className="mt-6 grid list-none gap-1 p-0"
                        >
                          {longList.map((item) => (
                            <li className="flex" key={item.label}>
                              <a
                                className="bg-muted text-foreground focus-visible:outline-ring w-full rounded-xl px-4 py-3 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1"
                                href={item.href}
                              >
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Drawer.Content>
                  </nav>
                </Drawer.Popup>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="pointer-events-none absolute m-[0.4rem] flex w-[0.25rem] justify-center rounded-[1rem] opacity-0 transition-opacity duration-[250ms] hover:pointer-events-auto hover:opacity-100 hover:duration-[75ms] data-[ending-style]:opacity-0 data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-[75ms]">
              <ScrollArea.Thumb className="bg-muted-foreground w-full rounded-[inherit] before:absolute before:top-1/2 before:left-1/2 before:h-[calc(100%+1rem)] before:w-[calc(100%+1rem)] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  </div>
);

const meta: Meta = {
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Components/Drawer/MobileNavigation",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const MobileNavigation: Story = {
  render: () => <MobileNavigationDemo />,
};
