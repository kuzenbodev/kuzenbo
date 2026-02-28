import type { StoryObj } from "@storybook/react";

import { Autocomplete } from "../autocomplete";
import { baseMeta } from "./autocomplete-story-shared";

interface Seat {
  value: string;
  label: string;
  available: boolean;
}

const seatRows: Seat[][] = [
  [
    { available: true, label: "1A Window", value: "1A" },
    { available: false, label: "1B Middle", value: "1B" },
    { available: true, label: "1C Aisle", value: "1C" },
    { available: true, label: "1D Window", value: "1D" },
  ],
  [
    { available: true, label: "2A Window", value: "2A" },
    { available: true, label: "2B Middle", value: "2B" },
    { available: false, label: "2C Aisle", value: "2C" },
    { available: true, label: "2D Window", value: "2D" },
  ],
  [
    { available: true, label: "3A Window", value: "3A" },
    { available: true, label: "3B Middle", value: "3B" },
    { available: true, label: "3C Aisle", value: "3C" },
    { available: false, label: "3D Window", value: "3D" },
  ],
];

const allSeats = seatRows.flat();
const seatToValue = (itemValue: unknown) => (itemValue as Seat).value;

const SeatGridPickerDemo = () => (
  <Autocomplete
    grid
    itemToStringValue={seatToValue}
    items={allSeats}
    openOnInputClick
  >
    <Autocomplete.Input placeholder="Choose seat (e.g. 2A)" />
    <Autocomplete.Content>
      <Autocomplete.Empty>No seats match that search.</Autocomplete.Empty>
      <Autocomplete.List>
        {seatRows.map((row, rowIndex) => (
          <Autocomplete.Row
            className="grid-cols-4 gap-1"
            key={row.map((seat) => seat.value).join("-")}
          >
            {row.map((seat, seatIndex) => (
              <Autocomplete.Item
                className="border-border data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground rounded border px-2 py-1.5 text-left text-xs data-[disabled]:opacity-50"
                disabled={!seat.available}
                index={rowIndex * row.length + seatIndex}
                key={seat.value}
                value={seat}
              >
                {seat.value}
              </Autocomplete.Item>
            ))}
          </Autocomplete.Row>
        ))}
      </Autocomplete.List>
      <Autocomplete.Status>
        Unavailable seats are disabled for selection.
      </Autocomplete.Status>
    </Autocomplete.Content>
  </Autocomplete>
);

export default {
  ...baseMeta,
  title: "Components/Autocomplete/SeatGridPicker",
};

type Story = StoryObj<typeof baseMeta>;

export const SeatGridPicker: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Travel booking seat picker using grid navigation with rows, disabled seats, and keyboard-friendly movement.",
      },
    },
  },
  render: () => <SeatGridPickerDemo />,
};
