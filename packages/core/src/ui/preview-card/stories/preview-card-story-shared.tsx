import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "../../button/button";
import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
  PreviewCardViewport,
} from "../preview-card";

export const baseMeta = {
  component: PreviewCard,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    PreviewCardArrow,
    PreviewCardPopup,
    PreviewCardPortal,
    PreviewCardPositioner,
    PreviewCardTrigger,
    PreviewCardViewport,
  },
  tags: ["autodocs"],
  title: "Components/PreviewCard",
} satisfies Meta<typeof PreviewCard>;

type Story = StoryObj<typeof baseMeta>;

const DelayedOpenDemo = () => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearOpenTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleOpen = useCallback(() => {
    clearOpenTimer();
    timerRef.current = setTimeout(() => {
      setOpen(true);
      timerRef.current = null;
    }, 500);
  }, [clearOpenTimer]);

  const closePreview = useCallback(() => {
    clearOpenTimer();
    setOpen(false);
  }, [clearOpenTimer]);

  useEffect(() => () => clearOpenTimer(), [clearOpenTimer]);

  return (
    <PreviewCard open={open}>
      <PreviewCard.Trigger
        render={
          <Button
            onBlur={closePreview}
            onFocus={scheduleOpen}
            onMouseEnter={scheduleOpen}
            onMouseLeave={closePreview}
            variant="outline"
          />
        }
      >
        Hover for contract risk summary
      </PreviewCard.Trigger>
      <PreviewCard.Content sideOffset={8}>
        <div className="grid gap-1 text-sm">
          <div className="text-foreground font-medium">Acme Enterprises</div>
          <div className="text-muted-foreground">
            Renewal risk increased after 3 unresolved P1 incidents this month.
          </div>
        </div>
      </PreviewCard.Content>
    </PreviewCard>
  );
};

export const Default: Story = {
  render: () => (
    <PreviewCard>
      <PreviewCard.Trigger render={<Button variant="outline" />}>
        Hover customer card
      </PreviewCard.Trigger>
      <PreviewCard.Content>
        <div className="grid gap-1 text-sm">
          <div className="text-foreground font-medium">
            Acme Enterprise Workspace
          </div>
          <div className="text-muted-foreground">
            MRR: $24,000 · Seats: 128 · Health score: 89/100
          </div>
        </div>
      </PreviewCard.Content>
    </PreviewCard>
  ),
};

export const ComposedAnatomy: Story = {
  render: () => (
    <PreviewCard>
      <PreviewCard.Trigger render={<Button variant="outline" />}>
        Hover account SLA status
      </PreviewCard.Trigger>
      <PreviewCard.Portal>
        <PreviewCard.Positioner sideOffset={8}>
          <PreviewCard.Popup>
            <PreviewCard.Arrow />
            <PreviewCard.Viewport>
              <div className="grid gap-1 text-sm">
                <div className="text-foreground font-medium">
                  SLA breach watchlist
                </div>
                <div className="text-muted-foreground">
                  2 regions are above latency SLO. Escalation owner: Platform
                  On-call.
                </div>
              </div>
            </PreviewCard.Viewport>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard>
  ),
};

export const DelayedOpen: Story = {
  render: () => <DelayedOpenDemo />,
};

export const InteractiveContent: Story = {
  render: () => (
    <PreviewCard defaultOpen>
      <PreviewCard.Trigger render={<Button variant="outline" />}>
        Hover support ticket
      </PreviewCard.Trigger>
      <PreviewCard.Content sideOffset={8}>
        <div className="grid gap-3 text-sm">
          <div className="grid gap-1">
            <div className="text-foreground font-medium">
              Ticket #INC-2048 · API latency spike
            </div>
            <div className="text-muted-foreground">
              Created 9 minutes ago by support triage. Priority: High.
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              View timeline
            </Button>
            <Button size="sm">Assign to me</Button>
          </div>
        </div>
      </PreviewCard.Content>
    </PreviewCard>
  ),
};
