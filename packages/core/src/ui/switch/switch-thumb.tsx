"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type SwitchThumbProps = SwitchPrimitive.Thumb.Props;

const SwitchThumb = ({ className, ...props }: SwitchThumbProps) => (
  <SwitchPrimitive.Thumb
    className={mergeBaseUIClassName<SwitchPrimitive.Thumb.State>(
      "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=xs]/switch:size-2.5 group-data-[size=sm]/switch:size-3 group-data-[size=md]/switch:size-3.5 group-data-[size=lg]/switch:size-4 group-data-[size=xl]/switch:size-[18px] data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground",
      className
    )}
    data-slot="switch-thumb"
    {...props}
  />
);

export { SwitchThumb };
