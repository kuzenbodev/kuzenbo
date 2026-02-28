import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "../typography";

const html = `
<h2>Shipping Documentation and UI Updates Together</h2>
<p>
  Teams move faster when component changes, usage guidance, and examples are
  shipped in one pull request.
</p>
<p>
  Start with semantic structure, then apply consistent styles with
  <code>Typography.Prose</code>.
</p>
<blockquote>
  Documentation is part of the product, not post-release cleanup.
</blockquote>
<h3>Checklist</h3>
<ul>
  <li>Update component behavior</li>
  <li>Add regression test coverage</li>
  <li>Publish docs and Storybook examples</li>
</ul>
<p>
  Learn more in the
  <a href="/docs/patterns/composition">composition patterns guide</a>.
</p>
`;

const meta = {
  title: "Components/Typography/ProseCmsArticle",
  component: Typography.Prose,
  tags: ["autodocs"],
} satisfies Meta<typeof Typography.Prose>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProseCmsArticle: Story = {
  render: () => (
    <div className="mx-auto max-w-3xl">
      <Typography.Prose>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Typography.Prose>
    </div>
  ),
};
