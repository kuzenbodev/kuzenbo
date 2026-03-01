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
          "border-border text-foreground border-l-[var(--kb-typography-blockquote-border-width,2px)] pl-[var(--kb-typography-blockquote-padding-inline-start,1rem)] italic",
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
