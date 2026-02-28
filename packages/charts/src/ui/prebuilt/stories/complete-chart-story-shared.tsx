import { tv } from "tailwind-variants";

export const completeChartShellVariants = tv({
  base: "border-border bg-background mx-auto w-full max-w-5xl rounded-2xl border p-4",
});

export const completeChartCompactShellVariants = tv({
  base: "border-border bg-background mx-auto w-full max-w-md rounded-2xl border p-3",
});

const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const formatCurrencyCompact = (value: number) =>
  `$${compactNumberFormatter.format(value)}`;

export const formatNumberCompact = (value: number) =>
  compactNumberFormatter.format(value);

export const formatPercent = (value: number) => `${value}%`;

export const formatSignedNumberCompact = (value: number) => {
  const sign = value > 0 ? "+" : "";

  return `${sign}${compactNumberFormatter.format(value)}`;
};
