import type { Meta, StoryObj } from "@storybook/react";

import type { PlaygroundGeneratedCodeFile } from "../../../utils/codegen/playground-codegen-model";
import { PlaygroundCode } from "../playground-code";

const singleFile: readonly PlaygroundGeneratedCodeFile[] = [
  {
    code: `import { Button } from "@kuzenbo/core";

export const ButtonDemo = () => (
  <Button variant="default" size="md">
    Publish release
  </Button>
);`,
    fileName: "button-demo.tsx",
    language: "tsx",
  },
];

const multiFile: readonly PlaygroundGeneratedCodeFile[] = [
  {
    code: `export interface SearchRequest {
  query: string;
  locale: string;
}

export const fetchSearchResults = async (request: SearchRequest) => {
  const response = await fetch("/api/search", {
    method: "POST",
    body: JSON.stringify(request),
  });

  return response.json();
};`,
    fileName: "api-client.ts",
    language: "ts",
  },
  {
    code: `import { useState } from "react";
import { fetchSearchResults } from "./api-client";

export const SearchPanel = () => {
  const [query, setQuery] = useState("");

  return (
    <form>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <button type="button" onClick={() => fetchSearchResults({ query, locale: "en" })}>
        Search
      </button>
    </form>
  );
};`,
    fileName: "search-panel.tsx",
    language: "tsx",
  },
  {
    code: `export { SearchPanel } from "./search-panel";
export { fetchSearchResults } from "./api-client";`,
    fileName: "index.ts",
    language: "ts",
  },
];

const meta = {
  args: {
    files: singleFile,
  },
  component: PlaygroundCode,
  tags: ["autodocs"],
  title: "Code/Playground/PlaygroundCode/Default",
} satisfies Meta<typeof PlaygroundCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultiFileFeatureScaffold: Story = {
  args: {
    files: multiFile,
  },
};

export const WithCustomCopyLabels: Story = {
  args: {
    copiedLabel: "Copied file",
    copyLabel: "Copy file",
    files: multiFile,
  },
};

export const WithoutCopyButtons: Story = {
  args: {
    files: singleFile,
    showCopyButton: false,
  },
};
