import type { Meta, StoryObj } from "@storybook/react";

import { CodeDiffBlock } from "../code-diff-block";

const meta = {
  args: {
    newCode: `import { Button } from "@kuzenbo/core";

export function Toolbar() {
  return <Button variant="primary">Save changes</Button>;
}
`,
    newTitle: "feature/docs",
    oldCode: `import { Button } from "@kuzenbo/core";

export function Toolbar() {
  return <Button variant="outline">Save</Button>;
}
`,
    oldTitle: "main",
  },
  component: CodeDiffBlock,
  tags: ["autodocs"],
  title: "Code/CodeDiffBlock/Default",
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
    newTitle: "v2/search",
    oldCode: `export interface SearchResponse {
  items: string[];
}

export const fetchSearch = async (query: string): Promise<SearchResponse> => {
  const response = await fetch("/api/search?q=" + query);
  return response.json();
};`,
    oldTitle: "v1/search",
  },
};

export const ReleaseWorkflowRefactor: Story = {
  args: {
    newCode: `permissions:
  id-token: write

- name: Publish
  run: npm publish --provenance --access public`,
    newTitle: "release.yml (trusted publishing)",
    oldCode: `- name: Publish
  env:
    NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
  run: npm publish --access public`,
    oldTitle: "release.yml (old)",
    showLineNumbers: false,
    viewMode: "unified",
  },
};

export const DarkUnifiedReview: Story = {
  args: {
    newCode: `const channel = process.env.RELEASE_CHANNEL ?? "next";`,
    newTitle: "after",
    oldCode: `const channel = process.env.RELEASE_CHANNEL ?? "stable";`,
    oldTitle: "before",
    useDarkTheme: true,
    viewMode: "unified",
  },
};
