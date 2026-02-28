"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { useComponentSize } from "../shared/size/size-provider";
import { useBadgeDefaultProps } from "./use-badge-default-props";

export type BadgeProps = useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

const badgeVariants = tv({
  base: "group/badge focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-4xl border border-transparent font-medium whitespace-nowrap transition-colors focus-visible:ring-[3px] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none",
  defaultVariants: {
    size: "md",
    variant: "default",
  },
  variants: {
    size: {
      lg: "h-7 gap-1.5 px-3 py-1 text-sm [&>svg]:size-4!",
      md: "h-6 gap-1 px-2.5 py-0.5 text-xs [&>svg]:size-3!",
      sm: "h-5 gap-1 px-2 py-0.5 text-xs [&>svg]:size-3!",
      xl: "h-8 gap-1.5 px-3.5 py-1 text-base [&>svg]:size-5!",
      xs: "h-4 gap-0.5 px-1.5 py-0 text-[0.65rem] [&>svg]:size-2.5!",
    },
    variant: {
      danger: ["border-danger-border/50", "bg-danger text-danger-foreground"],
      default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
      ghost:
        "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
      info: ["border-info-border/50", "bg-info text-info-foreground"],
      link: "text-primary underline-offset-4 hover:underline",
      outline:
        "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
      secondary:
        "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
      success: [
        "border-success-border/50",
        "bg-success text-success-foreground",
      ],
      warning: [
        "border-warning-border/50",
        "bg-warning text-warning-foreground",
      ],
    },
  },
});

const Badge = (incomingProps: BadgeProps) => {
  const {
    className,
    size: providedSize,
    variant = "default",
    render,
    ...props
  } = useBadgeDefaultProps(incomingProps);
  const size = useComponentSize(providedSize);

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ size, variant }), className),
      },
      props
    ),
    render,
    state: {
      size,
      slot: "badge",
      variant,
    },
  });
};

export { Badge, badgeVariants };
