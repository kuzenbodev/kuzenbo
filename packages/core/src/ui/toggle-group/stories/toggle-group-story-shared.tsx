import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useMemo, useState } from "react";

import { ToggleGroup } from "../toggle-group";

export const baseMeta = {
  component: ToggleGroup,
  tags: ["autodocs"],
  title: "Components/ToggleGroup",
} satisfies Meta<typeof ToggleGroup>;

type Story = StoryObj<typeof baseMeta>;

const AlignmentPresetExample = () => {
  const [alignment, setAlignment] = useState<string[]>(["left"]);
  const handleAlignmentChange = useCallback((nextValues: unknown[]) => {
    setAlignment(nextValues.map(String));
  }, []);

  const activeAlignment = alignment[0] ?? "none";

  return (
    <div className="grid gap-2">
      <ToggleGroup
        multiple={false}
        onValueChange={handleAlignmentChange}
        value={alignment}
      >
        <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
        <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
        <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
      </ToggleGroup>
      <p className="text-muted-foreground text-sm">
        Active text alignment: {activeAlignment}.
      </p>
    </div>
  );
};

const SingleSelectWorkflowExample = () => {
  const [workflowStage, setWorkflowStage] = useState<string[]>(["review"]);
  const handleWorkflowStageChange = useCallback((nextValues: unknown[]) => {
    setWorkflowStage(nextValues.map(String));
  }, []);

  const stageDescription = useMemo(() => {
    const [activeStage] = workflowStage;

    if (activeStage === "triage") {
      return "Incoming requests are being categorized by operations.";
    }

    if (activeStage === "review") {
      return "Requests are in finance review for policy compliance.";
    }

    if (activeStage === "approved") {
      return "Approved requests are queued for payment execution.";
    }

    return "Select a workflow stage to continue.";
  }, [workflowStage]);

  return (
    <div className="grid gap-2">
      <ToggleGroup
        multiple={false}
        onValueChange={handleWorkflowStageChange}
        value={workflowStage}
      >
        <ToggleGroup.Item value="triage">Triage</ToggleGroup.Item>
        <ToggleGroup.Item value="review">Review</ToggleGroup.Item>
        <ToggleGroup.Item value="approved">Approved</ToggleGroup.Item>
      </ToggleGroup>
      <p className="text-muted-foreground text-sm">{stageDescription}</p>
    </div>
  );
};

const MultiSelectDashboardExample = () => {
  const [widgets, setWidgets] = useState<string[]>([
    "cashflow",
    "risk-signals",
  ]);
  const handleWidgetsChange = useCallback((nextValues: unknown[]) => {
    setWidgets(nextValues.map(String));
  }, []);

  const selectedCount = widgets.length;

  return (
    <div className="grid gap-2">
      <ToggleGroup multiple onValueChange={handleWidgetsChange} value={widgets}>
        <ToggleGroup.Item value="cashflow">Cashflow</ToggleGroup.Item>
        <ToggleGroup.Item value="risk-signals">Risk Signals</ToggleGroup.Item>
        <ToggleGroup.Item value="approvals">Approvals</ToggleGroup.Item>
        <ToggleGroup.Item value="forecast">Forecast</ToggleGroup.Item>
      </ToggleGroup>
      <p className="text-muted-foreground text-sm">
        {selectedCount} widgets enabled for the finance command center.
      </p>
    </div>
  );
};

export const Default: Story = {
  render: () => <AlignmentPresetExample />,
};

export const SingleSelect: Story = {
  render: () => <SingleSelectWorkflowExample />,
};

export const MultiSelect: Story = {
  render: () => <MultiSelectDashboardExample />,
};
