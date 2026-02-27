import type { Meta, StoryObj } from "@storybook/react";

import { KuzenboProvider } from "@kuzenbo/core/provider";

import { Calendar } from "../calendar";

const ProviderSizePrecedenceDemo = () => (
  <div className="grid gap-4">
    <div className="grid gap-2">
      <span className="text-xs text-muted-foreground">
        Provider default size (`lg`)
      </span>
      <KuzenboProvider defaultSize="lg">
        <Calendar
          className="rounded-lg border border-border"
          defaultMonth={new Date(2025, 0)}
          mode="single"
          selected={new Date(2025, 0, 15)}
        />
      </KuzenboProvider>
    </div>

    <div className="grid gap-2">
      <span className="text-xs text-muted-foreground">
        Component default size (`sm`) overrides provider default (`lg`)
      </span>
      <KuzenboProvider
        components={{ Calendar: { defaultProps: { size: "sm" } } }}
        defaultSize="lg"
      >
        <Calendar
          className="rounded-lg border border-border"
          defaultMonth={new Date(2025, 0)}
          mode="single"
          selected={new Date(2025, 0, 15)}
        />
      </KuzenboProvider>
    </div>

    <div className="grid gap-2">
      <span className="text-xs text-muted-foreground">
        Explicit prop size (`xl`) overrides component and provider defaults
      </span>
      <KuzenboProvider
        components={{ Calendar: { defaultProps: { size: "sm" } } }}
        defaultSize="lg"
      >
        <Calendar
          className="rounded-lg border border-border"
          defaultMonth={new Date(2025, 0)}
          mode="single"
          selected={new Date(2025, 0, 15)}
          size="xl"
        />
      </KuzenboProvider>
    </div>
  </div>
);

const meta: Meta = {
  title: "Components/Calendar/ProviderSizePrecedence",
  component: Calendar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ProviderSizePrecedence: Story = {
  render: () => <ProviderSizePrecedenceDemo />,
};
