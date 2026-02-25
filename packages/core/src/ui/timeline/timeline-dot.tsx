import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, tv } from "tailwind-variants";

import { useTimeline, useTimelineItem } from "./use-timeline";

const timelineDotVariants = tv({
  base: [
    "relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 bg-background",
    "size-[var(--timeline-dot-size)]",
  ],
  variants: {
    status: {
      completed: "border-primary bg-primary",
      active: "border-primary bg-background",
      pending: "border-border bg-background",
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
      variant: "alternate",
      orientation: "vertical",
      isAlternateRight: false,
      className:
        "absolute -right-[calc(var(--timeline-dot-size)/2+var(--timeline-connector-thickness)/2)]",
    },
    {
      variant: "alternate",
      orientation: "vertical",
      isAlternateRight: true,
      className:
        "absolute -left-[calc(var(--timeline-dot-size)/2+var(--timeline-connector-thickness)/2)]",
    },
    {
      variant: "alternate",
      orientation: "horizontal",
      className: "row-start-2",
    },
  ],
  defaultVariants: {
    status: "pending",
    orientation: "vertical",
    variant: "default",
    isAlternateRight: false,
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
            status,
            orientation,
            variant,
            isAlternateRight,
          }),
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "timeline-dot",
      status,
      orientation,
    },
  });
};

export { TimelineDot, timelineDotVariants };
export type { TimelineDotProps };
