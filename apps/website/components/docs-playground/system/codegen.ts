import type { PlaygroundCodeMode, PlaygroundPrimitive } from "./types";

const SIMPLE_JSX_TEXT_PATTERN = /^[\w .,!?:;\-+/()&%]*$/;

export type SerializableJsxValue = PlaygroundPrimitive | undefined;

export interface SerializableJsxProp {
  defaultValue?: SerializableJsxValue;
  forceIncludeInMinimal?: boolean;
  kind: "boolean" | "number" | "string";
  name: string;
  value: SerializableJsxValue;
}

const shouldIncludeInMinimal = ({
  defaultValue,
  forceIncludeInMinimal,
  value,
}: Pick<
  SerializableJsxProp,
  "defaultValue" | "forceIncludeInMinimal" | "value"
>): boolean => {
  if (forceIncludeInMinimal) {
    return true;
  }

  return !Object.is(value, defaultValue);
};

const escapeAttributeString = (value: string): string =>
  value
    .replaceAll("\\", "\\\\")
    .replaceAll('"', '\\"')
    .replaceAll("\n", "\\n")
    .replaceAll("\r", "\\r");

export const serializeJsxTextChild = (value: string): string => {
  if (SIMPLE_JSX_TEXT_PATTERN.test(value)) {
    return value;
  }

  return `{${JSON.stringify(value)}}`;
};

const serializeBooleanProp = (
  name: string,
  value: boolean,
  mode: PlaygroundCodeMode
): string => {
  if (mode === "full") {
    return `${name}={${value}}`;
  }

  return value ? name : `${name}={false}`;
};

const serializeStringProp = (name: string, value: string): string =>
  `${name}="${escapeAttributeString(value)}"`;

const serializeNumberProp = (name: string, value: number): string =>
  `${name}={${value}}`;

export const serializeJsxProps = ({
  mode,
  props,
}: {
  mode: PlaygroundCodeMode;
  props: readonly SerializableJsxProp[];
}): string[] => {
  const serialized: string[] = [];

  for (const prop of props) {
    if (prop.value === undefined) {
      continue;
    }

    const includeInMinimal = shouldIncludeInMinimal(prop);
    if (mode === "minimal" && !includeInMinimal) {
      continue;
    }

    if (prop.kind === "boolean") {
      serialized.push(
        serializeBooleanProp(prop.name, Boolean(prop.value), mode)
      );
      continue;
    }

    if (prop.kind === "number") {
      serialized.push(serializeNumberProp(prop.name, Number(prop.value)));
      continue;
    }

    serialized.push(serializeStringProp(prop.name, String(prop.value)));
  }

  return serialized;
};

export const formatJsxElement = (
  elementName: string,
  props: readonly string[],
  children: string
): string => {
  const openTag =
    props.length > 0
      ? `<${elementName} ${props.join(" ")}>`
      : `<${elementName}>`;
  return `${openTag}${children}</${elementName}>`;
};
