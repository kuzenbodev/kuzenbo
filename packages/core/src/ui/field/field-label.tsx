import { Field as BaseField } from "@base-ui/react/field";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type FieldLabelProps = ComponentProps<typeof BaseField.Label>;

export const FieldLabel = ({ className, ...props }: FieldLabelProps) => (
  <BaseField.Label
    className={mergeBaseUIClassName(
      "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
      className
    )}
    data-slot="field-label"
    {...props}
  />
);
