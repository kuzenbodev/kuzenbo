import { SearchIcon, StarIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Meta, StoryObj } from "@storybook/react";

import { Breadcrumb } from "../breadcrumb";
import type { BreadcrumbProps } from "../breadcrumb";

const breadcrumbSizes: NonNullable<BreadcrumbProps["size"]>[] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
];

export const baseMeta = {
  component: Breadcrumb,
  tags: ["autodocs"],
  title: "Components/Breadcrumb",
} satisfies Meta<typeof Breadcrumb>;

type Story = StoryObj<typeof baseMeta>;

const renderDefaultTrail = ({
  size = "md",
  currentPage = "Current page",
}: {
  size?: BreadcrumbProps["size"];
  currentPage?: string;
}) => (
  <Breadcrumb size={size}>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Workspace</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>
          {currentPage} ({size})
        </Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb>
);

export const Default: Story = {
  render: () => renderDefaultTrail({ currentPage: "Breadcrumb docs" }),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Breadcrumb size scales list typography, item spacing, and separator/ellipsis icon metrics from xs to xl.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {breadcrumbSizes.map((size) => (
        <div key={size}>
          {renderDefaultTrail({ currentPage: "Live preview", size })}
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use icon + label links for dense workspace navigation without changing breadcrumb semantics.",
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link
            className="inline-flex items-center gap-1.5"
            href="/workspace"
          >
            <HugeiconsIcon
              className="size-4"
              icon={SearchIcon}
              strokeWidth={2}
            />
            Workspace
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link
            className="inline-flex items-center gap-1.5"
            href="/workspace/favorites"
          >
            <HugeiconsIcon className="size-4" icon={StarIcon} strokeWidth={2} />
            Favorites
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page className="inline-flex items-center gap-1.5">
            <HugeiconsIcon
              className="size-4"
              icon={Tick02Icon}
              strokeWidth={2}
            />
            Saved filters
          </Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  ),
};

export const WithOverflow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Collapse deep breadcrumb hierarchies with an explicit ellipsis item while preserving first and current page context.",
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Store</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/store/travel">Travel</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Ellipsis />
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/store/travel/luggage">
            Carry-on luggage
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Expandable organizer set</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  ),
};
