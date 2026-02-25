import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useMemo, useState } from "react";

import { CheckboxGroup } from "../../checkbox-group/checkbox-group";
import { Label } from "../../label/label";
import { Checkbox } from "../checkbox";

const checkboxSizes = ["xs", "sm", "md", "lg", "xl"] as const;

const complianceRows = [
  {
    id: "invoice-1007",
    label: "Invoice 1007",
    subtitle: "EMEA supplier payout",
  },
  {
    id: "invoice-1012",
    label: "Invoice 1012",
    subtitle: "North America marketing retainer",
  },
  {
    id: "invoice-1019",
    label: "Invoice 1019",
    subtitle: "Contractor reimbursement",
  },
] as const;

export const baseMeta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    size: {
      control: "select",
      options: checkboxSizes,
    },
  },
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof baseMeta>;

const ApprovalGateExample = () => {
  const [approved, setApproved] = useState(false);
  const handleApprovedChange = useCallback((nextChecked: boolean) => {
    setApproved(nextChecked);
  }, []);

  return (
    <div className="grid gap-2">
      <Label className="flex items-center gap-2" htmlFor="finance-approval">
        <Checkbox
          checked={approved}
          id="finance-approval"
          onCheckedChange={handleApprovedChange}
        />
        Finance can release supplier payouts.
      </Label>
      <p className="text-sm text-muted-foreground">
        {approved
          ? "Payout workflow unlocked for this quarter."
          : "Enable this to allow releases above $25,000."}
      </p>
    </div>
  );
};

const CheckedApprovalExample = () => {
  const [retentionConfirmed, setRetentionConfirmed] = useState(true);
  const handleRetentionConfirmedChange = useCallback((nextChecked: boolean) => {
    setRetentionConfirmed(nextChecked);
  }, []);

  return (
    <div className="grid gap-2">
      <Label className="flex items-center gap-2" htmlFor="retention-policy">
        <Checkbox
          checked={retentionConfirmed}
          id="retention-policy"
          onCheckedChange={handleRetentionConfirmedChange}
        />
        Retention policy acknowledged for audit exports.
      </Label>
      <p className="text-sm text-muted-foreground">
        {retentionConfirmed
          ? "Audit artifacts will be retained for 7 years."
          : "Compliance retention is currently disabled."}
      </p>
    </div>
  );
};

const TriStateReviewTableExample = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([
    complianceRows[0].id,
    complianceRows[1].id,
  ]);
  const handleSelectAllChange = useCallback((nextChecked: boolean) => {
    setSelectedRows(nextChecked ? complianceRows.map((row) => row.id) : []);
  }, []);
  const handleSelectedRowsChange = useCallback((nextRows: string[]) => {
    setSelectedRows(nextRows);
  }, []);

  const allRowsSelected = selectedRows.length === complianceRows.length;
  const someRowsSelected = selectedRows.length > 0 && !allRowsSelected;

  const selectionSummary = useMemo(() => {
    if (allRowsSelected) {
      return "All invoices are selected for batch approval.";
    }

    if (someRowsSelected) {
      return `${selectedRows.length} of ${complianceRows.length} invoices selected.`;
    }

    return "No invoices selected.";
  }, [allRowsSelected, selectedRows.length, someRowsSelected]);

  return (
    <div className="grid w-full max-w-md gap-3 rounded-md border border-border p-3">
      <Label className="flex items-center gap-2" htmlFor="select-all-invoices">
        <Checkbox
          checked={allRowsSelected}
          id="select-all-invoices"
          indeterminate={someRowsSelected}
          onCheckedChange={handleSelectAllChange}
        />
        Select invoices for payment run
      </Label>

      <CheckboxGroup
        className="grid gap-2"
        onValueChange={handleSelectedRowsChange}
        value={selectedRows}
      >
        {complianceRows.map((row) => (
          <Label
            className="grid gap-0.5 rounded-sm border border-border px-2 py-1"
            htmlFor={row.id}
            key={row.id}
          >
            <span className="flex items-center gap-2">
              <Checkbox id={row.id} value={row.id} />
              {row.label}
            </span>
            <span className="pl-6 text-sm text-muted-foreground">
              {row.subtitle}
            </span>
          </Label>
        ))}
      </CheckboxGroup>

      <p className="text-sm text-muted-foreground">{selectionSummary}</p>
    </div>
  );
};

