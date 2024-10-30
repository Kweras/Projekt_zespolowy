import { getShortPolishMonth } from './getShortPolishNames';

export const getTitle = (currentDate, view) => {
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
      return `${getShortPolishMonth(startOfWeek)} - ${getShortPolishMonth(endOfWeek)} ${endYear}`;
    } else {
      return `${getShortPolishMonth(startOfWeek)} ${startYear} - ${getShortPolishMonth(endOfWeek)} ${endYear}`;
    }
  }
};
