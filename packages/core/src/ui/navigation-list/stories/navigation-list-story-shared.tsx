import type { Meta, StoryObj } from "@storybook/react";

import {
  Add01Icon,
  Analytics01Icon,
  ArrowUpRight01Icon,
  CreditCardIcon,
  Folder01Icon,
  Home01Icon,
  InboxIcon,
  MoreHorizontalIcon,
  SecurityCheckIcon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { UISize } from "../../shared/size/size-system";

import { NavigationList } from "../navigation-list";

const sizes: UISize[] = ["xs", "sm", "md", "lg", "xl"];

export const baseMeta = {
  title: "Components/NavigationList",
  component: NavigationList,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
    tone: {
      control: "radio",
      options: ["surface", "sidebar"],
    },
    variant: {
      control: "radio",
      options: ["subtle", "light", "filled"],
    },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "NavigationList provides aside navigation rows with Kuzenbo compound composition, size cascade, tone variants, and optional collapsible nesting.",
      },
    },
  },
} satisfies Meta<typeof NavigationList>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <NavigationList className="w-72">
      <NavigationList.Content>
        <NavigationList.Group>
          <NavigationList.GroupLabel>Main</NavigationList.GroupLabel>
          <NavigationList.GroupContent>
            <NavigationList.Item>
              <NavigationList.Link
                active
                description="Daily operations overview"
                href="/workspace/acme/dashboard"
                label="Dashboard"
                leftSection={
                  <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
                }
              />
            </NavigationList.Item>

            <NavigationList.Item collapsible defaultOpened>
              <NavigationList.Link
                label="Projects"
                leftSection={
                  <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} />
                }
              />
              <NavigationList.Badge>12</NavigationList.Badge>
              <NavigationList.Sub>
                <NavigationList.SubItem>
                  <NavigationList.SubLink
                    active
                    href="/workspace/acme/projects/active"
                  >
                    Active
                  </NavigationList.SubLink>
                </NavigationList.SubItem>
                <NavigationList.SubItem>
                  <NavigationList.SubLink href="/workspace/acme/projects/archived">
                    Archived
                  </NavigationList.SubLink>
                </NavigationList.SubItem>
              </NavigationList.Sub>
            </NavigationList.Item>

            <NavigationList.Item>
              <NavigationList.Link
                href="/workspace/acme/settings"
                label="Settings"
                leftSection={
                  <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} />
                }
              />
            </NavigationList.Item>
          </NavigationList.GroupContent>
        </NavigationList.Group>
      </NavigationList.Content>
    </NavigationList>
  ),
};

