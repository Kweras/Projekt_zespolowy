export const getShortPolishMonth = (date) => {
  const shortMonths = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
  const monthIndex = date.getMonth();
  return shortMonths[monthIndex];
};
