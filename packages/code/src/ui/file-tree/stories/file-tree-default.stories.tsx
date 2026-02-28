import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { CodeBlock } from "../../code-block/code-block";
import { FileTree } from "../file-tree";
import type { FileTreeNode } from "../file-tree";

const sampleTreeData: FileTreeNode[] = [
  {
    children: [
      {
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
        id: "app-docs",
        name: "docs",
      },
      {
        id: "app-layout",
        name: "layout.tsx",
      },
    ],
    id: "app",
    name: "app",
  },
  {
    id: "package-json",
    name: "package.json",
  },
];

const monorepoTreeData: FileTreeNode[] = [
  {
    children: [
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    id: "apps-website-app-docs-page",
                    name: "page.tsx",
                  },
                ],
                id: "apps-website-app-docs",
                name: "(docs)",
              },
            ],
            id: "apps-website-app",
            name: "app",
          },
          {
            id: "apps-website-config",
            name: "next.config.ts",
          },
        ],
        id: "apps-website",
        name: "website",
      },
    ],
    id: "apps",
    name: "apps",
  },
  {
    children: [
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        id: "packages-code-code-preview-component",
                        name: "code-preview.tsx",
                      },
                      {
                        children: [
                          {
                            id: "packages-code-code-preview-story-file",
                            name: "code-preview-default.stories.tsx",
                          },
                        ],
                        id: "packages-code-code-preview-stories",
                        name: "stories",
                      },
                    ],
                    id: "packages-code-code-preview",
                    name: "code-preview",
                  },
                ],
                id: "packages-code-ui",
                name: "ui",
              },
            ],
            id: "packages-code-src",
            name: "src",
          },
        ],
        id: "packages-code",
        name: "code",
      },
    ],
    id: "packages",
    name: "packages",
  },
];

const apiAuditTreeData: FileTreeNode[] = [
  {
    children: [
      {
        children: [
          {
            children: [
              {
                id: "app-api-search-route",
                name: "route.ts",
              },
            ],
            id: "app-api-search",
            name: "search",
          },
          {
            children: [
              {
                id: "app-api-health-route",
                name: "route.ts",
              },
            ],
            id: "app-api-health",
            name: "health",
          },
        ],
        id: "app-api-folder",
        name: "api",
      },
    ],
    id: "app-api",
    name: "app",
  },
  {
    children: [
      {
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
        id: "tests-api",
        name: "api",
      },
    ],
    id: "tests",
    name: "tests",
  },
];

const meta = {
  args: {
    data: sampleTreeData,
    height: 260,
    openByDefault: true,
    width: 520,
  },
  component: FileTree,
  tags: ["autodocs"],
  title: "Code/FileTree/Default",
} satisfies Meta<typeof FileTree>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MonorepoWorkspaceExplorer: Story = {
  args: {
    data: monorepoTreeData,
    height: 360,
    indent: 18,
    openByDefault: true,
    width: 620,
  },
};

export const ApiRouteAudit: Story = {
  args: {
    data: apiAuditTreeData,
    height: 280,
    openByDefault: true,
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
            <div className="text-muted-foreground px-3 py-2 text-xs">
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
    height: 300,
    openByDefault: false,
    width: 620,
  },
};
