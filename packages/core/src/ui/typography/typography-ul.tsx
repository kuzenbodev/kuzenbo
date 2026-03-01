import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "tailwind-variants";

export type TypographyUlProps = useRender.ComponentProps<"ul">;

const TypographyUl = ({ className, render, ...props }: TypographyUlProps) =>
  useRender({
    defaultTagName: "ul",
    props: mergeProps<"ul">(
      {
        className: cn(
          "text-foreground list-disc pl-[var(--kb-typography-list-indent,1.25rem)] [&>li]:mt-[var(--kb-typography-list-item-spacing,0.25rem)]",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "typography-ul",
    },
  });

export { TypographyUl };
