import type { ComponentProps } from "react";

import { useMemo } from "react";
import { cn } from "tailwind-variants";

import { Field } from "../field/field";
export type FormFieldErrorProps = ComponentProps<typeof Field.Error> & {
  errors?: ({ message?: string } | undefined)[];
};

const FormFieldError = ({
  className,
  children,
  errors,
  match,
  ...props
}: FormFieldErrorProps) => {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error) =>
            error?.message && <li key={error.message}>{error.message}</li>
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return (
      <Field.Error
        className={cn("text-sm font-normal text-danger-foreground", className)}
        data-slot="field-error"
        match={match}
        role="alert"
        {...props}
      />
    );
  }

  return (
    <Field.Error
      className={cn("text-sm font-normal text-danger-foreground", className)}
      data-slot="field-error"
      match={match ?? true}
      role="alert"
      {...props}
    >
      {content}
    </Field.Error>
  );
};

export { FormFieldError };
