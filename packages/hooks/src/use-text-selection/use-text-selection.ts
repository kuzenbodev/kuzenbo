import { useCallback, useEffect, useState } from "react";

import { useForceUpdate } from "../use-force-update/use-force-update";

/**
 * Subscribes to the document selection and returns the current `Selection` object.
 * The hook updates whenever the browser fires the `selectionchange` event.
 *
 */
export const useTextSelection = (): Selection | null => {
  const forceUpdate = useForceUpdate();
  const [selection, setSelection] = useState<Selection | null>(null);

  const handleSelectionChange = useCallback(() => {
    setSelection(document.getSelection());
    forceUpdate();
  }, [forceUpdate]);

  useEffect(() => {
    setSelection(document.getSelection());
    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, [handleSelectionChange]);

  return selection;
};
