import type { StoryObj } from "@storybook/react";

import { Autocomplete } from "../autocomplete";
import { baseMeta } from "./autocomplete-story-shared";

interface HelpArticle {
  value: string;
  label: string;
  category: string;
}

const helpArticles: HelpArticle[] = [
  {
    category: "Account",
    label: "Reset your password",
    value: "reset-password",
  },
  {
    category: "Billing",
    label: "Change billing owner",
    value: "change-billing-owner",
  },
  {
    category: "Integrations",
    label: "Connect GitHub repository",
    value: "connect-github",
  },
  {
    category: "Hosting",
    label: "Configure custom domain",
    value: "custom-domain",
  },
  {
    category: "Security",
    label: "Manage team permissions",
    value: "team-permissions",
  },
];

const HelpCenterInlineDemo = () => (
  <Autocomplete
    autoHighlight="always"
    inline
    items={helpArticles}
    mode="both"
    openOnInputClick
  >
    <Autocomplete.Input placeholder="Search support articles..." />
    <div className="border-border bg-popover mt-2 w-full min-w-[20rem] rounded-md border p-1">
      <Autocomplete.Empty className="px-2 py-1.5">
        No article suggestions.
      </Autocomplete.Empty>
      <Autocomplete.List className="space-y-1">
        {(article: HelpArticle) => (
          <Autocomplete.Item key={article.value} value={article}>
            <div className="flex flex-col">
              <span>{article.label}</span>
              <span className="text-muted-foreground text-xs">
                {article.category}
              </span>
            </div>
          </Autocomplete.Item>
        )}
      </Autocomplete.List>
    </div>
  </Autocomplete>
);

export default {
  ...baseMeta,
  title: "Components/Autocomplete/HelpCenterInline",
};

type Story = StoryObj<typeof baseMeta>;

export const HelpCenterInline: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Inline help-center suggestions rendered without a popup, useful for embedded support panels.",
      },
    },
  },
  render: () => <HelpCenterInlineDemo />,
};
