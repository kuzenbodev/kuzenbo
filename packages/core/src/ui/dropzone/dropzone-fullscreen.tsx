"use client";

import type { ComponentProps, CSSProperties } from "react";
import type { FileRejection, FileWithPath } from "react-dropzone";

import { useCallback, useEffect, useState } from "react";
import { cn, tv } from "tailwind-variants";

import type { DropzoneProps } from "./dropzone";

import { Dropzone } from "./dropzone";

export const fullScreenVariants = tv({
  base: [
    "fixed",
    "inset-0",
    "bg-background",
    "flex",
    "flex-col",
    "p-2",
    "z-9999",
    "transition-opacity",
  ],
  variants: {
    visible: {
      true: "pointer-events-auto opacity-100",
      false: "pointer-events-none opacity-0",
    },
  },
  defaultVariants: {
    visible: false,
  },
});

type DropzoneFullScreenProps = Omit<
  DropzoneProps,
  "styles" | "classNames" | "variant" | "activateOnClick"
> &
  ComponentProps<"div"> & {
    /** Determines whether user can drop files to browser window */
    active?: boolean;

    /** Z-index value */
    zIndex?: CSSProperties["zIndex"];

    /** Determines whether component should be rendered within Portal */
    withinPortal?: boolean;

    /** Portal target element */
    portalTarget?: HTMLElement;
  };

export const DropzoneFullScreen = ({
  className,
  active = true,
  onDrop,
  onReject,
  zIndex,
  withinPortal = true,
  portalTarget,
  ...dropzoneProps
}: DropzoneFullScreenProps) => {
  const [, setCounter] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleDragEnter = useCallback((event: DragEvent) => {
    if (event.dataTransfer?.types.includes("Files")) {
      setCounter((prev) => prev + 1);
      setVisible(true);
    }
  }, []);

  const handleDragLeave = useCallback(() => {
    setCounter((prev) => {
      const newValue = prev - 1;
      if (newValue === 0) {
        setVisible(false);
      }
      return newValue;
    });
  }, []);

  useEffect(() => {
    if (!active) {
      return;
    }

    document.addEventListener("dragenter", handleDragEnter, false);
    document.addEventListener("dragleave", handleDragLeave, false);

    return () => {
      document.removeEventListener("dragenter", handleDragEnter, false);
      document.removeEventListener("dragleave", handleDragLeave, false);
    };
  }, [active, handleDragEnter, handleDragLeave]);

  const handleDrop = useCallback(
    (files: FileWithPath[]) => {
      onDrop?.(files);
      setVisible(false);
      setCounter(0);
    },
    [onDrop]
  );

  const handleReject = useCallback(
    (files: FileRejection[]) => {
      onReject?.(files);
      setVisible(false);
      setCounter(0);
    },
    [onReject]
  );

  const content = (
    <div
      className={cn(fullScreenVariants({ visible }), className)}
      style={{ zIndex }}
    >
      <Dropzone
        {...dropzoneProps}
        activateOnClick={false}
        className="flex-1"
        onDrop={handleDrop}
        onReject={handleReject}
      />
    </div>
  );

  if (withinPortal && typeof window !== "undefined") {
    const target = portalTarget || document.body;
    return target && visible ? content : null;
  }

  return visible ? content : null;
};

DropzoneFullScreen.displayName = "DropzoneFullScreen";

export type { DropzoneFullScreenProps };
