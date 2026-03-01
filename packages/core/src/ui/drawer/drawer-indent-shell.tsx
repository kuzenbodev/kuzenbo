"use client";

import type { ReactNode } from "react";

import { DrawerIndent } from "./drawer-indent";
import type { DrawerIndentProps } from "./drawer-indent";
import { DrawerIndentBackground } from "./drawer-indent-background";
import type { DrawerIndentBackgroundProps } from "./drawer-indent-background";
import { DrawerProvider } from "./drawer-provider";

export interface DrawerIndentShellProps {
  children: ReactNode;
  indentBackgroundProps?: DrawerIndentBackgroundProps;
  indentProps?: DrawerIndentProps;
}

const DrawerIndentShell = ({
  children,
  indentBackgroundProps,
  indentProps,
}: DrawerIndentShellProps) => (
  <DrawerProvider>
    <DrawerIndentBackground {...indentBackgroundProps} />
    <DrawerIndent {...indentProps}>{children}</DrawerIndent>
  </DrawerProvider>
);

export { DrawerIndentShell };
