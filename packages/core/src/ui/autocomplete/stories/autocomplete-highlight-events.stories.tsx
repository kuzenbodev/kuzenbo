import type { StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { Autocomplete } from "../autocomplete";
import { baseMeta } from "./autocomplete-story-shared";

const searchTerms = [
  "incident postmortem",
  "outage timeline",
  "error budget",
  "deployment rollback",
  "service status page",
  "on-call handoff",
];

const HighlightEventsDemo = () => {
  const [popupState, setPopupState] = useState("Closed");
  const [highlightState, setHighlightState] = useState("No highlighted query");

  const handleItemHighlighted = useCallback(
    (itemValue: unknown, details: { reason: string }) => {
      const highlightedValue =
        typeof itemValue === "string" ? itemValue : undefined;

      if (!highlightedValue) {
        setHighlightState("No highlighted query");
        return;
      }

      setHighlightState(`Highlighted: ${highlightedValue} (${details.reason})`);
    },
    []
  );

  const handleOpenChangeComplete = useCallback((open: boolean) => {
    setPopupState(open ? "Open" : "Closed");
  }, []);

  return (
    <Autocomplete
      autoHighlight="always"
      items={searchTerms}
      keepHighlight
      onItemHighlighted={handleItemHighlighted}
      onOpenChangeComplete={handleOpenChangeComplete}
      openOnInputClick
    >
      <Autocomplete.Input placeholder="Search incident docs..." />
      <Autocomplete.Content>
        <Autocomplete.Empty>No matches.</Autocomplete.Empty>
        <Autocomplete.List>
          {(item: string) => (
            <Autocomplete.Item key={item} value={item}>
              {item}
            </Autocomplete.Item>
          )}
        </Autocomplete.List>
        <Autocomplete.Status>
          Popup: {popupState}. {highlightState}.
        </Autocomplete.Status>
      </Autocomplete.Content>
    </Autocomplete>
  );
};

export default {
  ...baseMeta,
  title: "Components/Autocomplete/HighlightEvents",
};

type Story = StoryObj<typeof baseMeta>;

export const HighlightEvents: Story = {
  render: () => <HighlightEventsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Search analytics example that tracks highlight reasons and open state transitions.",
      },
    },
  },
};
