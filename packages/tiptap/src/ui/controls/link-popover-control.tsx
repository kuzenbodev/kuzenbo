"use client";

import type { Editor } from "@tiptap/core";

import { Button } from "@kuzenbo/core/ui/button";
import { Input } from "@kuzenbo/core/ui/input";
import { Popover } from "@kuzenbo/core/ui/popover";
import { useEffect, useState } from "react";

import { TIPTAP_CONTROL_REQUIREMENTS } from "../../editor/capabilities";
import { useTiptapEditorContext } from "../tiptap-editor/tiptap-editor-context";
import {
  TiptapEditorControl,
  type TiptapEditorControlProps,
} from "../tiptap-editor/tiptap-editor-control";

const getCurrentLink = (editor: Editor): string => {
  const { href } = editor.getAttributes("link");

  if (typeof href === "string") {
    return href;
  }

  return "";
};

export type TiptapEditorLinkPopoverProps = Omit<
  TiptapEditorControlProps,
  "onExecute" | "icon" | "label" | "requirement"
> & {
  icon?: TiptapEditorControlProps["icon"];
  label?: string;
};

export const TiptapEditorLinkPopover = ({
  icon = <span>Link</span>,
  label,
  ...props
}: TiptapEditorLinkPopoverProps) => {
  const { editor, labels } = useTiptapEditorContext();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!editor || !isOpen) {
      return;
    }

    setUrl(getCurrentLink(editor));
  }, [editor, isOpen]);

  const saveLink = () => {
    if (!editor) {
      return;
    }

    if (!url.trim()) {
      editor.chain().focus().unsetLink().run();
      setIsOpen(false);
      return;
    }

    editor.chain().focus().setLink({ href: url.trim() }).run();

    setIsOpen(false);
  };

  const clearLink = () => {
    if (!editor) {
      return;
    }

    editor.chain().focus().unsetLink().run();
    setUrl("");
    setIsOpen(false);
  };

  const resolvedLabel = label ?? labels.link;

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <Popover.Trigger
        render={
          <TiptapEditorControl
            {...props}
            active={editor ? editor.isActive("link") : false}
            icon={icon}
            label={resolvedLabel}
            requirement={TIPTAP_CONTROL_REQUIREMENTS.link}
          />
        }
      />
      <Popover.Content className="w-80 gap-3">
        <Input
          aria-label={labels.link}
          autoFocus
          onChange={(event) => setUrl(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              saveLink();
            }
          }}
          placeholder="https://example.com"
          value={url}
        />
        <div className="flex items-center justify-end gap-2">
          <Button
            className="cursor-clickable"
            onClick={clearLink}
            size="sm"
            variant="outline"
          >
            {labels.unlink}
          </Button>
          <Button className="cursor-clickable" onClick={saveLink} size="sm">
            Save
          </Button>
        </div>
      </Popover.Content>
    </Popover>
  );
};
