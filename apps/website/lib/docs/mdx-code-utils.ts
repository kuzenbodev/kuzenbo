import { Children, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

export const docsShikiThemes = {
  dark: "github-dark-default",
  light: "github-light-default",
} as const;

export const extractLanguageFromClassName = (
  className: string | undefined
): string | undefined => {
  if (!className) {
    return undefined;
  }

  const languageClassName = className
    .split(/\s+/)
    .find((segment) => segment.startsWith("language-"));

  if (!languageClassName) {
    return undefined;
  }

  return languageClassName.slice("language-".length) || undefined;
};

export const flattenReactCodeChildrenToString = (value: ReactNode): string => {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (value === null || value === undefined || typeof value === "boolean") {
    return "";
  }

  if (Array.isArray(value)) {
    return value.map(flattenReactCodeChildrenToString).join("");
  }

  if (isValidElement(value)) {
    return flattenReactCodeChildrenToString(
      (value.props as { children?: ReactNode }).children
    );
  }

  return "";
};

export const normalizeMarkdownCodeTrailingNewline = (code: string): string =>
  code.replace(/\r?\n$/, "");

export interface MdxCodeElementProps {
  children?: ReactNode;
  className?: string;
}

export const getCodeElementFromPreChildren = (
  children: ReactNode
): ReactElement<MdxCodeElementProps> | null => {
  const nonEmptyChildren = Children.toArray(children).filter((child) => {
    if (typeof child !== "string") {
      return true;
    }

    return child.trim().length > 0;
  });

  if (nonEmptyChildren.length !== 1) {
    return null;
  }

  const [codeChild] = nonEmptyChildren;

  if (!isValidElement<MdxCodeElementProps>(codeChild)) {
    return null;
  }

  return codeChild;
};
