import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, tv } from "tailwind-variants";

import { useTimeline, useTimelineItem } from "./use-timeline";

const timelineDotVariants = tv({
  base: [
    "z-raised bg-background relative flex shrink-0 items-center justify-center rounded-full border-2",
    "size-[var(--timeline-dot-size)]",
  ],
  compoundVariants: [
    {
      className:
        "absolute -right-[calc(var(--timeline-dot-size)/2+var(--timeline-connector-thickness)/2)]",
      isAlternateRight: false,
      orientation: "vertical",
      variant: "alternate",
    },
    {
      className:
        "absolute -left-[calc(var(--timeline-dot-size)/2+var(--timeline-connector-thickness)/2)]",
      isAlternateRight: true,
      orientation: "vertical",
      variant: "alternate",
    },
    {
      className: "row-start-2",
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
      active: "border-primary bg-background",
      completed: "border-primary bg-primary",
      pending: "border-border bg-background",
    },
    variant: {
      alternate: "",
      default: "",
    },
  },
});

type TimelineDotProps = useRender.ComponentProps<"div">;

const TimelineDot = ({ className, render, ...props }: TimelineDotProps) => {
  const { orientation, variant } = useTimeline();
  const { status, isAlternateRight } = useTimelineItem();

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          timelineDotVariants({
            isAlternateRight,
            orientation,
            status,
            variant,
          }),
          className
        ),
      },
      props
    ),
    render,
    state: {
      orientation,
      slot: "timeline-dot",
      status,
    },
  });
};

export { TimelineDot, timelineDotVariants };
export type { TimelineDotProps };
