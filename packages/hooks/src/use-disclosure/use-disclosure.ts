import { useCallback, useState } from "react";

export interface UseDisclosureOptions {
  onOpen?: () => void;
  onClose?: () => void;
}

export interface UseDisclosureHandlers {
  set: (value: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export type UseDisclosureReturnValue = [boolean, UseDisclosureHandlers];

/**
 * Manages boolean open/closed state with stable helper handlers.
 *
 * The `open` and `close` handlers are idempotent and invoke `onOpen` or
 * `onClose` only when the state actually changes.
 *
 * @param {boolean} initialState Initial disclosure state, `false` by default.
 * @param {UseDisclosureOptions} options Optional lifecycle callbacks fired on
 * state transitions.
 */
export const useDisclosure = (
  initialState = false,
  options: UseDisclosureOptions = {}
): UseDisclosureReturnValue => {
  const [opened, setOpened] = useState(initialState);
  const { onClose, onOpen } = options;

  const open = useCallback(() => {
    setOpened((isOpened) => {
      if (!isOpened) {
        onOpen?.();
        return true;
      }
      return isOpened;
    });
  }, [onOpen]);

  const close = useCallback(() => {
    setOpened((isOpened) => {
      if (isOpened) {
        onClose?.();
        return false;
      }
      return isOpened;
    });
  }, [onClose]);

  const toggle = useCallback(() => {
    if (opened) {
      close();
      return;
    }

    open();
  }, [close, open, opened]);

  return [opened, { open, close, toggle, set: setOpened }];
};
