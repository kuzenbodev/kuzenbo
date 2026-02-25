"use client";

import type { ReactNode } from "react";

import { Card } from "@kuzenbo/core";
import { cn } from "tailwind-variants";

export interface CodeWindowProps {
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  title?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  showTrafficLights?: boolean;
}

export const CodeWindow = ({
  className,
  headerClassName,
  bodyClassName,
  title,
  actions,
  children,
  showTrafficLights = true,
}: CodeWindowProps) => {
  const renderHeader = showTrafficLights || title || actions;

  return (
    <Card
      className={cn("gap-0 py-0 shadow-none", className)}
      data-size="code-window"
      data-slot="code-window"
    >
      {renderHeader ? (
        <Card.Header
          className={cn(
            "flex min-h-11 items-center justify-between gap-2 border-b border-border bg-muted/40 px-4 py-2",
            headerClassName
          )}
          data-slot="code-window-header"
        >
          <div className="flex min-w-0 items-center gap-3">
            {showTrafficLights ? (
              <div
                className="inline-flex items-center gap-1.5"
                data-slot="code-window-traffic-lights"
              >
                <span className="size-2.5 rounded-full bg-danger/80" />
                <span className="size-2.5 rounded-full bg-warning/80" />
                <span className="size-2.5 rounded-full bg-success/80" />
              </div>
            ) : null}
            {title ? (
              <div className="truncate text-sm font-medium text-foreground">
                {title}
              </div>
            ) : null}
          </div>
          {actions ? (
            <div className="shrink-0" data-slot="code-window-actions">
              {actions}
            </div>
          ) : null}
        </Card.Header>
      ) : null}
      <Card.Content
        className={cn("bg-background p-4", bodyClassName)}
        data-slot="code-window-body"
      >
        {children}
      </Card.Content>
    </Card>
  );
};
