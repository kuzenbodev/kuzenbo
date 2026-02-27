import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { Button, type ButtonProps } from "../button/button";
import { useResolvedPaginationSize } from "./pagination-size-context";

type PaginationLinkProps = {
  kind?: "default" | "icon";
  isActive?: boolean;
  size?: UISize;
} & ComponentProps<"a">;

const PAGINATION_ICON_BUTTON_SIZE_BY_SIZE: Record<UISize, ButtonProps["size"]> =
  {
    xs: "icon-xs",
    sm: "icon-sm",
    md: "icon",
    lg: "icon-lg",
    xl: "icon-xl",
  };

const PAGINATION_TEXT_BUTTON_SIZE_BY_SIZE: Record<UISize, ButtonProps["size"]> =
  {
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  };

const PaginationLink = ({
  kind = "icon",
  className,
  isActive,
  size,
  ...props
}: PaginationLinkProps) => {
  const resolvedSize = useResolvedPaginationSize(size);
  const buttonSize =
    kind === "icon"
      ? PAGINATION_ICON_BUTTON_SIZE_BY_SIZE[resolvedSize]
      : PAGINATION_TEXT_BUTTON_SIZE_BY_SIZE[resolvedSize];

  return (
    <Button
      className={cn("cursor-clickable", className)}
      data-size={resolvedSize}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          aria-label="pagination link"
          data-active={isActive}
          data-size={resolvedSize}
          data-slot="pagination-link"
          {...props}
        />
      }
      size={buttonSize}
      variant={isActive ? "outline" : "ghost"}
    />
  );
};

export { PaginationLink };
export type { PaginationLinkProps };
