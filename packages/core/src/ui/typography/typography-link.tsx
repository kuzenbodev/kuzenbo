import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { typographyTextVariants } from "./typography-variants";

const typographyLinkVariants = tv({
  extend: typographyTextVariants,
  base: "cursor-pointer text-muted-foreground underline-offset-4 transition-colors duration-200 ease-out hover:text-foreground hover:underline",
  variants: {
    variant: {
      ...typographyTextVariants.variants.variant,
      body: "text-sm leading-6",
    },
  },
});

export type TypographyLinkProps = useRender.ComponentProps<"a"> &
  VariantProps<typeof typographyLinkVariants>;

const TypographyLink = ({
  className,
  variant = "body",
  render,
  ...props
}: TypographyLinkProps) =>
  useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(typographyLinkVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "typography-link",
      variant,
    },
  });

export { TypographyLink };
