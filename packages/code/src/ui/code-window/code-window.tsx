"use client";

import { Card } from "@kuzenbo/core/ui/card";
import type { ReactNode } from "react";
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
            "border-border bg-muted/40 flex min-h-11 items-center justify-between gap-2 border-b px-4 py-2",
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
                <span className="bg-danger/80 size-2.5 rounded-full" />
                <span className="bg-warning/80 size-2.5 rounded-full" />
                <span className="bg-success/80 size-2.5 rounded-full" />
              </div>
            ) : null}
            {title ? (
              <div className="text-foreground truncate text-sm font-medium">
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
