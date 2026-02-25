"use client";

import type { ComponentProps, JSX, ReactNode } from "react";

import { cloneElement, isValidElement } from "react";
import { cn } from "tailwind-variants";

import { useDropzoneContext } from "./dropzone-context";

type DropzoneStatusProps = ComponentProps<"div"> & {
  children: ReactNode;
};

const createDropzoneStatus = (status: "accept" | "reject" | "idle") => {
  const Component = ({
    children,
    className,
    ...props
  }: DropzoneStatusProps) => {
    const ctx = useDropzoneContext();
    const _children = isValidElement(children) ? (
      children
    ) : (
      <span>{children}</span>
    );

    if (!ctx[status]) {
      return null;
    }

    return cloneElement(_children as JSX.Element, {
      className: cn(className, (_children as JSX.Element).props.className),
      ...props,
    });
  };

  Component.displayName = `Dropzone${status.charAt(0).toUpperCase() + status.slice(1)}`;

  return Component;
};

export const DropzoneAccept = createDropzoneStatus("accept");
export const DropzoneReject = createDropzoneStatus("reject");
export const DropzoneIdle = createDropzoneStatus("idle");

export type { DropzoneStatusProps };
export type DropzoneAcceptProps = DropzoneStatusProps;
export type DropzoneRejectProps = DropzoneStatusProps;
export type DropzoneIdleProps = DropzoneStatusProps;
