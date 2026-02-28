import { Field as BaseField } from "@base-ui/react/field";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type FieldRootProps = ComponentProps<typeof BaseField.Root>;

export const FieldRoot = ({ className, ...props }: FieldRootProps) => (
  <BaseField.Root
    className={mergeBaseUIClassName(
      "group/field flex w-full flex-col gap-1",
      className
    )}
    data-slot="field"
    {...props}
  />
);
