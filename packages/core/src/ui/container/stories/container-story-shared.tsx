import type { Meta, StoryObj } from "@storybook/react";

import { Container } from "../container";

export const baseMeta = {
  component: Container,
  tags: ["autodocs"],
  title: "Components/Container",
} satisfies Meta<typeof Container>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: (args) => (
    <div className="bg-muted/30 w-full py-6">
      <Container {...args}>
        <section className="border-border bg-card text-card-foreground space-y-4 rounded-lg border p-6">
          <header className="space-y-1">
            <p className="text-muted-foreground text-sm">Release summary</p>
            <p className="text-base font-medium">
              Q2 component adoption is up 18% across product surfaces
            </p>
          </header>
          <ul className="text-muted-foreground space-y-2 text-sm">
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
    <div className="bg-muted/30 w-full py-6">
      <Container {...args}>
        <article className="border-border bg-card text-card-foreground space-y-4 rounded-lg border p-6">
          <p className="text-muted-foreground text-sm">Field note</p>
          <p className="text-base">
            The narrow variant is tuned for prose-heavy content like changelog
            entries, implementation guides, and migration walkthroughs.
          </p>
          <p className="text-muted-foreground text-sm">
            Teams can keep reading comfort high without sacrificing layout
            consistency.
          </p>
        </article>
      </Container>
    </div>
  ),
};
