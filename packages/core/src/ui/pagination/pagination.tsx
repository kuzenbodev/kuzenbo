"use client";

import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useComponentSize } from "../shared/size/size-provider";
import { PaginationContent } from "./pagination-content";
import { PaginationEllipsis } from "./pagination-ellipsis";
import { PaginationItem } from "./pagination-item";
import { PaginationLink } from "./pagination-link";
import { PaginationNext } from "./pagination-next";
import { PaginationPrevious } from "./pagination-previous";
import { PaginationSizeContext } from "./pagination-size-context";
export type PaginationProps = ComponentProps<"nav"> & {
  size?: UISize;
};

const Pagination = ({
  className,
  size: providedSize,
  ...props
}: PaginationProps) => {
  const size = useComponentSize(providedSize);

  return (
    <PaginationSizeContext.Provider value={{ size }}>
      <nav
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        data-size={size}
        data-slot="pagination"
        {...props}
      />
    </PaginationSizeContext.Provider>
  );
};

Pagination.Content = PaginationContent;
Pagination.Ellipsis = PaginationEllipsis;
Pagination.Item = PaginationItem;
Pagination.Link = PaginationLink;
Pagination.Next = PaginationNext;
Pagination.Previous = PaginationPrevious;

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};

export type { PaginationContentProps } from "./pagination-content";
export type { PaginationEllipsisProps } from "./pagination-ellipsis";
export type { PaginationItemProps } from "./pagination-item";
export type { PaginationLinkProps } from "./pagination-link";
export type { PaginationNextProps } from "./pagination-next";
export type { PaginationPreviousProps } from "./pagination-previous";
