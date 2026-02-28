import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";

import { Button } from "../../button/button";
import { Input } from "../../input/input";
import { Label } from "../../label/label";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTrigger,
  AlertDialogViewport,
} from "../alert-dialog";

const dialogSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    AlertDialogBackdrop,
    AlertDialogPopup,
    AlertDialogPortal,
    AlertDialogTrigger,
    AlertDialogViewport,
  },
  tags: ["autodocs"],
  title: "Components/AlertDialog",
} satisfies Meta<typeof AlertDialog>;

type Story = StoryObj<typeof baseMeta>;

const AsyncConfirmDialogDemo = () => {
  const [open, setOpen] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);
  const [lastRevokedAt, setLastRevokedAt] = useState<string | null>(null);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setIsRevoking(false);
    }
  }, []);

  const handleRevoke = useCallback(() => {
    if (isRevoking) {
      return;
    }

    setIsRevoking(true);
    window.setTimeout(() => {
      setIsRevoking(false);
      setOpen(false);
      setLastRevokedAt(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 900);
  }, [isRevoking]);

  return (
    <div className="grid gap-3">
      <AlertDialog onOpenChange={handleOpenChange} open={open}>
        <AlertDialog.Trigger render={<Button variant="outline" />}>
          Revoke production API key
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Revoke API key now?</AlertDialog.Title>
            <AlertDialog.Description>
              Connected integrations will stop sending usage events until a new
              key is generated.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel disabled={isRevoking}>
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action
              disabled={isRevoking}
              onClick={handleRevoke}
              variant="danger"
            >
              {isRevoking ? "Revoking..." : "Revoke key"}
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <div className="text-muted-foreground text-xs">
        {lastRevokedAt
          ? `Last key rotation completed at ${lastRevokedAt}.`
          : "No key has been revoked in this preview session yet."}
      </div>
    </div>
  );
};

const FormValidationDemo = () => {
  const workspaceSlug = "acme-enterprise";
  const [typedSlug, setTypedSlug] = useState("");
  const isConfirmed = typedSlug.trim() === workspaceSlug;
  const handleTypedSlugChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTypedSlug(event.target.value);
    },
    []
  );

  return (
    <AlertDialog>
      <AlertDialog.Trigger render={<Button variant="outline" />}>
        Delete workspace
      </AlertDialog.Trigger>
      <AlertDialog.Content size="lg">
        <AlertDialog.Header>
          <AlertDialog.Title>Delete workspace permanently?</AlertDialog.Title>
          <AlertDialog.Description>
            This removes members, billing history, and automation rules. Type
            the workspace slug to confirm.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <div className="grid gap-2">
          <Label htmlFor="workspace-slug-confirmation">
            Type <code>{workspaceSlug}</code> to continue
          </Label>
          <Input
            id="workspace-slug-confirmation"
            onChange={handleTypedSlugChange}
            placeholder={workspaceSlug}
            value={typedSlug}
          />
          <div className="text-muted-foreground text-xs">
            {isConfirmed
              ? "Confirmation matched. Deletion is now available."
              : "The confirmation text must match exactly."}
          </div>
        </div>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action disabled={!isConfirmed} variant="danger">
            Delete workspace
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger render={<Button variant="outline" />}>
        Remove teammate access
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            Remove access from this workspace?
          </AlertDialog.Title>
          <AlertDialog.Description>
            Sofia will lose access to dashboards, deployments, and incident
            timelines immediately.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action variant="danger">
            Remove access
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  ),
};

export const ComposedAnatomy: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger render={<Button variant="outline" />}>
        Archive customer environment
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Viewport>
          <AlertDialog.Popup>
            <AlertDialog.Header>
              <AlertDialog.Title>
                Archive staging environment?
              </AlertDialog.Title>
              <AlertDialog.Description>
                Scheduled jobs stop immediately and environment variables become
                read-only.
              </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <AlertDialog.Close render={<Button variant="outline" />}>
                Cancel
              </AlertDialog.Close>
              <AlertDialog.Action variant="danger">
                Archive now
              </AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Popup>
        </AlertDialog.Viewport>
      </AlertDialog.Portal>
    </AlertDialog>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-3">
      {dialogSizes.map((size) => (
        <AlertDialog key={size}>
          <AlertDialog.Trigger render={<Button size="sm" variant="outline" />}>
            Offboard contractor ({size.toUpperCase()})
          </AlertDialog.Trigger>

          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Viewport>
              <AlertDialog.Popup size={size}>
                <AlertDialog.Header>
                  <AlertDialog.Title>
                    {size.toUpperCase()} offboarding confirmation
                  </AlertDialog.Title>
                  <AlertDialog.Description>
                    Review pending tasks before removing account access from the
                    workspace.
                  </AlertDialog.Description>
                </AlertDialog.Header>
                <AlertDialog.Footer>
                  <AlertDialog.Close render={<Button variant="outline" />}>
                    Cancel
                  </AlertDialog.Close>
                  <AlertDialog.Action variant="danger">
                    Remove account
                  </AlertDialog.Action>
                </AlertDialog.Footer>
              </AlertDialog.Popup>
            </AlertDialog.Viewport>
          </AlertDialog.Portal>
        </AlertDialog>
      ))}
    </div>
  ),
};

export const AsyncConfirmDialog: Story = {
  render: () => <AsyncConfirmDialogDemo />,
};

export const FormValidation: Story = {
  render: () => <FormValidationDemo />,
};
