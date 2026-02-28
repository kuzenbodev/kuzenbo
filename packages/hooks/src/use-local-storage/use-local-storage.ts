import type { UseStorageOptions } from "./create-storage";
import { createStorage, readValue } from "./create-storage";

/**
 * Persists state in `localStorage` using the shared storage abstraction.
 *
 * @param {UseStorageOptions<T>} props Storage options such as key, default value, and serialization behavior.
 */
export const useLocalStorage = <T = string>(props: UseStorageOptions<T>) =>
  createStorage<T>("localStorage", "use-local-storage")(props);

export const readLocalStorageValue = readValue("localStorage");
