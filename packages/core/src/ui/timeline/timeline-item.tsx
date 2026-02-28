import { useMemo } from "react";
import type { ComponentProps, ReactNode } from "react";
import { cn, tv } from "tailwind-variants";

import {
  getItemStatus,
  TimelineItemContext,
  useTimeline,
} from "./use-timeline";

const timelineItemVariants = tv({
  base: "group/timeline-item relative flex",
  compoundVariants: [
    {
      className: "gap-3 pb-8 last:pb-0",
      orientation: "vertical",
      variant: "default",
    },
    {
      className: "flex-col gap-3",
      orientation: "horizontal",
      variant: "default",
    },
    {
      className: "w-1/2 gap-3 pr-6 pb-8 last:pb-0",
      isAlternateRight: false,
      orientation: "vertical",
      variant: "alternate",
    },
    {
      className: "ml-auto w-1/2 flex-row-reverse gap-3 pb-8 pl-6 last:pb-0",
      isAlternateRight: true,
      orientation: "vertical",
      variant: "alternate",
    },
    {
      className: "grid min-w-0 grid-rows-[1fr_auto_1fr] gap-3",
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
      isAlternateRight,
      status,
    }),
    [index, status, isAlternateRight]
  );

  return (
    <TimelineItemContext.Provider value={itemContextValue}>
      <li
        aria-current={status === "active" ? "step" : undefined}
        className={cn(
          timelineItemVariants({
            isAlternateRight,
            orientation,
            variant,
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
