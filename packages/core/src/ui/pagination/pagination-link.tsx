import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { ActionIcon } from "../action-icon/action-icon";
import { Button } from "../button/button";
import type { ButtonProps } from "../button/button";
import type { UISize } from "../shared/size/size-system";
import { useResolvedPaginationSize } from "./pagination-size-context";

type PaginationLinkProps = {
  kind?: "default" | "icon";
  isActive?: boolean;
  size?: UISize;
} & ComponentProps<"a">;

const PAGINATION_ICON_SIZE_BY_SIZE: Record<
  UISize,
  NonNullable<ComponentProps<typeof ActionIcon>["size"]>
> = {
  lg: "lg",
  md: "md",
  sm: "sm",
  xl: "xl",
  xs: "xs",
};

const PAGINATION_TEXT_BUTTON_SIZE_BY_SIZE: Record<UISize, ButtonProps["size"]> =
  {
    lg: "lg",
    md: "md",
    sm: "sm",
    xl: "xl",
    xs: "xs",
  };

const PaginationLink = ({
  kind = "icon",
  className,
  isActive,
  size,
  ...props
}: PaginationLinkProps) => {
  const resolvedSize = useResolvedPaginationSize(size);
  const resolvedVariant: NonNullable<ButtonProps["variant"]> = isActive
    ? "outline"
    : "ghost";
  const sharedProps = {
    className: cn("cursor-clickable", className),
    "data-size": resolvedSize,
    nativeButton: false as const,
    render: (
      <a
        aria-current={isActive ? "page" : undefined}
        aria-label="pagination link"
        data-active={isActive}
        data-size={resolvedSize}
        data-slot="pagination-link"
        {...props}
      />
    ),
    variant: resolvedVariant,
  };

  if (kind === "icon") {
    return (
      <ActionIcon
        size={PAGINATION_ICON_SIZE_BY_SIZE[resolvedSize]}
        {...sharedProps}
      />
    );
  }

  return (
    <Button
      size={PAGINATION_TEXT_BUTTON_SIZE_BY_SIZE[resolvedSize]}
      {...sharedProps}
    />
  );
};

export { PaginationLink };
export type { PaginationLinkProps };
