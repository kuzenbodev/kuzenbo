import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "../typography";

const html = `
<h2>Typography.Prose</h2>
<p>
  Use this wrapper when rendering trusted HTML content from CMS, markdown, or
  rich-text sources so headings, lists, links, tables, and code remain visually
  consistent with Kuzenbo tokens.
</p>
<ul>
  <li>Semantic heading and paragraph spacing</li>
  <li>Inline <code>code</code> and <kbd>kbd</kbd> styling</li>
  <li>Table, blockquote, and list defaults</li>
</ul>
<blockquote>Shared typography foundations reduce docs drift across products.</blockquote>
<table>
  <thead>
    <tr>
      <th>Surface</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Docs</td>
      <td>Synced</td>
    </tr>
    <tr>
      <td>Playground</td>
      <td>Ready</td>
    </tr>
  </tbody>
</table>
`;

const meta = {
  component: Typography.Prose,
  tags: ["autodocs"],
  title: "Components/Typography/Prose",
} satisfies Meta<typeof Typography.Prose>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-3xl">
      <Typography.Prose>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Typography.Prose>
    </div>
  ),
};
