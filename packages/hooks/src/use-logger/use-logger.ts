import { useEffect, useRef } from "react";

import { useDidUpdate } from "../use-did-update/use-did-update";

/**
 * Logs component lifecycle events to the console for debugging.
 * It logs `mounted` once, `updated` whenever watched props change, and `unmounted` on cleanup.
 *
 * @param {string} componentName Component label used in log messages.
 * @param {unknown[]} props Dependency values to watch for updates; values are included in each log call.
 */
export const useLogger = (componentName: string, props: unknown[]) => {
  const initialComponentName = useRef(componentName);
  const initialProps = useRef(props);

  useEffect(() => {
    const mountedComponentName = initialComponentName.current;
    const mountedProps = initialProps.current;

    globalThis.console.log(`${mountedComponentName} mounted`, ...mountedProps);
    return () => globalThis.console.log(`${mountedComponentName} unmounted`);
  }, []);

  useDidUpdate(() => {
    globalThis.console.log(`${componentName} updated`, ...props);
  }, props);

  return null;
};
