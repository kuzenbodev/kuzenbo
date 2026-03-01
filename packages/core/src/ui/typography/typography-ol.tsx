import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "tailwind-variants";

export type TypographyOlProps = useRender.ComponentProps<"ol">;

const TypographyOl = ({ className, render, ...props }: TypographyOlProps) =>
  useRender({
    defaultTagName: "ol",
    props: mergeProps<"ol">(
      {
        className: cn(
          "text-foreground list-decimal pl-[var(--kb-typography-list-indent,1.25rem)] [&>li]:mt-[var(--kb-typography-list-item-spacing,0.25rem)]",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "typography-ol",
    },
  });

export { TypographyOl };
