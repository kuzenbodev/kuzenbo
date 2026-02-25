import type { Meta, StoryObj } from "@storybook/react";

import { CodeDiffBlock } from "../code-diff-block";

const meta = {
  title: "Code/CodeDiffBlock/Default",
  component: CodeDiffBlock,
  tags: ["autodocs"],
  args: {
    oldTitle: "main",
    newTitle: "feature/docs",
    oldCode: `import { Button } from "@kuzenbo/core";

export function Toolbar() {
  return <Button variant="outline">Save</Button>;
}
`,
    newCode: `import { Button } from "@kuzenbo/core";

export function Toolbar() {
  return <Button variant="primary">Save changes</Button>;
}
`,
  },
} satisfies Meta<typeof CodeDiffBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unified: Story = {
  args: {
    viewMode: "unified",
  },
};

export const ApiContractMigration: Story = {
  args: {
    oldTitle: "v1/search",
    newTitle: "v2/search",
    oldCode: `export interface SearchResponse {
  items: string[];
}

export const fetchSearch = async (query: string): Promise<SearchResponse> => {
  const response = await fetch("/api/search?q=" + query);
  return response.json();
};`,
    newCode: `export interface SearchResponse {
  results: {
    id: string;
    title: string;
    score: number;
  }[];
}

export const fetchSearch = async (query: string): Promise<SearchResponse> => {
  const response = await fetch("/api/search", {
    method: "POST",
    body: JSON.stringify({ query }),
  });
  return response.json();
};`,
  },
};

export const ReleaseWorkflowRefactor: Story = {
  args: {
    oldTitle: "release.yml (old)",
    newTitle: "release.yml (trusted publishing)",
    oldCode: `- name: Publish
  env:
    NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
  run: npm publish --access public`,
    newCode: `permissions:
  id-token: write

- name: Publish
  run: npm publish --provenance --access public`,
    viewMode: "unified",
    showLineNumbers: false,
  },
};

export const DarkUnifiedReview: Story = {
  args: {
    viewMode: "unified",
    useDarkTheme: true,
    oldTitle: "before",
    newTitle: "after",
    oldCode: `const channel = process.env.RELEASE_CHANNEL ?? "stable";`,
    newCode: `const channel = process.env.RELEASE_CHANNEL ?? "next";`,
  },
};
