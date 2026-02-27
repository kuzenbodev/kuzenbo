import type { DateAdapter } from "../../adapter";

export const getYearsData = (decade: Date, adapter: DateAdapter): Date[][] => {
  const year = adapter.getYear(decade);
  const roundedYear = year - (year % 10);

  const rows: Date[][] = [[], [], [], []];
  let yearOffset = 0;

  for (let rowIndex = 0; rowIndex < 4; rowIndex += 1) {
    const row = rows[rowIndex];
    if (!row) {
      continue;
    }

    const columns = rowIndex === 3 ? 1 : 3;

    for (let columnIndex = 0; columnIndex < columns; columnIndex += 1) {
      row.push(
        adapter.setDate(
          adapter.setMonth(
            adapter.setYear(decade, roundedYear + yearOffset),
            0
          ),
          1
        )
      );
      yearOffset += 1;
    }
  }

  return rows;
};
