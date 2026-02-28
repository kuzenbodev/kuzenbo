export const randomId = (prefix = "mantine-"): string =>
  `${prefix}${Math.random().toString(36).slice(2, 11)}`;
