"use client";

import type { KeyboardEvent, ReactNode } from "react";

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

  const selectTab = (nextValue: string): void => {
    if (!isEnabledTabValue(nextValue, tabs)) {
      return;
    }

    if (value === undefined) {
      setUncontrolledValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  const handleTriggerKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentValue: string
  ): void => {
    const enabledTabs = tabs.filter((tab) => !tab.disabled);
    const currentIndex = enabledTabs.findIndex(
      (tab) => tab.value === currentValue
    );

    if (currentIndex === -1) {
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectTab(enabledTabs[0]?.value ?? currentValue);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      selectTab(enabledTabs.at(-1)?.value ?? currentValue);
      return;
    }

    const keyToDelta: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    const delta = keyToDelta[event.key];

    if (delta === undefined) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectTab(currentValue);
      }
      return;
    }

    event.preventDefault();

    const nextIndex = currentIndex + delta;
    const outOfRange = nextIndex < 0 || nextIndex >= enabledTabs.length;

    if (outOfRange && !loop) {
      return;
    }

    const wrappedIndex = (nextIndex + enabledTabs.length) % enabledTabs.length;
    const nextValue = enabledTabs[wrappedIndex]?.value ?? currentValue;

    selectTab(nextValue);
  };

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
        >
          {tabs.map((tab) => (
            <Tabs.Trigger
              disabled={tab.disabled}
              key={tab.value}
              onKeyDown={(event) => {
                handleTriggerKeyDown(event, tab.value);
              }}
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
