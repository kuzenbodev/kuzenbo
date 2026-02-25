import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, type VariantProps } from "tailwind-variants";

import { typographyTextVariants } from "./typography-variants";

export type TypographyTextProps = useRender.ComponentProps<"p"> &
  VariantProps<typeof typographyTextVariants>;

export type TypographyTextAliasProps = Omit<TypographyTextProps, "variant">;

const TypographyText = ({
  className,
  variant = "body",
  render,
  ...props
}: TypographyTextProps) =>
  useRender({
    defaultTagName: "p",
    props: mergeProps<"p">(
      {
        className: cn(typographyTextVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "typography-text",
      variant,
    },
  });

export { TypographyText };
