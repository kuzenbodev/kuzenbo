import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useMemo, useState } from "react";

import { Checkbox } from "../../checkbox/checkbox";
import { Label } from "../../label/label";
import { CheckboxGroup } from "../checkbox-group";

const permissionOptions = [
  {
    value: "view-finance-dashboard",
    label: "View finance dashboard",
  },
  {
    value: "approve-reimbursements",
    label: "Approve reimbursements",
  },
  {
    value: "export-vendor-ledger",
    label: "Export vendor ledger",
  },
] as const;

const governanceOptions = [
  {
    value: "soc2-report",
    label: "Attach SOC 2 summary",
    description: "Required for security sign-off during procurement reviews.",
  },
  {
    value: "dpa-template",
    label: "Attach DPA template",
    description: "Includes legal language for EU and UK data handling.",
  },
  {
    value: "risk-register",
    label: "Attach risk register",
    description: "Lists open exceptions and compensating controls.",
  },
] as const;

export const baseMeta = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckboxGroup>;

type Story = StoryObj<typeof baseMeta>;

const PermissionsChecklistExample = () => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "view-finance-dashboard",
  ]);
  const handleSelectedPermissionsChange = useCallback(
    (nextValues: string[]) => {
      setSelectedPermissions(nextValues);
    },
    []
  );

  const summary = useMemo(() => {
    if (selectedPermissions.length === permissionOptions.length) {
      return "All finance permissions are granted.";
    }

    if (selectedPermissions.length === 0) {
      return "No finance permissions are granted.";
    }

    return `${selectedPermissions.length} of ${permissionOptions.length} permissions granted.`;
  }, [selectedPermissions.length]);

  return (
    <div className="grid gap-2">
      <CheckboxGroup
        onValueChange={handleSelectedPermissionsChange}
        value={selectedPermissions}
      >
        {permissionOptions.map((permission) => (
          <Label
            className="flex items-center gap-2"
            data-slot="label"
            key={permission.value}
          >
            <Checkbox value={permission.value} />
            {permission.label}
          </Label>
        ))}
      </CheckboxGroup>
      <p className="text-muted-foreground text-sm">{summary}</p>
    </div>
  );
};

const DisabledPermissionExample = () => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "audit-log-read",
  ]);
  const handleSelectedPermissionsChange = useCallback(
    (nextValues: string[]) => {
      setSelectedPermissions(nextValues);
    },
    []
  );

  const canManageSso = selectedPermissions.includes("manage-sso");

  return (
    <div className="grid gap-2">
      <CheckboxGroup
        onValueChange={handleSelectedPermissionsChange}
        value={selectedPermissions}
      >
        <Label data-slot="label" className="flex items-center gap-2">
          <Checkbox value="audit-log-read" />
          Read audit logs
        </Label>
        <Label data-slot="label" className="flex items-center gap-2">
          <Checkbox value="manage-sso" />
          Manage SSO provider
        </Label>
        <Label data-slot="label" className="flex items-center gap-2">
          <Checkbox disabled value="create-custom-roles" />
          Create custom roles (Enterprise only)
        </Label>
      </CheckboxGroup>
      <p className="text-muted-foreground text-sm">
        {canManageSso
          ? "SSO ownership is assigned to this role."
          : "Enable SSO ownership before rotating identity providers."}
      </p>
    </div>
  );
};

const GovernanceAttachmentExample = () => {
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([
    "soc2-report",
    "dpa-template",
  ]);
  const handleSelectedAttachmentsChange = useCallback(
    (nextValues: string[]) => {
      setSelectedAttachments(nextValues);
    },
    []
  );

  const completionState = useMemo(() => {
    if (selectedAttachments.length === governanceOptions.length) {
      return "Procurement packet is complete.";
    }

    return "Attach all governance artifacts before legal review.";
  }, [selectedAttachments.length]);

  return (
    <div className="grid w-full max-w-lg gap-3">
      <CheckboxGroup
        className="gap-2"
        onValueChange={handleSelectedAttachmentsChange}
        value={selectedAttachments}
      >
        {governanceOptions.map((option) => (
          <Label
            className="border-border grid gap-0.5 rounded-md border px-3 py-2"
            data-slot="label"
            key={option.value}
          >
            <span className="flex items-center gap-2">
              <Checkbox value={option.value} />
              {option.label}
            </span>
            <span className="text-muted-foreground pl-6 text-sm">
              {option.description}
            </span>
          </Label>
        ))}
      </CheckboxGroup>
      <p className="text-muted-foreground text-sm">{completionState}</p>
    </div>
  );
};

export const Default: Story = {
  render: () => <PermissionsChecklistExample />,
};

export const DisabledOption: Story = {
  render: () => <DisabledPermissionExample />,
};

export const WithDescription: Story = {
  render: () => <GovernanceAttachmentExample />,
};
