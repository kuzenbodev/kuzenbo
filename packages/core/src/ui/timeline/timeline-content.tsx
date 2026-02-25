import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, tv } from "tailwind-variants";

import { useTimeline, useTimelineItem } from "./use-timeline";

const timelineContentVariants = tv({
  base: "flex-1",
  variants: {
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
      className: "text-right",
    },
    {
      variant: "alternate",
      orientation: "horizontal",
      isAlternateRight: false,
      className: "row-start-3 pt-2",
    },
    {
      variant: "alternate",
      orientation: "horizontal",
      isAlternateRight: true,
      className: "row-start-1 pb-2",
    },
  ],
  defaultVariants: {
    orientation: "vertical",
    variant: "default",
    isAlternateRight: false,
  },
});

type TimelineContentProps = useRender.ComponentProps<"div">;

const TimelineContent = ({
  className,
  render,
  ...props
}: TimelineContentProps) => {
  const { orientation, variant } = useTimeline();
  const { status, isAlternateRight } = useTimelineItem();

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          timelineContentVariants({
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
      slot: "timeline-content",
      status,
    },
  });
};

export { TimelineContent, timelineContentVariants };
export type { TimelineContentProps };
