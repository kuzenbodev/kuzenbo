import { FieldsetLegend } from "./fieldset-legend";
import { FieldsetRoot, type FieldsetRootProps } from "./fieldset-root";

export type FieldsetProps = FieldsetRootProps;

const Fieldset = ({ ...props }: FieldsetRootProps) => (
  <FieldsetRoot {...props} />
);

Fieldset.Root = FieldsetRoot;
Fieldset.Legend = FieldsetLegend;

export type { FieldsetLegendProps } from "./fieldset-legend";
export type { FieldsetRootProps } from "./fieldset-root";

export { Fieldset, FieldsetRoot, FieldsetLegend };
