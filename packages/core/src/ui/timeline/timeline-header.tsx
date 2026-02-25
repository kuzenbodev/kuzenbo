import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "tailwind-variants";

type TimelineHeaderProps = useRender.ComponentProps<"div">;

const TimelineHeader = ({ className, render, ...props }: TimelineHeaderProps) =>
  useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn("flex flex-col gap-1", className),
      },
      props
    ),
    render,
    state: {
      slot: "timeline-header",
    },
  });

export { TimelineHeader };
export type { TimelineHeaderProps };
