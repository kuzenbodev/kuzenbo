import type { ComponentProps, ReactNode } from "react";
import type { ReferenceLine as RechartsReferenceLine } from "recharts";

type ReferenceLineLabel = ComponentProps<typeof RechartsReferenceLine>["label"];

const resolveReferenceLineLabel = (
  label: ReactNode | undefined
): ReferenceLineLabel => {
  if (label === null || label === undefined || typeof label === "boolean") {
    return;
  }

  return label as ReferenceLineLabel;
};

export { resolveReferenceLineLabel };
