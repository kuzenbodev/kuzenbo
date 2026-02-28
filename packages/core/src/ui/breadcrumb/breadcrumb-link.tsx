import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedBreadcrumbSize } from "./breadcrumb-size-context";

const breadcrumbLinkVariants = tv({
  base: "cursor-clickable hover:text-foreground transition-colors",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "text-sm",
      md: "text-sm",
      sm: "text-xs",
      xl: "text-base",
      xs: "text-xs",
    },
  },
});

type BreadcrumbLinkVariantProps = Omit<
  VariantProps<typeof breadcrumbLinkVariants>,
  "size"
> & {
  size?: UISize;
};

export type BreadcrumbLinkProps = useRender.ComponentProps<"a"> &
  BreadcrumbLinkVariantProps;

const BreadcrumbLink = ({
  className,
  render,
  size,
  ...props
}: BreadcrumbLinkProps) => {
  const resolvedSize = useResolvedBreadcrumbSize(size);

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          breadcrumbLinkVariants({ size: resolvedSize }),
          className
        ),
      },
      props
    ),
    render,
    state: {
      size: resolvedSize,
      slot: "breadcrumb-link",
    },
  });
};

export { BreadcrumbLink };
