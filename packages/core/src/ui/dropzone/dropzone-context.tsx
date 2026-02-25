"use client";

import { createContext, useContext } from "react";

interface DropzoneContextValue {
  idle: boolean;
  accept: boolean;
  reject: boolean;
}

const DropzoneContext = createContext<DropzoneContextValue | null>(null);

export const useDropzoneContext = () => {
  const context = useContext(DropzoneContext);
  if (!context) {
    throw new Error("Dropzone components must be used within Dropzone");
  }
  return context;
};

export { DropzoneContext };
