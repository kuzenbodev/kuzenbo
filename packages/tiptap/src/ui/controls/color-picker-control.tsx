"use client";

import { Button } from "@kuzenbo/core/ui/button";
import { Popover } from "@kuzenbo/core/ui/popover";
import { useMemo } from "react";

import { TIPTAP_CONTROL_REQUIREMENTS } from "../../editor/capabilities";
import { useTiptapEditorContext } from "../tiptap-editor/tiptap-editor-context";
import {
  TiptapEditorControl,
  type TiptapEditorControlProps,
} from "../tiptap-editor/tiptap-editor-control";

const DEFAULT_COLORS = [
  "var(--color-foreground)",
  "var(--color-primary)",
  "var(--color-danger)",
  "var(--color-warning)",
  "var(--color-success)",
  "var(--color-info)",
] as const;

export type TiptapEditorColorPickerProps = Omit<
  TiptapEditorControlProps,
  "onExecute" | "icon" | "label" | "requirement"
> & {
  colors?: string[];
  icon?: TiptapEditorControlProps["icon"];
  label?: string;
};

export const TiptapEditorColorPicker = ({
  colors,
  icon = <span>A</span>,
  label,
  ...props
}: TiptapEditorColorPickerProps) => {
  const { editor, labels } = useTiptapEditorContext();

  const palette = useMemo(() => colors ?? [...DEFAULT_COLORS], [colors]);

  const applyColor = (value: string) => {
    if (!editor) {
      return;
    }

    editor.chain().focus().setColor(value).run();
  };

  const clearColor = () => {
    if (!editor) {
      return;
    }

    editor.chain().focus().unsetColor().run();
  };

  const resolvedLabel = label ?? labels.color;

  return (
    <Popover>
      <Popover.Trigger
        render={
          <TiptapEditorControl
            {...props}
            active={
              editor ? Boolean(editor.getAttributes("textStyle").color) : false
            }
            icon={icon}
            label={resolvedLabel}
            requirement={TIPTAP_CONTROL_REQUIREMENTS.textColor}
          />
        }
      />
      <Popover.Content className="w-56 gap-3">
        <div className="grid grid-cols-6 gap-2">
          {palette.map((color) => (
            <button
              aria-label={`Set color ${color}`}
              className="size-7 rounded-md border border-border transition hover:scale-105"
              key={color}
              onClick={() => applyColor(color)}
              style={{ backgroundColor: color }}
              type="button"
            />
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={clearColor} size="sm" variant="outline">
            Clear
          </Button>
        </div>
      </Popover.Content>
    </Popover>
  );
};
