import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { AutocompleteOverlayContext } from "./autocomplete-overlay-context";

const autocompleteRowVariants = tv({
  base: "grid w-full",
  variants: {
    size: {
      xs: "scroll-my-1",
      sm: "scroll-my-1",
      md: "scroll-my-1.5",
      lg: "scroll-my-2",
      xl: "scroll-my-2.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type AutocompleteRowProps = ComponentProps<typeof BaseAutocomplete.Row> &
  VariantProps<typeof autocompleteRowVariants>;

export const AutocompleteRow = ({
  className,
  size,
  ...props
}: AutocompleteRowProps) => {
  const { size: overlaySize } = useContext(AutocompleteOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <BaseAutocomplete.Row
      className={mergeBaseUIClassName<BaseAutocomplete.Row.State>(
        autocompleteRowVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="autocomplete-row"
      {...props}
    />
  );
};
