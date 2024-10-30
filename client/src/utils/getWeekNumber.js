export const getWeekNumber = (date) => {
  const tempDate = new Date(date.getTime());
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
  const startOfYear = new Date(tempDate.getFullYear(), 0, 1);
  const daysDifference = (tempDate - startOfYear) / (24 * 60 * 60 * 1000);

  return Math.floor(daysDifference / 7) + 1;
};
