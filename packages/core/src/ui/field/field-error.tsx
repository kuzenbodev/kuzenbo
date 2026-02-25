import type { ComponentProps } from "react";

import { Field as BaseField } from "@base-ui/react/field";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type FieldErrorProps = ComponentProps<typeof BaseField.Error>;

export const FieldError = ({ className, ...props }: FieldErrorProps) => (
  <BaseField.Error
    className={mergeBaseUIClassName(
      "text-sm font-normal text-danger-foreground",
      className
    )}
    data-slot="field-error"
    {...props}
  />
);
