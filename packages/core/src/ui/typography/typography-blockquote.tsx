import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "tailwind-variants";

export type TypographyBlockquoteProps = useRender.ComponentProps<"blockquote">;

const TypographyBlockquote = ({
  className,
  render,
  ...props
}: TypographyBlockquoteProps) =>
  useRender({
    defaultTagName: "blockquote",
    props: mergeProps<"blockquote">(
      {
        className: cn(
          "border-l-2 border-border pl-4 text-foreground italic",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "typography-blockquote",
    },
  });

export { TypographyBlockquote };
