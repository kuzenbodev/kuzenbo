import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { Button } from "../button/button";
import type { UISize } from "../shared/size/size-system";
import { useResolvedEmptySize } from "./empty-size-context";

// oxlint-disable-next-line no-warning-comments
// TODO: handle icon size in the future

export type EmptyButtonProps = Omit<ComponentProps<typeof Button>, "size"> & {
  size?: UISize;
};

const EmptyButton = ({ className, size, ...props }: EmptyButtonProps) => {
  const resolvedSize = useResolvedEmptySize(size);

  return (
    <Button
      className={cn("cursor-clickable", className)}
      data-size={resolvedSize}
      data-slot="empty-button"
      size={resolvedSize}
      {...props}
    />
  );
};

export { EmptyButton };
