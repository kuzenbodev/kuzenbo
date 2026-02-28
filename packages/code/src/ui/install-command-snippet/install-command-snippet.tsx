"use client";

import { CopyButton } from "@kuzenbo/core/ui/copy-button";
import { useCallback } from "react";

import { CodeBlockToolbar } from "../code-block-toolbar/code-block-toolbar";
import { CodeBlock } from "../code-block/code-block";
import { PackageManagerTabs } from "../package-manager-tabs/package-manager-tabs";
import { PACKAGE_MANAGERS } from "../package-manager-tabs/package-manager-tabs-types";
import type { PackageManager } from "../package-manager-tabs/package-manager-tabs-types";

export interface InstallCommandSnippetProps {
  className?: string;
  tabsClassName?: string;
  panelClassName?: string;
  commandClassName?: string;
  packages: readonly string[];
  commands?: Partial<Record<PackageManager, string>>;
  value?: PackageManager;
  defaultValue?: PackageManager;
  onValueChange?: (value: PackageManager) => void;
  persistPreference?: boolean;
  persistenceKey?: string;
  showCopyButton?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
  onCopy?: (command: string, manager: PackageManager) => void | Promise<void>;
}

const getInstallCommandPrefix = (manager: PackageManager): string => {
  if (manager === "npm") {
    return "npm install";
  }

  if (manager === "pnpm") {
    return "pnpm add";
  }

  if (manager === "yarn") {
    return "yarn add";
  }

  return "bun add";
};

const createInstallCommand = (
  manager: PackageManager,
  packages: readonly string[],
  commands: Partial<Record<PackageManager, string>> | undefined
): string => {
  const overriddenCommand = commands?.[manager];

  if (overriddenCommand !== undefined) {
    return overriddenCommand;
  }

  const joinedPackages = packages.filter(Boolean).join(" ");

  if (!joinedPackages) {
    return getInstallCommandPrefix(manager);
  }

  return `${getInstallCommandPrefix(manager)} ${joinedPackages}`;
};

export const InstallCommandSnippet = ({
  className,
  tabsClassName,
  panelClassName,
  commandClassName,
  packages,
  commands,
  value,
  defaultValue,
  onValueChange,
  persistPreference = false,
  persistenceKey,
  showCopyButton = true,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  onCopy,
}: InstallCommandSnippetProps) => {
  const handleCopy = useCallback(
    async (command: string, manager: PackageManager) => {
      await onCopy?.(command, manager);
    },
    [onCopy]
  );

  return (
    <div className={className} data-slot="install-command-snippet">
      <PackageManagerTabs
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        panelClassName={panelClassName}
        persistPreference={persistPreference}
        persistenceKey={persistenceKey}
        tabsClassName={tabsClassName}
        value={value}
      >
        {(manager) => {
          const command = createInstallCommand(manager, packages, commands);

          return (
            <div className="relative">
              <CodeBlock
                code={command}
                codeClassName={commandClassName}
                language="bash"
                toolbar={
                  <CodeBlockToolbar
                    language="bash"
                    title={manager}
                    end={
                      showCopyButton ? (
                        <CopyButton
                          size="xs"
                          statusLabels={{
                            copied: copiedLabel,
                            idle: copyLabel,
                          }}
                          value={command}
                          variant="ghost"
                          onStatusChange={async (status) => {
                            if (status !== "copied") {
                              return;
                            }

                            await handleCopy(command, manager);
                          }}
                        />
                      ) : null
                    }
                  />
                }
              />
            </div>
          );
        }}
      </PackageManagerTabs>
    </div>
  );
};

export { PACKAGE_MANAGERS };
