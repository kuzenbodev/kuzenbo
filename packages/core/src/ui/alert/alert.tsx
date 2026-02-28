"use client";

import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { useComponentSize } from "../shared/size/size-provider";
import type { UISize } from "../shared/size/size-system";
import { AlertAction } from "./alert-action";
import { AlertDescription } from "./alert-description";
import { AlertTitle } from "./alert-title";

const alertVariants = tv({
  base: [
    "group/alert border-border relative grid w-full rounded-lg border text-left",
    "has-data-[slot=alert-action]:relative",
    "has-[>svg]:grid-cols-[auto_1fr]",
    "*:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current",
  ],
  variants: {
    variant: {
      default: "[&_*[data-slot=alert-description]]:text-muted-foreground",
      primary: "[&_*[data-slot=alert-description]]:text-primary/80",
      secondary:
        "[&_*[data-slot=alert-description]]:text-secondary-foreground/80",
      warning: "[&_*[data-slot=alert-description]]:text-warning-foreground/70",
      danger: "[&_*[data-slot=alert-description]]:text-danger-foreground/70",
      info: "[&_*[data-slot=alert-description]]:text-info-foreground/70",
      success: "[&_*[data-slot=alert-description]]:text-success-foreground/70",
    },
    appearance: {
      default: "",
      subtle: "",
      outline: "",
      inverted: "",
    },
    size: {
      xs: "gap-0.5 px-2.5 py-2 text-xs has-data-[slot=alert-action]:pr-14 has-[>svg]:gap-x-2 *:[svg:not([class*='size-'])]:size-3",
      sm: "gap-0.5 px-3 py-2.5 text-sm has-data-[slot=alert-action]:pr-16 has-[>svg]:gap-x-2.5 *:[svg:not([class*='size-'])]:size-3.5",
      md: "gap-0.5 px-4 py-3 text-sm has-data-[slot=alert-action]:pr-18 has-[>svg]:gap-x-2.5 *:[svg:not([class*='size-'])]:size-4",
      lg: "gap-1 px-5 py-4 text-sm has-data-[slot=alert-action]:pr-20 has-[>svg]:gap-x-3 *:[svg:not([class*='size-'])]:size-4",
      xl: "gap-1 px-6 py-5 text-base has-data-[slot=alert-action]:pr-24 has-[>svg]:gap-x-3.5 *:[svg:not([class*='size-'])]:size-5",
    },
  },
  compoundVariants: [
    {
      appearance: "default",
      variant: "default",
      class: "bg-card text-card-foreground",
    },
    {
      appearance: "default",
      variant: "primary",
      class: "border-primary/30 bg-primary/10 text-primary",
    },
    {
      appearance: "default",
      variant: "secondary",
      class: "border-border bg-secondary text-secondary-foreground",
    },
    {
      appearance: "default",
      variant: "warning",
      class: "border-warning-border bg-warning text-warning-foreground",
    },
    {
      appearance: "default",
      variant: "danger",
      class: "border-danger-border bg-danger text-danger-foreground",
    },
    {
      appearance: "default",
      variant: "info",
      class: "border-info-border bg-info text-info-foreground",
    },
    {
      appearance: "default",
      variant: "success",
      class: "border-success-border bg-success text-success-foreground",
    },
    {
      appearance: "subtle",
      variant: "default",
      class: "border-border/70 bg-muted/40 text-foreground",
    },
    {
      appearance: "subtle",
      variant: "primary",
      class: "border-primary/20 bg-primary/5 text-primary",
    },
    {
      appearance: "subtle",
      variant: "secondary",
      class: "border-border/70 bg-secondary/60 text-secondary-foreground",
    },
    {
      appearance: "subtle",
      variant: "warning",
      class: "border-warning-border/70 bg-warning/60 text-warning-foreground",
    },
    {
      appearance: "subtle",
      variant: "danger",
      class: "border-danger-border/70 bg-danger/60 text-danger-foreground",
    },
    {
      appearance: "subtle",
      variant: "info",
      class: "border-info-border/70 bg-info/60 text-info-foreground",
    },
    {
      appearance: "subtle",
      variant: "success",
      class: "border-success-border/70 bg-success/60 text-success-foreground",
    },
    {
      appearance: "outline",
      variant: "default",
      class: "border-border bg-background text-foreground",
    },
    {
      appearance: "outline",
      variant: "primary",
      class: "border-primary/40 bg-background text-primary",
    },
    {
      appearance: "outline",
      variant: "secondary",
      class: "border-border bg-background text-secondary-foreground",
    },
    {
      appearance: "outline",
      variant: "warning",
      class: "border-warning-border bg-background text-warning-foreground",
    },
    {
      appearance: "outline",
      variant: "danger",
      class: "border-danger-border bg-background text-danger-foreground",
    },
    {
      appearance: "outline",
      variant: "info",
      class: "border-info-border bg-background text-info-foreground",
    },
    {
      appearance: "outline",
      variant: "success",
      class: "border-success-border bg-background text-success-foreground",
    },
    {
      appearance: "inverted",
      variant: [
        "default",
        "primary",
        "secondary",
        "warning",
        "danger",
        "info",
        "success",
      ],
      class:
        "bg-foreground text-background dark:bg-card dark:text-card-foreground [&_*[data-slot=alert-description]]:text-background/70 dark:[&_*[data-slot=alert-description]]:text-card-foreground/70 border-0",
    },
    {
      appearance: "inverted",
      variant: "primary",
      class: "[&>svg]:text-primary",
    },
    {
      appearance: "inverted",
      variant: "secondary",
      class: "[&>svg]:text-muted-foreground",
    },
    {
      appearance: "inverted",
      variant: "warning",
      class: "[&>svg]:text-warning-foreground",
    },
    {
      appearance: "inverted",
      variant: "danger",
      class: "[&>svg]:text-danger-foreground",
    },
    {
      appearance: "inverted",
      variant: "info",
      class: "[&>svg]:text-info-foreground",
    },
    {
      appearance: "inverted",
      variant: "success",
      class: "[&>svg]:text-success-foreground",
    },
  ],
  defaultVariants: {
    appearance: "default",
    size: "md",
    variant: "default",
  },
});

type AlertVariants = Omit<VariantProps<typeof alertVariants>, "size"> & {
  size?: UISize;
};

export type AlertProps = AlertVariants & ComponentProps<"div">;

const Alert = ({
  appearance,
  className,
  size: providedSize,
  variant,
  ...props
}: AlertProps) => {
  const size = useComponentSize(providedSize);

  return (
    <div
      className={alertVariants({ appearance, size, variant, className })}
      data-size={size}
      data-slot="alert"
      role="alert"
      {...props}
    />
  );
};

Alert.Action = AlertAction;
Alert.Description = AlertDescription;
Alert.Title = AlertTitle;

export { Alert, alertVariants, AlertAction, AlertDescription, AlertTitle };

export type { AlertActionProps } from "./alert-action";
export type { AlertDescriptionProps } from "./alert-description";
export type { AlertTitleProps } from "./alert-title";
