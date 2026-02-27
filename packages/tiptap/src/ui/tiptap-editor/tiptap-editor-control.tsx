"use client";

import type { Editor } from "@tiptap/core";
import type { ComponentProps, MouseEvent, ReactNode } from "react";

import { Toolbar } from "@kuzenbo/core/ui/toolbar";
import { useEffect } from "react";
import { cn, tv } from "tailwind-variants";

import type { TiptapEditorLabels } from "./tiptap-editor-labels";
import type { TiptapEditorSize } from "./tiptap-editor-size";

import {
  getEditorExtensionNames,
  hasControlRequirement,
  type TiptapControlRequirement,
} from "../../editor/capabilities";
import { useTiptapEditorContext } from "./tiptap-editor-context";

const warnedControlIds = new Set<string>();

const toolbarButtonSizeByEditorSize: Record<
  TiptapEditorSize,
  "xs" | "sm" | "md" | "lg"
> = {
  xs: "xs",
  sm: "xs",
  md: "sm",
  lg: "md",
  xl: "lg",
};

const tiptapEditorControlVariants = tv({
  base: "kb-tiptap-control cursor-clickable rounded-[min(var(--radius-md),10px)] text-muted-foreground hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground",
  variants: {
    size: {
      xs: "h-6 min-w-6 px-1.5 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "h-7 min-w-7 px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-8 min-w-8 px-2 text-sm",
      lg: "h-9 min-w-9 px-2.5 text-sm",
      xl: "h-10 min-w-10 px-3 text-base [&_svg:not([class*='size-'])]:size-5",
    },
  },
});

const warnMissingRequirement = (
  controlId: string,
  editor: Editor,
  requirement: TiptapControlRequirement
) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  const warningKey = `${controlId}:${requirement.capability}`;

  if (warnedControlIds.has(warningKey)) {
    return;
  }

  warnedControlIds.add(warningKey);

  const extensionNames = [...getEditorExtensionNames(editor)];
  extensionNames.sort();

  console.warn(
    `[kuzenbo/tiptap] "${controlId}" requires capability "${requirement.capability}". ` +
      `Missing extensions (${requirement.requiredExtensions.join(", ")}) or commands (${requirement.requiredCommands.join(", ")}). ` +
      `Loaded extensions: ${extensionNames.join(", ")}`
  );
};

export interface TiptapEditorControlProps extends Omit<
  ComponentProps<typeof Toolbar.Button>,
  "onClick"
> {
  active?: boolean;
  icon?: ReactNode;
  label: string;
  onExecute?: (editor: Editor) => void;
  requirement?: TiptapControlRequirement;
}

export const TiptapEditorControl = ({
  active,
  className,
  disabled,
  icon,
  label,
  onExecute,
  requirement,
  ...props
}: TiptapEditorControlProps) => {
  const context = useTiptapEditorContext();
  const requirementSatisfied = hasControlRequirement(
    context.editor,
    requirement
  );
  const isDisabled = disabled || !context.editor || !requirementSatisfied;

  useEffect(() => {
    if (
      !context.editor ||
      !requirement ||
      requirementSatisfied ||
      !context.warnOnMissingExtensions
    ) {
      return;
    }

    warnMissingRequirement(label, context.editor, requirement);
  }, [
    context.editor,
    context.warnOnMissingExtensions,
    label,
    requirement,
    requirementSatisfied,
  ]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!context.editor) {
      return;
    }

    if (!requirementSatisfied) {
      return;
    }

    onExecute?.(context.editor);
  };

  return (
    <Toolbar.Button
      aria-label={label}
      className={tiptapEditorControlVariants({
        size: context.size,
        className: cn(context.classNames?.control, className),
      })}
      data-active={active ? "true" : undefined}
      data-size={context.size}
      disabled={isDisabled}
      onClick={handleClick}
      size={toolbarButtonSizeByEditorSize[context.size]}
      title={label}
      type="button"
      variant="ghost"
      {...props}
    >
      {icon ?? label}
    </Toolbar.Button>
  );
};

export interface TiptapControlFactoryConfig {
  active?: (editor: Editor) => boolean;
  command: (editor: Editor) => void;
  disabled?: (editor: Editor) => boolean;
  icon?: ReactNode;
  id: string;
  label?: string;
  labelKey?: keyof TiptapEditorLabels;
  requirement?: TiptapControlRequirement;
}

export const createTiptapControl = ({
  active,
  command,
  disabled,
  icon,
  id,
  label,
  labelKey,
  requirement,
}: TiptapControlFactoryConfig) => {
  const ControlComponent = (
    props: Omit<TiptapEditorControlProps, "active" | "label" | "onExecute">
  ) => {
    const context = useTiptapEditorContext();
    const controlLabel = labelKey ? context.labels[labelKey] : (label ?? id);
    const requirementSatisfied = hasControlRequirement(
      context.editor,
      requirement
    );
    const isActive = context.editor
      ? (active?.(context.editor) ?? false)
      : false;
    const isDisabled =
      !context.editor || !requirementSatisfied
        ? true
        : (disabled?.(context.editor) ?? false);

    return (
      <TiptapEditorControl
        {...props}
        active={isActive}
        disabled={isDisabled || props.disabled}
        icon={icon}
        label={controlLabel}
        onExecute={command}
        requirement={requirement}
      />
    );
  };

  ControlComponent.displayName = `TiptapEditorControl(${id})`;

  return ControlComponent;
};
