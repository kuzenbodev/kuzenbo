import { Button } from "@kuzenbo/core/ui/button";
import { Input } from "@kuzenbo/core/ui/input";
import { Typography } from "@kuzenbo/core/ui/typography";
import type { StoryObj } from "@storybook/react";

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
    code: <CodeBlock code={onboardingFullCode} language="tsx" />,
    defaultMode: "split",
    minimalCode: <CodeBlock code={onboardingMinimalCode} language="tsx" />,
    preview: (
      <div className="border-border bg-card space-y-3 rounded-md border p-4">
        <Typography.Small>Step 1 of 3</Typography.Small>
        <Typography.Muted>
          Install required packages for your app shell.
        </Typography.Muted>
        <Button size="sm" type="button" variant="default">
          Continue
        </Button>
      </div>
    ),
    title: "Onboarding: install dependencies",
  },
};

export const SearchToolbarPreviewOnly: Story = {
  args: {
    code: <CodeBlock code={searchFullCode} language="tsx" />,
    hideCodeModeControls: true,
    hideModeControls: true,
    minimalCode: <CodeBlock code={searchPreviewCode} language="tsx" />,
    mode: "preview",
    preview: (
      <div className="border-border bg-card rounded-md border p-4">
        <form
          className="flex items-center gap-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <Input placeholder="Search docs" />
          <Button type="submit">Search</Button>
        </form>
      </div>
    ),
    title: "Search toolbar preview",
  },
};

export const FullCodeReviewMode: Story = {
  args: {
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
    defaultCodeMode: "full",
    minimalCode: (
      <CodeBlock
        code={`export async function GET() {
  return Response.json({ status: "ok" });
}`}
        language="ts"
      />
    ),
    mode: "code",
    preview: (
      <div className="border-border bg-card rounded-md border p-4">
        <Typography.Muted>
          Preview hidden while reviewing implementation details.
        </Typography.Muted>
      </div>
    ),
    title: "Route handler code review",
  },
};
