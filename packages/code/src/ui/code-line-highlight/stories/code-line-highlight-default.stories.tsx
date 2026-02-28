import type { Meta, StoryObj } from "@storybook/react";

import { CodeLineHighlight } from "../code-line-highlight";

const meta = {
  args: {
    annotations: [
      {
        content: "Guard empty values before tagging",
        line: 16,
      },
      {
        content: "Tag the cached payload",
        line: 17,
      },
    ],
    code: `export function useCacheTag(tag: string) {
  if (!tag) {
    return;
  }

  cacheTag(tag);
}`,
    highlightedLines: [16, 17],
    startLineNumber: 14,
  },
  component: CodeLineHighlight,
  tags: ["autodocs"],
  title: "Code/CodeLineHighlight/Default",
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
    annotations: [
      {
        content: "Missing credentials should short-circuit quickly",
        line: 45,
      },
      {
        content: "Return 401 to indicate authentication is required",
        line: 47,
      },
      {
        content: "Differentiate invalid key path with a 403",
        line: 48,
      },
    ],
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
    highlightedLines: [45, 47, 48],
    startLineNumber: 42,
  },
};

export const MigrationChecklistReview: Story = {
  args: {
    annotations: [
      {
        content: "Version bump should match monorepo release plan",
        line: 3,
      },
      {
        content: "Ensure default export path resolves in ESM consumers",
        line: 8,
      },
      {
        content: "Keep import/default aligned for tooling compatibility",
        line: 9,
      },
    ],
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
    highlightedLines: [3, 8, 9],
    startLineNumber: 1,
  },
};
