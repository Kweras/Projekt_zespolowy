export const getTitle = (currentDate, view, short = false) => {
  const options = { month: 'long', year: 'numeric' };

  if (view === 'month') {
    return currentDate.toLocaleDateString('pl-PL', options);
  } else if (view === 'week') {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startMonth = startOfWeek.toLocaleDateString('pl-PL', { month: 'long' });
    const startYear = startOfWeek.getFullYear();
    const endMonth = endOfWeek.toLocaleDateString('pl-PL', { month: 'long' });
    const endYear = endOfWeek.getFullYear();

    if (startMonth === endMonth && startYear === endYear) {
      // Same month and year
      return `${startMonth} ${startYear}`;
    } else if (startMonth !== endMonth && startYear === endYear) {
      // Different months or years
      return `${short ? getShortPolishMonth(startOfWeek) : startMonth} - ${short ? getShortPolishMonth(endOfWeek) : endMonth} ${endYear}`;
    } else {
      return `${short ? getShortPolishMonth(startOfWeek) : startMonth} ${startYear} - ${short ? getShortPolishMonth(endOfWeek) : endMonth} ${endYear}`;
    }
  }
};

export const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

export const getWeekNumber = (date) => {
  const tempDate = new Date(date.getTime());
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
  const startOfYear = new Date(tempDate.getFullYear(), 0, 1);
  const daysDifference = (tempDate - startOfYear) / (24 * 60 * 60 * 1000);

  return Math.floor(daysDifference / 7) + 1;
};

export const getShortPolishMonth = (date) => {
  const shortMonths = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
  const monthIndex = date.getMonth();
  return shortMonths[monthIndex];
};

export const polishDayOfWeek = ['Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.', 'Niedz.'];

export const getPolishDayOfWeek = (date) => {
  const daysOfWeek = ['Niedz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'];
  const dayIndex = date.getDay();

  return daysOfWeek[dayIndex];
};

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
