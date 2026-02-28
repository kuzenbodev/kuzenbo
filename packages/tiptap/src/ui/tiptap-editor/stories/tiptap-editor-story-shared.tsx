import { Badge } from "@kuzenbo/core/ui/badge";
import { Typography } from "@kuzenbo/core/ui/typography";
import type { Meta, StoryObj } from "@storybook/react";
import type { JSONContent } from "@tiptap/core";
import { Markdown } from "@tiptap/markdown";
import { useMemo, useState } from "react";

import { createMarkdownAdapter } from "../../../editor/markdown-adapter";
import { useKuzenboEditor } from "../../../editor/use-kuzenbo-editor";
import { createMentionExtension } from "../../../extensions/mention";
import {
  createSlashExtension,
  type SlashCommandItem,
} from "../../../extensions/slash";
import { TiptapEditor } from "../tiptap-editor";

export const baseMeta = {
  title: "Tiptap/TiptapEditor",
  component: TiptapEditor.Content,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TiptapEditor.Content>;

type Story = StoryObj<typeof baseMeta>;

const slashItems: SlashCommandItem[] = [
  {
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
    description: "Insert paragraph",
    title: "Paragraph",
  },
  {
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 2 })
        .run();
    },
    description: "Insert heading level 2",
    title: "Heading 2",
  },
  {
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
    description: "Insert bullet list",
    title: "Bullet list",
  },
];

