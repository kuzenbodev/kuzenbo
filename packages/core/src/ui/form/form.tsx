"use client";

import { Form as BaseForm } from "@base-ui/react/form";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type FormRootProps<
  Values extends Record<string, unknown> = Record<string, unknown>,
> = BaseForm.Props<Values>;

export type FormProps<
  Values extends Record<string, unknown> = Record<string, unknown>,
> = FormRootProps<Values>;

const FormRoot = <
  Values extends Record<string, unknown> = Record<string, unknown>,
>({
  className,
  ...props
}: FormRootProps<Values>) => (
  <BaseForm
    className={mergeBaseUIClassName<BaseForm.State>(
      "flex w-full flex-col gap-6",
      className
    )}
    data-slot="form"
    {...props}
  />
);

const Form = Object.assign(FormRoot, {
  Root: FormRoot,
});

export type FormActions = BaseForm.Actions;
export type FormState = BaseForm.State;
export type FormSubmitEventDetails = BaseForm.SubmitEventDetails;
export type FormSubmitEventReason = BaseForm.SubmitEventReason;
export type FormValidationMode = BaseForm.ValidationMode;
export type FormValues<
  Values extends Record<string, unknown> = Record<string, unknown>,
> = BaseForm.Values<Values>;

export { Form, FormRoot };
