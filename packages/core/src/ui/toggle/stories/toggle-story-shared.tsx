import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { ToggleGroup } from "../../toggle-group/toggle-group";
import { Toggle } from "../toggle";

const toggleSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  argTypes: {
    size: {
      control: "select",
      options: toggleSizes,
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
  },
  component: Toggle,
  tags: ["autodocs"],
  title: "Components/Toggle",
} satisfies Meta<typeof Toggle>;

type Story = StoryObj<typeof baseMeta>;

const IncidentPinToggleExample = () => {
  const [pinned, setPinned] = useState(false);
  const handlePinnedChange = useCallback((nextPressed: boolean) => {
    setPinned(nextPressed);
  }, []);

  return (
    <div className="grid gap-2">
      <Toggle
        aria-label="Pin incident dashboard"
        onPressedChange={handlePinnedChange}
        pressed={pinned}
        variant="outline"
      >
        Pin incident dashboard
      </Toggle>
      <p className="text-muted-foreground text-sm">
        {pinned
          ? "Dashboard is pinned for the operations command center."
          : "Dashboard follows your last visited view."}
      </p>
    </div>
  );
};

const IconToggleExample = () => {
  const [watchlistEnabled, setWatchlistEnabled] = useState(true);
  const handleWatchlistChange = useCallback((nextPressed: boolean) => {
    setWatchlistEnabled(nextPressed);
  }, []);

  return (
    <div className="grid gap-2">
      <Toggle
        aria-label="Add vendor to watchlist"
        onPressedChange={handleWatchlistChange}
        pressed={watchlistEnabled}
        variant="outline"
      >
        <span aria-hidden="true">+</span>
        Watchlist
      </Toggle>
      <p className="text-muted-foreground text-sm">
        {watchlistEnabled
          ? "Vendor will surface in weekly risk reports."
          : "Vendor is excluded from watchlist reports."}
      </p>
    </div>
  );
};

export const Default: Story = {
  render: () => <IncidentPinToggleExample />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {toggleSizes.map((size) => (
        <Toggle
          aria-label={`${size} toggle`}
          key={size}
          size={size}
          variant="outline"
        >
          {size.toUpperCase()}
        </Toggle>
      ))}
    </div>
  ),
};

export const SizePrecedence: Story = {
  render: () => (
    <ToggleGroup size="lg" spacing={0} variant="outline">
      <ToggleGroup.Item value="inherit">Inherit lg</ToggleGroup.Item>
      <ToggleGroup.Item size="xs" value="override">
        Override xs
      </ToggleGroup.Item>
      <ToggleGroup.Item value="inherit-2">Inherit lg</ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid gap-2">
      <Toggle aria-label="Locked audit mode" disabled pressed variant="outline">
        Locked audit mode
      </Toggle>
      <p className="text-muted-foreground text-sm">
        This toggle is enforced by organization policy.
      </p>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => <IconToggleExample />,
};
