import type { StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { Autocomplete } from "../autocomplete";
import { baseMeta } from "./autocomplete-story-shared";

const frameworks = [
  "Next.js",
  "Nuxt",
  "Remix",
  "SvelteKit",
  "Astro",
  "SolidStart",
];

const AsyncSuggestionsDemo = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState(frameworks);

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const query = value.trim().toLowerCase();
      const nextItems = query
        ? frameworks.filter((framework) =>
            framework.toLowerCase().includes(query)
          )
        : frameworks;

      setFilteredItems(nextItems);
      setIsLoading(false);
    }, 250);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return (
    <Autocomplete
      filteredItems={filteredItems}
      items={frameworks}
      onValueChange={setValue}
      value={value}
    >
      <Autocomplete.Input placeholder="Search frameworks..." />
      <Autocomplete.Content>
        <Autocomplete.Empty>
          {isLoading ? "Loading suggestions..." : `No results for "${value}"`}
        </Autocomplete.Empty>
        <Autocomplete.List>
          {(item: string) => (
            <Autocomplete.Item key={item} value={item}>
              {item}
            </Autocomplete.Item>
          )}
        </Autocomplete.List>
        <Autocomplete.Status>
          {isLoading
            ? "Fetching suggestions..."
            : `${filteredItems.length} suggestion(s) available`}
        </Autocomplete.Status>
      </Autocomplete.Content>
    </Autocomplete>
  );
};

export default {
  ...baseMeta,
  title: "Components/Autocomplete/AsyncSuggestions",
};

type Story = StoryObj<typeof baseMeta>;

export const AsyncSuggestions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Controlled async filtering powered by filteredItems and Status feedback.",
      },
    },
  },
  render: () => <AsyncSuggestionsDemo />,
};
