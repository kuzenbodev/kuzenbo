import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useMemo, useState } from "react";

import { Label } from "../../label/label";
import { RadioGroup } from "../radio-group";

const radioSizes = ["xs", "sm", "md", "lg", "xl"] as const;

const billingCycles = [
  {
    value: "monthly",
    label: "Monthly",
    subtitle: "$49 per seat",
    cost: 49,
  },
  {
    value: "annual",
    label: "Annual",
    subtitle: "$39 per seat (20% savings)",
    cost: 39,
  },
  {
    value: "multi-year",
    label: "24-month agreement",
    subtitle: "$34 per seat (best for committed teams)",
    cost: 34,
  },
] as const;

export const baseMeta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

type Story = StoryObj<typeof baseMeta>;

const BillingCycleExample = () => {
  const [billingCycle, setBillingCycle] = useState("annual");
  const handleBillingCycleChange = useCallback((nextValue: unknown) => {
    setBillingCycle(String(nextValue));
  }, []);

  const selectedCycle = useMemo(
    () =>
      billingCycles.find((cycle) => cycle.value === billingCycle) ??
      billingCycles[0],
    [billingCycle]
  );

  return (
    <div className="grid w-full max-w-md gap-2">
      <RadioGroup onValueChange={handleBillingCycleChange} value={billingCycle}>
        {billingCycles.map((cycle) => (
          <Label
            className="grid gap-0.5 rounded-md border border-border px-3 py-2"
            key={cycle.value}
          >
            <span className="flex items-center gap-2">
              <RadioGroup.Item aria-label={cycle.label} value={cycle.value} />
              {cycle.label}
            </span>
            <span className="pl-6 text-sm text-muted-foreground">
              {cycle.subtitle}
            </span>
          </Label>
        ))}
      </RadioGroup>
      <p className="text-sm text-muted-foreground">
        Forecast:{" "}
        {selectedCycle.cost.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}{" "}
        per seat per month equivalent.
      </p>
    </div>
  );
};

const DisabledOptionExample = () => {
  const [selectedCycle, setSelectedCycle] = useState("monthly");
  const handleSelectedCycleChange = useCallback((nextValue: unknown) => {
    setSelectedCycle(String(nextValue));
  }, []);

  return (
    <div className="grid w-full max-w-md gap-2">
      <RadioGroup
        onValueChange={handleSelectedCycleChange}
        value={selectedCycle}
      >
        <Label className="flex items-center gap-2">
          <RadioGroup.Item aria-label="Monthly" value="monthly" />
          Monthly invoicing
        </Label>
        <Label className="flex items-center gap-2">
          <RadioGroup.Item aria-label="Quarterly" value="quarterly" />
          Quarterly invoicing
        </Label>
        <Label className="flex items-center gap-2">
          <RadioGroup.Item
            aria-label="Annual (contract required)"
            disabled
            value="annual"
          />
          Annual invoicing (requires legal sign-off)
        </Label>
      </RadioGroup>
      <p className="text-sm text-muted-foreground">
        Current selection: {selectedCycle}.
      </p>
    </div>
  );
};

const HorizontalLayoutExample = () => {
  const [region, setRegion] = useState("us");
  const handleRegionChange = useCallback((nextValue: unknown) => {
    setRegion(String(nextValue));
  }, []);

  return (
    <div className="grid gap-2">
      <RadioGroup
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
        onValueChange={handleRegionChange}
        value={region}
      >
        <Label className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
          <RadioGroup.Item aria-label="US" value="us" />
          US
        </Label>
        <Label className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
          <RadioGroup.Item aria-label="EU" value="eu" />
          EU
        </Label>
        <Label className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
          <RadioGroup.Item aria-label="APAC" value="apac" />
          APAC
        </Label>
      </RadioGroup>
      <p className="text-sm text-muted-foreground">
        Data residency region: {region.toUpperCase()}.
      </p>
    </div>
  );
};

const CustomIndicatorExample = () => {
  const [workflow, setWorkflow] = useState("finance");
  const handleWorkflowChange = useCallback((nextValue: unknown) => {
    setWorkflow(String(nextValue));
  }, []);

  return (
    <div className="grid gap-2">
      <RadioGroup onValueChange={handleWorkflowChange} value={workflow}>
        <div className="flex items-center gap-2">
          <RadioGroup.Item aria-label="Finance" value="finance">
            <RadioGroup.Indicator>
              <span className="block size-2 rounded-full bg-primary" />
            </RadioGroup.Indicator>
          </RadioGroup.Item>
          <Label>Finance-led approval path</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroup.Item aria-label="Operations" value="operations">
            <RadioGroup.Indicator>
              <span className="block size-2 rounded-full bg-primary" />
            </RadioGroup.Indicator>
          </RadioGroup.Item>
          <Label>Operations-led approval path</Label>
        </div>
      </RadioGroup>
      <p className="text-sm text-muted-foreground">
        Selected workflow: {workflow}.
      </p>
    </div>
  );
};

export const Default: Story = {
  render: () => <BillingCycleExample />,
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-4">
      {radioSizes.map((size) => (
        <RadioGroup defaultValue={`${size}-standard`} key={size}>
          <div className="flex items-center gap-2">
            <RadioGroup.Item size={size} value={`${size}-standard`} />
            <Label>{size.toUpperCase()} standard review</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroup.Item size={size} value={`${size}-expedited`} />
            <Label>{size.toUpperCase()} expedited review</Label>
          </div>
        </RadioGroup>
      ))}
    </div>
  ),
};

export const IndicatorSizePrecedence: Story = {
  render: () => (
    <RadioGroup defaultValue="xl">
      <div className="flex items-center gap-2">
        <RadioGroup.Item size="xl" value="xl">
          <RadioGroup.Indicator size="xs">
            <span className="block size-1.5 rounded-full bg-current" />
          </RadioGroup.Indicator>
        </RadioGroup.Item>
        <Label>Root item xl with indicator override xs</Label>
      </div>
    </RadioGroup>
  ),
};

export const CustomIndicator: Story = {
  render: () => <CustomIndicatorExample />,
};

export const DisabledOption: Story = {
  render: () => <DisabledOptionExample />,
};

export const HorizontalLayout: Story = {
  render: () => <HorizontalLayoutExample />,
};
