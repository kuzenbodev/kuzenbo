export const heatmapPrimaryData = [
  { activity: 2, date: "2026-01-01" },
  { activity: 6, date: "2026-01-02" },
  { activity: 9, date: "2026-01-03" },
  { activity: 4, date: "2026-01-04" },
  { activity: 8, date: "2026-01-05" },
  { activity: 1, date: "2026-01-06" },
  { activity: 5, date: "2026-01-07" },
  { activity: 3, date: "2026-01-08" },
  { activity: 11, date: "2026-01-09" },
  { activity: 0, date: "2026-01-10" },
  { activity: 7, date: "2026-01-11" },
  { activity: 12, date: "2026-01-12" },
] as const;

export const heatmapCrossMonthData = [
  { activity: 5, date: "2026-01-28" },
  { activity: 8, date: "2026-01-29" },
  { activity: 3, date: "2026-01-30" },
  { activity: 7, date: "2026-01-31" },
  { activity: 4, date: "2026-02-01" },
  { activity: 10, date: "2026-02-02" },
  { activity: 6, date: "2026-02-03" },
  { activity: 9, date: "2026-02-04" },
  { activity: 2, date: "2026-02-05" },
] as const;

export const heatmapSparseData = [
  { activity: null, date: "2026-01-01" },
  { activity: 0, date: "2026-01-02" },
  { activity: 4, date: "2026-01-03" },
  { activity: null, date: "2026-01-04" },
  { activity: 9, date: "2026-01-05" },
] as const;

export const heatmapDateObjectData = [
  { activity: 2, date: new Date("2026-01-01T08:15:00.000Z") },
  { activity: 6, date: new Date("2026-01-02T09:30:00.000Z") },
  { activity: 9, date: new Date("2026-01-03T10:45:00.000Z") },
  { activity: 4, date: new Date("2026-01-04T12:00:00.000Z") },
] as const;
