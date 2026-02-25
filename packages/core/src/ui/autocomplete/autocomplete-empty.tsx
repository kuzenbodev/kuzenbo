import type { ComponentProps } from "react";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { AutocompleteOverlayContext } from "./autocomplete-overlay-context";

export type AutocompleteEmptyProps = ComponentProps<
  typeof BaseAutocomplete.Empty
> &
  VariantProps<typeof autocompleteEmptyVariants>;

const autocompleteEmptyVariants = tv({
  base: "text-center empty:m-0 empty:p-0",
  variants: {
    size: {
      xs: "py-4 text-xs",
      sm: "py-5 text-sm",
      md: "py-6 text-sm",
      lg: "py-7 text-sm",
      xl: "py-8 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const AutocompleteEmpty = ({
  className,
  size,
  ...props
}: AutocompleteEmptyProps) => {
  const { size: overlaySize } = useContext(AutocompleteOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <BaseAutocomplete.Empty
      className={mergeBaseUIClassName<BaseAutocomplete.Empty.State>(
        autocompleteEmptyVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="autocomplete-empty"
      {...props}
    />
  );
};
