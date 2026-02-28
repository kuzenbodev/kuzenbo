"use client";

import type { ReactNode } from "react";

import type { BasePortalProps } from "./portal";
import { Portal } from "./portal";

export type OptionalPortalProps = BasePortalProps & {
  /**
   * Determines whether children should be rendered inside `<Portal />`
   * @default true
   */
  withinPortal?: boolean;
  /**
   * Portal children
   */
  children: ReactNode;
};

const isTestEnvironment = () =>
  typeof process !== "undefined" &&
  (process.env.NODE_ENV === "test" ||
    process.env.VITEST === "true" ||
    process.env.JEST_WORKER_ID !== undefined);

export const OptionalPortal = ({
  withinPortal = true,
  children,
  ...others
}: OptionalPortalProps) => {
  const env = isTestEnvironment();

  if (env || !withinPortal) {
    return children;
  }

  return <Portal {...others}>{children}</Portal>;
};
