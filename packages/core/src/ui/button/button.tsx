"use client";

import type { ComponentProps, ReactNode } from "react";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ButtonGroupSizeContext } from "../button-group/button-group-size-context";
import {
  filterUndefinedProps,
  useGlobalUISize,
  useKuzenboComponentDefaults,
} from "../shared/size/size-provider";
import {
  DEFAULT_NESTED_ICON_CLASS_BY_SIZE,
  FIELD_HEIGHT_CLASS_BY_SIZE,
  FIELD_TEXT_CLASS_BY_SIZE,
} from "../shared/size/size-system";
import { Spinner } from "../spinner/spinner";

const buttonVariants = tv({
  base: "group/button inline-flex shrink-0 cursor-clickable items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-[transform,color,background-color,border-color,box-shadow] duration-100 ease-out outline-none select-none active:scale-[0.98] motion-reduce:active:scale-100 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-[3px] aria-invalid:ring-danger/20 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 [a]:hover:bg-primary/80",
      outline:
        "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-card dark:hover:bg-muted",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
      ghost:
        "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
      danger:
        "bg-danger text-danger-foreground hover:bg-danger/90 focus-visible:border-danger-foreground/40 focus-visible:ring-danger-foreground/30 dark:bg-danger dark:text-danger-foreground dark:hover:bg-danger/80 dark:focus-visible:ring-danger-foreground/40",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      md: `${FIELD_HEIGHT_CLASS_BY_SIZE.md} gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2`,
      xs: [
        FIELD_HEIGHT_CLASS_BY_SIZE.xs,
        FIELD_TEXT_CLASS_BY_SIZE.xs,
        DEFAULT_NESTED_ICON_CLASS_BY_SIZE.xs,
        "gap-1 rounded-[min(var(--radius-md),8px)] px-2 in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
      ],
      sm: [
        FIELD_HEIGHT_CLASS_BY_SIZE.sm,
        DEFAULT_NESTED_ICON_CLASS_BY_SIZE.sm,
        "gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
      ],
      lg: `${FIELD_HEIGHT_CLASS_BY_SIZE.lg} gap-1.5 px-3 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3`,
      xl: [
        FIELD_HEIGHT_CLASS_BY_SIZE.xl,
        FIELD_TEXT_CLASS_BY_SIZE.xl,
        DEFAULT_NESTED_ICON_CLASS_BY_SIZE.xl,
        "gap-2 px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
      ],
      icon: "size-9",
      "icon-xs": `size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg ${DEFAULT_NESTED_ICON_CLASS_BY_SIZE.xs}`,
      "icon-sm":
        "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg",
      "icon-lg": "size-10",
      "icon-xl": `size-11 ${DEFAULT_NESTED_ICON_CLASS_BY_SIZE.xl}`,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export type ButtonProps = ComponentProps<typeof ButtonPrimitive> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
  };

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

const BUTTON_SPINNER_SIZE_BY_BUTTON_SIZE: Record<ButtonSize, UISize> = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  icon: "md",
  "icon-xs": "xs",
  "icon-sm": "sm",
  "icon-lg": "lg",
  "icon-xl": "xl",
};

const isButtonSize = (value: unknown): value is ButtonSize =>
  typeof value === "string" && value in BUTTON_SPINNER_SIZE_BY_BUTTON_SIZE;

const ButtonContent = ({
  children,
  isLoading,
  size,
}: {
  children: ReactNode;
  isLoading?: boolean;
  size: ButtonSize;
}) => (
  <span className="relative inline-flex items-center justify-center">
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-200",
        isLoading
          ? "pointer-events-none -translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      )}
    >
      {children}
    </span>
    <span
      className={cn(
        "absolute inset-0 inline-flex items-center justify-center transition-all duration-200",
        isLoading
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      )}
    >
      <Spinner size={BUTTON_SPINNER_SIZE_BY_BUTTON_SIZE[size]} />
    </span>
  </span>
);

const Button = (incomingProps: ButtonProps) => {
  const componentDefaults = useKuzenboComponentDefaults<ButtonProps>("Button");
  const { size: componentDefaultSize, ...componentDefaultsWithoutSize } =
    componentDefaults;
  const {
    className,
    variant = "default",
    size,
    isLoading,
    children,
    disabled,
    ...props
  } = {
    ...filterUndefinedProps(componentDefaultsWithoutSize),
    ...filterUndefinedProps(incomingProps),
  } as ButtonProps;

  const { size: buttonGroupSize } = useContext(ButtonGroupSizeContext);
  const globalSize = useGlobalUISize();

  const resolvedSize: ButtonSize = isButtonSize(size)
    ? size
    : (buttonGroupSize ??
      (isButtonSize(componentDefaultSize)
        ? componentDefaultSize
        : (globalSize ?? "md")));

  return (
    <ButtonPrimitive
      className={mergeBaseUIClassName<ButtonPrimitive.State>(
        cn(buttonVariants({ variant, size: resolvedSize })),
        className
      )}
      focusableWhenDisabled={Boolean(isLoading)}
      data-loading={isLoading}
      data-size={resolvedSize}
      data-slot="button"
      disabled={disabled || isLoading}
      {...props}
    >
      <ButtonContent isLoading={isLoading} size={resolvedSize}>
        {children}
      </ButtonContent>
    </ButtonPrimitive>
  );
};

export { Button, buttonVariants };
