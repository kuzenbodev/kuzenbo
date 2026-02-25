import type { ComponentProps } from "react";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "tailwind-variants";

type TimelineTimeProps = useRender.ComponentProps<"time"> &
  Pick<ComponentProps<"time">, "dateTime">;

const TimelineTime = ({ className, render, ...props }: TimelineTimeProps) =>
  useRender({
    defaultTagName: "time",
    props: mergeProps<"time">(
      {
        className: cn("text-xs text-muted-foreground", className),
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
