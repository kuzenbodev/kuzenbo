"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import type { ComponentProps, ReactNode } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ButtonGroupSizeContext } from "../button-group/button-group-size-context";
import {
  filterUndefinedProps,
  useGlobalUISize,
  useKuzenboComponentDefaults,
} from "../shared/size/size-provider";
import type { UISize } from "../shared/size/size-system";
import {
  resolveDefaultNestedIconClassBySize,
  resolveFieldHeightClassBySize,
  resolveFieldTextClassBySize,
} from "../shared/size/size-system";
import { Spinner } from "../spinner/spinner";

const buttonVariants = tv({
  base: "group/button cursor-clickable focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40 inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-[transform,color,background-color,border-color,box-shadow] duration-100 ease-out outline-none select-none focus-visible:ring-[3px] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-[3px] motion-reduce:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  defaultVariants: {
    size: "md",
    variant: "default",
  },
  variants: {
    size: {
      icon: "size-9",
      "icon-lg": "size-10",
      "icon-sm":
        "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg",
      "icon-xl": ["size-11", resolveDefaultNestedIconClassBySize("xl")],
      "icon-xs": [
        "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg",
        resolveDefaultNestedIconClassBySize("xs"),
      ],
      lg: [
        resolveFieldHeightClassBySize("lg"),
        "gap-1.5 px-3 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
      ],
      md: [
        resolveFieldHeightClassBySize("md"),
        "gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      ],
      sm: [
        resolveFieldHeightClassBySize("sm"),
        resolveDefaultNestedIconClassBySize("sm"),
        "gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
      ],
      xl: [
        resolveFieldHeightClassBySize("xl"),
        resolveFieldTextClassBySize("xl"),
        resolveDefaultNestedIconClassBySize("xl"),
        "gap-2 px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
      ],
      xs: [
        resolveFieldHeightClassBySize("xs"),
        resolveFieldTextClassBySize("xs"),
        resolveDefaultNestedIconClassBySize("xs"),
        "gap-1 rounded-[min(var(--radius-md),8px)] px-2 in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
      ],
    },
    variant: {
      danger:
        "bg-danger text-danger-foreground hover:bg-danger/90 focus-visible:border-danger-foreground/40 focus-visible:ring-danger-foreground/30 dark:bg-danger dark:text-danger-foreground dark:hover:bg-danger/80 dark:focus-visible:ring-danger-foreground/40",
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 [a]:hover:bg-primary/80",
      ghost:
        "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
      link: "text-primary underline-offset-4 hover:underline",
      outline:
        "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-card dark:hover:bg-muted",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
    },
  },
});

export type ButtonProps = ComponentProps<typeof ButtonPrimitive> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
  };

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

const BUTTON_SPINNER_SIZE_BY_BUTTON_SIZE: Record<ButtonSize, UISize> = {
  icon: "md",
  "icon-lg": "lg",
  "icon-sm": "sm",
  "icon-xl": "xl",
  "icon-xs": "xs",
  lg: "lg",
  md: "md",
  sm: "sm",
  xl: "xl",
  xs: "xs",
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
        cn(buttonVariants({ size: resolvedSize, variant })),
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
