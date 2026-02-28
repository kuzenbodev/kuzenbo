import type { KeyboardEvent as ReactKeyboardEvent } from "react";

export interface KeyboardModifiers {
  alt: boolean;
  ctrl: boolean;
  meta: boolean;
  mod: boolean;
  shift: boolean;
  plus: boolean;
}

export type Hotkey = KeyboardModifiers & {
  key?: string;
};

type CheckHotkeyMatch = (event: KeyboardEvent) => boolean;

const keyNameMap: Record<string, string> = {
  " ": "space",
  ArrowLeft: "arrowleft",
  ArrowRight: "arrowright",
  ArrowUp: "arrowup",
  ArrowDown: "arrowdown",
  Escape: "escape",
  Esc: "escape",
  esc: "escape",
  Enter: "enter",
  Tab: "tab",
  Backspace: "backspace",
  Delete: "delete",
  Insert: "insert",
  Home: "home",
  End: "end",
  PageUp: "pageup",
  PageDown: "pagedown",
  "+": "plus",
  "-": "minus",
  "*": "asterisk",
  "/": "slash",
};

const normalizeKey = (key: string): string => {
  const lowerKey = key.replace("Key", "").toLowerCase();
  return keyNameMap[key] || lowerKey;
};

export const parseHotkey = (hotkey: string): Hotkey => {
  const keys = hotkey
    .toLowerCase()
    .split("+")
    .map((part) => part.trim());

  const modifiers: KeyboardModifiers = {
    alt: keys.includes("alt"),
    ctrl: keys.includes("ctrl"),
    meta: keys.includes("meta"),
    mod: keys.includes("mod"),
    shift: keys.includes("shift"),
    plus: keys.includes("[plus]"),
  };

  const reservedKeys = new Set(["alt", "ctrl", "meta", "shift", "mod"]);

  const freeKey = keys.find((key) => !reservedKeys.has(key));

  return {
    ...modifiers,
    key: freeKey === "[plus]" ? "+" : freeKey,
  };
};

const isExactHotkey = (
  hotkey: Hotkey,
  event: KeyboardEvent,
  usePhysicalKeys?: boolean
): boolean => {
  const { alt, ctrl, meta, mod, shift, key } = hotkey;
  const {
    altKey,
    ctrlKey,
    metaKey,
    shiftKey,
    key: pressedKey,
    code: pressedCode,
  } = event;

  if (alt !== altKey) {
    return false;
  }

  if (mod) {
    if (!ctrlKey && !metaKey) {
      return false;
    }
  } else {
    if (ctrl !== ctrlKey) {
      return false;
    }
    if (meta !== metaKey) {
      return false;
    }
  }
  if (shift !== shiftKey) {
    return false;
  }

  if (
    key &&
    (usePhysicalKeys
      ? normalizeKey(pressedCode) === normalizeKey(key)
      : normalizeKey(pressedKey ?? pressedCode) === normalizeKey(key))
  ) {
    return true;
  }

  return false;
};

export const getHotkeyMatcher =
  (hotkey: string, usePhysicalKeys?: boolean): CheckHotkeyMatch =>
  (event) =>
    isExactHotkey(parseHotkey(hotkey), event, usePhysicalKeys);

export interface HotkeyItemOptions {
  preventDefault?: boolean;
  usePhysicalKeys?: boolean;
}

type HotkeyItem = [string, (event: KeyboardEvent) => void, HotkeyItemOptions?];

export const getHotkeyHandler =
  (hotkeys: HotkeyItem[]) =>
  (event: ReactKeyboardEvent<HTMLElement> | KeyboardEvent) => {
    const _event = "nativeEvent" in event ? event.nativeEvent : event;

    for (const [
      hotkey,
      handler,
      options = { preventDefault: true, usePhysicalKeys: false },
    ] of hotkeys) {
      if (getHotkeyMatcher(hotkey, options.usePhysicalKeys)(_event)) {
        if (options.preventDefault) {
          event.preventDefault();
        }

        handler(_event);
      }
    }
  };
