import { useId as useReactId, useState } from "react";

import { useIsomorphicEffect } from "../use-isomorphic-effect/use-isomorphic-effect";
import { randomId } from "../utils";

/**
 * Returns a stable element id string, unless an explicit id is provided.
 * If no static id is passed, it starts from a React-generated id and switches
 * to a random id after mount to reduce collision risk across separate trees.
 *
 * @param {string} [staticId] Optional id that overrides generated ids when provided.
 */
export const useId = (staticId?: string) => {
  const reactId = useReactId();
  const [uuid, setUuid] = useState(`mantine-${reactId.replaceAll(":", "")}`);

  useIsomorphicEffect(() => {
    setUuid(randomId());
  }, []);

  if (typeof staticId === "string") {
    return staticId;
  }

  return uuid;
};
