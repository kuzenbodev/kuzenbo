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
          "border-border text-foreground border-l-2 pl-4 italic",
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
