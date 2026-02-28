import { useEffect } from "react";

import type { HotkeyItemOptions } from "./parse-hotkey";
import { getHotkeyHandler, getHotkeyMatcher } from "./parse-hotkey";

export type { HotkeyItemOptions };
export { getHotkeyHandler };

export type HotkeyItem = [
  string,
  (event: KeyboardEvent) => void,
  HotkeyItemOptions?,
];

const shouldFireEvent = (
  event: KeyboardEvent,
  tagsToIgnore: string[],
  triggerOnContentEditable = false
): boolean => {
  if (event.target instanceof HTMLElement) {
    if (triggerOnContentEditable) {
      return !tagsToIgnore.includes(event.target.tagName);
    }

    return (
      !event.target.isContentEditable &&
      !tagsToIgnore.includes(event.target.tagName)
    );
  }

  return true;
};

/**
 * Registers global `keydown` listeners for a list of hotkey tuples and runs matching handlers.
 * Handlers can be filtered by element tag name and contentEditable behavior.
 *
 * @param {HotkeyItem[]} hotkeys Hotkey definitions in `[hotkey, handler, options]` format.
 * @param {string[]} tagsToIgnore Tag names where hotkeys should not fire.
 * @param {boolean} triggerOnContentEditable If `true`, allows firing in contentEditable elements unless ignored by tag.
 */
export const useHotkeys = (
  hotkeys: HotkeyItem[],
  tagsToIgnore: string[] = ["INPUT", "TEXTAREA", "SELECT"],
  triggerOnContentEditable = false
): void => {
  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      for (const [
        hotkey,
        handler,
        options = { preventDefault: true, usePhysicalKeys: false },
      ] of hotkeys) {
        if (
          getHotkeyMatcher(hotkey, options.usePhysicalKeys)(event) &&
          shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable)
        ) {
          if (options.preventDefault) {
            event.preventDefault();
          }

          handler(event);
        }
      }
    };

    document.documentElement.addEventListener("keydown", keydownListener);
    return () =>
      document.documentElement.removeEventListener("keydown", keydownListener);
  }, [hotkeys, tagsToIgnore, triggerOnContentEditable]);
};

export type UseHotkeysHotkey = HotkeyItem;
