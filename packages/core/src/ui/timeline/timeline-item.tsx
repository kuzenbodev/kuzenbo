import { type ComponentProps, type ReactNode, useMemo } from "react";
import { cn, tv } from "tailwind-variants";

import {
  getItemStatus,
  TimelineItemContext,
  useTimeline,
} from "./use-timeline";

const timelineItemVariants = tv({
  base: "group/timeline-item relative flex",
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
      orientation: "vertical",
      variant: "default",
      className: "gap-3 pb-8 last:pb-0",
    },
    {
      orientation: "horizontal",
      variant: "default",
      className: "flex-col gap-3",
    },
    {
      orientation: "vertical",
      variant: "alternate",
      isAlternateRight: false,
      className: "w-1/2 gap-3 pr-6 pb-8 last:pb-0",
    },
    {
      orientation: "vertical",
      variant: "alternate",
      isAlternateRight: true,
      className: "ml-auto w-1/2 flex-row-reverse gap-3 pb-8 pl-6 last:pb-0",
    },
    {
      orientation: "horizontal",
      variant: "alternate",
      className: "grid min-w-0 grid-rows-[1fr_auto_1fr] gap-3",
    },
  ],
  defaultVariants: {
    orientation: "vertical",
    variant: "default",
    isAlternateRight: false,
  },
});

interface TimelineItemProps extends ComponentProps<"li"> {
  index: number;
  children?: ReactNode;
}

const TimelineItem = ({
  index,
  className,
  children,
  ...props
}: TimelineItemProps) => {
  const { orientation, variant, dir, activeIndex } = useTimeline();

  const status = getItemStatus(index, activeIndex);
  const isAlternateRight = variant === "alternate" && index % 2 === 1;

  const itemContextValue = useMemo(
    () => ({
      index,
      status,
      isAlternateRight,
    }),
    [index, status, isAlternateRight]
  );

  return (
    <TimelineItemContext.Provider value={itemContextValue}>
      <li
        aria-current={status === "active" ? "step" : undefined}
        className={cn(
          timelineItemVariants({
            orientation,
            variant,
            isAlternateRight,
          }),
          className
        )}
        data-alternate-right={isAlternateRight ? "" : undefined}
        data-orientation={orientation}
        data-slot="timeline-item"
        data-status={status}
        dir={dir}
        {...props}
      >
        {children}
      </li>
    </TimelineItemContext.Provider>
  );
};

export { TimelineItem, timelineItemVariants };
export type { TimelineItemProps };
