"use client";

import { useCallback, useState } from "react";

import { AlertDialog } from "./alert-dialog";
import { AlertDialogAction } from "./alert-dialog-action";
import { AlertDialogCancel } from "./alert-dialog-cancel";
import { AlertDialogContent } from "./alert-dialog-content";
import { AlertDialogDescription } from "./alert-dialog-description";
import { AlertDialogFooter } from "./alert-dialog-footer";
import { AlertDialogHeader } from "./alert-dialog-header";
import { AlertDialogTitle } from "./alert-dialog-title";
import type { ConfirmDialogState } from "./use-confirm-dialog";

export interface ConfirmDialogRendererProps {
  dialog: ConfirmDialogState;
  closeDialog: (id: string) => void;
}

export const ConfirmDialogRenderer = ({
  dialog,
  closeDialog,
}: ConfirmDialogRendererProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = useCallback(async () => {
    setIsProcessing(true);
    try {
      await dialog.onConfirm();
      if (dialog.closeOnConfirm !== false) {
        closeDialog(dialog.id);
      }
    } finally {
      setIsProcessing(false);
    }
  }, [dialog, closeDialog]);

  const handleCancel = useCallback(() => {
    dialog.onCancel?.();
    if (dialog.closeOnCancel !== false) {
      closeDialog(dialog.id);
    }
  }, [dialog, closeDialog]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        closeDialog(dialog.id);
      }
    },
    [closeDialog, dialog.id]
  );

  const confirmVariant = dialog.confirmProps?.variant || "default";

  return (
    <AlertDialog data-slot="alert-dialog" onOpenChange={handleOpenChange} open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialog.title}</AlertDialogTitle>
          {typeof dialog.children === "string" ? (
            <AlertDialogDescription>{dialog.children}</AlertDialogDescription>
          ) : (
            dialog.children
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isProcessing} onClick={handleCancel}>
            {dialog.labels.cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isProcessing}
            isLoading={isProcessing}
            onClick={handleConfirm}
            variant={confirmVariant}
          >
            {dialog.labels.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
