import type { Meta, StoryObj } from "@storybook/react";

import type { PlaygroundGeneratedCodeFile } from "../../../utils/codegen/playground-codegen-model";
import { PlaygroundCode } from "../playground-code";

const singleFile: readonly PlaygroundGeneratedCodeFile[] = [
  {
    fileName: "button-demo.tsx",
    language: "tsx",
    code: `import { Button } from "@kuzenbo/core";

export const ButtonDemo = () => (
  <Button variant="default" size="md">
    Publish release
  </Button>
);`,
  },
];

const multiFile: readonly PlaygroundGeneratedCodeFile[] = [
  {
    fileName: "api-client.ts",
    language: "ts",
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
  },
  {
    fileName: "search-panel.tsx",
    language: "tsx",
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
  },
  {
    fileName: "index.ts",
    language: "ts",
    code: `export { SearchPanel } from "./search-panel";
export { fetchSearchResults } from "./api-client";`,
  },
];

const meta = {
  title: "Code/Playground/PlaygroundCode/Default",
  component: PlaygroundCode,
  tags: ["autodocs"],
  args: {
    files: singleFile,
  },
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
    files: multiFile,
    copyLabel: "Copy file",
    copiedLabel: "Copied file",
  },
};

export const WithoutCopyButtons: Story = {
  args: {
    files: singleFile,
    showCopyButton: false,
  },
};
