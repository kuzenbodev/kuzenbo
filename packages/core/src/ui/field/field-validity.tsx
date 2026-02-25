import type { ComponentProps } from "react";

import { Field as BaseField } from "@base-ui/react/field";

export type FieldValidityProps = ComponentProps<typeof BaseField.Validity>;

export const FieldValidity = (props: FieldValidityProps) => (
  <BaseField.Validity {...props} />
);
