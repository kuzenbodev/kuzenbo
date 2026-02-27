"use client";

import { FieldControl } from "./field-control";
import { FieldDescription } from "./field-description";
import { FieldError } from "./field-error";
import { FieldItem } from "./field-item";
import { FieldLabel } from "./field-label";
import { FieldRoot, type FieldRootProps } from "./field-root";
import { FieldValidity } from "./field-validity";

export type FieldProps = FieldRootProps;

const Field = ({ ...props }: FieldRootProps) => <FieldRoot {...props} />;

Field.Root = FieldRoot;
Field.Label = FieldLabel;
Field.Control = FieldControl;
Field.Description = FieldDescription;
Field.Item = FieldItem;
Field.Error = FieldError;
Field.Validity = FieldValidity;

export type { FieldControlProps } from "./field-control";
export type { FieldDescriptionProps } from "./field-description";
export type { FieldErrorProps } from "./field-error";
export type { FieldItemProps } from "./field-item";
export type { FieldLabelProps } from "./field-label";
export type { FieldRootProps } from "./field-root";
export type { FieldValidityProps } from "./field-validity";

export {
  Field,
  FieldRoot,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldItem,
  FieldError,
  FieldValidity,
};
