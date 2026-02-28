import type { StoryObj } from "@storybook/react";

import { KuzenboProvider } from "../../../provider";
import { Rating } from "../rating";
import { baseMeta } from "./rating-story-shared";

export default {
  ...baseMeta,
  title: "Components/Rating/ProviderSizePrecedence",
};

type Story = StoryObj<typeof baseMeta>;

export const ProviderSizePrecedence: Story = {
  args: {
    rating: 4.2,
  },
  render: () => (
    <div className="grid gap-4">
      <div className="grid gap-1">
        <span className="text-muted-foreground text-xs">
          Provider default size (`lg`)
        </span>
        <KuzenboProvider defaultSize="lg">
          <Rating rating={4.2} showValue />
        </KuzenboProvider>
      </div>

      <div className="grid gap-1">
        <span className="text-muted-foreground text-xs">
          Component default size (`sm`) overrides provider default (`lg`)
        </span>
        <KuzenboProvider
          components={{ Rating: { defaultProps: { size: "sm" } } }}
          defaultSize="lg"
        >
          <Rating rating={4.2} showValue />
        </KuzenboProvider>
      </div>

      <div className="grid gap-1">
        <span className="text-muted-foreground text-xs">
          Explicit prop size (`xl`) overrides component and provider defaults
        </span>
        <KuzenboProvider
          components={{ Rating: { defaultProps: { size: "sm" } } }}
          defaultSize="lg"
        >
          <Rating rating={4.2} showValue size="xl" />
        </KuzenboProvider>
      </div>
    </div>
  ),
};
