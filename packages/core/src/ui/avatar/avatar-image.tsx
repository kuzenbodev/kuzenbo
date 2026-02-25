"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type AvatarImageProps = AvatarPrimitive.Image.Props;

const AvatarImage = ({ className, ...props }: AvatarImageProps) => (
  <AvatarPrimitive.Image
    className={mergeBaseUIClassName<AvatarPrimitive.Image.State>(
      "aspect-square size-full rounded-full object-cover",
      className
    )}
    data-slot="avatar-image"
    {...props}
  />
);

export { AvatarImage };
