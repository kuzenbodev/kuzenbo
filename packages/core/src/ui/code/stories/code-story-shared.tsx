import type { Meta, StoryObj } from "@storybook/react";

import { Code } from "../code";

const blockExample = `import { Code } from "@kuzenbo/core";

function ReleaseChecklist() {
  const command = "bun turbo run test --filter=@kuzenbo/core";

  return <Code block>{command}</Code>;
}`;

export const baseMeta = {
  title: "Components/Code",
  component: Code,
  tags: ["autodocs"],
} satisfies Meta<typeof Code>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <div>
      Run <Code>bun turbo run lint --filter=@kuzenbo/core</Code> before opening
      a component release PR.
    </div>
  ),
};

export const Block: Story = {
  render: () => <Code block>{blockExample}</Code>,
};
