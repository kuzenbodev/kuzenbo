import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type FieldsetRootProps = ComponentProps<typeof BaseFieldset.Root>;

export const FieldsetRoot = ({ className, ...props }: FieldsetRootProps) => (
  <BaseFieldset.Root
    className={mergeBaseUIClassName(
      "group/fieldset flex w-full flex-col gap-4",
      className
    )}
    data-slot="fieldset"
    {...props}
  />
);
