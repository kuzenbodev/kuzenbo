import {
  Folder01Icon,
  Home01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Meta, StoryObj } from "@storybook/react";

import type { InputSize } from "../../input/input";
import { Sidebar } from "../sidebar";
import { SidebarInset } from "../sidebar-inset";
import { SidebarProvider } from "../sidebar-provider";
import { SidebarTrigger } from "../sidebar-trigger";

const sizes: InputSize[] = ["xs", "sm", "md", "lg", "xl"];

export const baseMeta = {
  title: "Components/Sidebar",
  component: SidebarProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          '`Sidebar.Input` keeps compact `size="sm"` by default, and `SidebarMenu`/`SidebarMenu*` surfaces share the `xs|sm|md|lg|xl` size contract with child override precedence.',
      },
    },
  },
} satisfies Meta<typeof SidebarProvider>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton isActive tooltip="Dashboard">
                    <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
                    <span>Dashboard</span>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton tooltip="Projects">
                    <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} />
                    <span>Projects</span>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton tooltip="Settings">
                    <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} />
                    <span>Settings</span>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div>Operations dashboard</div>
        </header>
        <main className="flex-1 p-4">Main content area</main>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const CollapsibleGroups: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Operations</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton isActive>
                    Incident Center
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton>Deployments</Sidebar.MenuButton>
                  <Sidebar.MenuSub>
                    <Sidebar.MenuSubItem>
                      <Sidebar.MenuSubButton href="/workspace/acme/deployments/staging">
                        Staging
                      </Sidebar.MenuSubButton>
                    </Sidebar.MenuSubItem>
                    <Sidebar.MenuSubItem>
                      <Sidebar.MenuSubButton href="/workspace/acme/deployments/production">
                        Production
                      </Sidebar.MenuSubButton>
                    </Sidebar.MenuSubItem>
                  </Sidebar.MenuSub>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>

          <Sidebar.Separator />

          <Sidebar.Group>
            <Sidebar.GroupLabel>Admin</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton>Members</Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton>Roles and permissions</Sidebar.MenuButton>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div>Team administration</div>
        </header>
        <main className="flex-1 p-4">Manage org-level settings</main>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const IconOnlyCollapsed: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton isActive tooltip="Dashboard">
                    <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
                    <span>Dashboard</span>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton tooltip="Projects">
                    <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} />
                    <span>Projects</span>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton tooltip="Settings">
                    <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} />
                    <span>Settings</span>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div>Collapsed icon rail</div>
        </header>
        <main className="flex-1 p-4">
          Use the trigger to preview expanded and icon-only states.
        </main>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const MenuSizes: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="none">
        <Sidebar.Content className="p-3">
          <div className="space-y-4">
            {sizes.map((size) => (
              <div className="border-border rounded-md border p-2" key={size}>
                <Sidebar.Menu size={size}>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      Workspace menu ({size})
                    </Sidebar.MenuButton>
                    <Sidebar.MenuAction aria-label="Open actions">
                      +
                    </Sidebar.MenuAction>
                    <Sidebar.MenuBadge>3</Sidebar.MenuBadge>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuSub>
                    <Sidebar.MenuSubItem>
                      <Sidebar.MenuSubButton href="/workspace/acme/reports">
                        Reports
                      </Sidebar.MenuSubButton>
                    </Sidebar.MenuSubItem>
                  </Sidebar.MenuSub>
                </Sidebar.Menu>
              </div>
            ))}
          </div>
        </Sidebar.Content>
      </Sidebar>
      <SidebarInset className="text-muted-foreground p-4 text-sm">
        Sidebar menu size examples
      </SidebarInset>
    </SidebarProvider>
  ),
};
