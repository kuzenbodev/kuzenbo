import type { Meta, StoryObj } from "@storybook/react";

import { ScrollArea } from "../scroll-area";

const activityLog = [
  "09:04 - Finance approved PO-48213",
  "09:18 - Legal requested regional annex update",
  "09:27 - Vendor scorecard refreshed for Helios Labs",
  "09:41 - SLA alert acknowledged by operations",
  "09:53 - APAC onboarding checklist completed",
  "10:07 - Risk review assigned to compliance",
  "10:22 - Payment terms synced to ERP",
] as const;

const monthlyColumns = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] as const;
const monthlyRows = [
  {
    metric: "Approved spend",
    values: ["$620K", "$588K", "$644K", "$711K", "$690K", "$734K"],
  },
  { metric: "Contracts signed", values: ["21", "19", "24", "22", "26", "25"] },
  { metric: "Blocked requests", values: ["4", "6", "3", "2", "5", "3"] },
] as const;

const pendingItems = [
  "Legal sign-off for Nordic rollout",
  "Finance owner assignment for PO-48229",
  "Security questionnaire review",
  "Data-processing annex approval",
] as const;

export const baseMeta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="border-border bg-card h-52 w-[420px] rounded-md border">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className="grid gap-2 p-4 text-sm">
            {activityLog.map((event) => (
              <div className="bg-muted rounded-md p-2" key={event}>
                {event}
              </div>
            ))}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Bar />
      <ScrollArea.Corner />
    </ScrollArea>
  ),
};

export const HorizontalContent: Story = {
  render: () => (
    <ScrollArea className="border-border bg-card w-[420px] rounded-md border">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <table className="min-w-[720px] text-sm">
            <thead>
              <tr className="border-border border-b">
                <th className="p-3 text-left">Metric</th>
                {monthlyColumns.map((month) => (
                  <th className="p-3 text-left" key={month}>
                    {month}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyRows.map((row) => (
                <tr className="border-border border-b" key={row.metric}>
                  <td className="p-3 font-medium">{row.metric}</td>
                  {row.values.map((value) => (
                    <td className="p-3" key={`${row.metric}-${value}`}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Bar />
      <ScrollArea.Bar orientation="horizontal" />
      <ScrollArea.Corner />
    </ScrollArea>
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <ScrollArea className="border-border bg-card h-56 w-[420px] rounded-md border">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className="border-border bg-card sticky top-0 border-b px-4 py-3 text-sm font-medium">
            Pending approvals
          </div>
          <div className="grid gap-2 p-4 text-sm">
            {pendingItems.map((item) => (
              <div className="bg-muted rounded-md p-2" key={item}>
                {item}
              </div>
            ))}
            {pendingItems.map((item) => (
              <div
                className="bg-muted rounded-md p-2"
                key={`duplicate-${item}`}
              >
                Follow-up: {item}
              </div>
            ))}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Bar />
      <ScrollArea.Corner />
    </ScrollArea>
  ),
};
