import type { Meta, StoryObj } from "@storybook/react";

import { Dropzone } from "../dropzone";

const handleDrop = (files: File[]) => files.length;

const contractDocumentTypes = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
};

const planningSheetTypes = {
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
  "text/csv": [".csv"],
};

export const baseMeta = {
  title: "Components/Dropzone",
  component: Dropzone,
  tags: ["autodocs"],
} satisfies Meta<typeof Dropzone>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    onDrop: handleDrop,
    multiple: false,
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    accept: contractDocumentTypes,
  },
  render: (args) => (
    <Dropzone className="w-[360px]" {...args}>
      <Dropzone.Idle>
        <div className="grid gap-1 text-center">
          <div className="text-sm font-medium">Upload signed contract</div>
          <div className="text-muted-foreground text-xs">
            PDF or DOCX, up to 10MB.
          </div>
        </div>
      </Dropzone.Idle>
      <Dropzone.Accept>
        <div className="text-center text-sm">
          Ready to submit to legal review.
        </div>
      </Dropzone.Accept>
      <Dropzone.Reject>
        <div className="text-center text-sm">
          File type or size is not valid for contract intake.
        </div>
      </Dropzone.Reject>
    </Dropzone>
  ),
};

export const MultipleFiles: Story = {
  args: {
    onDrop: handleDrop,
    multiple: true,
    maxFiles: 6,
    maxSize: 15 * 1024 * 1024,
    accept: planningSheetTypes,
  },
  render: (args) => (
    <Dropzone className="w-[420px]" variant="filled" {...args}>
      <Dropzone.Idle>
        <div className="grid gap-1 text-center">
          <div className="text-sm font-medium">Upload forecasting batch</div>
          <div className="text-muted-foreground text-xs">
            Add up to 6 planning sheets for consolidated approval analysis.
          </div>
        </div>
      </Dropzone.Idle>
      <Dropzone.Accept>
        <div className="text-center text-sm">All selected files are valid.</div>
      </Dropzone.Accept>
      <Dropzone.Reject>
        <div className="text-center text-sm">
          One or more files do not meet spreadsheet intake rules.
        </div>
      </Dropzone.Reject>
    </Dropzone>
  ),
};

export const RejectedFiles: Story = {
  args: {
    onDrop: handleDrop,
    status: "reject",
    multiple: false,
    maxFiles: 1,
    accept: contractDocumentTypes,
  },
  render: (args) => (
    <Dropzone className="w-[360px]" variant="filled" {...args}>
      <div className="grid gap-1 text-center">
        <div className="text-sm font-medium">Submission rejected</div>
        <div className="text-danger-foreground text-xs">
          Contract upload must be a PDF or DOCX under 10MB.
        </div>
      </div>
    </Dropzone>
  ),
};
