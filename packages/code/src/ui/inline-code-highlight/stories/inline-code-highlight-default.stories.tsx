import type { Meta, StoryObj } from "@storybook/react";

import { InlineCodeHighlight } from "../inline-code-highlight";

const meta = {
  title: "Code/InlineCodeHighlight/Default",
  component: InlineCodeHighlight,
  tags: ["autodocs"],
  args: {
    code: "bun run build",
    language: "bash",
  },
  render: (args) => (
    <p>
      Run <InlineCodeHighlight {...args} /> before publishing a stable release.
    </p>
  ),
} satisfies Meta<typeof InlineCodeHighlight>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EnvironmentVariableToken: Story = {
  args: {
    code: "NEXT_PUBLIC_BASE_URL",
    language: "env",
  },
  render: (args) => (
    <p>
      Set <InlineCodeHighlight {...args} /> in production to generate correct
      metadata URLs.
    </p>
  ),
};

export const SqlFragment: Story = {
  args: {
    code: "SELECT id, email FROM users WHERE active = true",
    language: "sql",
  },
  render: (args) => (
    <p>
      The health audit query uses <InlineCodeHighlight {...args} /> for the
      initial warmup check.
    </p>
  ),
};

export const HighlightedHtmlToken: Story = {
  args: {
    code: undefined,
    language: "tsx",
    highlightedHtml:
      '<span class="line"><span class="token keyword">export</span> const schema = z.object({ id: z.string() });</span>',
  },
  render: (args) => (
    <p>
      Generated docs include <InlineCodeHighlight {...args} /> snippets inline
      with prose.
    </p>
  ),
};
