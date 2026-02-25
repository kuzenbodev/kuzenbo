"use client";

import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button, Tooltip } from "@kuzenbo/core";
import {
  applyThemeToRootElement,
  persistThemeCookie,
  type ThemePreference,
} from "@kuzenbo/theme";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggle = useCallback(() => {
    const next: ThemePreference = isDark ? "light" : "dark";
    applyThemeToRootElement(next);
    persistThemeCookie(next);
    setTheme(next);
  }, [isDark, setTheme]);

  return (
    <Tooltip>
      <Tooltip.Trigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle color theme"
            onClick={toggle}
          />
        }
      >
        <span className="relative flex size-6 items-center justify-center">
          <span
            className={`absolute inset-0 flex origin-center items-center justify-center transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&_svg]:size-6 ${
              isDark
                ? "scale-0 rotate-[-120deg] opacity-0"
                : "scale-100 rotate-0 opacity-100"
            }`}
          >
            <HugeiconsIcon icon={Sun01Icon} />
          </span>
          <span
            className={`absolute inset-0 flex origin-center items-center justify-center transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&_svg]:size-6 ${
              isDark
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 rotate-[120deg] opacity-0"
            }`}
          >
            <HugeiconsIcon icon={Moon01Icon} />
          </span>
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content side="bottom" sideOffset={8}>
        <span className="flex items-center gap-2">
          Toggle Mode
          <kbd className="rounded border border-border/60 bg-muted/80 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
            D
          </kbd>
        </span>
      </Tooltip.Content>
    </Tooltip>
  );
};
