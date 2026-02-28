"use client";

import type { ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";

import { ConfirmDialogRenderer } from "./confirm-dialog-renderer";
import {
  ConfirmDialogContext,
  type ConfirmDialogState,
} from "./use-confirm-dialog";

export interface ConfirmDialogProviderProps {
  children: ReactNode;
  labels?: { confirm: string; cancel: string };
}

export const ConfirmDialogProvider = ({
  children,
  labels: defaultLabels = { confirm: "Confirm", cancel: "Cancel" },
}: ConfirmDialogProviderProps) => {
  const [dialogs, setDialogs] = useState<ConfirmDialogState[]>([]);

  const openConfirmDialog = useCallback(
    (config: Omit<ConfirmDialogState, "id">) => {
      const id = crypto.randomUUID().replaceAll("-", "").slice(0, 7);
      const newDialog: ConfirmDialogState = {
        ...config,
        id,
        labels: config.labels || defaultLabels,
      };
      setDialogs((prev) => [...prev, newDialog]);
      return id;
    },
    [defaultLabels]
  );

  const closeDialog = useCallback((id: string) => {
    setDialogs((prev) => prev.filter((dialog) => dialog.id !== id));
  }, []);

  const closeAll = useCallback(() => {
    setDialogs([]);
  }, []);
  const contextValue = useMemo(
    () => ({ openConfirmDialog, closeDialog, closeAll }),
    [openConfirmDialog, closeDialog, closeAll]
  );

  return (
    <ConfirmDialogContext.Provider value={contextValue}>
      {children}
      {dialogs.map((dialog) => (
        <ConfirmDialogRenderer
          closeDialog={closeDialog}
          dialog={dialog}
          key={dialog.id}
        />
      ))}
    </ConfirmDialogContext.Provider>
  );
};
