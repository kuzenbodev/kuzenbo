import { Field as BaseField } from "@base-ui/react/field";
import type { ComponentProps } from "react";

export type FieldValidityProps = ComponentProps<typeof BaseField.Validity>;

export const FieldValidity = (props: FieldValidityProps) => (
  <BaseField.Validity {...props} />
);
