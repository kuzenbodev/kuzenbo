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
    value: "reset-password",
    label: "Reset your password",
    category: "Account",
  },
  {
    value: "change-billing-owner",
    label: "Change billing owner",
    category: "Billing",
  },
  {
    value: "connect-github",
    label: "Connect GitHub repository",
    category: "Integrations",
  },
  {
    value: "custom-domain",
    label: "Configure custom domain",
    category: "Hosting",
  },
  {
    value: "team-permissions",
    label: "Manage team permissions",
    category: "Security",
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
    <div className="mt-2 w-full min-w-[20rem] rounded-md border border-border bg-popover p-1">
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
  render: () => <HelpCenterInlineDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Inline help-center suggestions rendered without a popup, useful for embedded support panels.",
      },
    },
  },
};
