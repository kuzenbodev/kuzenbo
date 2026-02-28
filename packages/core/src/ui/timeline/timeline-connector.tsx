import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, tv } from "tailwind-variants";

import { useTimeline, useTimelineItem } from "./use-timeline";

const timelineConnectorVariants = tv({
  base: ["z-base absolute", "group-last/timeline-item:hidden"],
  compoundVariants: [
    {
      className: [
        "start-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)]",
        "top-[var(--timeline-dot-size)]",
        "h-[calc(100%-var(--timeline-dot-size))]",
        "w-[var(--timeline-connector-thickness)]",
      ],
      orientation: "vertical",
      variant: "default",
    },
    {
      className: [
        "start-[var(--timeline-dot-size)]",
        "top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)]",
        "h-[var(--timeline-connector-thickness)]",
        "w-[calc(100%-var(--timeline-dot-size))]",
      ],
      orientation: "horizontal",
      variant: "default",
    },
    {
      className: [
        "top-0",
        "-right-[var(--timeline-connector-thickness)/2]",
        "h-full",
        "w-[var(--timeline-connector-thickness)]",
      ],
      isAlternateRight: false,
      orientation: "vertical",
      variant: "alternate",
    },
    {
      className: [
        "top-0",
        "-left-[var(--timeline-connector-thickness)/2]",
        "h-full",
        "w-[var(--timeline-connector-thickness)]",
      ],
      isAlternateRight: true,
      orientation: "vertical",
      variant: "alternate",
    },
    {
      className: [
        "top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)]",
        "left-[var(--timeline-dot-size)]",
        "row-start-2",
        "h-[var(--timeline-connector-thickness)]",
        "w-[calc(100%-var(--timeline-dot-size))]",
      ],
      orientation: "horizontal",
      variant: "alternate",
    },
  ],
  defaultVariants: {
    isAlternateRight: false,
    orientation: "vertical",
    status: "pending",
    variant: "default",
  },
  variants: {
    isAlternateRight: {
      false: "",
      true: "",
    },
    orientation: {
      horizontal: "",
      vertical: "",
    },
    status: {
      active: "bg-border",
      completed: "bg-primary",
      pending: "bg-border",
    },
    variant: {
      alternate: "",
      default: "",
    },
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
            isAlternateRight,
            orientation,
            status,
            variant,
          }),
          forceMount && "group-last/timeline-item:block",
          className
        ),
      },
      props
    ),
    render,
    state: {
      orientation,
      slot: "timeline-connector",
      status,
    },
  });
};

export { TimelineConnector, timelineConnectorVariants };
export type { TimelineConnectorProps };
