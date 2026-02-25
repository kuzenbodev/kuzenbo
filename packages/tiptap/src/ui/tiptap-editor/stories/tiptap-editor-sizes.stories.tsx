import type { StoryObj } from "@storybook/react";

import type { TiptapEditorSize } from "../tiptap-editor";

import { useKuzenboEditor } from "../../../editor/use-kuzenbo-editor";
import { TiptapEditor } from "../tiptap-editor";
import { baseMeta } from "./tiptap-editor-story-shared";

const TIPTAP_SIZE_ORDER: readonly TiptapEditorSize[] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
];

const SizedEditorCard = ({ size }: { size: TiptapEditorSize }) => {
  const editor = useKuzenboEditor({
    content: "<p>Size-aware editor controls and content spacing.</p>",
    preset: "document",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-[min(100%,64rem)] rounded-md border border-border bg-background p-3">
      <div className="mb-2 text-xs font-medium text-muted-foreground uppercase">
        {size}
      </div>
      <TiptapEditor.Root editor={editor} size={size}>
        <TiptapEditor.Toolbar>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Bold />
            <TiptapEditor.Italic />
            <TiptapEditor.Underline />
            <TiptapEditor.Link />
          </TiptapEditor.ControlsGroup>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Undo />
            <TiptapEditor.Redo />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
        <TiptapEditor.Content />
      </TiptapEditor.Root>
    </div>
  );
};

const SizesEditor = () => (
  <div className="grid gap-4">
    {TIPTAP_SIZE_ORDER.map((size) => (
      <SizedEditorCard key={size} size={size} />
    ))}
  </div>
);

export default {
  ...baseMeta,
  title: "Tiptap/TiptapEditor/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = {
  args: {},
  render: () => <SizesEditor />,
};
