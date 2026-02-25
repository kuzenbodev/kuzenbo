import { formatPercentValue } from "./format-percent-value";

const createPercentTickFormatter = (formatter?: (value: number) => string) => {
  if (formatter) {
    return formatter;
  }

  return formatPercentValue;
};

export { createPercentTickFormatter };
