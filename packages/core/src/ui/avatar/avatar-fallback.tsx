"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type AvatarFallbackProps = AvatarPrimitive.Fallback.Props;

const AvatarFallback = ({ className, ...props }: AvatarFallbackProps) => (
  <AvatarPrimitive.Fallback
    className={mergeBaseUIClassName<AvatarPrimitive.Fallback.State>(
      "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
      className
    )}
    data-slot="avatar-fallback"
    {...props}
  />
);

export { AvatarFallback };
