import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, tv } from "tailwind-variants";

import { useTimeline, useTimelineItem } from "./use-timeline";

const timelineContentVariants = tv({
  base: "flex-1",
  compoundVariants: [
    {
      className: "text-right",
      isAlternateRight: false,
      orientation: "vertical",
      variant: "alternate",
    },
    {
      className: "row-start-3 pt-2",
      isAlternateRight: false,
      orientation: "horizontal",
      variant: "alternate",
    },
    {
      className: "row-start-1 pb-2",
      isAlternateRight: true,
      orientation: "horizontal",
      variant: "alternate",
    },
  ],
  defaultVariants: {
    isAlternateRight: false,
    orientation: "vertical",
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
    variant: {
      alternate: "",
      default: "",
    },
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
            isAlternateRight,
            orientation,
            variant,
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
