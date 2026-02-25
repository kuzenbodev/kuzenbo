export const sparklineUptrendData = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 142 },
  { day: "Wed", value: 165 },
  { day: "Thu", value: 188 },
  { day: "Fri", value: 210 },
] as const;

export const sparklineDowntrendWithNullsData = [
  { day: "Mon", value: 220 },
  { day: "Tue", value: null },
  { day: "Wed", value: 190 },
  { day: "Thu", value: null },
  { day: "Fri", value: 160 },
] as const;

export const sparklineFlatTrendData = [
  { day: "Mon", value: 80 },
  { day: "Tue", value: 80 },
  { day: "Wed", value: 80 },
  { day: "Thu", value: 80 },
  { day: "Fri", value: 80 },
] as const;
