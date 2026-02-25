import type { Meta, StoryObj } from "@storybook/react";

import { CodeLineHighlight } from "../code-line-highlight";

const meta = {
  title: "Code/CodeLineHighlight/Default",
  component: CodeLineHighlight,
  tags: ["autodocs"],
  args: {
    startLineNumber: 14,
    highlightedLines: [16, 17],
    code: `export function useCacheTag(tag: string) {
  if (!tag) {
    return;
  }

  cacheTag(tag);
}`,
    annotations: [
      {
        line: 16,
        content: "Guard empty values before tagging",
      },
      {
        line: 17,
        content: "Tag the cached payload",
      },
    ],
  },
} satisfies Meta<typeof CodeLineHighlight>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAnnotationSlot: Story = {
  args: {
    annotationSlot: ({ lineNumber, annotation }) =>
      `Line ${lineNumber}: ${annotation.content}`,
  },
};

export const ApiSecurityReview: Story = {
  args: {
    startLineNumber: 42,
    highlightedLines: [45, 47, 48],
    code: `export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key");

  if (!apiKey) {
    return Response.json({ message: "Missing API key" }, { status: 401 });
  }

  if (apiKey !== process.env.API_KEY) {
    return Response.json({ message: "Invalid API key" }, { status: 403 });
  }

  return Response.json({ message: "Authorized" });
}`,
    annotations: [
      {
        line: 45,
        content: "Missing credentials should short-circuit quickly",
      },
      {
        line: 47,
        content: "Return 401 to indicate authentication is required",
      },
      {
        line: 48,
        content: "Differentiate invalid key path with a 403",
      },
    ],
  },
};

export const MigrationChecklistReview: Story = {
  args: {
    startLineNumber: 1,
    highlightedLines: [3, 8, 9],
    code: `{
  "name": "@kuzenbo/code",
  "version": "0.16.0",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "default": "./dist/index.js"
    }
  },
  "peerDependencies": {
    "react": "^19.0.0"
  }
}`,
    annotations: [
      {
        line: 3,
        content: "Version bump should match monorepo release plan",
      },
      {
        line: 8,
        content: "Ensure default export path resolves in ESM consumers",
      },
      {
        line: 9,
        content: "Keep import/default aligned for tooling compatibility",
      },
    ],
  },
};
