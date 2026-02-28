import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

type TimelineTimeProps = useRender.ComponentProps<"time"> &
  Pick<ComponentProps<"time">, "dateTime">;

const TimelineTime = ({ className, render, ...props }: TimelineTimeProps) =>
  useRender({
    defaultTagName: "time",
    props: mergeProps<"time">(
      {
        className: cn("text-muted-foreground text-xs", className),
      },
      props
    ),
    render,
    state: {
      slot: "timeline-time",
    },
  });

export { TimelineTime };
export type { TimelineTimeProps };
