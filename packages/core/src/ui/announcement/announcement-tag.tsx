import type { HTMLAttributes } from "react";
import { cn } from "tailwind-variants";

export type AnnouncementTagProps = HTMLAttributes<HTMLDivElement>;

export const AnnouncementTag = ({
  className,
  ...props
}: AnnouncementTagProps) => (
  <div
    className={cn(
      "bg-foreground/5 -ml-2.5 shrink-0 truncate rounded-full px-2.5 py-1 text-xs",
      "group-[.announcement-themed]:bg-background/60",
      className
    )}
    {...props}
  />
);
