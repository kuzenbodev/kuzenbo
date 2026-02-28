"use client";

import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

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
  compoundVariants: [
    {
      appearance: "default",
      class: "bg-card text-card-foreground",
      variant: "default",
    },
    {
      appearance: "default",
      class: "border-primary/30 bg-primary/10 text-primary",
      variant: "primary",
    },
    {
      appearance: "default",
      class: "border-border bg-secondary text-secondary-foreground",
      variant: "secondary",
    },
    {
      appearance: "default",
      class: "border-warning-border bg-warning text-warning-foreground",
      variant: "warning",
    },
    {
      appearance: "default",
      class: "border-danger-border bg-danger text-danger-foreground",
      variant: "danger",
    },
    {
      appearance: "default",
      class: "border-info-border bg-info text-info-foreground",
      variant: "info",
    },
    {
      appearance: "default",
      class: "border-success-border bg-success text-success-foreground",
      variant: "success",
    },
    {
      appearance: "subtle",
      class: "border-border/70 bg-muted/40 text-foreground",
      variant: "default",
    },
    {
      appearance: "subtle",
      class: "border-primary/20 bg-primary/5 text-primary",
      variant: "primary",
    },
    {
      appearance: "subtle",
      class: "border-border/70 bg-secondary/60 text-secondary-foreground",
      variant: "secondary",
    },
    {
      appearance: "subtle",
      class: "border-warning-border/70 bg-warning/60 text-warning-foreground",
      variant: "warning",
    },
    {
      appearance: "subtle",
      class: "border-danger-border/70 bg-danger/60 text-danger-foreground",
      variant: "danger",
    },
    {
      appearance: "subtle",
      class: "border-info-border/70 bg-info/60 text-info-foreground",
      variant: "info",
    },
    {
      appearance: "subtle",
      class: "border-success-border/70 bg-success/60 text-success-foreground",
      variant: "success",
    },
    {
      appearance: "outline",
      class: "border-border bg-background text-foreground",
      variant: "default",
    },
    {
      appearance: "outline",
      class: "border-primary/40 bg-background text-primary",
      variant: "primary",
    },
    {
      appearance: "outline",
      class: "border-border bg-background text-secondary-foreground",
      variant: "secondary",
    },
    {
      appearance: "outline",
      class: "border-warning-border bg-background text-warning-foreground",
      variant: "warning",
    },
    {
      appearance: "outline",
      class: "border-danger-border bg-background text-danger-foreground",
      variant: "danger",
    },
    {
      appearance: "outline",
      class: "border-info-border bg-background text-info-foreground",
      variant: "info",
    },
    {
      appearance: "outline",
      class: "border-success-border bg-background text-success-foreground",
      variant: "success",
    },
    {
      appearance: "inverted",
      class:
        "bg-foreground text-background dark:bg-card dark:text-card-foreground [&_*[data-slot=alert-description]]:text-background/70 dark:[&_*[data-slot=alert-description]]:text-card-foreground/70 border-0",
      variant: [
        "default",
        "primary",
        "secondary",
        "warning",
        "danger",
        "info",
        "success",
      ],
    },
    {
      appearance: "inverted",
      class: "[&>svg]:text-primary",
      variant: "primary",
    },
    {
      appearance: "inverted",
      class: "[&>svg]:text-muted-foreground",
      variant: "secondary",
    },
    {
      appearance: "inverted",
      class: "[&>svg]:text-warning-foreground",
      variant: "warning",
    },
    {
      appearance: "inverted",
      class: "[&>svg]:text-danger-foreground",
      variant: "danger",
    },
    {
      appearance: "inverted",
      class: "[&>svg]:text-info-foreground",
      variant: "info",
    },
    {
      appearance: "inverted",
      class: "[&>svg]:text-success-foreground",
      variant: "success",
    },
  ],
  defaultVariants: {
    appearance: "default",
    size: "md",
    variant: "default",
  },
  variants: {
    appearance: {
      default: "",
      inverted: "",
      outline: "",
      subtle: "",
    },
    size: {
      lg: "gap-1 px-5 py-4 text-sm has-data-[slot=alert-action]:pr-20 has-[>svg]:gap-x-3 *:[svg:not([class*='size-'])]:size-4",
      md: "gap-0.5 px-4 py-3 text-sm has-data-[slot=alert-action]:pr-18 has-[>svg]:gap-x-2.5 *:[svg:not([class*='size-'])]:size-4",
      sm: "gap-0.5 px-3 py-2.5 text-sm has-data-[slot=alert-action]:pr-16 has-[>svg]:gap-x-2.5 *:[svg:not([class*='size-'])]:size-3.5",
      xl: "gap-1 px-6 py-5 text-base has-data-[slot=alert-action]:pr-24 has-[>svg]:gap-x-3.5 *:[svg:not([class*='size-'])]:size-5",
      xs: "gap-0.5 px-2.5 py-2 text-xs has-data-[slot=alert-action]:pr-14 has-[>svg]:gap-x-2 *:[svg:not([class*='size-'])]:size-3",
    },
    variant: {
      danger: "[&_*[data-slot=alert-description]]:text-danger-foreground/70",
      default: "[&_*[data-slot=alert-description]]:text-muted-foreground",
      info: "[&_*[data-slot=alert-description]]:text-info-foreground/70",
      primary: "[&_*[data-slot=alert-description]]:text-primary/80",
      secondary:
        "[&_*[data-slot=alert-description]]:text-secondary-foreground/80",
      success: "[&_*[data-slot=alert-description]]:text-success-foreground/70",
      warning: "[&_*[data-slot=alert-description]]:text-warning-foreground/70",
    },
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
      className={alertVariants({ appearance, className, size, variant })}
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
