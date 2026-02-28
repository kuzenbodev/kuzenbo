import {
  transformerNotationHighlight,
  type TransformerNotationHighlightOptions,
} from "@shikijs/transformers";
import type { ShikiTransformer } from "shiki";

export interface CreateShikiTransformersOptions {
  notationHighlight?: boolean | TransformerNotationHighlightOptions;
  transformers?: ShikiTransformer[];
}

export const createShikiTransformers = (
  options: CreateShikiTransformersOptions = {}
): ShikiTransformer[] => {
  const transformers: ShikiTransformer[] = [];

  if (options.notationHighlight !== false) {
    const notationHighlightOptions =
      typeof options.notationHighlight === "object"
        ? options.notationHighlight
        : undefined;

    transformers.push(transformerNotationHighlight(notationHighlightOptions));
  }

  if (options.transformers?.length) {
    transformers.push(...options.transformers);
  }

  return transformers;
};
