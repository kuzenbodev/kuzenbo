import { Field as BaseField } from "@base-ui/react/field";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type FieldDescriptionProps = ComponentProps<
  typeof BaseField.Description
>;

export const FieldDescription = ({
  className,
  ...props
}: FieldDescriptionProps) => (
  <BaseField.Description
    className={mergeBaseUIClassName(
      "text-left text-sm leading-normal font-normal text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary-foreground",
      className
    )}
    data-slot="field-description"
    {...props}
  />
);
