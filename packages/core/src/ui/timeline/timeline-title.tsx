import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "tailwind-variants";

type TimelineTitleProps = useRender.ComponentProps<"div">;

const TimelineTitle = ({ className, render, ...props }: TimelineTitleProps) =>
  useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn("leading-none font-semibold", className),
      },
      props
    ),
    render,
    state: {
      slot: "timeline-title",
    },
  });

export { TimelineTitle };
export type { TimelineTitleProps };
