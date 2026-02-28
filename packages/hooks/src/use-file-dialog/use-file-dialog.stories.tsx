import type { Meta, StoryObj } from "@storybook/react";
import { useCallback } from "react";

import { useFileDialog } from "./use-file-dialog";

const meta = {
  title: "hooks/use-file-dialog",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const UsageStory = () => {
  const handleChange = useCallback((selectedFiles: FileList | null) => {
    console.log({
      selectedFiles: selectedFiles ? [...selectedFiles] : [],
    });
  }, []);

  const { open, files } = useFileDialog({
    onChange: handleChange,
  });

  console.log(files);

  return (
    <div style={{ padding: 40 }}>
      <button type="button" onClick={open}>
        Open
      </button>
    </div>
  );
};

export const Usage: Story = {
  render: UsageStory,
};
