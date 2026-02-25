import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useResolvedBreadcrumbSize } from "./breadcrumb-size-context";

const breadcrumbLinkVariants = tv({
  base: "cursor-pointer transition-colors hover:text-foreground",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
      xl: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
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
      slot: "breadcrumb-link",
      size: resolvedSize,
    },
  });
};

export { BreadcrumbLink };
