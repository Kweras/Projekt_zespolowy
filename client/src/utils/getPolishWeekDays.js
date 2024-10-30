export const getPolishDayOfWeek = (date) => {
  const daysOfWeek = ['Niedz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'];
  const dayIndex = date.getDay();

  return daysOfWeek[dayIndex];
};
