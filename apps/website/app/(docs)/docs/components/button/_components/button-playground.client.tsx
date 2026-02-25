"use client";

import { DocsPlayground } from "@/components/docs-playground/system/docs-playground.client";

import { ButtonPlaygroundPreview } from "./button-playground-preview.client";
import { buttonPlaygroundDefinition } from "./button-playground.definition";

export const ButtonPlayground = () => (
  <DocsPlayground
    Preview={ButtonPlaygroundPreview}
    definition={buttonPlaygroundDefinition}
  />
);
