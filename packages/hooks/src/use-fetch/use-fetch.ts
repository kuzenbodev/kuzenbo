import { useCallback, useEffect, useRef, useState } from "react";

export interface UseFetchOptions extends RequestInit {
  autoInvoke?: boolean;
}

export interface UseFetchReturnValue<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<T | Error>;
  abort: () => void;
}

/**
 * Fetches JSON data from a URL and tracks loading, error, and result state.
 *
 * The hook can auto-run on mount and whenever dependencies change, and exposes
 * imperative `refetch` and `abort` helpers.
 *
 * @param {string} url Request URL used by `fetch`.
 * @param {UseFetchOptions} options Request options plus `autoInvoke` toggle.
 */
export const useFetch = <T>(
  url: string,
  { autoInvoke = true, ...options }: UseFetchOptions = {}
): UseFetchReturnValue<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const controller = useRef<AbortController | null>(null);
  const optionsRef = useRef<RequestInit>(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const refetch = useCallback(async (): Promise<T | Error> => {
    controller.current?.abort();
    const nextController = new AbortController();
    controller.current = nextController;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        signal: nextController.signal,
        ...optionsRef.current,
      });
      const result = (await response.json()) as T;
      setData(result);
      return result;
    } catch (fetchError: unknown) {
      if (fetchError instanceof Error) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError);
        }
        return fetchError;
      }

      const unknownError = new Error("Unknown fetch error");
      setError(unknownError);
      return unknownError;
    } finally {
      setLoading(false);
    }
  }, [url]);

  const abort = useCallback(() => {
    controller.current?.abort();
  }, []);

  useEffect(() => {
    if (autoInvoke) {
      refetch();
    }

    return () => {
      controller.current?.abort();
    };
  }, [refetch, autoInvoke]);

  return { data, loading, error, refetch, abort };
};
