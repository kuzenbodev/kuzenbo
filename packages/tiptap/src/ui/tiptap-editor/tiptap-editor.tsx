"use client";

import type { Editor } from "@tiptap/core";
import {
  BubbleMenu as BubbleMenuPrimitive,
  FloatingMenu as FloatingMenuPrimitive,
} from "@tiptap/react/menus";
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";

import { TiptapEditorColorPicker } from "../controls/color-picker-control";
import type { TiptapEditorColorPickerProps } from "../controls/color-picker-control";
import { TiptapEditorLinkPopover } from "../controls/link-popover-control";
import type { TiptapEditorLinkPopoverProps } from "../controls/link-popover-control";
import { TiptapEditorContent } from "./tiptap-editor-content";
import type { TiptapEditorContentProps } from "./tiptap-editor-content";
import {
  TiptapEditorProvider,
  useOptionalTiptapEditorContext,
} from "./tiptap-editor-context";
import type {
  TiptapEditorClassNames,
  TiptapEditorProviderProps,
  TiptapEditorVariant,
} from "./tiptap-editor-context";
import {
  createTiptapControl,
  TiptapEditorControl,
} from "./tiptap-editor-control";
import type {
  TiptapControlFactoryConfig,
  TiptapEditorControlProps,
} from "./tiptap-editor-control";
import {
  AlignCenterControl,
  AlignJustifyControl,
  AlignLeftControl,
  AlignRightControl,
  BoldControl,
  BulletListControl,
  CodeBlockControl,
  CodeControl,
  ColorControl,
  H1Control,
  H2Control,
  H3Control,
  HighlightControl,
  InsertTableControl,
  ItalicControl,
  LinkControl,
  OrderedListControl,
  RedoControl,
  StrikeControl,
  TaskListControl,
  UnderlineControl,
  UndoControl,
  UnlinkControl,
} from "./tiptap-editor-controls";
import { TiptapEditorControlsGroup } from "./tiptap-editor-controls-group";
import type { TiptapEditorControlsGroupProps } from "./tiptap-editor-controls-group";
import type { TiptapEditorLabels } from "./tiptap-editor-labels";
import { DEFAULT_TIPTAP_EDITOR_SIZE } from "./tiptap-editor-size";
import type { TiptapEditorSize } from "./tiptap-editor-size";
import { TiptapEditorToolbar } from "./tiptap-editor-toolbar";
import type { TiptapEditorToolbarProps } from "./tiptap-editor-toolbar";

const tiptapEditorRootVariants = tv({
  base: "kb-tiptap-root group/kb-tiptap-root border-border bg-background text-foreground flex flex-col rounded-lg border",
  defaultVariants: {
    size: DEFAULT_TIPTAP_EDITOR_SIZE,
  },
  variants: {
    size: {
      lg: "gap-2.5 p-2.5 text-sm",
      md: "gap-2 p-2 text-sm",
      sm: "gap-2 p-2 text-sm",
      xl: "gap-3 p-3 text-base",
      xs: "gap-1.5 p-1.5 text-xs",
    },
  },
});

export interface TiptapEditorRootProps
  extends Omit<TiptapEditorProviderProps, "children">, ComponentProps<"div"> {
  classNames?: TiptapEditorClassNames;
  labels?: Partial<TiptapEditorLabels>;
  size?: TiptapEditorSize;
  variant?: TiptapEditorVariant;
}

export type TiptapEditorProps = TiptapEditorRootProps;

const TiptapEditorRoot = ({
  children,
  className,
  classNames,
  editor,
  labels,
  size = DEFAULT_TIPTAP_EDITOR_SIZE,
  variant,
  warnOnMissingExtensions,
  ...props
}: TiptapEditorRootProps) => (
  <TiptapEditorProvider
    classNames={classNames}
    editor={editor}
    labels={labels}
    size={size}
    variant={variant}
    warnOnMissingExtensions={warnOnMissingExtensions}
  >
    <div
      className={tiptapEditorRootVariants({
        className: cn(classNames?.root, className),
        size,
      })}
      data-size={size}
      data-slot="kb-tiptap-root"
      {...props}
    >
      {children}
    </div>
  </TiptapEditorProvider>
);

export interface TiptapEditorBubbleMenuProps extends Omit<
  ComponentProps<typeof BubbleMenuPrimitive>,
  "editor"
> {
  editor?: Editor | null;
}

