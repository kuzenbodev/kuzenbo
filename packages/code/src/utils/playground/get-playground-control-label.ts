const upperFirst = (value: string): string =>
  value.length === 0
    ? value
    : `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

export const getPlaygroundControlLabel = (prop: string): string =>
  upperFirst(prop.replaceAll(/([a-z])([A-Z])/g, "$1 $2").toLowerCase());
