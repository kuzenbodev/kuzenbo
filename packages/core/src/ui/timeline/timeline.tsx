import { type ComponentProps, type ReactNode, useMemo } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { TimelineConnector } from "./timeline-connector";
import { TimelineContent } from "./timeline-content";
import { TimelineDescription } from "./timeline-description";
import { TimelineDot } from "./timeline-dot";
import { TimelineHeader } from "./timeline-header";
import { TimelineItem } from "./timeline-item";
import { TimelineTime } from "./timeline-time";
import { TimelineTitle } from "./timeline-title";
import { type Direction, TimelineContext } from "./use-timeline";

const timelineVariants = tv({
  base: [
    "group/timeline relative flex",
    "[--timeline-connector-thickness:0.125rem]",
    "[--timeline-dot-size:0.875rem]",
  ],
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row items-start",
    },
    variant: {
      default: "",
      alternate: "",
    },
  },
  compoundVariants: [
    {
      orientation: "vertical",
      variant: "default",
      className: "gap-0",
    },
    {
      orientation: "horizontal",
      variant: "default",
      className: "gap-0",
    },
    {
      orientation: "vertical",
      variant: "alternate",
      className: "relative w-full gap-0",
    },
    {
      orientation: "horizontal",
      variant: "alternate",
      className: "items-center gap-0",
    },
  ],
  defaultVariants: {
    orientation: "vertical",
    variant: "default",
  },
});

interface TimelineProps
  extends ComponentProps<"ol">, VariantProps<typeof timelineVariants> {
  dir?: Direction;
  activeIndex?: number;
  children?: ReactNode;
}

const Timeline = ({
  orientation = "vertical",
  variant = "default",
  dir = "ltr",
  activeIndex,
  className,
  children,
  ...props
}: TimelineProps) => {
  const contextValue = useMemo(
    () => ({
      orientation,
      variant,
      dir,
      activeIndex,
    }),
    [orientation, variant, dir, activeIndex]
  );

  return (
    <TimelineContext.Provider value={contextValue}>
      <ol
        className={cn(timelineVariants({ orientation, variant }), className)}
        data-orientation={orientation}
        data-slot="timeline"
        data-variant={variant}
        dir={dir}
        {...props}
      >
        {children}
      </ol>
    </TimelineContext.Provider>
  );
};

Timeline.Connector = TimelineConnector;
Timeline.Content = TimelineContent;
Timeline.Description = TimelineDescription;
Timeline.Dot = TimelineDot;
Timeline.Header = TimelineHeader;
Timeline.Item = TimelineItem;
Timeline.Time = TimelineTime;
Timeline.Title = TimelineTitle;

export {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
  timelineVariants,
};
export type { TimelineProps };

export type { TimelineConnectorProps } from "./timeline-connector";
export type { TimelineContentProps } from "./timeline-content";
export type { TimelineDescriptionProps } from "./timeline-description";
export type { TimelineDotProps } from "./timeline-dot";
export type { TimelineHeaderProps } from "./timeline-header";
export type { TimelineItemProps } from "./timeline-item";
export type { TimelineTimeProps } from "./timeline-time";
export type { TimelineTitleProps } from "./timeline-title";
