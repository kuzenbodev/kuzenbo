import { createPercentTickFormatter } from "../../shared/complete-helpers";
import { toNumericValue } from "../../shared/utils/number/to-numeric-value";

const percentTickFormatter = createPercentTickFormatter();

const createPercentAxisTickFormatter = () => (value: unknown) => {
  const numeric = toNumericValue(value, { allowRange: true });

  if (numeric === undefined) {
    return String(value);
  }

  return percentTickFormatter(numeric);
};

export { createPercentAxisTickFormatter };
