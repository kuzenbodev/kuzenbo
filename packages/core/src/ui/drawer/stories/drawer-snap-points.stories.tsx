import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";

import { Button } from "../../button/button";
import { Drawer } from "../drawer";

const TOP_MARGIN_REM = 1;
const VISIBLE_SNAP_POINTS_REM = [30];

const toViewportSnapPoint = (heightRem: number): string =>
  `${heightRem + TOP_MARGIN_REM}rem`;

const snapPoints = [...VISIBLE_SNAP_POINTS_REM.map(toViewportSnapPoint), 1];

const SnapPointsDemo = () => (
  <div className="border-border bg-background relative min-h-[36rem] w-[min(100%,56rem)] overflow-hidden rounded-2xl border p-6">
    <Drawer.Root snapPoints={snapPoints}>
      <Drawer.Trigger render={<Button variant="outline" size="xl" />}>
        Open snap drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="bg-foreground fixed inset-0 min-h-dvh opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] [--backdrop-opacity:0.2] [--bleed:3rem] data-[ending-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:opacity-0 data-[swiping]:duration-0 supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]" />
        <Drawer.Viewport className="fixed inset-0 flex touch-none items-end justify-center">
          <Drawer.Popup
            className="bg-card text-card-foreground outline-border after:bg-card relative flex max-h-[calc(100dvh-var(--top-margin))] min-h-0 w-full [transform:translateY(calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)))] touch-none flex-col overflow-visible rounded-t-2xl [padding-bottom:max(0px,calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)))] shadow-[0_-16px_48px_rgb(0_0_0/0.12),0_6px_18px_rgb(0_0_0/0.06)] outline outline-1 transition-[transform,box-shadow] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] [--bleed:3rem] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-[var(--bleed)] after:content-[''] data-[ending-style]:[transform:translateY(100%)] data-[ending-style]:[padding-bottom:0] data-[ending-style]:shadow-[0_-16px_48px_rgb(0_0_0/0),0_6px_18px_rgb(0_0_0/0)] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:[transform:translateY(100%)] data-[starting-style]:[padding-bottom:0] data-[starting-style]:shadow-[0_-16px_48px_rgb(0_0_0/0),0_6px_18px_rgb(0_0_0/0)] data-[swiping]:select-none"
            style={{ "--top-margin": `${TOP_MARGIN_REM}rem` } as CSSProperties}
          >
            <Drawer.Header>
              <Drawer.Handle className="mb-0" />
              <Drawer.Title className="cursor-default text-center">
                Snap points
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Content className="min-h-0 flex-1 touch-auto overflow-y-auto overscroll-contain px-6 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
              <div className="mx-auto w-full max-w-[350px]">
                <Drawer.Description className="mb-4 text-center">
                  Drag the sheet to snap between compact and full-height states.
                </Drawer.Description>
                <div aria-hidden className="mb-6 grid gap-3">
                  {Array.from({ length: 12 }, (_, index) => (
                    <div
                      className="border-border bg-muted h-12 rounded-xl border"
                      key={index}
                    />
                  ))}
                </div>
                <Drawer.Actions>
                  <Drawer.Close render={<Button variant="outline" size="xl" />}>
                    Close
                  </Drawer.Close>
                </Drawer.Actions>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  </div>
);

const meta: Meta = {
  title: "Components/Drawer/SnapPoints",
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SnapPoints: Story = {
  render: () => <SnapPointsDemo />,
};
