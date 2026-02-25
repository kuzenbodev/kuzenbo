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
          "list-decimal pl-5 text-foreground [&>li]:mt-1",
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
