import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, tv } from "tailwind-variants";

import { useTimeline, useTimelineItem } from "./use-timeline";

const timelineConnectorVariants = tv({
  base: ["absolute z-0", "group-last/timeline-item:hidden"],
  variants: {
    status: {
      completed: "bg-primary",
      active: "bg-border",
      pending: "bg-border",
    },
    orientation: {
      vertical: "",
      horizontal: "",
    },
    variant: {
      default: "",
      alternate: "",
    },
    isAlternateRight: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      orientation: "vertical",
      variant: "default",
      className: [
        "start-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)]",
        "top-[var(--timeline-dot-size)]",
        "h-[calc(100%-var(--timeline-dot-size))]",
        "w-[var(--timeline-connector-thickness)]",
      ],
    },
    {
      orientation: "horizontal",
      variant: "default",
      className: [
        "start-[var(--timeline-dot-size)]",
        "top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)]",
        "h-[var(--timeline-connector-thickness)]",
        "w-[calc(100%-var(--timeline-dot-size))]",
      ],
    },
    {
      orientation: "vertical",
      variant: "alternate",
      isAlternateRight: false,
      className: [
        "top-0",
        "-right-[var(--timeline-connector-thickness)/2]",
        "h-full",
        "w-[var(--timeline-connector-thickness)]",
      ],
    },
    {
      orientation: "vertical",
      variant: "alternate",
      isAlternateRight: true,
      className: [
        "top-0",
        "-left-[var(--timeline-connector-thickness)/2]",
        "h-full",
        "w-[var(--timeline-connector-thickness)]",
      ],
    },
    {
      orientation: "horizontal",
      variant: "alternate",
      className: [
        "top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)]",
        "left-[var(--timeline-dot-size)]",
        "row-start-2",
        "h-[var(--timeline-connector-thickness)]",
        "w-[calc(100%-var(--timeline-dot-size))]",
      ],
    },
  ],
  defaultVariants: {
    status: "pending",
    orientation: "vertical",
    variant: "default",
    isAlternateRight: false,
  },
});

interface TimelineConnectorProps extends useRender.ComponentProps<"div"> {
  forceMount?: boolean;
}

const TimelineConnector = ({
  className,
  render,
  forceMount,
  ...props
}: TimelineConnectorProps) => {
  const { orientation, variant } = useTimeline();
  const { status, isAlternateRight } = useTimelineItem();

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        "aria-hidden": true,
        className: cn(
          timelineConnectorVariants({
            status,
            orientation,
            variant,
            isAlternateRight,
          }),
          forceMount && "group-last/timeline-item:block",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "timeline-connector",
      status,
      orientation,
    },
  });
};

export { TimelineConnector, timelineConnectorVariants };
export type { TimelineConnectorProps };
