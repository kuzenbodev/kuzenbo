import { useEffect, useMemo, useRef } from "react";

export const useCallbackRef = <TArgs extends readonly unknown[], TReturn>(
  fn: ((...args: TArgs) => TReturn) | undefined
): ((...args: TArgs) => TReturn | undefined) => {
  const callbackRef = useRef(fn);

  useEffect(() => {
    callbackRef.current = fn;
  }, [fn]);

  return useMemo(
    () =>
      (...args: TArgs) =>
        callbackRef.current?.(...args),
    []
  );
};
