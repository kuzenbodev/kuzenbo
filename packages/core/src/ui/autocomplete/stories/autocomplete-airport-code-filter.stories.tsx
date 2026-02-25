import type { StoryObj } from "@storybook/react";

import { useCallback } from "react";

import { Autocomplete, useFilter } from "../autocomplete";
import { baseMeta } from "./autocomplete-story-shared";

interface AirportOption {
  value: string;
  label: string;
  city: string;
  country: string;
}

const airportOptions: AirportOption[] = [
  {
    value: "JFK",
    label: "JFK - John F. Kennedy International",
    city: "New York",
    country: "United States",
  },
  {
    value: "LAX",
    label: "LAX - Los Angeles International",
    city: "Los Angeles",
    country: "United States",
  },
  {
    value: "SFO",
    label: "SFO - San Francisco International",
    city: "San Francisco",
    country: "United States",
  },
  {
    value: "CDG",
    label: "CDG - Charles de Gaulle",
    city: "Paris",
    country: "France",
  },
  {
    value: "NRT",
    label: "NRT - Narita International",
    city: "Tokyo",
    country: "Japan",
  },
  {
    value: "SIN",
    label: "SIN - Changi Airport",
    city: "Singapore",
    country: "Singapore",
  },
];

const AirportCodeFilterDemo = () => {
  const { contains, startsWith } = useFilter({
    sensitivity: "base",
  });

  const filterAirports = useCallback(
    (itemValue: unknown, query: string) => {
      if (!itemValue || typeof itemValue !== "object") {
        return false;
      }

      const airport = itemValue as AirportOption;
      const normalizedQuery = query.trim();

      if (!normalizedQuery) {
        return true;
      }

      if (normalizedQuery.length <= 3) {
        return startsWith(
          airport,
          normalizedQuery,
          (item: AirportOption) => item.value
        );
      }

      return contains(
        airport,
        normalizedQuery,
        (item: AirportOption) => `${item.value} ${item.city} ${item.country}`
      );
    },
    [contains, startsWith]
  );

  return (
    <Autocomplete
      filter={filterAirports}
      items={airportOptions}
      openOnInputClick
    >
      <Autocomplete.Input placeholder="Search by airport code or city..." />
      <Autocomplete.Content>
        <Autocomplete.Empty>No airport matches that query.</Autocomplete.Empty>
        <Autocomplete.List>
          {(airport: AirportOption) => (
            <Autocomplete.Item key={airport.value} value={airport}>
              <div className="flex flex-col">
                <span className="font-medium">{airport.value}</span>
                <span className="text-muted-foreground text-xs">
                  {airport.city}, {airport.country}
                </span>
              </div>
            </Autocomplete.Item>
          )}
        </Autocomplete.List>
      </Autocomplete.Content>
    </Autocomplete>
  );
};

export default {
  ...baseMeta,
  title: "Components/Autocomplete/AirportCodeFilter",
};

type Story = StoryObj<typeof baseMeta>;

export const AirportCodeFilter: Story = {
  render: () => <AirportCodeFilterDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Travel-search input with custom filtering: short queries match airport codes, longer queries match city and country.",
      },
    },
  },
};
