export const EVENTS_COLORS = [
  { namePolish: 'Czerwony', nameEnglish: 'red', hex: '#D46A6A' },
  { namePolish: 'Niebieski', nameEnglish: 'blue', hex: '#6A8FD4' },
  { namePolish: 'Zielony', nameEnglish: 'green', hex: '#6AD4A0' },
  { namePolish: 'Żółty', nameEnglish: 'yellow', hex: '#D4C76A' },
  { namePolish: 'Fioletowy', nameEnglish: 'purple', hex: '#A06AD4' },
  { namePolish: 'Pomarańczowy', nameEnglish: 'orange', hex: '#D4A06A' },
];

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

export const areDatesEqual = (date1, date2) => {
  const day1 = date1.getDate();
  const month1 = date1.getMonth();
  const year1 = date1.getFullYear();

  const day2 = date2.getDate();
  const month2 = date2.getMonth();
  const year2 = date2.getFullYear();

  return year1 === year2 && month1 === month2 && day1 === day2;
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

export const formatHour = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const fixTextWidth = (text, width) => {
  return text.length > width ? text.slice(0, width) + '...' : text;
};

export const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDurationInMinutes = (startTime, endTime) => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  let durationMinutes = endTotalMinutes - startTotalMinutes;

  if (durationMinutes < 0) {
    durationMinutes += 24 * 60; // Add 24 hours in minutes
  }

  return durationMinutes;
};

export const isEndDateBeforeStartDate = (startTime, endTime) => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  return endTotalMinutes < startTotalMinutes;
};

export const formatDateToPolish = (date) => {
  const months = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}r.`;
};

export const getHoursBetweenDates = (startDate, endDate) => {
  const hours = [];
  let current = new Date(startDate);

  while (current < endDate) {
    hours.push(current.getHours());
    current.setHours(current.getHours() + 1);
  }

  return hours;
};
