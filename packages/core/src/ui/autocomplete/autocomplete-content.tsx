import type { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ComponentProps } from "react";

import { useContext } from "react";

import type { InputSize } from "../input/input";

import { AutocompleteContext } from "./autocomplete-context";
import { AutocompleteOverlayContext } from "./autocomplete-overlay-context";
import { AutocompletePopup } from "./autocomplete-popup";
import { AutocompletePortal } from "./autocomplete-portal";
import { AutocompletePositioner } from "./autocomplete-positioner";

export type AutocompleteContentProps = ComponentProps<
  typeof BaseAutocomplete.Popup
> & {
  size?: InputSize;
  sideOffset?: BaseAutocomplete.Positioner.Props["sideOffset"];
};

export const AutocompleteContent = ({
  className,
  children,
  size,
  sideOffset = 4,
  ...props
}: AutocompleteContentProps) => {
  const { size: rootSize } = useContext(AutocompleteContext);
  const resolvedSize = size ?? rootSize ?? "md";

  return (
    <AutocompleteOverlayContext.Provider value={{ size: resolvedSize }}>
      <AutocompletePortal>
        <AutocompletePositioner
          className="outline-none"
          sideOffset={sideOffset}
        >
          <AutocompletePopup
            className={className}
            data-size={resolvedSize}
            data-slot="autocomplete-content"
            size={resolvedSize}
            {...props}
          >
            {children}
          </AutocompletePopup>
        </AutocompletePositioner>
      </AutocompletePortal>
    </AutocompleteOverlayContext.Provider>
  );
};
