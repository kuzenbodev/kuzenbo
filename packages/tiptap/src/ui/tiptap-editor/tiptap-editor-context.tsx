"use client";

import type { Editor } from "@tiptap/core";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";

import {
  DEFAULT_TIPTAP_LABELS,
  type TiptapEditorLabels,
} from "./tiptap-editor-labels";
import {
  DEFAULT_TIPTAP_EDITOR_SIZE,
  useGlobalUISize,
  useKuzenboComponentDefaults,
  type TiptapEditorSize,
} from "./tiptap-editor-size";

export type TiptapEditorVariant = "default" | "subtle";

export interface TiptapEditorClassNames {
  root?: string;
  toolbar?: string;
  group?: string;
  control?: string;
  content?: string;
}

export interface TiptapEditorContextValue {
  classNames?: TiptapEditorClassNames;
  editor: Editor | null;
  labels: TiptapEditorLabels;
  size: TiptapEditorSize;
  variant: TiptapEditorVariant;
  warnOnMissingExtensions: boolean;
}

const TiptapEditorContext = createContext<TiptapEditorContextValue | null>(
  null
);

export interface TiptapEditorProviderProps {
  children: ReactNode;
  classNames?: TiptapEditorClassNames;
  editor: Editor | null;
  labels?: Partial<TiptapEditorLabels>;
  size?: TiptapEditorSize;
  variant?: TiptapEditorVariant;
  warnOnMissingExtensions?: boolean;
}

export const TiptapEditorProvider = ({
  children,
  classNames,
  editor,
  labels,
  size: providedSize,
  variant: providedVariant,
  warnOnMissingExtensions: providedWarnOnMissingExtensions,
}: TiptapEditorProviderProps) => {
  const globalSize = useGlobalUISize();
  const componentDefaults =
    useKuzenboComponentDefaults<TiptapEditorProviderProps>(
      "TiptapEditorProvider"
    );

  const size =
    providedSize ??
    componentDefaults.size ??
    globalSize ??
    DEFAULT_TIPTAP_EDITOR_SIZE;
  const variant = providedVariant ?? componentDefaults.variant ?? "default";
  const warnOnMissingExtensions =
    providedWarnOnMissingExtensions ??
    componentDefaults.warnOnMissingExtensions ??
    true;
  const resolvedClassNames = classNames ?? componentDefaults.classNames;

  return (
    <TiptapEditorContext.Provider
      value={{
        classNames: resolvedClassNames,
        editor,
        labels: {
          ...DEFAULT_TIPTAP_LABELS,
          ...componentDefaults.labels,
          ...labels,
        },
        size,
        variant,
        warnOnMissingExtensions,
      }}
    >
      {children}
    </TiptapEditorContext.Provider>
  );
};

export const useTiptapEditorContext = (): TiptapEditorContextValue => {
  const context = useContext(TiptapEditorContext);

  if (!context) {
    throw new Error(
      "useTiptapEditorContext must be used inside <TiptapEditor.Root>."
    );
  }

  return context;
};

export const useOptionalTiptapEditorContext =
  (): TiptapEditorContextValue | null => useContext(TiptapEditorContext);
