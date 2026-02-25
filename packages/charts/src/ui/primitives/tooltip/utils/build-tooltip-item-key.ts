interface BuildTooltipItemKeyOptions {
  itemName: unknown;
  itemValue: unknown;
  seriesKey: string;
}

const buildTooltipItemKey = ({
  itemName,
  itemValue,
  seriesKey,
}: BuildTooltipItemKeyOptions) =>
  `${seriesKey}-${String(itemName ?? "name")}-${String(itemValue ?? "value")}`;

export { buildTooltipItemKey };
