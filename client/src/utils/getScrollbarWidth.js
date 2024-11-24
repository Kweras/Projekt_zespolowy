export const getScrollbarWidth = () => {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.top = '-9999px';
  div.style.width = '100px';
  div.style.height = '100px';
  div.style.overflow = 'scroll';

  document.body.appendChild(div);
  const scrollbarWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);

  return scrollbarWidth;
};
