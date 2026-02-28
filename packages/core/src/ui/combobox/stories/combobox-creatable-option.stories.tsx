import type { StoryObj } from "@storybook/react";
import { useCallback, useMemo, useState } from "react";

import { Combobox } from "../combobox";
import { baseMeta } from "./combobox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Combobox/CreatableOption",
};

type Story = StoryObj<typeof baseMeta>;

interface TagOption {
  label: string;
  value: string;
  isNew?: boolean;
}

const initialTagOptions: TagOption[] = [
  { label: "Design", value: "design" },
  { label: "Frontend", value: "frontend" },
  { label: "Product", value: "product" },
  { label: "Research", value: "research" },
];

const normalizeText = (text: string) => text.trim().toLowerCase();

const createTagOption = (label: string): TagOption => ({
  label,
  value: normalizeText(label).replaceAll(/\s+/g, "-"),
});

const tagToLabel = (item: TagOption) => item.label;
const tagToValue = (item: TagOption) => item.value;

const CreatableOptionDemo = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(initialTagOptions);
  const [selectedValue, setSelectedValue] = useState<TagOption | null>(null);

  const normalizedInputValue = normalizeText(inputValue);

  const filteredOptions = useMemo(
    () =>
      options.filter(
        (option) =>
          !normalizedInputValue ||
          option.label.toLowerCase().includes(normalizedInputValue)
      ),
    [normalizedInputValue, options]
  );

  const canCreate =
    !!normalizedInputValue &&
    !options.some(
      (option) => option.label.toLowerCase() === normalizedInputValue
    );

  const creatableOption: TagOption | null = canCreate
    ? { ...createTagOption(inputValue.trim()), isNew: true }
    : null;

  const visibleOptions = creatableOption
    ? [creatableOption, ...filteredOptions]
    : filteredOptions;

  const handleInputValueChange = useCallback(
    (nextInputValue: string) => setInputValue(nextInputValue),
    []
  );

  const handleValueChange = useCallback((nextValue: TagOption | null) => {
    if (!nextValue) {
      setSelectedValue(null);
      return;
    }

    if (nextValue.isNew) {
      const createdOption = createTagOption(nextValue.label);
      setOptions((previousOptions) => [createdOption, ...previousOptions]);
      setSelectedValue(createdOption);
      setInputValue(createdOption.label);
      return;
    }

    setSelectedValue(nextValue);
  }, []);

  return (
    <div className="w-80">
      <Combobox<TagOption>
        inputValue={inputValue}
        itemToStringLabel={tagToLabel}
        itemToStringValue={tagToValue}
        items={visibleOptions}
        onInputValueChange={handleInputValueChange}
        onValueChange={handleValueChange}
        value={selectedValue}
      >
        <Combobox.Input
          aria-label="Tag"
          placeholder="Select or create a tag..."
          showClear
        />
        <Combobox.Content>
          <Combobox.Empty>
            No tags found. Keep typing to create one.
          </Combobox.Empty>
          <Combobox.List>
            <Combobox.Collection>
              {(item: TagOption) => (
                <Combobox.Row key={item.value}>
                  <Combobox.Item
                    className={
                      item.isNew
                        ? "text-primary-foreground font-medium"
                        : undefined
                    }
                    value={item}
                  >
                    {item.isNew ? `Create "${item.label}"` : item.label}
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

export const CreatableOption: Story = {
  render: () => <CreatableOptionDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Select an existing tag or create a new tag from the typed query.",
      },
    },
  },
};
