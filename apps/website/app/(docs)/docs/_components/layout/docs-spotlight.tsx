"use client";

import { Button } from "@kuzenbo/core/ui/button";
import { Command } from "@kuzenbo/core/ui/command";
import { Kbd } from "@kuzenbo/core/ui/kbd";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface DocsSpotlightAction {
  id: string;
  label: string;
  description: string;
  group: string;
  href: Route;
  shortcut: string;
  keywords: string[];
}

const DOCS_SPOTLIGHT_ACTIONS: readonly DocsSpotlightAction[] = [
  {
    description: "Set up @kuzenbo/theme and recommended styles quickly.",
    group: "Getting Started",
    href: "/docs/getting-started/installation",
    id: "installation",
    keywords: ["setup", "install", "theme"],
    label: "Open installation guide",
    shortcut: "G I",
  },
  {
    description: "Bootstrap app runtime with a minimal production baseline.",
    group: "Getting Started",
    href: "/docs/getting-started/quickstart",
    id: "quickstart",
    keywords: ["setup", "quick", "start"],
    label: "Open quickstart",
    shortcut: "G Q",
  },
  {
    description: "Review semantic tokens, color primitives, and CSS setup.",
    group: "Foundations",
    href: "/docs/foundations/theming",
    id: "theming",
    keywords: ["tokens", "theme", "colors"],
    label: "Open theming guide",
    shortcut: "F T",
  },
  {
    description: "Browse command, combobox, and navigation search primitives.",
    group: "Components",
    href: "/docs/components/command",
    id: "command",
    keywords: ["cmdk", "palette", "search"],
    label: "Open command docs",
    shortcut: "C C",
  },
  {
    description: "Compare information architecture and navigation composition.",
    group: "Patterns",
    href: "/docs/patterns/navigation-patterns",
    id: "navigation-patterns",
    keywords: ["ia", "layout", "sidebar"],
    label: "Open navigation patterns",
    shortcut: "P N",
  },
] as const;

const DocsSpotlight = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
  }, []);

  const openSpotlight = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.key || event.key.toLowerCase() !== "k") {
        return;
      }

      if (!event.metaKey && !event.ctrlKey) {
        return;
      }

      event.preventDefault();
      setOpen((isOpen) => !isOpen);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const groupedActions = useMemo(() => {
    const actionGroups = new Map<string, DocsSpotlightAction[]>();

    for (const action of DOCS_SPOTLIGHT_ACTIONS) {
      const group = actionGroups.get(action.group);

      if (group) {
        group.push(action);
        continue;
      }

      actionGroups.set(action.group, [action]);
    }

    return [...actionGroups.entries()];
  }, []);

  const actionSelectHandlers = useMemo(() => {
    const handlers = new Map<string, () => void>();

    for (const action of DOCS_SPOTLIGHT_ACTIONS) {
      handlers.set(action.id, () => {
        setOpen(false);
        router.push(action.href);
      });
    }

    return handlers;
  }, [router]);

  return (
    <>
      <Button
        className="text-muted-foreground hidden shrink-0 gap-2 sm:inline-flex"
        onClick={openSpotlight}
        size="sm"
        type="button"
        variant="outline"
      >
        Search docs
        <Kbd className="bg-muted text-muted-foreground">⌘K</Kbd>
      </Button>

      <Button
        className="shrink-0 sm:hidden"
        onClick={openSpotlight}
        size="sm"
        type="button"
        variant="outline"
      >
        Search
      </Button>

      <Command.Dialog
        description="Type to jump to docs pages and key component references."
        onOpenChange={handleOpenChange}
        open={open}
        title="Docs Spotlight"
      >
        <Command data-slot="docs-spotlight">
          <Command.Input placeholder="Search docs pages and actions..." />
          <Command.List>
            <Command.Empty>No docs pages match your search.</Command.Empty>
            {groupedActions.map(([groupLabel, actions]) => (
              <Command.Group heading={groupLabel} key={groupLabel}>
                {actions.map((action) => (
                  <Command.Item
                    key={action.id}
                    keywords={action.keywords}
                    onSelect={actionSelectHandlers.get(action.id)}
                    value={`${action.label} ${action.description}`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{action.label}</span>
                      <span className="text-muted-foreground block text-xs">
                        {action.description}
                      </span>
                    </span>
                    <Command.Shortcut>{action.shortcut}</Command.Shortcut>
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </Command.Dialog>
    </>
  );
};

export { DocsSpotlight };
