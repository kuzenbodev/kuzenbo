import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { CodeBlock } from "../../code-block/code-block";
import { FileTree, type FileTreeNode } from "../file-tree";

const sampleTreeData: FileTreeNode[] = [
  {
    id: "app",
    name: "app",
    children: [
      {
        id: "app-docs",
        name: "docs",
        children: [
          {
            id: "app-docs-page",
            name: "page.tsx",
          },
          {
            id: "app-docs-content",
            name: "content.mdx",
          },
        ],
      },
      {
        id: "app-layout",
        name: "layout.tsx",
      },
    ],
  },
  {
    id: "package-json",
    name: "package.json",
  },
];

const monorepoTreeData: FileTreeNode[] = [
  {
    id: "apps",
    name: "apps",
    children: [
      {
        id: "apps-website",
        name: "website",
        children: [
          {
            id: "apps-website-app",
            name: "app",
            children: [
              {
                id: "apps-website-app-docs",
                name: "(docs)",
                children: [
                  {
                    id: "apps-website-app-docs-page",
                    name: "page.tsx",
                  },
                ],
              },
            ],
          },
          {
            id: "apps-website-config",
            name: "next.config.ts",
          },
        ],
      },
    ],
  },
  {
    id: "packages",
    name: "packages",
    children: [
      {
        id: "packages-code",
        name: "code",
        children: [
          {
            id: "packages-code-src",
            name: "src",
            children: [
              {
                id: "packages-code-ui",
                name: "ui",
                children: [
                  {
                    id: "packages-code-code-preview",
                    name: "code-preview",
                    children: [
                      {
                        id: "packages-code-code-preview-component",
                        name: "code-preview.tsx",
                      },
                      {
                        id: "packages-code-code-preview-stories",
                        name: "stories",
                        children: [
                          {
                            id: "packages-code-code-preview-story-file",
                            name: "code-preview-default.stories.tsx",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const apiAuditTreeData: FileTreeNode[] = [
  {
    id: "app-api",
    name: "app",
    children: [
      {
        id: "app-api-folder",
        name: "api",
        children: [
          {
            id: "app-api-search",
            name: "search",
            children: [
              {
                id: "app-api-search-route",
                name: "route.ts",
              },
            ],
          },
          {
            id: "app-api-health",
            name: "health",
            children: [
              {
                id: "app-api-health-route",
                name: "route.ts",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "tests",
    name: "tests",
    children: [
      {
        id: "tests-api",
        name: "api",
        children: [
          {
            id: "tests-api-search",
            name: "search.test.ts",
          },
          {
            id: "tests-api-health",
            name: "health.test.ts",
          },
        ],
      },
    ],
  },
];

const meta = {
  title: "Code/FileTree/Default",
  component: FileTree,
  tags: ["autodocs"],
  args: {
    data: sampleTreeData,
    openByDefault: true,
    height: 260,
    width: 520,
  },
} satisfies Meta<typeof FileTree>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MonorepoWorkspaceExplorer: Story = {
  args: {
    data: monorepoTreeData,
    openByDefault: true,
    height: 360,
    width: 620,
    indent: 18,
  },
};

export const ApiRouteAudit: Story = {
  args: {
    data: apiAuditTreeData,
    openByDefault: true,
    height: 280,
    width: 560,
  },
  render: (args) => {
    const [selectedNode, setSelectedNode] = useState<FileTreeNode | null>(null);

    return (
      <div className="space-y-3">
        <FileTree
          {...args}
          onSelect={(node) => {
            setSelectedNode(node);
          }}
        />
        <CodeBlock
          code={
            selectedNode
              ? JSON.stringify(selectedNode, null, 2)
              : '{\n  "selected": "none"\n}'
          }
          language="json"
          toolbar={
            <div className="px-3 py-2 text-xs text-muted-foreground">
              Selected node payload
            </div>
          }
        />
      </div>
    );
  },
};

export const CollapsedByDefault: Story = {
  args: {
    data: monorepoTreeData,
    openByDefault: false,
    height: 300,
    width: 620,
  },
};
