import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { useIsMobile } from "../use-mobile";

export const baseMeta = {
  title: "Hooks/useIsMobile",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

type Story = StoryObj<typeof baseMeta>;

const UseIsMobileDemo = () => {
  const isMobile = useIsMobile();
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const onResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="border-border bg-card text-card-foreground max-w-md rounded-lg border p-6 shadow-sm">
      {/* hooks is standalone and cannot import core Typography primitives. */}
      <h2 className="text-base font-medium">useIsMobile Demo</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Resize the viewport. This hook returns <code>true</code> below 768px.
      </p>
      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
        <dt className="font-medium">Viewport</dt>
        <dd>{viewportWidth}px</dd>
        <dt className="font-medium">isMobile</dt>
        <dd>{String(isMobile)}</dd>
      </dl>
    </div>
  );
};

export const Default: Story = {
  render: () => <UseIsMobileDemo />,
};
