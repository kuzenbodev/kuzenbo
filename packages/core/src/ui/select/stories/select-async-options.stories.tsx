import type { StoryObj } from "@storybook/react";
import { useCallback, useEffect, useState } from "react";

import { Select } from "../select";
import { baseMeta } from "./select-story-shared";

export default {
  ...baseMeta,
  title: "Components/Select/AsyncOptions",
};
type Story = StoryObj<typeof baseMeta>;

interface EnvironmentOption {
  label: string;
  value: string;
}

const environmentOptions: EnvironmentOption[] = [
  { label: "Development", value: "development" },
  { label: "Staging", value: "staging" },
  { label: "Production", value: "production" },
];

const AsyncOptionsDemo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState<EnvironmentOption[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] =
    useState("None selected");
  const handleValueChange = useCallback((value: unknown) => {
    if (typeof value === "string") {
      setSelectedEnvironment(value);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setOptions(environmentOptions);
      setIsLoading(false);
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="w-72 space-y-2">
      <Select onValueChange={handleValueChange}>
        <Select.Trigger className="min-w-56">
          <Select.Value
            placeholder={
              isLoading ? "Loading environments..." : "Choose environment"
            }
          />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Deployment targets</Select.Label>
            {isLoading ? (
              <Select.Item disabled value="loading">
                Loading options...
              </Select.Item>
            ) : (
              options.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))
            )}
          </Select.Group>
        </Select.Content>
      </Select>
      <div className="text-muted-foreground text-sm">
        Selected environment: {selectedEnvironment}
      </div>
    </div>
  );
};

export const AsyncOptions: Story = {
  render: () => <AsyncOptionsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Simulates async option loading before showing selectable environments.",
      },
    },
  },
};