const TiptapEditorBubbleMenu = ({
  editor,
  ...props
}: TiptapEditorBubbleMenuProps) => {
  const context = useOptionalTiptapEditorContext();
  const resolvedEditor = editor ?? context?.editor ?? null;

  if (!resolvedEditor) {
    return null;
  }

  return <BubbleMenuPrimitive editor={resolvedEditor} {...props} />;
};

export interface TiptapEditorFloatingMenuProps extends Omit<
  ComponentProps<typeof FloatingMenuPrimitive>,
  "editor"
> {
  editor?: Editor | null;
}

const TiptapEditorFloatingMenu = ({
  editor,
  ...props
}: TiptapEditorFloatingMenuProps) => {
  const context = useOptionalTiptapEditorContext();
  const resolvedEditor = editor ?? context?.editor ?? null;

  if (!resolvedEditor) {
    return null;
  }

  return <FloatingMenuPrimitive editor={resolvedEditor} {...props} />;
};

type TiptapEditorType = typeof TiptapEditorRoot & {
  AlignCenter: typeof AlignCenterControl;
  AlignJustify: typeof AlignJustifyControl;
  AlignLeft: typeof AlignLeftControl;
  AlignRight: typeof AlignRightControl;
  Bold: typeof BoldControl;
  BubbleMenu: typeof TiptapEditorBubbleMenu;
  BulletList: typeof BulletListControl;
  Code: typeof CodeControl;
  CodeBlock: typeof CodeBlockControl;
  Color: typeof ColorControl;
  ColorPicker: typeof TiptapEditorColorPicker;
  Content: typeof TiptapEditorContent;
  Control: typeof TiptapEditorControl;
  ControlsGroup: typeof TiptapEditorControlsGroup;
  FloatingMenu: typeof TiptapEditorFloatingMenu;
  H1: typeof H1Control;
  H2: typeof H2Control;
  H3: typeof H3Control;
  Highlight: typeof HighlightControl;
  InsertTable: typeof InsertTableControl;
  Italic: typeof ItalicControl;
  Link: typeof LinkControl;
  LinkPopover: typeof TiptapEditorLinkPopover;
  OrderedList: typeof OrderedListControl;
  Redo: typeof RedoControl;
  Root: typeof TiptapEditorRoot;
  Strike: typeof StrikeControl;
  TaskList: typeof TaskListControl;
  Toolbar: typeof TiptapEditorToolbar;
  Underline: typeof UnderlineControl;
  Undo: typeof UndoControl;
  Unlink: typeof UnlinkControl;
};

const TiptapEditor = Object.assign(TiptapEditorRoot, {
  AlignCenter: AlignCenterControl,
  AlignJustify: AlignJustifyControl,
  AlignLeft: AlignLeftControl,
  AlignRight: AlignRightControl,
  Bold: BoldControl,
  BubbleMenu: TiptapEditorBubbleMenu,
  BulletList: BulletListControl,
  Code: CodeControl,
  CodeBlock: CodeBlockControl,
  Color: ColorControl,
  ColorPicker: TiptapEditorColorPicker,
  Content: TiptapEditorContent,
  Control: TiptapEditorControl,
  ControlsGroup: TiptapEditorControlsGroup,
  FloatingMenu: TiptapEditorFloatingMenu,
  H1: H1Control,
  H2: H2Control,
  H3: H3Control,
  Highlight: HighlightControl,
  InsertTable: InsertTableControl,
  Italic: ItalicControl,
  Link: LinkControl,
  LinkPopover: TiptapEditorLinkPopover,
  OrderedList: OrderedListControl,
  Redo: RedoControl,
  Root: TiptapEditorRoot,
  Strike: StrikeControl,
  TaskList: TaskListControl,
  Toolbar: TiptapEditorToolbar,
  Underline: UnderlineControl,
  Undo: UndoControl,
  Unlink: UnlinkControl,
}) as TiptapEditorType;

export {
  createTiptapControl,
  TiptapEditor,
  TiptapEditorBubbleMenu,
  TiptapEditorColorPicker,
  TiptapEditorControl,
  TiptapEditorContent,
  TiptapEditorControlsGroup,
  TiptapEditorFloatingMenu,
  TiptapEditorLinkPopover,
  TiptapEditorRoot,
  TiptapEditorToolbar,
};

export type {
  TiptapControlFactoryConfig,
  TiptapEditorColorPickerProps,
  TiptapEditorControlProps,
  TiptapEditorContentProps,
  TiptapEditorControlsGroupProps,
  TiptapEditorLinkPopoverProps,
  TiptapEditorSize,
  TiptapEditorToolbarProps,
};
