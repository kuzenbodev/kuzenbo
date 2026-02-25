import { createContext, useContext } from "react";

import type { UISize } from "../shared/size/size-system";

type TabsListVariant = "default" | "line" | "pill";

type TabsListSize = UISize;

interface TabsStyleContextValue {
  variant: TabsListVariant;
  size: TabsListSize;
  fullWidth: boolean;
}

const tabsStyleDefaults: TabsStyleContextValue = {
  variant: "default",
  size: "md",
  fullWidth: false,
};

const TabsStyleContext =
  createContext<TabsStyleContextValue>(tabsStyleDefaults);

const useTabsStyleContext = () => useContext(TabsStyleContext);

export {
  TabsStyleContext,
  tabsStyleDefaults,
  useTabsStyleContext,
  type TabsListSize,
  type TabsListVariant,
};
