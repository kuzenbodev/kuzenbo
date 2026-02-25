import type { Meta, StoryObj } from "@storybook/react";

import { Container } from "../container";

export const baseMeta = {
  title: "Components/Container",
  component: Container,
  tags: ["autodocs"],
} satisfies Meta<typeof Container>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full bg-muted/30 py-6">
      <Container {...args}>
        <section className="space-y-4 rounded-lg border border-border bg-card p-6 text-card-foreground">
          <header className="space-y-1">
            <p className="text-sm text-muted-foreground">Release summary</p>
            <p className="text-base font-medium">
              Q2 component adoption is up 18% across product surfaces
            </p>
          </header>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>49 components migrated to semantic color tokens.</li>
            <li>
              Regression suite stayed green across all package workspaces.
            </li>
            <li>Design and engineering handoff time dropped to one sprint.</li>
          </ul>
        </section>
      </Container>
    </div>
  ),
};

export const Narrow: Story = {
  args: {
    className: "max-w-3xl",
  },
  render: (args) => (
    <div className="w-full bg-muted/30 py-6">
      <Container {...args}>
        <article className="space-y-4 rounded-lg border border-border bg-card p-6 text-card-foreground">
          <p className="text-sm text-muted-foreground">Field note</p>
          <p className="text-base">
            The narrow variant is tuned for prose-heavy content like changelog
            entries, implementation guides, and migration walkthroughs.
          </p>
          <p className="text-sm text-muted-foreground">
            Teams can keep reading comfort high without sacrificing layout
            consistency.
          </p>
        </article>
      </Container>
    </div>
  ),
};
