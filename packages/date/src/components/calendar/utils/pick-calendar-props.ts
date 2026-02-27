export const pickCalendarProps = <T extends Record<string, unknown>>(
  props: T
): {
  calendarProps: Record<string, unknown>;
  others: Record<string, unknown>;
} => {
  const {
    allowDeselect,
    allowSingleDateInRange,
    columnsToScroll,
    date,
    defaultDate,
    defaultLevel,
    excludeDate,
    firstDayOfWeek,
    level,
    locale,
    maxDate,
    maxLevel,
    minDate,
    minLevel,
    monthLabelFormat,
    numberOfColumns,
    onDateChange,
    onLevelChange,
    onMonthMouseEnter,
    onMonthSelect,
    onYearMouseEnter,
    onYearSelect,
    weekdayFormat,
    weekendDays,
    yearLabelFormat,
    ...others
  } = props as Record<string, unknown>;

  return {
    calendarProps: {
      allowDeselect,
      allowSingleDateInRange,
      columnsToScroll,
      date,
      defaultDate,
      defaultLevel,
      excludeDate,
      firstDayOfWeek,
      level,
      locale,
      maxDate,
      maxLevel,
      minDate,
      minLevel,
      monthLabelFormat,
      numberOfColumns,
      onDateChange,
      onLevelChange,
      onMonthMouseEnter,
      onMonthSelect,
      onYearMouseEnter,
      onYearSelect,
      weekdayFormat,
      weekendDays,
      yearLabelFormat,
    },
    others,
  };
};
