import { useCallback, useRef, useState } from "react";

import { useIsomorphicEffect } from "../use-isomorphic-effect/use-isomorphic-effect";

export interface UseFileDialogOptions {
  /** Determines whether multiple files are allowed, `true` by default */
  multiple?: boolean;

  /** `accept` attribute of the file input, '*' by default */
  accept?: string;

  /** `capture` attribute of the file input */
  capture?: string;

  /** Determines whether the user can pick a directory instead of file, `false` by default */
  directory?: boolean;

  /** Determines whether the file input state should be reset when the file dialog is opened, `false` by default */
  resetOnOpen?: boolean;

  /** Initial selected files */
  initialFiles?: FileList | File[];

  /** Called when files are selected */
  onChange?: (files: FileList | null) => void;

  /** Called when file dialog is canceled */
  onCancel?: () => void;
}

const getInitialFilesList = (files: UseFileDialogOptions["initialFiles"]) => {
  if (!files) {
    return null;
  }

  if (files instanceof FileList) {
    return files;
  }

  const result = new DataTransfer();
  for (const file of files) {
    result.items.add(file);
  }

  return result.files;
};

const createInput = ({
  accept,
  capture,
  directory,
  multiple,
}: {
  accept: string;
  capture: string | undefined;
  directory: boolean;
  multiple: boolean;
}) => {
  if (typeof document === "undefined") {
    return null;
  }

  const input = document.createElement("input");
  input.type = "file";

  if (accept) {
    input.accept = accept;
  }

  if (multiple) {
    input.multiple = multiple;
  }

  if (capture) {
    input.capture = capture;
  }

  if (directory) {
    input.webkitdirectory = directory;
  }

  input.style.display = "none";
  return input;
};

export interface UseFileDialogReturnValue {
  files: FileList | null;
  open: () => void;
  reset: () => void;
}

/**
 * Provides an imperative API for opening the native file picker.
 *
 * The hook creates and manages a hidden `<input type="file">`, stores selected
 * files in state, and exposes helpers to open or reset the current selection.
 *
 * @param {UseFileDialogOptions | undefined} input Optional file dialog
 * configuration and callbacks.
 */
export const useFileDialog = (
  input?: UseFileDialogOptions
): UseFileDialogReturnValue => {
  const accept = input?.accept ?? "*";
  const capture = input?.capture;
  const directory = input?.directory ?? false;
  const initialFiles = input?.initialFiles;
  const multiple = input?.multiple ?? true;
  const onChange = input?.onChange;
  const resetOnOpen = input?.resetOnOpen ?? false;

  const [files, setFiles] = useState<FileList | null>(
    getInitialFilesList(initialFiles)
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback(
    (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (!target?.files) {
        return;
      }

      setFiles(target.files);
      onChange?.(target.files);
    },
    [onChange]
  );

  const createAndSetupInput = useCallback(() => {
    inputRef.current?.remove();
    inputRef.current = createInput({ accept, capture, directory, multiple });

    if (!inputRef.current) {
      return;
    }

    inputRef.current.addEventListener("change", handleChange, { once: true });
    document.body.append(inputRef.current);
  }, [accept, capture, directory, handleChange, multiple]);

  useIsomorphicEffect(() => {
    createAndSetupInput();

    return () => {
      inputRef.current?.remove();
    };
  }, [createAndSetupInput]);

  const reset = useCallback(() => {
    setFiles(null);
    onChange?.(null);
  }, [onChange]);

  const open = useCallback(() => {
    if (resetOnOpen) {
      reset();
    }

    createAndSetupInput();
    inputRef.current?.click();
  }, [createAndSetupInput, reset, resetOnOpen]);

  return { files, open, reset };
};

export type UseFileDialogOptionsType = UseFileDialogOptions;
export type UseFileDialogReturn = UseFileDialogReturnValue;
