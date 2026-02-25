import type { Meta, StoryObj } from "@storybook/react";

import type { InputSize } from "../../input/input";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../navigation-menu";

const sizes: InputSize[] = ["xs", "sm", "md", "lg", "xl"];

export const baseMeta = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "NavigationMenu applies one size token contract to triggers, list spacing, popup/content, indicator, and link rows.",
      },
    },
  },
} satisfies Meta<typeof NavigationMenu>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="workspace">
          <NavigationMenuTrigger>Workspace</NavigationMenuTrigger>
          <NavigationMenuContent className="w-72">
            <NavigationMenuLink href="/workspace/acme/overview">
              Overview
            </NavigationMenuLink>
            <NavigationMenuLink href="/workspace/acme/incidents">
              Incident Center
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/workspace/acme/billing">
            Billing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithSections: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="platform">
          <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
          <NavigationMenuContent className="w-72">
            <NavigationMenuLink href="/workspace/acme/deployments">
              Deployments
            </NavigationMenuLink>
            <NavigationMenuLink href="/workspace/acme/logs">
              Logs
            </NavigationMenuLink>
            <NavigationMenuLink href="/workspace/acme/alerts">
              Alerts
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="team">
          <NavigationMenuTrigger>Team</NavigationMenuTrigger>
          <NavigationMenuContent className="w-72">
            <NavigationMenuLink href="/workspace/acme/members">
              Members
            </NavigationMenuLink>
            <NavigationMenuLink href="/workspace/acme/roles">
              Roles
            </NavigationMenuLink>
            <NavigationMenuLink href="/workspace/acme/audit-log">
              Audit log
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const MobileCollapsed: Story = {
  render: () => (
    <div className="w-72 rounded-lg border border-border p-3">
      <NavigationMenu size="sm">
        <NavigationMenuList className="w-full justify-between gap-2">
          <NavigationMenuItem value="workspace">
            <NavigationMenuTrigger>Workspace</NavigationMenuTrigger>
            <NavigationMenuContent className="w-64">
              <NavigationMenuLink href="/workspace/acme/overview">
                Overview
              </NavigationMenuLink>
              <NavigationMenuLink href="/workspace/acme/incidents">
                Incident Center
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/workspace/acme/settings">
              Settings
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-[32rem] flex-col gap-8">
      {sizes.map((size) => {
        const value = `navigation-size-${size}`;

        return (
          <NavigationMenu key={size} size={size}>
            <NavigationMenuList>
              <NavigationMenuItem value={value}>
                <NavigationMenuTrigger>
                  Command center ({size})
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-72">
                  <NavigationMenuLink href="/workspace/acme/tasks">
                    Active tasks
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/workspace/acme/reports">
                    Weekly reports
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        );
      })}
    </div>
  ),
};

export const Anatomy: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenu.List>
        <NavigationMenu.Item value="platform">
          <NavigationMenu.Trigger>Platform</NavigationMenu.Trigger>
          <NavigationMenu.Content className="w-72">
            <NavigationMenu.Link href="/workspace/acme/overview">
              Overview
            </NavigationMenu.Link>
            <NavigationMenu.Link href="/workspace/acme/integrations">
              Integrations
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Backdrop />
        <NavigationMenu.Positioner>
          <NavigationMenu.Popup>
            <NavigationMenu.Arrow />
            <NavigationMenu.Viewport />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu>
  ),
};
