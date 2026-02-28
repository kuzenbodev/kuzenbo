import { Field as BaseField } from "@base-ui/react/field";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type FieldItemProps = ComponentProps<typeof BaseField.Item>;

export const FieldItem = ({ className, ...props }: FieldItemProps) => (
  <BaseField.Item
    className={mergeBaseUIClassName(
      "group/field-item flex w-full flex-col gap-0.5 leading-snug",
      className
    )}
    data-slot="field-item"
    {...props}
  />
);
