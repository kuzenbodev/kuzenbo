import type { DateAdapter } from "../../../adapter";

export const getMonthsData = (year: Date, adapter: DateAdapter): Date[][] => {
  const startOfYear = adapter.setDate(adapter.setMonth(year, 0), 1);
  const rows: Date[][] = [[], [], [], []];
  let monthIndex = 0;

  for (let rowIndex = 0; rowIndex < 4; rowIndex += 1) {
    const row = rows[rowIndex];
    if (!row) {
      continue;
    }

    for (let columnIndex = 0; columnIndex < 3; columnIndex += 1) {
      row.push(adapter.setMonth(startOfYear, monthIndex));
      monthIndex += 1;
    }
  }

  return rows;
};
