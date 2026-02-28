import { useCallback, useEffect, useState } from "react";

import { useWindowEvent } from "../use-window-event/use-window-event";

export type StorageType = "localStorage" | "sessionStorage";

export interface UseStorageOptions<T> {
  /** Storage key */
  key: string;

  /** Default value that will be set if value is not found in storage */
  defaultValue?: T;

  /** If set to true, value will be updated in useEffect after mount. Default value is true. */
  getInitialValueInEffect?: boolean;

  /** Determines whether the value must be synced between browser tabs, `true` by default */
  sync?: boolean;

  /** Function to serialize value into string to be save in storage */
  serialize?: (value: T) => string;

  /** Function to deserialize string value from storage to value */
  deserialize?: (value: string | undefined) => T;
}

const serializeJSON = <T>(value: T, hookName = "use-local-storage") => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw new Error(
      `@kuzenbo/hooks ${hookName}: Failed to serialize the value`,
      { cause: error }
    );
  }
};

const deserializeJSON = (value: string | undefined) => {
  try {
    return value && JSON.parse(value);
  } catch {
    return value;
  }
};

const createStorageHandler = (type: StorageType) => {
  const getItem = (key: string) => {
    try {
      return window[type].getItem(key);
    } catch {
      globalThis.console.warn(
        "use-local-storage: Failed to get value from storage, localStorage is blocked"
      );
      return null;
    }
  };

  const setItem = (key: string, value: string) => {
    try {
      window[type].setItem(key, value);
    } catch {
      globalThis.console.warn(
        "use-local-storage: Failed to set value to storage, localStorage is blocked"
      );
    }
  };

  const removeItem = (key: string) => {
    try {
      window[type].removeItem(key);
    } catch {
      globalThis.console.warn(
        "use-local-storage: Failed to remove value from storage, localStorage is blocked"
      );
    }
  };

  return { getItem, setItem, removeItem };
};

const isSetter = <T>(
  value: T | ((prevState: T) => T)
): value is (prevState: T) => T => typeof value === "function";

export type UseStorageReturnValue<T> = [
  // Current value.
  T,
  // Callback to set value in storage.
  (val: T | ((prevState: T) => T)) => void,
  // Callback to remove value from storage.
  () => void,
];

export const createStorage = <T>(type: StorageType, hookName: string) => {
  const eventName =
    type === "localStorage"
      ? "mantine-local-storage"
      : "mantine-session-storage";
  const { getItem, setItem, removeItem } = createStorageHandler(type);

  const useStorage = ({
    key,
    defaultValue,
    getInitialValueInEffect = true,
    sync = true,
    deserialize = deserializeJSON,
    serialize = (value: T) => serializeJSON(value, hookName),
  }: UseStorageOptions<T>): UseStorageReturnValue<T> => {
    const readStorageValue = useCallback(
      (skipStorage?: boolean): T => {
        let storageBlockedOrSkipped;

        try {
          storageBlockedOrSkipped =
            typeof window === "undefined" ||
            !(type in window) ||
            window[type] === null ||
            Boolean(skipStorage);
        } catch {
          storageBlockedOrSkipped = true;
        }

        if (storageBlockedOrSkipped) {
          return defaultValue as T;
        }

        const storageValue = getItem(key);

        if (storageValue === null) {
          return defaultValue as T;
        }

        return deserialize(storageValue);
      },
      [defaultValue, deserialize, key]
    );

    const [value, setValue] = useState<T>(
      readStorageValue(getInitialValueInEffect)
    );

    const setStorageValue = useCallback(
      (val: T | ((prevState: T) => T)) => {
        if (isSetter(val)) {
          setValue((current) => {
            const result = val(current);
            setItem(key, serialize(result));

            // Defer dispatching this event to avoid the handler being called during render.
            queueMicrotask(() => {
              window.dispatchEvent(
                new CustomEvent(eventName, {
                  detail: { key, value: result },
                })
              );
            });

            return result;
          });
          return;
        }

        setItem(key, serialize(val));
        window.dispatchEvent(
          new CustomEvent(eventName, { detail: { key, value: val } })
        );
        setValue(val);
      },
      [key, serialize]
    );

    const removeStorageValue = useCallback(() => {
      removeItem(key);
      setValue(defaultValue as T);
      window.dispatchEvent(
        new CustomEvent(eventName, { detail: { key, value: defaultValue } })
      );
    }, [defaultValue, key]);

    useWindowEvent("storage", (event) => {
      if (sync && event.storageArea === window[type] && event.key === key) {
        setValue(deserialize(event.newValue ?? undefined));
      }
    });

    useWindowEvent(eventName, (event) => {
      if (sync && event.detail.key === key) {
        setValue(event.detail.value);
      }
    });

    useEffect(() => {
      if (defaultValue !== undefined && value === undefined) {
        setStorageValue(defaultValue);
      }
    }, [defaultValue, setStorageValue, value]);

    useEffect(() => {
      const storageValue = readStorageValue();

      if (storageValue !== undefined) {
        setStorageValue(storageValue);
      }
    }, [readStorageValue, setStorageValue]);

    return [
      value === undefined ? (defaultValue as T) : value,
      setStorageValue,
      removeStorageValue,
    ];
  };

  return useStorage;
};

export const readValue = (type: StorageType) => {
  const { getItem } = createStorageHandler(type);

  const read = <T>({
    key,
    defaultValue,
    deserialize = deserializeJSON,
  }: UseStorageOptions<T>) => {
    let storageBlockedOrSkipped;

    try {
      storageBlockedOrSkipped =
        typeof window === "undefined" ||
        !(type in window) ||
        window[type] === null;
    } catch {
      storageBlockedOrSkipped = true;
    }

    if (storageBlockedOrSkipped) {
      return defaultValue as T;
    }

    const storageValue = getItem(key);

    if (storageValue === null) {
      return defaultValue as T;
    }

    return deserialize(storageValue);
  };

  return read;
};
