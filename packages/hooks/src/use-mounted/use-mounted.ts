import { useEffect, useState } from "react";

/**
 * Indicates whether the component has completed its first client-side mount.
 *
 */
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};
