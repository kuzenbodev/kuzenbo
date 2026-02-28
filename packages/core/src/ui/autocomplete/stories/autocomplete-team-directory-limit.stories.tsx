import type { StoryObj } from "@storybook/react";

import { Autocomplete, useFilteredItems } from "../autocomplete";
import { baseMeta } from "./autocomplete-story-shared";

interface DirectoryPerson {
  value: string;
  label: string;
  role: string;
  team: string;
}

const directoryPeople: DirectoryPerson[] = [
  {
    label: "Maya Johnson",
    role: "Engineering Manager",
    team: "Platform",
    value: "maya-johnson",
  },
  {
    label: "David Park",
    role: "Senior Frontend Engineer",
    team: "Growth",
    value: "david-park",
  },
  {
    label: "Sarah Ali",
    role: "Product Designer",
    team: "Design Systems",
    value: "sarah-ali",
  },
  {
    label: "Luis Moreno",
    role: "Backend Engineer",
    team: "API",
    value: "luis-moreno",
  },
  {
    label: "Naomi Brown",
    role: "Customer Success",
    team: "Enterprise",
    value: "naomi-brown",
  },
  {
    label: "Xiao Wang",
    role: "Data Analyst",
    team: "Operations",
    value: "xiao-wang",
  },
  {
    label: "Alex Reed",
    role: "QA Engineer",
    team: "Release",
    value: "alex-reed",
  },
  {
    label: "Priya Kapoor",
    role: "Security Engineer",
    team: "Security",
    value: "priya-kapoor",
  },
];

const DirectoryStatus = () => {
  const filteredPeople = useFilteredItems<DirectoryPerson>();

  return (
    <Autocomplete.Status>
      Showing up to 5 matches from {filteredPeople.length} filtered results.
    </Autocomplete.Status>
  );
};

const TeamDirectoryLimitDemo = () => (
  <Autocomplete
    autoHighlight
    items={directoryPeople}
    limit={5}
    openOnInputClick
  >
    <Autocomplete.Input placeholder="Find reviewer in team directory..." />
    <Autocomplete.Content>
      <Autocomplete.Empty>No teammates found.</Autocomplete.Empty>
      <Autocomplete.List>
        {(person: DirectoryPerson) => (
          <Autocomplete.Item key={person.value} value={person}>
            <div className="flex flex-col">
              <span>{person.label}</span>
              <span className="text-muted-foreground text-xs">
                {person.role} · {person.team}
              </span>
            </div>
          </Autocomplete.Item>
        )}
      </Autocomplete.List>
      <DirectoryStatus />
    </Autocomplete.Content>
  </Autocomplete>
);

export default {
  ...baseMeta,
  title: "Components/Autocomplete/TeamDirectoryLimit",
};

type Story = StoryObj<typeof baseMeta>;

export const TeamDirectoryLimit: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Reviewer picker for large teams using limit and useFilteredItems for concise result handling.",
      },
    },
  },
  render: () => <TeamDirectoryLimitDemo />,
};