const DefaultEditor = () => {
  const editor = useKuzenboEditor({
    content:
      "<h2>Team Notes</h2><p>Compose rich text with composable Kuzenbo Tiptap primitives.</p>",
    preset: "document",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={"w-[min(100%,64rem)]"}>
      <TiptapEditor.Root editor={editor}>
        <TiptapEditor.Toolbar>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Bold />
            <TiptapEditor.Italic />
            <TiptapEditor.Underline />
            <TiptapEditor.Strike />
          </TiptapEditor.ControlsGroup>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.H1 />
            <TiptapEditor.H2 />
            <TiptapEditor.H3 />
          </TiptapEditor.ControlsGroup>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.BulletList />
            <TiptapEditor.OrderedList />
            <TiptapEditor.TaskList />
          </TiptapEditor.ControlsGroup>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Link />
            <TiptapEditor.Unlink />
            <TiptapEditor.InsertTable />
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

const ControlledHtmlEditor = () => {
  const [html, setHtml] = useState(
    "<p>Start editing and watch HTML output update.</p>"
  );
  const editor = useKuzenboEditor({
    content: html,
    onUpdate: (payload) => {
      setHtml(payload.html);
    },
    preset: "document",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={`${"w-[min(100%,64rem)]"} space-y-3`}>
      <TiptapEditor.Root editor={editor}>
        <TiptapEditor.Toolbar>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Bold />
            <TiptapEditor.Italic />
            <TiptapEditor.Underline />
            <TiptapEditor.Link />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
        <TiptapEditor.Content />
      </TiptapEditor.Root>
      <div className="border-border bg-muted/40 rounded-md border p-3">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="outline">HTML</Badge>
          <Typography.Small>Live output</Typography.Small>
        </div>
        <Typography.Text
          render={
            <pre className="border-border bg-background max-h-44 overflow-auto rounded-md border p-2 font-mono text-xs" />
          }
          variant="caption"
        >
          {html}
        </Typography.Text>
      </div>
    </div>
  );
};

const JsonModeEditor = () => {
  const [json, setJson] = useState<JSONContent>({
    content: [
      {
        content: [{ text: "Edit to inspect JSON shape.", type: "text" }],
        type: "paragraph",
      },
    ],
    type: "doc",
  });
  const editor = useKuzenboEditor({
    content: json,
    onUpdate: (payload) => {
      setJson(payload.json);
    },
    preset: "document",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={`${"w-[min(100%,64rem)]"} space-y-3`}>
      <TiptapEditor.Root editor={editor}>
        <TiptapEditor.Toolbar>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Bold />
            <TiptapEditor.Italic />
            <TiptapEditor.H2 />
            <TiptapEditor.BulletList />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
        <TiptapEditor.Content />
      </TiptapEditor.Root>
      <div className="border-border bg-muted/40 rounded-md border p-3">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="outline">JSON</Badge>
          <Typography.Small>Canonical persistence payload</Typography.Small>
        </div>
        <Typography.Text
          render={
            <pre className="border-border bg-background max-h-44 overflow-auto rounded-md border p-2 font-mono text-xs" />
          }
          variant="caption"
        >
          {JSON.stringify(json, null, 2)}
        </Typography.Text>
      </div>
    </div>
  );
};

const MarkdownModeEditor = () => {
  const markdownExtensions = useMemo(() => [Markdown], []);
  const [markdown, setMarkdown] = useState("");
  const editor = useKuzenboEditor({
    content: "<p>Markdown export mode is enabled.</p>",
    extensions: markdownExtensions,
    onUpdate: (payload) => {
      const adapter = createMarkdownAdapter(payload.editor);
      setMarkdown(adapter.serializeCurrent());
    },
    preset: "document",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={`${"w-[min(100%,64rem)]"} space-y-3`}>
      <TiptapEditor.Root editor={editor}>
        <TiptapEditor.Toolbar>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Bold />
            <TiptapEditor.Italic />
            <TiptapEditor.H2 />
            <TiptapEditor.Code />
            <TiptapEditor.CodeBlock />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
        <TiptapEditor.Content />
      </TiptapEditor.Root>
      <div className="border-border bg-muted/40 rounded-md border p-3">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="outline">Markdown</Badge>
          <Typography.Small>Live markdown export</Typography.Small>
        </div>
        <Typography.Text
          render={
            <pre className="border-border bg-background max-h-44 overflow-auto rounded-md border p-2 font-mono text-xs" />
          }
          variant="caption"
        >
          {markdown}
        </Typography.Text>
      </div>
    </div>
  );
};

const LinkPopoverEditor = () => {
  const editor = useKuzenboEditor({
    content: "<p>Select text, then open the link popover.</p>",
    preset: "document",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={"w-[min(100%,64rem)]"}>
      <TiptapEditor.Root editor={editor}>
        <TiptapEditor.Toolbar>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Bold />
            <TiptapEditor.Italic />
            <TiptapEditor.LinkPopover />
            <TiptapEditor.Unlink />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
        <TiptapEditor.Content />
      </TiptapEditor.Root>
    </div>
  );
};

const ColorEditor = () => {
  const editor = useKuzenboEditor({
    content: "<p>Highlight and color tools use semantic theme tokens.</p>",
    preset: "document",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={"w-[min(100%,64rem)]"}>
      <TiptapEditor.Root editor={editor}>
        <TiptapEditor.Toolbar>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Bold />
            <TiptapEditor.Italic />
            <TiptapEditor.Highlight />
            <TiptapEditor.ColorPicker />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
        <TiptapEditor.Content />
      </TiptapEditor.Root>
    </div>
  );
};

const TaskListEditor = () => {
  const editor = useKuzenboEditor({
    content: "<p>Press the task control to insert checklist items.</p>",
    preset: "document",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={"w-[min(100%,64rem)]"}>
      <TiptapEditor.Root editor={editor}>
        <TiptapEditor.Toolbar>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.TaskList />
            <TiptapEditor.BulletList />
            <TiptapEditor.OrderedList />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
        <TiptapEditor.Content />
      </TiptapEditor.Root>
    </div>
  );
};

const TableEditor = () => {
  const editor = useKuzenboEditor({
    content: "<p>Insert table from toolbar.</p>",
    preset: "document",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={"w-[min(100%,64rem)]"}>
      <TiptapEditor.Root editor={editor}>
        <TiptapEditor.Toolbar>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.InsertTable />
            <TiptapEditor.AlignLeft />
            <TiptapEditor.AlignCenter />
            <TiptapEditor.AlignRight />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
        <TiptapEditor.Content />
      </TiptapEditor.Root>
    </div>
  );
};

const MentionEditor = () => {
  const mentionExtension = useMemo(
    () =>
      createMentionExtension({
        items: async (query) => {
          const users = [
            { id: "ava", label: "Ava Lane" },
            { id: "leo", label: "Leo Chen" },
            { id: "mia", label: "Mia Gomez" },
          ];

          return users.filter((user) =>
            user.label.toLowerCase().includes(query.toLowerCase())
          );
        },
      }),
    []
  );
  const editor = useKuzenboEditor({
    content: "<p>Type @ to trigger mention suggestions.</p>",
    extensions: [mentionExtension],
    preset: "comment",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={"w-[min(100%,64rem)]"}>
      <TiptapEditor.Root editor={editor}>
        <TiptapEditor.Toolbar>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Bold />
            <TiptapEditor.Italic />
            <TiptapEditor.Underline />
            <TiptapEditor.Link />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
        <TiptapEditor.Content />
      </TiptapEditor.Root>
    </div>
  );
};

const SlashEditor = () => {
  const slashExtension = useMemo(
    () =>
      createSlashExtension({
        items: slashItems,
      }),
    []
  );
  const editor = useKuzenboEditor({
    content: "<p>Type / to open slash command suggestions.</p>",
    extensions: [slashExtension],
    preset: "document",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={"w-[min(100%,64rem)]"}>
      <TiptapEditor.Root editor={editor}>
        <TiptapEditor.Toolbar>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.H2 />
            <TiptapEditor.BulletList />
            <TiptapEditor.OrderedList />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
        <TiptapEditor.Content />
      </TiptapEditor.Root>
    </div>
  );
};

const StickyToolbarEditor = () => {
  const editor = useKuzenboEditor({
    content:
      "<h2>Sticky Toolbar Demo</h2><p>This scenario validates sticky toolbar composition.</p><p>Scroll to keep the toolbar pinned while editing content.</p><p>Kuzenbo semantic tokens style the whole editor surface.</p><p>Add more text to continue scrolling behavior checks.</p><p>Line 5</p><p>Line 6</p><p>Line 7</p><p>Line 8</p><p>Line 9</p><p>Line 10</p>",
    preset: "document",
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      className={`${"w-[min(100%,64rem)]"} border-border max-h-[24rem] overflow-auto rounded-md border p-3`}
    >
      <TiptapEditor.Root editor={editor}>
        <TiptapEditor.Toolbar sticky stickyOffset={0}>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Bold />
            <TiptapEditor.Italic />
            <TiptapEditor.Underline />
            <TiptapEditor.H2 />
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

const ResponsiveToolbarEditor = () => {
  const editor = useKuzenboEditor({
    content: "<p>Resize viewport to validate toolbar wrapping behavior.</p>",
    preset: "document",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-[min(100%,30rem)]">
      <TiptapEditor.Root editor={editor}>
        <TiptapEditor.Toolbar className="flex-wrap gap-2">
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Bold />
            <TiptapEditor.Italic />
            <TiptapEditor.Underline />
          </TiptapEditor.ControlsGroup>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.H1 />
            <TiptapEditor.H2 />
            <TiptapEditor.H3 />
          </TiptapEditor.ControlsGroup>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.BulletList />
            <TiptapEditor.OrderedList />
            <TiptapEditor.TaskList />
          </TiptapEditor.ControlsGroup>
          <TiptapEditor.ControlsGroup>
            <TiptapEditor.LinkPopover />
            <TiptapEditor.ColorPicker />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
        <TiptapEditor.Content />
      </TiptapEditor.Root>
    </div>
  );
};

export const Default: Story = {
  args: {},
  render: () => <DefaultEditor />,
};

export const ControlledHtml: Story = {
  args: {},
  render: () => <ControlledHtmlEditor />,
};

export const JsonMode: Story = {
  args: {},
  render: () => <JsonModeEditor />,
};

export const MarkdownMode: Story = {
  args: {},
  render: () => <MarkdownModeEditor />,
};

export const LinkPopover: Story = {
  args: {},
  render: () => <LinkPopoverEditor />,
};

export const Color: Story = {
  args: {},
  render: () => <ColorEditor />,
};

export const TaskList: Story = {
  args: {},
  render: () => <TaskListEditor />,
};

export const Table: Story = {
  args: {},
  render: () => <TableEditor />,
};

export const Mention: Story = {
  args: {},
  render: () => <MentionEditor />,
};

export const Slash: Story = {
  args: {},
  render: () => <SlashEditor />,
};

export const ToolbarSticky: Story = {
  args: {},
  render: () => <StickyToolbarEditor />,
};

export const ToolbarResponsive: Story = {
  args: {},
  render: () => <ResponsiveToolbarEditor />,
};
