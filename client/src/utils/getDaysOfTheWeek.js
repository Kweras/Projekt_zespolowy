export const getDaysOfTheWeek = (week, year) => {
  const firstDayOfYear = new Date(year, 0, 1);
  const daysOffset = (week - 1) * 7 + (firstDayOfYear.getDay() === 0 ? -6 : 1 - firstDayOfYear.getDay());
  const firstDayOfWeek = new Date(year, 0, 1 + daysOffset);

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    daysOfWeek.push(day);
  }

  return daysOfWeek;
};
