import type { StoryObj } from "@storybook/react";
import type { FormEvent } from "react";
import { useCallback, useState } from "react";

import { Autocomplete } from "../autocomplete";
import { baseMeta } from "./autocomplete-story-shared";

const productSuggestions = [
  "Noise-canceling headphones",
  "Bluetooth speaker",
  "Mechanical keyboard",
  "Portable monitor",
  "USB-C dock",
  "Webcam",
];

const FormSubmitOnSelectDemo = () => {
  const [submittedValue, setSubmittedValue] = useState(
    "No search submitted yet."
  );

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get("catalogSearch");
    const normalizedValue =
      typeof value === "string" && value.length > 0
        ? value
        : "Empty search submitted";

    setSubmittedValue(normalizedValue);
  }, []);

  return (
    <form className="flex w-[28rem] flex-col gap-3" onSubmit={handleSubmit}>
      <Autocomplete
        items={productSuggestions}
        name="catalogSearch"
        openOnInputClick
        submitOnItemClick
      >
        <div className="relative">
          <Autocomplete.Input
            className="pr-28"
            placeholder="Search products..."
          />
          <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-2">
            <Autocomplete.Clear className="text-muted-foreground text-xs">
              Clear
            </Autocomplete.Clear>
            <Autocomplete.Trigger className="border-border rounded-sm border px-2 py-1 text-xs">
              Open
            </Autocomplete.Trigger>
          </div>
        </div>
        <Autocomplete.Content>
          <Autocomplete.Empty>No products found.</Autocomplete.Empty>
          <Autocomplete.List>
            {(product: string) => (
              <Autocomplete.Item key={product} value={product}>
                {product}
              </Autocomplete.Item>
            )}
          </Autocomplete.List>
        </Autocomplete.Content>
      </Autocomplete>
      <button
        className="border-border bg-background h-9 rounded-md border px-3 text-sm font-medium"
        type="submit"
      >
        Submit Search
      </button>
      <p className="text-muted-foreground text-sm">
        Last submitted query: {submittedValue}
      </p>
    </form>
  );
};

export default {
  ...baseMeta,
  title: "Components/Autocomplete/FormSubmitOnSelect",
};

type Story = StoryObj<typeof baseMeta>;

export const FormSubmitOnSelect: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Ecommerce-style search form where selecting a suggestion can submit immediately via submitOnItemClick.",
      },
    },
  },
  render: () => <FormSubmitOnSelectDemo />,
};
