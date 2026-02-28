import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { AutocompleteOverlayContext } from "./autocomplete-overlay-context";

export type AutocompleteEmptyProps = ComponentProps<
  typeof BaseAutocomplete.Empty
> &
  VariantProps<typeof autocompleteEmptyVariants>;

const autocompleteEmptyVariants = tv({
  base: "text-center empty:m-0 empty:p-0",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "py-7 text-sm",
      md: "py-6 text-sm",
      sm: "py-5 text-sm",
      xl: "py-8 text-base",
      xs: "py-4 text-xs",
    },
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
