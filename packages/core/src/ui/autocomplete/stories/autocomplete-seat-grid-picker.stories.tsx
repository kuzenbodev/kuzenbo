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
    { value: "1A", label: "1A Window", available: true },
    { value: "1B", label: "1B Middle", available: false },
    { value: "1C", label: "1C Aisle", available: true },
    { value: "1D", label: "1D Window", available: true },
  ],
  [
    { value: "2A", label: "2A Window", available: true },
    { value: "2B", label: "2B Middle", available: true },
    { value: "2C", label: "2C Aisle", available: false },
    { value: "2D", label: "2D Window", available: true },
  ],
  [
    { value: "3A", label: "3A Window", available: true },
    { value: "3B", label: "3B Middle", available: true },
    { value: "3C", label: "3C Aisle", available: true },
    { value: "3D", label: "3D Window", available: false },
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
                className="rounded border border-border px-2 py-1.5 text-left text-xs data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50"
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
  render: () => <SeatGridPickerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Travel booking seat picker using grid navigation with rows, disabled seats, and keyboard-friendly movement.",
      },
    },
  },
};
