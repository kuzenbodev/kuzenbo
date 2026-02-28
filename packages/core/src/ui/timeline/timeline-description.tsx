import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "tailwind-variants";

type TimelineDescriptionProps = useRender.ComponentProps<"div">;

const TimelineDescription = ({
  className,
  render,
  ...props
}: TimelineDescriptionProps) =>
  useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn("text-muted-foreground text-sm", className),
      },
      props
    ),
    render,
    state: {
      slot: "timeline-description",
    },
  });

export { TimelineDescription };
export type { TimelineDescriptionProps };
