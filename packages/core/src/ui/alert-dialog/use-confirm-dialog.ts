"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import type { ButtonProps } from "../button/button";

interface ConfirmDialogState {
  id: string;
  title: string;
  children: ReactNode;
  labels: { confirm: string; cancel: string };
  confirmProps?: ButtonProps;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  closeOnConfirm?: boolean;
  closeOnCancel?: boolean;
}

interface ConfirmDialogContextValue {
  openConfirmDialog: (config: Omit<ConfirmDialogState, "id">) => string;
  closeDialog: (id: string) => void;
  closeAll: () => void;
}

export const ConfirmDialogContext =
  createContext<ConfirmDialogContextValue | null>(null);

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error(
      "useConfirmDialog must be used within ConfirmDialogProvider"
    );
  }
  return context;
};

export type { ConfirmDialogState, ConfirmDialogContextValue };
