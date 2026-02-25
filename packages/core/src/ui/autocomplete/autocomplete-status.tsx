import type { ComponentProps } from "react";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { AutocompleteOverlayContext } from "./autocomplete-overlay-context";

export type AutocompleteStatusProps = ComponentProps<
  typeof BaseAutocomplete.Status
> &
  VariantProps<typeof autocompleteStatusVariants>;

const autocompleteStatusVariants = tv({
  base: "flex items-center text-muted-foreground",
  variants: {
    size: {
      xs: "gap-1 px-1.5 py-1 text-xs",
      sm: "gap-1.5 px-2 py-1 text-sm",
      md: "gap-2 px-2 py-1.5 text-sm",
      lg: "gap-2 px-2.5 py-2 text-sm",
      xl: "gap-2.5 px-3 py-2.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const AutocompleteStatus = ({
  className,
  size,
  ...props
}: AutocompleteStatusProps) => {
  const { size: overlaySize } = useContext(AutocompleteOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <BaseAutocomplete.Status
      className={mergeBaseUIClassName<BaseAutocomplete.Status.State>(
        autocompleteStatusVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="autocomplete-status"
      {...props}
    />
  );
};
