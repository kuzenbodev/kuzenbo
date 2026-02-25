import { serializePlaygroundProp } from "./serialize-playground-prop";

const PROPS_PLACEHOLDER = "{{props}}";
const CHILDREN_PLACEHOLDER_REGEX = /{{children}}/g;
const MULTILINE_PROPS_PLACEHOLDER_REGEX = /^([\t ]*){{props}}([\t ]*)$/gm;

const getOrderedPropKeys = (
  props: Record<string, unknown>,
  propOrder: readonly string[] | undefined
): string[] => {
  const orderedKeys: string[] = [];
  const orderSet = new Set(propOrder);

  if (propOrder) {
    for (const propName of propOrder) {
      if (propName !== "children" && Object.hasOwn(props, propName)) {
        orderedKeys.push(propName);
      }
    }
  }

  const fallbackKeys = Object.keys(props).filter(
    (key) => key !== "children" && !orderSet.has(key)
  );
  fallbackKeys.sort();

  return [...orderedKeys, ...fallbackKeys];
};

const getSerializedPropLines = (
  props: Record<string, unknown>,
  propOrder: readonly string[] | undefined
): string[] => {
  const serializedLines: string[] = [];

  for (const propKey of getOrderedPropKeys(props, propOrder)) {
    const serializedProp = serializePlaygroundProp(propKey, props[propKey]);

    if (serializedProp) {
      serializedLines.push(serializedProp);
    }
  }

  return serializedLines;
};

const replaceInlinePropsPlaceholder = (
  template: string,
  propLines: readonly string[]
): string => {
  const joinedProps = propLines.join(" ");

  return template.replaceAll(
    PROPS_PLACEHOLDER,
    joinedProps.length > 0 ? ` ${joinedProps}` : ""
  );
};

const replaceMultilinePropsPlaceholder = (
  template: string,
  propLines: readonly string[]
): string =>
  template.replace(
    MULTILINE_PROPS_PLACEHOLDER_REGEX,
    (_match, indentation: string, trailingWhitespace: string) => {
      if (propLines.length === 0) {
        return "";
      }

      const lines = propLines.map((propLine) => `${indentation}${propLine}`);
      const lastIndex = lines.length - 1;
      lines[lastIndex] = `${lines[lastIndex]}${trailingWhitespace}`;
      return lines.join("\n");
    }
  );

const hasMultilinePropsPlaceholder = (template: string): boolean =>
  template.split("\n").some((line) => line.trim() === PROPS_PLACEHOLDER);

export interface InjectPlaygroundPropsOptions {
  template: string;
  props: Record<string, unknown>;
  propOrder?: readonly string[];
}

export const injectPlaygroundProps = ({
  template,
  props,
  propOrder,
}: InjectPlaygroundPropsOptions): string => {
  const propLines = getSerializedPropLines(props, propOrder);
  const { children } = props;
  const codeWithChildren = template.replaceAll(
    CHILDREN_PLACEHOLDER_REGEX,
    typeof children === "string" ? children : ""
  );

  if (hasMultilinePropsPlaceholder(codeWithChildren)) {
    return replaceMultilinePropsPlaceholder(codeWithChildren, propLines);
  }

  return replaceInlinePropsPlaceholder(codeWithChildren, propLines);
};
