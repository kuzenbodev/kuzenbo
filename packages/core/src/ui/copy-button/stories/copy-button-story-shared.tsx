import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { CopyButton, type CopyButtonStatus } from "../copy-button";

export const baseMeta = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  args: {
    value: "pnpm add @kuzenbo/core @kuzenbo/theme",
    children: "Copy install command",
    timeout: 1200,
  },
  argTypes: {
    defaultStatus: {
      control: "select",
      options: ["idle", "copying", "copied", "failed"],
    },
    status: {
      control: "select",
      options: ["idle", "copying", "copied", "failed"],
    },
    timeout: { control: "number" },
  },
} satisfies Meta<typeof CopyButton>;

type Story = StoryObj<typeof baseMeta>;

interface ControlledStatusStoryProps {
  children: string;
  status: CopyButtonStatus;
  timeout: number;
  value: string;
}

const ControlledStatusStory = ({
  children,
  status,
  timeout,
  value,
}: ControlledStatusStoryProps) => {
  const [currentStatus, setCurrentStatus] = useState<CopyButtonStatus>(status);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <CopyButton
        onStatusChange={setCurrentStatus}
        status={currentStatus}
        timeout={timeout}
        value={value}
      >
        {children}
      </CopyButton>
      <span className="text-muted-foreground text-sm">
        Controlled status: {currentStatus}
      </span>
    </div>
  );
};

export const Default: Story = {};

export const ControlledStatus: Story = {
  args: {
    status: "idle",
  },
  render: ({ children, status, timeout, value }) => (
    <ControlledStatusStory
      status={status ?? "idle"}
      timeout={timeout ?? 1200}
      value={value}
    >
      {typeof children === "string" ? children : "Copy install command"}
    </ControlledStatusStory>
  ),
};

export const StatusMatrix: Story = {
  render: (args) => {
    const {
      defaultStatus: _defaultStatus,
      status: _status,
      ...restArgs
    } = args;

    return (
      <div className="grid w-full max-w-xl gap-2 sm:grid-cols-2">
        <CopyButton {...restArgs} status="idle">
          Idle status
        </CopyButton>
        <CopyButton {...restArgs} status="copying">
          Copying status
        </CopyButton>
        <CopyButton {...restArgs} status="copied">
          Copied status
        </CopyButton>
        <CopyButton {...restArgs} status="failed">
          Failed status
        </CopyButton>
      </div>
    );
  },
};
