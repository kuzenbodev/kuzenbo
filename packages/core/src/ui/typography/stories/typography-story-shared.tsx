import type { Meta, StoryObj } from "@storybook/react";

import { Code } from "../../code/code";
import { Typography } from "../typography";

export const baseMeta = {
  title: "Components/Typography",
  component: Typography.Text,
  tags: ["autodocs"],
} satisfies Meta<typeof Typography.Text>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl space-y-3">
      <Typography.H2>Workspace Access Review</Typography.H2>
      <Typography.P>
        Review pending role change requests before tomorrow&apos;s release
        window to avoid deployment access drift across teams.
      </Typography.P>
      <Typography.Muted>
        3 pending approvals. Last reviewed by Platform Ops 12 minutes ago.
      </Typography.Muted>
    </div>
  ),
};

export const SemanticScale: Story = {
  render: () => (
    <div className="mx-auto max-w-3xl space-y-4">
      <Typography.H1>Migration Guide: Core 3.0</Typography.H1>
      <Typography.H2>Planning the rollout</Typography.H2>
      <Typography.H3>Workspace ownership model</Typography.H3>
      <Typography.H4>Validation checkpoints</Typography.H4>
      <Typography.H5>Storybook alignment notes</Typography.H5>
      <Typography.H6>Appendix A</Typography.H6>
      <Typography.P className="max-w-2xl">
        Paragraph defaults are tuned for docs and product UI copy where reading
        comfort matters as much as visual hierarchy.
      </Typography.P>
    </div>
  ),
};

export const RoleAliases: Story = {
  render: () => (
    <div className="mx-auto max-w-3xl space-y-4">
      <Typography.Display>June release checkpoint</Typography.Display>
      <Typography.Subheading>
        Accessibility and docs parity were shipped together
      </Typography.Subheading>
      <Typography.Body>
        Body alias maps to everyday product copy and keeps scanning cadence
        stable in long surfaces.
      </Typography.Body>
      <Typography.Lead>
        Lead alias is useful for hero intros or summary paragraphs.
      </Typography.Lead>
      <Typography.Muted>
        Muted alias supports supporting metadata without fighting primary copy.
      </Typography.Muted>
      <Typography.Small>
        Last updated 2 hours ago by UI Platform.
      </Typography.Small>
      <Typography.Caption>
        Caption alias is helpful for footnotes and chart references.
      </Typography.Caption>
      <Typography.Overline>Engineering update</Typography.Overline>
      <Typography.Eyebrow>Design system</Typography.Eyebrow>
    </div>
  ),
};

export const Link: Story = {
  render: () => (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <Typography.Link href="/docs/components/button">
        Button API reference
      </Typography.Link>
      <Typography.Link href="/docs/components/dialog" variant="muted">
        Dialog accessibility checklist
      </Typography.Link>
      <Typography.Link
        href="/docs/getting-started/installation"
        variant="caption"
      >
        Install and theme setup
      </Typography.Link>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl space-y-4">
      <Typography.Blockquote>
        Stable primitives accelerate delivery because teams stop rebuilding the
        same accessibility and styling foundations in every feature.
      </Typography.Blockquote>

      <Typography.Body>
        Use <Code>Code</Code> for inline snippets like <Code>bun run test</Code>{" "}
        and use <Typography.Link href="/docs">Typography.Link</Typography.Link>{" "}
        for actionable references.
      </Typography.Body>

      <Typography.Ul>
        <Typography.Li>
          Define semantic tokens before styling variants.
        </Typography.Li>
        <Typography.Li>
          Keep docs examples aligned with runtime component contracts.
        </Typography.Li>
      </Typography.Ul>

      <Typography.Ol>
        <Typography.Li>
          Pick the primitive that matches the use case.
        </Typography.Li>
        <Typography.Li>
          Compose with <Code>className</Code> overrides only when necessary.
        </Typography.Li>
      </Typography.Ol>
    </div>
  ),
};
