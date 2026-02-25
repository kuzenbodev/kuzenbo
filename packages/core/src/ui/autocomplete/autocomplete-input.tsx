import type { ComponentProps } from "react";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { AutocompleteContext } from "./autocomplete-context";

const autocompleteInputVariants = tv({
  base: "flex w-full min-w-0 border border-input bg-transparent transition-colors outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-danger/50 dark:bg-input/30",
  variants: {
    size: {
      xs: "h-6 rounded-[min(var(--radius-md),8px)] px-2 py-0.5 text-xs",
      sm: "h-8 rounded-[min(var(--radius-md),10px)] px-2.5 py-1 text-sm",
      md: "h-9 rounded-md px-2.5 py-1 text-base md:text-sm",
      lg: "h-10 rounded-md px-3 py-1.5 text-base md:text-sm",
      xl: "h-11 rounded-md px-4 py-1.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type AutocompleteInputVariantProps = VariantProps<
  typeof autocompleteInputVariants
>;
type NativeAutocompleteInputProps = ComponentProps<
  typeof BaseAutocomplete.Input
>;
type NativeAutocompleteInputSize = NativeAutocompleteInputProps["size"];

export type AutocompleteInputProps = Omit<
  NativeAutocompleteInputProps,
  "size"
> &
  AutocompleteInputVariantProps & {
    htmlSize?: NativeAutocompleteInputSize;
  };

export const AutocompleteInput = ({
  className,
  htmlSize,
  size,
  ...props
}: AutocompleteInputProps) => {
  const { size: contextSize } = useContext(AutocompleteContext);
  const resolvedSize = size ?? contextSize ?? "md";

  return (
    <BaseAutocomplete.Input
      className={mergeBaseUIClassName<BaseAutocomplete.Input.State>(
        autocompleteInputVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="autocomplete-input"
      size={htmlSize}
      {...props}
    />
  );
};
