import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useComponentSize } from "../shared/size/size-provider";
import { BreadcrumbEllipsis } from "./breadcrumb-ellipsis";
import { BreadcrumbItem } from "./breadcrumb-item";
import { BreadcrumbLink } from "./breadcrumb-link";
import { BreadcrumbList } from "./breadcrumb-list";
import { BreadcrumbPage } from "./breadcrumb-page";
import { BreadcrumbSeparator } from "./breadcrumb-separator";
import { BreadcrumbSizeContext } from "./breadcrumb-size-context";
export type BreadcrumbProps = ComponentProps<"nav"> & {
  size?: UISize;
};

const Breadcrumb = ({
  className,
  size: providedSize,
  ...props
}: BreadcrumbProps) => {
  const size = useComponentSize(providedSize);

  return (
    <BreadcrumbSizeContext.Provider value={{ size }}>
      <nav
        aria-label="breadcrumb"
        className={cn(className)}
        data-size={size}
        data-slot="breadcrumb"
        {...props}
      />
    </BreadcrumbSizeContext.Provider>
  );
};

Breadcrumb.Ellipsis = BreadcrumbEllipsis;
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Link = BreadcrumbLink;
Breadcrumb.List = BreadcrumbList;
Breadcrumb.Page = BreadcrumbPage;
Breadcrumb.Separator = BreadcrumbSeparator;

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};

export type { BreadcrumbEllipsisProps } from "./breadcrumb-ellipsis";
export type { BreadcrumbItemProps } from "./breadcrumb-item";
export type { BreadcrumbLinkProps } from "./breadcrumb-link";
export type { BreadcrumbListProps } from "./breadcrumb-list";
export type { BreadcrumbPageProps } from "./breadcrumb-page";
export type { BreadcrumbSeparatorProps } from "./breadcrumb-separator";
