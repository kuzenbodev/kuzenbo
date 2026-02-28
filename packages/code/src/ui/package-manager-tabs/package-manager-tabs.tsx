"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { CodeTabs } from "../code-tabs/code-tabs";
import {
  isPackageManager,
  PACKAGE_MANAGER_LABEL_BY_VALUE,
  PACKAGE_MANAGERS,
} from "./package-manager-tabs-types";
import type { PackageManager } from "./package-manager-tabs-types";

export const PACKAGE_MANAGER_PREFERENCE_STORAGE_KEY = "kuzenbo:package-manager";

export interface PackageManagerTabsProps {
  children?:
    | Partial<Record<PackageManager, ReactNode>>
    | ((value: PackageManager) => ReactNode);
  className?: string;
  tabsClassName?: string;
  panelClassName?: string;
  managers?: readonly PackageManager[];
  value?: PackageManager;
  defaultValue?: PackageManager;
  onValueChange?: (value: PackageManager) => void;
  persistPreference?: boolean;
  persistenceKey?: string;
}

const getAvailableManagers = (
  managers: readonly PackageManager[] | undefined
): readonly PackageManager[] => {
  if (!managers || managers.length === 0) {
    return PACKAGE_MANAGERS;
  }

  const uniqueManagers = managers.filter(
    (manager, index) => managers.indexOf(manager) === index
  );

  return uniqueManagers.length > 0 ? uniqueManagers : PACKAGE_MANAGERS;
};

const readPersistedManager = (
  persistenceKey: string,
  availableManagers: readonly PackageManager[]
): PackageManager | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const persistedValue = window.localStorage.getItem(persistenceKey);

    if (
      isPackageManager(persistedValue) &&
      availableManagers.includes(persistedValue)
    ) {
      return persistedValue;
    }
  } catch {
    return undefined;
  }

  return undefined;
};

const getFallbackManager = (
  availableManagers: readonly PackageManager[]
): PackageManager => availableManagers[0] ?? "npm";

export const PackageManagerTabs = ({
  children,
  className,
  tabsClassName,
  panelClassName,
  managers,
  value,
  defaultValue,
  onValueChange,
  persistPreference = false,
  persistenceKey = PACKAGE_MANAGER_PREFERENCE_STORAGE_KEY,
}: PackageManagerTabsProps) => {
  const availableManagers = useMemo(
    () => getAvailableManagers(managers),
    [managers]
  );

  const [uncontrolledValue, setUncontrolledValue] = useState<PackageManager>(
    () => {
      if (persistPreference) {
        const persistedManager = readPersistedManager(
          persistenceKey,
          availableManagers
        );

        if (persistedManager) {
          return persistedManager;
        }
      }

      if (defaultValue && availableManagers.includes(defaultValue)) {
        return defaultValue;
      }

      return getFallbackManager(availableManagers);
    }
  );

  const resolvedValue =
    value && availableManagers.includes(value) ? value : uncontrolledValue;
  const activeManager = availableManagers.includes(resolvedValue)
    ? resolvedValue
    : getFallbackManager(availableManagers);

  useEffect(() => {
    if (value !== undefined || activeManager === uncontrolledValue) {
      return;
    }

    setUncontrolledValue(activeManager);
  }, [activeManager, uncontrolledValue, value]);

  useEffect(() => {
    if (!persistPreference || typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(persistenceKey, activeManager);
    } catch {
      // Ignore storage write failures (privacy mode, disabled storage, quota).
    }
  }, [activeManager, persistPreference, persistenceKey]);

  const handleValueChange = useCallback(
    (nextValue: string) => {
      if (
        !isPackageManager(nextValue) ||
        !availableManagers.includes(nextValue)
      ) {
        return;
      }

      if (value === undefined) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [availableManagers, onValueChange, value]
  );

  const tabs = useMemo(
    () =>
      availableManagers.map((manager) => ({
        content:
          typeof children === "function"
            ? children(manager)
            : (children?.[manager] ?? null),
        label: PACKAGE_MANAGER_LABEL_BY_VALUE[manager],
        value: manager,
      })),
    [availableManagers, children]
  );

  return (
    <CodeTabs
      className={className}
      onValueChange={handleValueChange}
      panelClassName={panelClassName}
      tabs={tabs}
      tabsClassName={tabsClassName}
      value={activeManager}
    />
  );
};
