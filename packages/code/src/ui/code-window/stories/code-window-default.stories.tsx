import { Button } from "@kuzenbo/core/ui/button";
import type { StoryObj } from "@storybook/react";

import { CodeBlock } from "../../code-block/code-block";
import { Default as DefaultStory, baseMeta } from "./code-window-story-shared";

export default {
  ...baseMeta,
  title: "Code/CodeWindow/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;

export const ReleaseDryRunLog: Story = {
  args: {
    children: (
      <CodeBlock
        code={`$ bun run release:dry-run
Checking release config...
Validating package manifests...
No publishable changes detected for stable channel.`}
        language="bash"
      />
    ),
    title: "Release dry run",
  },
};

export const ApiEndpointInspector: Story = {
  args: {
    actions: (
      <Button size="xs" type="button" variant="outline">
        Open docs
      </Button>
    ),
    children: (
      <CodeBlock
        code={`{
  "status": "ok",
  "region": "iad1",
  "revision": "2026.02.25"
}`}
        language="json"
      />
    ),
    showTrafficLights: false,
    title: "GET /api/health",
  },
};

export const EmbeddedSnippetWithoutHeader: Story = {
  args: {
    actions: undefined,
    children: (
      <CodeBlock
        code={`import { InstallCommandSnippet } from "@kuzenbo/code";

export const SetupStep = () => (
  <InstallCommandSnippet packages={["@kuzenbo/core", "@kuzenbo/theme"]} />
);`}
        language="tsx"
      />
    ),
    showTrafficLights: false,
    title: undefined,
  },
};
