"use client";

import { createContext, useContext } from "react";

import type { UISize } from "../shared/size/size-system";
import type {
  NavigationListTone,
  NavigationListVariant,
} from "./navigation-list-context";

export interface NavigationListItemContextValue {
  collapsible: boolean;
  disabled: boolean;
  open: boolean;
  size?: UISize;
  tone?: NavigationListTone;
  variant?: NavigationListVariant;
}

const NavigationListItemContext = createContext<NavigationListItemContextValue>(
  {
    collapsible: false,
    disabled: false,
    open: false,
    size: undefined,
    tone: undefined,
    variant: undefined,
  }
);

const useNavigationListItemContext = () =>
  useContext(NavigationListItemContext);

export { NavigationListItemContext, useNavigationListItemContext };
