import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "../typography";

const html = `
<h1>H1 Typography.Prose</h1>
<p>
  This story intentionally renders every rich-content element that
  <code>Typography.Prose</code> styles.
</p>
<h2>H2 Section</h2>
<p>
  Inline <a href="/docs/components/typography">links</a>,
  <mark>highlighted text</mark>, and <kbd>kbd</kbd> shortcuts are included.
</p>
<h3>H3 Section</h3>
<p>
  Use <code>code</code> spans for inline snippets and <strong>strong</strong> /
  <em>emphasis</em> where needed.
</p>
<h4>H4 Section</h4>
<h5>H5 Section</h5>
<h6>H6 Section</h6>
<hr />
<img
  src="https://picsum.photos/960/420"
  alt="Random demo image"
/>
<p>Unordered list:</p>
<ul>
  <li>First unordered item</li>
  <li>Second unordered item</li>
  <li>Third unordered item</li>
</ul>
<p>Ordered list:</p>
<ol>
  <li>First ordered item</li>
  <li>Second ordered item</li>
  <li>Third ordered item</li>
</ol>
<blockquote>
  Shared typography defaults reduce implementation churn across docs and product
  surfaces.
  <cite> - Kuzenbo UI Team</cite>
</blockquote>
<pre>
pnpm add @kuzenbo/core @kuzenbo/theme
bun run test
</pre>
<table>
  <caption>Component status matrix</caption>
  <thead>
    <tr>
      <th>Component</th>
      <th>Coverage</th>
      <th>Docs</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Typography</td>
      <td>Pass</td>
      <td>Updated</td>
    </tr>
    <tr>
      <td>Code</td>
      <td>Pass</td>
      <td>Updated</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th colspan="3">Last sync: today</th>
    </tr>
  </tfoot>
</table>
`;

const meta = {
  component: Typography.Prose,
  tags: ["autodocs"],
  title: "Components/Typography/ProseAllElements",
} satisfies Meta<typeof Typography.Prose>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProseAllElements: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl">
      <Typography.Prose>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Typography.Prose>
    </div>
  ),
};
