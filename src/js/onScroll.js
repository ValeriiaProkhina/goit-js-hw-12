export const onScroll = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};
