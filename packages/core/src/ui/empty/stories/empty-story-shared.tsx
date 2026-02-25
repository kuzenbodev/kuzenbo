import type { Meta, StoryObj } from "@storybook/react";

import {
  ArrowUpRight01Icon,
  CloudUploadIcon,
  FolderAddIcon,
  Notification03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Empty, type EmptyProps } from "../empty";

const emptySizes: NonNullable<EmptyProps["size"]>[] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
];

export const baseMeta = {
  title: "Components/Empty",
  component: Empty,
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Empty>
      <Empty.Header>
        <Empty.Media variant="icon">
          <HugeiconsIcon icon={FolderAddIcon} />
        </Empty.Media>
        <Empty.Title>No Projects Yet</Empty.Title>
        <Empty.Description>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Empty.Button>Create Project</Empty.Button>
          <Empty.Button variant="outline">Import Project</Empty.Button>
        </div>
        <Empty.Button
          nativeButton={false}
          render={
            <a aria-label="Learn more about projects" href="/docs/projects" />
          }
          variant="link"
        >
          Learn more about projects
        </Empty.Button>
      </Empty.Content>
    </Empty>
  ),
};

export const Outline: Story = {
  render: () => (
    <Empty className="border border-dashed">
      <Empty.Header>
        <Empty.Media variant="icon">
          <HugeiconsIcon icon={CloudUploadIcon} />
        </Empty.Media>
        <Empty.Title>Cloud Storage Empty</Empty.Title>
        <Empty.Description>
          Upload files to your cloud storage to access them anywhere.
        </Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <Empty.Button>Upload Files</Empty.Button>
      </Empty.Content>
    </Empty>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <Empty className="rounded-lg bg-muted/50">
      <Empty.Header>
        <Empty.Media variant="icon">
          <HugeiconsIcon icon={Notification03Icon} />
        </Empty.Media>
        <Empty.Title>No Notifications</Empty.Title>
        <Empty.Description>
          You&apos;re all caught up. New notifications will appear here.
        </Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <Empty.Button variant="outline">Refresh</Empty.Button>
      </Empty.Content>
    </Empty>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Empty>
      <Empty.Header>
        <Empty.Title>No items</Empty.Title>
        <Empty.Description>
          Get started by creating a new item.
        </Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <Empty.Button>Add Item</Empty.Button>
      </Empty.Content>
    </Empty>
  ),
};

export const WithLink: Story = {
  render: () => (
    <Empty>
      <Empty.Header>
        <Empty.Media variant="icon">
          <HugeiconsIcon icon={FolderAddIcon} />
        </Empty.Media>
        <Empty.Title>No data</Empty.Title>
        <Empty.Description>
          No data found.{" "}
          <Empty.Button
            className="inline-flex items-center gap-1"
            nativeButton={false}
            render={<a aria-label="Browse docs" href="/docs" />}
            variant="link"
          >
            Browse docs
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-3" />
          </Empty.Button>
        </Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <Empty.Button>Add data</Empty.Button>
      </Empty.Content>
    </Empty>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-4">
      {emptySizes.map((size) => (
        <Empty
          className="border border-dashed border-border"
          key={size}
          size={size}
        >
          <Empty.Header>
            <Empty.Media variant="icon">
              <HugeiconsIcon icon={FolderAddIcon} />
            </Empty.Media>
            <Empty.Title>No Data ({size})</Empty.Title>
            <Empty.Description>
              Empty state spacing and typography are scaled using the shared
              size token.
            </Empty.Description>
          </Empty.Header>
          <Empty.Content>
            <Empty.Button>Create Item</Empty.Button>
          </Empty.Content>
        </Empty>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Empty size scales root density, slot spacing, and icon/media treatment from xs to xl.",
      },
    },
  },
};
