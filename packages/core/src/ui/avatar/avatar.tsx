"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";
import type { UISize } from "../shared/size/size-system";
import { AvatarBadge } from "./avatar-badge";
import { AvatarFallback } from "./avatar-fallback";
import { AvatarGroup } from "./avatar-group";
import { AvatarGroupCount } from "./avatar-group-count";
import { AvatarImage } from "./avatar-image";
export type AvatarProps = AvatarPrimitive.Root.Props & {
  size?: UISize;
};

const Avatar = ({ className, size: providedSize, ...props }: AvatarProps) => {
  const size = useComponentSize(providedSize);

  return (
    <AvatarPrimitive.Root
      className={mergeBaseUIClassName<AvatarPrimitive.Root.State>(
        "group/avatar relative flex shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=xs]:size-5 data-[size=sm]:size-6 data-[size=md]:size-8 data-[size=lg]:size-10 data-[size=xl]:size-11 dark:after:mix-blend-lighten",
        className
      )}
      data-size={size}
      data-slot="avatar"
      {...props}
    />
  );
};

Avatar.Badge = AvatarBadge;
Avatar.Fallback = AvatarFallback;
Avatar.Group = AvatarGroup;
Avatar.GroupCount = AvatarGroupCount;
Avatar.Image = AvatarImage;

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
};

export type { AvatarBadgeProps } from "./avatar-badge";
export type { AvatarFallbackProps } from "./avatar-fallback";
export type { AvatarGroupProps } from "./avatar-group";
export type { AvatarGroupCountProps } from "./avatar-group-count";
export type { AvatarImageProps } from "./avatar-image";