export const Anatomy: Story = {
  render: () => (
    <NavigationList className="w-80" tone="surface" variant="light">
      <NavigationList.Content>
        <NavigationList.Group>
          <NavigationList.GroupLabel>Navigation</NavigationList.GroupLabel>
          <NavigationList.GroupContent>
            <NavigationList.Item>
              <NavigationList.Link
                active
                href="/workspace/acme/home"
                label="Home"
                leftSection={
                  <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
                }
              />
              <NavigationList.Badge>New</NavigationList.Badge>
            </NavigationList.Item>

            <NavigationList.Item collapsible defaultOpened>
              <NavigationList.Link
                label="Projects"
                leftSection={
                  <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} />
                }
              />
              <NavigationList.Action aria-label="More actions" showOnHover>
                <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
              </NavigationList.Action>
              <NavigationList.Sub>
                <NavigationList.SubItem>
                  <NavigationList.SubLink
                    active
                    href="/workspace/acme/projects/active"
                  >
                    Active
                  </NavigationList.SubLink>
                </NavigationList.SubItem>
                <NavigationList.SubItem>
                  <NavigationList.SubLink href="/workspace/acme/projects/archived">
                    Archived
                  </NavigationList.SubLink>
                </NavigationList.SubItem>
              </NavigationList.Sub>
            </NavigationList.Item>
          </NavigationList.GroupContent>
        </NavigationList.Group>

        <NavigationList.Separator />

        <NavigationList.Item>
          <NavigationList.Skeleton showIcon />
        </NavigationList.Item>
      </NavigationList.Content>
    </NavigationList>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <NavigationList className="w-80" tone="sidebar" variant="light">
      <NavigationList.Content>
        <NavigationList.Group>
          <NavigationList.GroupLabel>Workspace</NavigationList.GroupLabel>
          <NavigationList.GroupContent>
            <NavigationList.Item collapsible defaultOpened>
              <NavigationList.Link
                label="Projects"
                leftSection={
                  <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} />
                }
              />
              <NavigationList.Action aria-label="Add project" showOnHover>
                <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
              </NavigationList.Action>
              <NavigationList.Sub>
                <NavigationList.SubItem>
                  <NavigationList.SubLink
                    active
                    href="/workspace/acme/projects/frontend"
                  >
                    Frontend
                  </NavigationList.SubLink>
                </NavigationList.SubItem>
                <NavigationList.SubItem>
                  <NavigationList.SubLink href="/workspace/acme/projects/backend">
                    Backend
                  </NavigationList.SubLink>
                </NavigationList.SubItem>
              </NavigationList.Sub>
            </NavigationList.Item>
            <NavigationList.Item collapsible>
              <NavigationList.Link
                label="Analytics"
                leftSection={
                  <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} />
                }
              />
              <NavigationList.Sub>
                <NavigationList.SubItem>
                  <NavigationList.SubLink href="/workspace/acme/analytics/funnels">
                    Funnels
                  </NavigationList.SubLink>
                </NavigationList.SubItem>
              </NavigationList.Sub>
            </NavigationList.Item>
          </NavigationList.GroupContent>
        </NavigationList.Group>
      </NavigationList.Content>
    </NavigationList>
  ),
};

