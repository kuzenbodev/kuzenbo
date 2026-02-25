import type { StoryObj } from "@storybook/react";

import { Button, Input, Typography } from "@kuzenbo/core";

import { CodeBlock } from "../../code-block/code-block";
import { Default as DefaultStory, baseMeta } from "./code-preview-story-shared";

const onboardingMinimalCode = `<InstallCommandSnippet packages={["@kuzenbo/core", "@kuzenbo/theme"]} />`;

const onboardingFullCode = `import { InstallCommandSnippet } from "@kuzenbo/code";

export const SetupStep = () => (
  <InstallCommandSnippet
    packages={["@kuzenbo/core", "@kuzenbo/theme"]}
    persistPreference
  />
);`;

const searchPreviewCode = `<SearchToolbar />`;

const searchFullCode = `import { Button, Input } from "@kuzenbo/core";

export const SearchToolbar = () => (
  <div className="flex items-center gap-2">
    <Input placeholder="Search docs" />
    <Button type="button">Search</Button>
  </div>
);`;

export default {
  ...baseMeta,
  title: "Code/CodePreview/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;

export const OnboardingInstallGuide: Story = {
  args: {
    title: "Onboarding: install dependencies",
    defaultMode: "split",
    preview: (
      <div className="space-y-3 rounded-md border border-border bg-card p-4">
        <Typography.Small>Step 1 of 3</Typography.Small>
        <Typography.Muted>
          Install required packages for your app shell.
        </Typography.Muted>
        <Button size="sm" type="button" variant="default">
          Continue
        </Button>
      </div>
    ),
    minimalCode: <CodeBlock code={onboardingMinimalCode} language="tsx" />,
    code: <CodeBlock code={onboardingFullCode} language="tsx" />,
  },
};

export const SearchToolbarPreviewOnly: Story = {
  args: {
    title: "Search toolbar preview",
    mode: "preview",
    hideModeControls: true,
    hideCodeModeControls: true,
    preview: (
      <div className="rounded-md border border-border bg-card p-4">
        <form
          className="flex items-center gap-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <Input placeholder="Search docs" />
          <Button type="submit">Search</Button>
        </form>
      </div>
    ),
    minimalCode: <CodeBlock code={searchPreviewCode} language="tsx" />,
    code: <CodeBlock code={searchFullCode} language="tsx" />,
  },
};

export const FullCodeReviewMode: Story = {
  args: {
    title: "Route handler code review",
    mode: "code",
    defaultCodeMode: "full",
    preview: (
      <div className="rounded-md border border-border bg-card p-4">
        <Typography.Muted>
          Preview hidden while reviewing implementation details.
        </Typography.Muted>
      </div>
    ),
    minimalCode: (
      <CodeBlock
        code={`export async function GET() {
  return Response.json({ status: "ok" });
}`}
        language="ts"
      />
    ),
    code: (
      <CodeBlock
        code={`export async function GET() {
  const response = await fetch("https://status.example.dev", {
    next: { revalidate: 120 },
  });

  if (!response.ok) {
    return Response.json({ status: "degraded" }, { status: 503 });
  }

  return Response.json({ status: "ok" });
}`}
        language="ts"
      />
    ),
  },
};
