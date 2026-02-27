"use client";

import type {
  ComponentProps,
  DragEvent,
  InputHTMLAttributes,
  Ref,
} from "react";
import type {
  Accept,
  DropEvent,
  FileError,
  FileRejection,
  FileWithPath,
} from "react-dropzone";

import { useImperativeHandle } from "react";
import { useDropzone } from "react-dropzone";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { Spinner } from "../spinner/spinner";
import { DropzoneContext, useDropzoneContext } from "./dropzone-context";
import {
  DropzoneAccept,
  DropzoneIdle,
  DropzoneReject,
} from "./dropzone-status";

const dropzoneVariants = tv({
  slots: {
    root: [
      "relative",
      "cursor-clickable",
      "select-none",
      "rounded-lg",
      "border",
      "border-input",
      "border-dashed",
      "bg-background",
      "p-4",
      "outline-none",
      "transition-colors",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
    ],
    inner: [
      "pointer-events-none",
      "select-none",
      "data-enable-pointer-events:pointer-events-auto",
    ],
    overlay: [
      "absolute",
      "inset-0",
      "z-raised",
      "flex",
      "items-center",
      "justify-center",
      "rounded-lg",
      "bg-background/80",
      "backdrop-blur-sm",
    ],
  },
  variants: {
    variant: {
      default: {
        root: [
          // No additional styles for default variant
        ],
      },
      filled: {
        root: [
          // Background: muted background
          "bg-muted",
        ],
      },
      light: {
        root: [
          // Background: muted background with opacity
          "bg-muted/50",
        ],
      },
    },
    status: {
      idle: {
        root: [
          // No additional styles for idle status
        ],
      },
      accept: {
        root: [
          // Border: primary border color
          "border-primary",
          // Background: primary background with opacity
          "bg-primary/10",
          // Text: primary text color
          "text-primary-foreground",
        ],
      },
      reject: {
        root: [
          // Border: danger border color
          "border-danger",
          // Background: danger background with opacity
          "bg-danger",
          // Text: danger text color
          "text-danger-foreground",
        ],
      },
    },
    disabled: {
      true: {
        root: [
          // Cursor: default cursor
          "cursor-default",
          // Opacity: reduced opacity
          "opacity-50",
        ],
      },
    },
    loading: {
      true: {
        root: [
          // Cursor: default cursor
          "cursor-default",
        ],
      },
    },
    activateOnClick: {
      true: {},
      false: {
        root: [
          // Cursor: default cursor when click is disabled
          "cursor-default",
        ],
      },
    },
  },
  compoundVariants: [
    {
      status: "accept",
      variant: "filled",
      class: {
        root: "border-primary bg-primary/20",
      },
    },
    {
      status: "accept",
      variant: "light",
      class: {
        root: "border-primary bg-primary/10",
      },
    },
    {
      status: "reject",
      variant: "filled",
      class: {
        root: "border-danger bg-danger/20",
      },
    },
    {
      status: "reject",
      variant: "light",
      class: {
        root: "border-danger bg-danger",
      },
    },
  ],
  defaultVariants: {
    variant: "light",
    status: "idle",
    disabled: false,
    loading: false,
    activateOnClick: true,
  },
});

type DropzoneVariants = VariantProps<typeof dropzoneVariants>;

type DropzoneProps = Omit<ComponentProps<"div">, "onDrop" | "ref"> &
  DropzoneVariants & {
    ref?: Ref<HTMLDivElement>;
    /** Called when any files are dropped to the dropzone */
    onDropAny?: (
      files: FileWithPath[],
      fileRejections: FileRejection[]
    ) => void;

    /** Called when valid files are dropped to the dropzone */
    onDrop: (files: FileWithPath[]) => void;

    /** Called when dropped files do not meet file restrictions */
    onReject?: (fileRejections: FileRejection[]) => void;

    /** Determines whether files capturing should be disabled */
    disabled?: boolean;

    /** Determines whether a loading overlay should be displayed */
    loading?: boolean;

    /** Mime types of the files that dropzone can accept */
    accept?: Accept | string[];

    /** A ref function which when called opens the file system file picker */
    openRef?: Ref<() => void>;

    /** Determines whether multiple files can be dropped */
    multiple?: boolean;

    /** Maximum file size in bytes */
    maxSize?: number;

    /** Name of the form control */
    name?: string;

    /** Maximum number of files that can be picked at once */
    maxFiles?: number;

    /** Set to autofocus the root element */
    autoFocus?: boolean;

    /** If false, disables click to open the native file selection dialog */
    activateOnClick?: boolean;

    /** If false, disables drag 'n' drop */
    activateOnDrag?: boolean;

    /** If false, disables Space/Enter to open the native file selection dialog */
    activateOnKeyboard?: boolean;

    /** If false, stops drag event propagation to parents */
    dragEventsBubbling?: boolean;

    /** Called when the dragenter event occurs */
    onDragEnter?: (event: DragEvent<HTMLElement>) => void;

    /** Called when the dragleave event occurs */
    onDragLeave?: (event: DragEvent<HTMLElement>) => void;

    /** Called when the dragover event occurs */
    onDragOver?: (event: DragEvent<HTMLElement>) => void;

    /** Called when user closes the file selection dialog with no selection */
    onFileDialogCancel?: () => void;

    /** Called when user opens the file selection dialog */
    onFileDialogOpen?: () => void;

    /** If false, allow dropped items to take over the current browser window */
    preventDropOnDocument?: boolean;

    /** Set to true to use the File System Access API */
    useFsAccessApi?: boolean;

    /** Use this to provide a custom file aggregator */
    getFilesFromEvent?: (
      event: DropEvent
    ) => Promise<(File | DataTransferItem)[]>;

    /** Custom validation function */
    validator?: <T extends File>(file: T) => FileError | FileError[] | null;

    /** Determines whether pointer events should be enabled on the inner element */
    enablePointerEvents?: boolean;

    /** Props passed down to the internal Input component */
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
  };

