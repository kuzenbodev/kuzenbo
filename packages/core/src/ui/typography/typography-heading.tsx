import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, type VariantProps } from "tailwind-variants";

import { typographyHeadingVariants } from "./typography-variants";

export type TypographyHeadingProps = useRender.ComponentProps<"h2"> &
  VariantProps<typeof typographyHeadingVariants>;

export type TypographyHeadingAliasProps = Omit<
  TypographyHeadingProps,
  "variant"
>;

const TypographyHeading = ({
  className,
  variant = "h2",
  render,
  ...props
}: TypographyHeadingProps) =>
  useRender({
    defaultTagName: "h2",
    props: mergeProps<"h2">(
      {
        className: cn(typographyHeadingVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "typography-heading",
      variant,
    },
  });

export { TypographyHeading };
