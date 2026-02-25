import type { StoryObj } from "@storybook/react";

import { useCallback, useEffect, useState } from "react";

import { Combobox } from "../combobox";
import { baseMeta } from "./combobox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Combobox/AsyncSearch",
};

type Story = StoryObj<typeof baseMeta>;

interface ProjectItem {
  label: string;
  value: string;
  keywords: string[];
}

const allProjects: ProjectItem[] = [
  {
    label: "Analytics Dashboard",
    value: "analytics-dashboard",
    keywords: ["dashboard", "metrics", "reporting"],
  },
  {
    label: "Customer Support Hub",
    value: "customer-support-hub",
    keywords: ["support", "tickets", "chat"],
  },
  {
    label: "Design System",
    value: "design-system",
    keywords: ["ui", "components", "tokens"],
  },
  {
    label: "Growth Experiments",
    value: "growth-experiments",
    keywords: ["experiments", "ab-testing", "growth"],
  },
  {
    label: "Release Operations",
    value: "release-operations",
    keywords: ["release", "deployments", "ci"],
  },
];

const SEARCH_DELAY_MS = 350;

const normalizeQuery = (query: string) => query.trim().toLowerCase();

const matchesProject = (project: ProjectItem, normalizedQuery: string) => {
  if (!normalizedQuery) {
    return true;
  }

  const searchText =
    `${project.label} ${project.value} ${project.keywords.join(" ")}`.toLowerCase();
  return searchText.includes(normalizedQuery);
};

const getResultLabel = (count: number) =>
  `${count} project${count === 1 ? "" : "s"} found`;

const projectToLabel = (item: ProjectItem) => item.label;
const projectToValue = (item: ProjectItem) => item.value;

const AsyncSearchDemo = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState(allProjects);
  const [selectedValue, setSelectedValue] = useState<ProjectItem | null>(null);

  const handleInputValueChange = useCallback(
    (nextInputValue: string) => setInputValue(nextInputValue),
    []
  );
  const handleValueChange = useCallback(
    (nextValue: ProjectItem | null) => setSelectedValue(nextValue),
    []
  );

  useEffect(() => {
    setIsLoading(true);
    const normalizedQuery = normalizeQuery(inputValue);

    const timeoutId = window.setTimeout(() => {
      setFilteredItems(
        allProjects.filter((project) =>
          matchesProject(project, normalizedQuery)
        )
      );
      setIsLoading(false);
    }, SEARCH_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <div className="w-80">
      <Combobox
        inputValue={inputValue}
        itemToStringLabel={projectToLabel}
        itemToStringValue={projectToValue}
        items={filteredItems}
        onInputValueChange={handleInputValueChange}
        onValueChange={handleValueChange}
        value={selectedValue}
      >
        <Combobox.Input
          aria-label="Project"
          placeholder="Search projects..."
          showClear
        />
        <Combobox.Content>
          <Combobox.Status>
            {isLoading
              ? "Searching projects..."
              : getResultLabel(filteredItems.length)}
          </Combobox.Status>
          <Combobox.Empty>No matching projects found.</Combobox.Empty>
          <Combobox.List>
            <Combobox.Collection>
              {(item: ProjectItem) => (
                <Combobox.Row key={item.value}>
                  <Combobox.Item value={item}>
                    <div className="flex w-full flex-col gap-0.5">
                      <span>{item.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.keywords.join(" · ")}
                      </span>
                    </div>
                  </Combobox.Item>
                </Combobox.Row>
              )}
            </Combobox.Collection>
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    </div>
  );
};

export const AsyncSearch: Story = {
  render: () => <AsyncSearchDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Async search simulation with loading state, status text, and filtered object items.",
      },
    },
  },
};
