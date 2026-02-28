import type { UseStorageOptions } from "../use-local-storage/create-storage";
import { createStorage, readValue } from "../use-local-storage/create-storage";

/**
 * Persists state in `sessionStorage` under a given key and keeps React state in sync.
 * Values are scoped to the current browser tab/session and follow the shared storage hook contract.
 *
 * @param {UseStorageOptions<T>} props - Storage options such as key, default value, sync behavior, and serializers.
 */
export const useSessionStorage = <T = string>(props: UseStorageOptions<T>) =>
  createStorage<T>("sessionStorage", "use-session-storage")(props);

export const readSessionStorageValue = readValue("sessionStorage");