const SecurityAcknowledgeExample = () => {
  const [acknowledged, setAcknowledged] = useState(false);
  const handleAcknowledgedChange = useCallback((nextChecked: boolean) => {
    setAcknowledged(nextChecked);
  }, []);

  return (
    <div className="grid gap-2">
      <Label className="flex items-center gap-2" htmlFor="security-ack">
        <Checkbox
          checked={acknowledged}
          id="security-ack"
          onCheckedChange={handleAcknowledgedChange}
        />
        I reviewed the SOC 2 controls for this deployment.
      </Label>
      <p className="text-sm text-muted-foreground">
        {acknowledged
          ? "Submission can be sent to the procurement team."
          : "Acknowledge controls before requesting production access."}
      </p>
    </div>
  );
};

const CustomIndicatorExample = () => {
  const [requiresEscalation, setRequiresEscalation] = useState(true);
  const handleEscalationChange = useCallback((nextChecked: boolean) => {
    setRequiresEscalation(nextChecked);
  }, []);

  return (
    <div className="grid gap-2">
      <Label className="flex items-center gap-2" htmlFor="escalation-flag">
        <Checkbox
          checked={requiresEscalation}
          id="escalation-flag"
          onCheckedChange={handleEscalationChange}
        >
          <Checkbox.Indicator>
            <span aria-hidden="true">OK</span>
          </Checkbox.Indicator>
        </Checkbox>
        Escalate purchases above the approval threshold.
      </Label>
      <p className="text-sm text-muted-foreground">
        {requiresEscalation
          ? "Escalations route to finance leadership."
          : "Purchases auto-approve under the current policy."}
      </p>
    </div>
  );
};

export const Default: Story = {
  render: () => <ApprovalGateExample />,
};

export const Checked: Story = {
  render: () => <CheckedApprovalExample />,
};

export const Indeterminate: Story = {
  render: () => <TriStateReviewTableExample />,
};

export const Disabled: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label className="flex items-center gap-2" htmlFor="locked-approval">
        <Checkbox disabled id="locked-approval" />
        Require owner approval for vendor changes.
      </Label>
      <p className="text-sm text-muted-foreground">
        This control is locked to workspace owners on the current plan.
      </p>
    </div>
  ),
};

export const DisabledChecked: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label className="flex items-center gap-2" htmlFor="mandatory-export">
        <Checkbox defaultChecked disabled id="mandatory-export" />
        Include audit trail in every export package.
      </Label>
      <p className="text-sm text-muted-foreground">
        This requirement is enforced by enterprise compliance policy.
      </p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => <SecurityAcknowledgeExample />,
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-2">
      {checkboxSizes.map((size) => (
        <Label
          className="flex items-center gap-2"
          htmlFor={`checkbox-${size}`}
          key={size}
        >
          <Checkbox defaultChecked id={`checkbox-${size}`} size={size} />
          {size.toUpperCase()} approval toggle
        </Label>
      ))}
    </div>
  ),
};

export const IndicatorSizePrecedence: Story = {
  render: () => (
    <Label
      className="flex items-center gap-2"
      htmlFor="checkbox-indicator-precedence"
    >
      <Checkbox defaultChecked id="checkbox-indicator-precedence" size="xl">
        <Checkbox.Indicator size="xs">
          <span className="block size-2 rounded-full bg-current" />
        </Checkbox.Indicator>
      </Checkbox>
      Root xl with child indicator override xs
    </Label>
  ),
};

export const CustomIndicator: Story = {
  render: () => <CustomIndicatorExample />,
};
