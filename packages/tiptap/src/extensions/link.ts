import { Link } from "@tiptap/extension-link";
import type { LinkOptions } from "@tiptap/extension-link";

export type CreateLinkExtensionOptions = Partial<LinkOptions>;

export const createLinkExtension = (options: CreateLinkExtensionOptions = {}) =>
  Link.configure({
    openOnClick: false,
    ...options,
  });
