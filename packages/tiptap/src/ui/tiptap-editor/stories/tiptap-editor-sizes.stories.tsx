import type { StoryObj } from "@storybook/react";

import { useKuzenboEditor } from "../../../editor/use-kuzenbo-editor";
import type { TiptapEditorSize } from "../tiptap-editor";
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
    <div className="border-border bg-background w-[min(100%,64rem)] rounded-md border p-3">
      <div className="text-muted-foreground mb-2 text-xs font-medium uppercase">
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
