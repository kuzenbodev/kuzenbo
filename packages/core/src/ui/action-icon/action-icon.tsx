"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import type { ComponentProps, ReactNode } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ButtonGroupSizeContext } from "../button-group/button-group-size-context";
import { buttonSharedVariants } from "../button/button-shared-variants";
import {
  useComponentSize,
  filterUndefinedProps,
  useKuzenboComponentDefaults,
} from "../shared/size/size-provider";
import type { UISize } from "../shared/size/size-system";
import { resolveDefaultNestedIconClassBySize } from "../shared/size/size-system";
import { Spinner } from "../spinner/spinner";

const actionIconVariants = tv({
  extend: buttonSharedVariants,
  base: "group/action-icon",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "size-10",
      md: "size-9",
      sm: [
        "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg",
      ],
      xl: ["size-11", resolveDefaultNestedIconClassBySize("xl")],
      xs: [
        "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg",
        resolveDefaultNestedIconClassBySize("xs"),
      ],
    },
  },
});

export type ActionIconProps = ComponentProps<typeof ButtonPrimitive> &
  VariantProps<typeof actionIconVariants> & {
    isLoading?: boolean;
  };

type ActionIconSize = NonNullable<
  VariantProps<typeof actionIconVariants>["size"]
>;

const ACTION_ICON_SPINNER_SIZE_BY_SIZE: Record<ActionIconSize, UISize> = {
  lg: "lg",
  md: "md",
  sm: "sm",
  xl: "xl",
  xs: "xs",
};

const isActionIconSize = (value: unknown): value is ActionIconSize =>
  typeof value === "string" && value in ACTION_ICON_SPINNER_SIZE_BY_SIZE;

const ActionIconContent = ({
  children,
  isLoading,
  size,
}: {
  children: ReactNode;
  isLoading?: boolean;
  size: ActionIconSize;
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
      <Spinner size={ACTION_ICON_SPINNER_SIZE_BY_SIZE[size]} />
    </span>
  </span>
);

const ActionIcon = (incomingProps: ActionIconProps) => {
  const componentDefaults =
    useKuzenboComponentDefaults<ActionIconProps>("ActionIcon");
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
  };

  const { size: buttonGroupSize } = useContext(ButtonGroupSizeContext);

  const resolvedSize = useComponentSize(
    isActionIconSize(size) ? size : undefined,
    buttonGroupSize,
    isActionIconSize(componentDefaultSize) ? componentDefaultSize : undefined
  );

  return (
    <ButtonPrimitive
      className={mergeBaseUIClassName<ButtonPrimitive.State>(
        cn(actionIconVariants({ size: resolvedSize, variant })),
        className
      )}
      focusableWhenDisabled={Boolean(isLoading)}
      data-loading={isLoading}
      data-size={resolvedSize}
      data-slot="action-icon"
      disabled={disabled || isLoading}
      {...props}
    >
      <ActionIconContent isLoading={isLoading} size={resolvedSize}>
        {children}
      </ActionIconContent>
    </ButtonPrimitive>
  );
};

export { ActionIcon, actionIconVariants };
