import type { ComponentProps } from "react";
export type PaginationItemProps = ComponentProps<"li">;

const PaginationItem = ({ ...props }: PaginationItemProps) => (
  <li data-slot="pagination-item" {...props} />
);

export { PaginationItem };