const Dropzone = ({
  className,
  variant,
  status: statusProp,
  disabled: disabledProp,
  loading,
  multiple = true,
  maxSize = Number.POSITIVE_INFINITY,
  accept,
  children,
  onDropAny,
  onDrop,
  onReject,
  openRef,
  name,
  maxFiles,
  autoFocus,
  activateOnClick = true,
  activateOnDrag = true,
  dragEventsBubbling = true,
  activateOnKeyboard = true,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onFileDialogCancel,
  onFileDialogOpen,
  preventDropOnDocument,
  useFsAccessApi = true,
  getFilesFromEvent,
  validator,
  enablePointerEvents,
  inputProps,
  ref,
  ...props
}: DropzoneProps) => {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
    open,
  } = useDropzone({
    onDrop: onDropAny,
    onDropAccepted: onDrop,
    onDropRejected: onReject,
    disabled: disabledProp || loading,
    accept: Array.isArray(accept)
      ? Object.fromEntries(accept.map((key) => [key, []]))
      : accept,
    multiple,
    maxSize,
    maxFiles,
    autoFocus,
    noClick: !activateOnClick,
    noDrag: !activateOnDrag,
    noDragEventsBubbling: !dragEventsBubbling,
    noKeyboard: !activateOnKeyboard,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onFileDialogCancel,
    onFileDialogOpen,
    preventDropOnDocument,
    useFsAccessApi,
    validator,
    ...(getFilesFromEvent ? { getFilesFromEvent } : null),
  });

  useImperativeHandle(openRef, () => open, [open]);

  const isAccepted = isDragActive && isDragAccept;
  const isRejected = isDragActive && isDragReject;
  const isIdle = isDragActive
    ? isAccepted === false && isRejected === false
    : true;

  let status: "idle" | "accept" | "reject" = "idle";
  if (statusProp) {
    status = statusProp;
  } else if (isAccepted) {
    status = "accept";
  } else if (isRejected) {
    status = "reject";
  }
  const disabled = disabledProp || loading;

  const { root, inner, overlay } = dropzoneVariants({
    variant,
    status,
    disabled,
    loading,
    activateOnClick,
  });

  return (
    <DropzoneContext.Provider
      value={{ accept: isAccepted, reject: isRejected, idle: isIdle }}
    >
      <div
        {...getRootProps()}
        className={cn(root(), className)}
        data-disabled={disabled || undefined}
        data-loading={loading || undefined}
        data-slot="dropzone"
        ref={ref}
        {...props}
      >
        {loading && (
          <div className={overlay()}>
            <Spinner />
          </div>
        )}
        <input {...getInputProps(inputProps)} name={name} />
        <div
          className={inner()}
          data-enable-pointer-events={enablePointerEvents || undefined}
        >
          {children}
        </div>
      </div>
    </DropzoneContext.Provider>
  );
};

Dropzone.Accept = DropzoneAccept;
Dropzone.Idle = DropzoneIdle;
Dropzone.Reject = DropzoneReject;

export type {
  DropzoneAcceptProps,
  DropzoneIdleProps,
  DropzoneRejectProps,
} from "./dropzone-status";
export type { DropzoneProps, DropzoneVariants };

export {
  Dropzone,
  DropzoneAccept,
  DropzoneContext,
  DropzoneIdle,
  DropzoneReject,
  dropzoneVariants,
  useDropzoneContext,
};