export const FullApplication: Story = {
  render: () => (
    <NavigationList className="w-96" tone="sidebar" variant="light">
      <NavigationList.Content>
        <NavigationList.Group>
          <NavigationList.GroupLabel>Workspace</NavigationList.GroupLabel>
          <NavigationList.GroupContent>
            <NavigationList.Item>
              <NavigationList.Link
                active
                description="Release health, incidents, and tasks"
                href="/workspace/acme/dashboard"
                label="Dashboard"
                leftSection={
                  <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
                }
              />
            </NavigationList.Item>

            <NavigationList.Item collapsible defaultOpened>
              <NavigationList.Link
                description="Roadmaps, backlogs, and active delivery"
                label="Projects"
                leftSection={
                  <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} />
                }
              />
              <NavigationList.Badge>12</NavigationList.Badge>
              <NavigationList.Action aria-label="Create project" showOnHover>
                <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
              </NavigationList.Action>
              <NavigationList.Sub>
                <NavigationList.SubItem>
                  <NavigationList.SubLink
                    active
                    href="/workspace/acme/projects/core-platform"
                  >
                    Core Platform
                  </NavigationList.SubLink>
                </NavigationList.SubItem>
                <NavigationList.SubItem>
                  <NavigationList.SubLink href="/workspace/acme/projects/website-revamp">
                    Website Revamp
                  </NavigationList.SubLink>
                </NavigationList.SubItem>
                <NavigationList.SubItem>
                  <NavigationList.SubLink href="/workspace/acme/projects/mobile-app">
                    Mobile App
                  </NavigationList.SubLink>
                </NavigationList.SubItem>
              </NavigationList.Sub>
            </NavigationList.Item>

            <NavigationList.Item collapsible>
              <NavigationList.Link
                description="Invoices, usage, and card management"
                label="Billing"
                leftSection={
                  <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} />
                }
              />
              <NavigationList.Sub>
                <NavigationList.SubItem>
                  <NavigationList.SubLink href="/workspace/acme/billing/invoices">
                    Invoices
                  </NavigationList.SubLink>
                </NavigationList.SubItem>
                <NavigationList.SubItem>
                  <NavigationList.SubLink href="/workspace/acme/billing/payment-methods">
                    Payment Methods
                  </NavigationList.SubLink>
                </NavigationList.SubItem>
              </NavigationList.Sub>
            </NavigationList.Item>
          </NavigationList.GroupContent>
        </NavigationList.Group>

        <NavigationList.Separator />

        <NavigationList.Group>
          <NavigationList.GroupLabel>Support</NavigationList.GroupLabel>
          <NavigationList.GroupContent>
            <NavigationList.Item>
              <NavigationList.Link
                href="/workspace/acme/support/knowledge-base"
                label="Knowledge Base"
                rightSection={
                  <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} />
                }
              />
            </NavigationList.Item>
            <NavigationList.Item disabled>
              <NavigationList.Link
                description="Available on enterprise plan"
                label="Security Center"
              />
            </NavigationList.Item>
          </NavigationList.GroupContent>
        </NavigationList.Group>

        <NavigationList.Separator />

        <NavigationList.Item>
          <NavigationList.Skeleton showIcon />
        </NavigationList.Item>
      </NavigationList.Content>
    </NavigationList>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      {sizes.map((size) => (
        <NavigationList className="w-full" key={size} size={size}>
          <NavigationList.Content>
            <NavigationList.Group>
              <NavigationList.GroupLabel>
                {size.toUpperCase()}
              </NavigationList.GroupLabel>
              <NavigationList.GroupContent>
                <NavigationList.Item>
                  <NavigationList.Link
                    active
                    href="/workspace/acme/overview"
                    label={`Overview (${size})`}
                  />
                </NavigationList.Item>
                <NavigationList.Item collapsible defaultOpened>
                  <NavigationList.Link label="Projects" />
                  <NavigationList.Sub>
                    <NavigationList.SubItem>
                      <NavigationList.SubLink href="/workspace/acme/projects/active">
                        Active
                      </NavigationList.SubLink>
                    </NavigationList.SubItem>
                  </NavigationList.Sub>
                </NavigationList.Item>
              </NavigationList.GroupContent>
            </NavigationList.Group>
          </NavigationList.Content>
        </NavigationList>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <NavigationList className="w-full" tone="surface" variant="light">
        <NavigationList.Content>
          <NavigationList.Group>
            <NavigationList.GroupLabel>Surface</NavigationList.GroupLabel>
            <NavigationList.GroupContent>
              <NavigationList.Item>
                <NavigationList.Link
                  active
                  href="/workspace/acme/overview"
                  label="Overview"
                />
              </NavigationList.Item>
              <NavigationList.Item>
                <NavigationList.Link
                  href="/workspace/acme/usage"
                  label="Usage"
                />
              </NavigationList.Item>
            </NavigationList.GroupContent>
          </NavigationList.Group>
        </NavigationList.Content>
      </NavigationList>

      <NavigationList className="w-full" tone="sidebar" variant="light">
        <NavigationList.Content>
          <NavigationList.Group>
            <NavigationList.GroupLabel>Sidebar</NavigationList.GroupLabel>
            <NavigationList.GroupContent>
              <NavigationList.Item>
                <NavigationList.Link
                  active
                  href="/workspace/acme/overview"
                  label="Overview"
                />
              </NavigationList.Item>
              <NavigationList.Item>
                <NavigationList.Link
                  href="/workspace/acme/usage"
                  label="Usage"
                />
              </NavigationList.Item>
            </NavigationList.GroupContent>
          </NavigationList.Group>
        </NavigationList.Content>
      </NavigationList>
    </div>
  ),
};

export const UseCases: Story = {
  render: () => (
    <div className="grid max-w-6xl gap-4 lg:grid-cols-3">
      <NavigationList
        className="w-full"
        size="sm"
        tone="surface"
        variant="subtle"
      >
        <NavigationList.Content>
          <NavigationList.Group>
            <NavigationList.GroupLabel>Docs sidebar</NavigationList.GroupLabel>
            <NavigationList.GroupContent>
              <NavigationList.Item>
                <NavigationList.Link
                  active
                  href="/docs/getting-started"
                  label="Getting started"
                />
              </NavigationList.Item>
              <NavigationList.Item collapsible defaultOpened>
                <NavigationList.Link label="Components" />
                <NavigationList.Badge>56</NavigationList.Badge>
                <NavigationList.Sub>
                  <NavigationList.SubItem>
                    <NavigationList.SubLink
                      active
                      href="/docs/components/navigation-list"
                    >
                      NavigationList
                    </NavigationList.SubLink>
                  </NavigationList.SubItem>
                  <NavigationList.SubItem>
                    <NavigationList.SubLink href="/docs/components/sidebar">
                      Sidebar
                    </NavigationList.SubLink>
                  </NavigationList.SubItem>
                  <NavigationList.SubItem>
                    <NavigationList.SubLink href="/docs/components/autocomplete">
                      Autocomplete
                    </NavigationList.SubLink>
                  </NavigationList.SubItem>
                </NavigationList.Sub>
              </NavigationList.Item>
              <NavigationList.Item collapsible>
                <NavigationList.Link label="Hooks" />
                <NavigationList.Sub keepMounted={false}>
                  <NavigationList.SubItem>
                    <NavigationList.SubLink href="/docs/hooks/use-disclosure">
                      useDisclosure
                    </NavigationList.SubLink>
                  </NavigationList.SubItem>
                </NavigationList.Sub>
              </NavigationList.Item>
            </NavigationList.GroupContent>
          </NavigationList.Group>
        </NavigationList.Content>
      </NavigationList>

      <NavigationList className="w-full" tone="sidebar" variant="light">
        <NavigationList.Content>
          <NavigationList.Group>
            <NavigationList.GroupLabel>Team inbox</NavigationList.GroupLabel>
            <NavigationList.GroupContent>
              <NavigationList.Item>
                <NavigationList.Link
                  href="/workspace/acme/inbox"
                  label="Inbox"
                  leftSection={
                    <HugeiconsIcon icon={InboxIcon} strokeWidth={2} />
                  }
                />
                <NavigationList.Badge>9</NavigationList.Badge>
              </NavigationList.Item>
              <NavigationList.Item>
                <NavigationList.Link
                  href="/workspace/acme/approvals"
                  label="Approvals"
                  rightSection={<span aria-hidden="true">⌘K</span>}
                />
              </NavigationList.Item>
              <NavigationList.Item disabled>
                <NavigationList.Link
                  description="Admin role required"
                  label="Audit logs"
                  leftSection={
                    <HugeiconsIcon icon={SecurityCheckIcon} strokeWidth={2} />
                  }
                />
              </NavigationList.Item>
            </NavigationList.GroupContent>
          </NavigationList.Group>

          <NavigationList.Separator />

          <NavigationList.Item>
            <NavigationList.Skeleton showIcon />
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>

      <NavigationList className="w-full" tone="surface" variant="filled">
        <NavigationList.Content>
          <NavigationList.Group>
            <NavigationList.GroupLabel>Settings hub</NavigationList.GroupLabel>
            <NavigationList.GroupContent>
              <NavigationList.Item>
                <NavigationList.Link
                  active
                  href="/workspace/acme/settings/general"
                  label="General"
                />
              </NavigationList.Item>
              <NavigationList.Item>
                <NavigationList.Link
                  href="/workspace/acme/settings/security"
                  label="Security"
                />
                <NavigationList.Action
                  aria-label="Open security actions"
                  showOnHover
                >
                  <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
                </NavigationList.Action>
              </NavigationList.Item>
              <NavigationList.Item>
                <NavigationList.Link
                  href="/workspace/acme/settings/integrations"
                  label="Integrations"
                />
                <NavigationList.Badge>New</NavigationList.Badge>
              </NavigationList.Item>
            </NavigationList.GroupContent>
          </NavigationList.Group>
        </NavigationList.Content>
      </NavigationList>
    </div>
  ),
};
