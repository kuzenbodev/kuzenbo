import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "tailwind-variants";

export type TypographyLiProps = useRender.ComponentProps<"li">;

const TypographyLi = ({ className, render, ...props }: TypographyLiProps) =>
  useRender({
    defaultTagName: "li",
    props: mergeProps<"li">(
      {
        className: cn("leading-6", className),
      },
      props
    ),
    render,
    state: {
      slot: "typography-li",
    },
  });

export { TypographyLi };
