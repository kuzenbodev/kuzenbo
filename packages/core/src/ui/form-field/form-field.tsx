import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { Field } from "../field/field";
import { FormFieldContent } from "./form-field-content";
import { FormFieldDescription } from "./form-field-description";
import { FormFieldError } from "./form-field-error";
import { FormFieldGroup } from "./form-field-group";
import { FormFieldLabel } from "./form-field-label";
import { FormFieldLegend } from "./form-field-legend";
import { FormFieldSeparator } from "./form-field-separator";
import { FormFieldSet } from "./form-field-set";
import { FormFieldTitle } from "./form-field-title";
export type FormFieldProps = ComponentProps<typeof Field.Root> &
  VariantProps<typeof fieldVariants>;

const fieldVariants = tv({
  base: "group/field data-[invalid]:text-danger-foreground data-[invalid=true]:text-danger-foreground flex w-full gap-3",
  defaultVariants: {
    orientation: "vertical",
  },
  variants: {
    orientation: {
      horizontal:
        "flex-row items-center has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-item]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px has-[>[data-slot=field-item]]:[&>[role=checkbox],[role=radio]]:mt-px",
      responsive:
        "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-item]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px @md/field-group:has-[>[data-slot=field-item]]:[&>[role=checkbox],[role=radio]]:mt-px",
      vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
    },
  },
});

const FormField = ({
  className,
  orientation = "vertical",
  role = "group",
  ...props
}: FormFieldProps) => (
  <Field.Root
    className={cn(fieldVariants({ orientation }), className)}
    data-orientation={orientation}
    role={role}
    {...props}
  />
);

FormField.Content = FormFieldContent;
FormField.Description = FormFieldDescription;
FormField.Error = FormFieldError;
FormField.Group = FormFieldGroup;
FormField.Label = FormFieldLabel;
FormField.Legend = FormFieldLegend;
FormField.Separator = FormFieldSeparator;
FormField.Set = FormFieldSet;
FormField.Title = FormFieldTitle;

export {
  FormField,
  fieldVariants,
  FormFieldContent,
  FormFieldDescription,
  FormFieldError,
  FormFieldGroup,
  FormFieldLabel,
  FormFieldLegend,
  FormFieldSeparator,
  FormFieldSet,
  FormFieldTitle,
};

export type { FormFieldContentProps } from "./form-field-content";
export type { FormFieldDescriptionProps } from "./form-field-description";
export type { FormFieldErrorProps } from "./form-field-error";
export type { FormFieldGroupProps } from "./form-field-group";
export type { FormFieldLabelProps } from "./form-field-label";
export type { FormFieldLegendProps } from "./form-field-legend";
export type { FormFieldSeparatorProps } from "./form-field-separator";
export type { FormFieldSetProps } from "./form-field-set";
export type { FormFieldTitleProps } from "./form-field-title";
