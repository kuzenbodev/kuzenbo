"use client";

import type { ReactNode } from "react";

import { Tabs } from "@kuzenbo/core/ui/tabs";
import { useEffect, useMemo, useState } from "react";
import { cn } from "tailwind-variants";

export interface CodeTabsItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface CodeTabsProps {
  className?: string;
  tabsClassName?: string;
  panelClassName?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  tabs: readonly CodeTabsItem[];
  loop?: boolean;
}

const getFirstEnabledTabValue = (tabs: readonly CodeTabsItem[]): string =>
  tabs.find((tab) => !tab.disabled)?.value ?? "";

const isEnabledTabValue = (
  nextValue: string | undefined,
  tabs: readonly CodeTabsItem[]
): boolean => tabs.some((tab) => !tab.disabled && tab.value === nextValue);

export const CodeTabs = ({
  className,
  tabsClassName,
  panelClassName,
  value,
  defaultValue,
  onValueChange,
  tabs,
  loop = true,
}: CodeTabsProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(() => {
    if (isEnabledTabValue(defaultValue, tabs)) {
      return defaultValue ?? "";
    }

    return getFirstEnabledTabValue(tabs);
  });

  const selectedValue = value ?? uncontrolledValue;
  const activeValue = isEnabledTabValue(selectedValue, tabs)
    ? selectedValue
    : getFirstEnabledTabValue(tabs);

  useEffect(() => {
    if (value !== undefined || activeValue === uncontrolledValue) {
      return;
    }

    setUncontrolledValue(activeValue);
  }, [activeValue, uncontrolledValue, value]);

  const activeTabValue = useMemo(() => {
    if (isEnabledTabValue(activeValue, tabs)) {
      return activeValue;
    }

    return getFirstEnabledTabValue(tabs);
  }, [activeValue, tabs]);

  return (
    <div className={cn("space-y-3", className)} data-slot="code-tabs">
      <Tabs
        data-slot="code-tabs-root"
        defaultValue={defaultValue}
        onValueChange={(nextValue) => {
          if (!isEnabledTabValue(nextValue, tabs)) {
            return;
          }

          if (value === undefined) {
            setUncontrolledValue(nextValue);
          }

          onValueChange?.(nextValue);
        }}
        value={activeTabValue}
      >
        <Tabs.List
          activateOnFocus
          className={cn(
            "inline-flex w-fit items-center gap-1 rounded-md border border-border bg-muted/40 p-1",
            tabsClassName
          )}
          loopFocus={loop}
        >
          {tabs.map((tab) => (
            <Tabs.Trigger
              disabled={tab.disabled}
              key={tab.value}
              value={tab.value}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Content
            className={cn(
              "rounded-lg border border-border bg-background p-3",
              panelClassName
            )}
            data-slot="code-tabs-panel"
            key={`${tab.value}-panel`}
            value={tab.value}
          >
            {tab.content}
          </Tabs.Content>
        ))}
      </Tabs>
    </div>
  );
};
