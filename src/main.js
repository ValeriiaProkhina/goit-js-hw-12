import { onScroll } from './js/onScroll';
import { refs } from './js/refs';
import { renderImages } from './js/renderImages';
import { createGetImagesRequest } from './js/requests';
import { showLoader, hiddenLoader } from './js/spanLoader';

let doFetch = null;

const searchSubmit = async evt => {
  evt.preventDefault();
  showLoader();
  if (doFetch != null) {
    refs.loadMoreBtnRef.removeEventListener('click', doFetch);
  }

  const data = new FormData(evt.currentTarget);
  const query = data.get('query').trim();

  refs.galleryRef.innerHTML = '';
  const fetchImages = createGetImagesRequest(query);

  doFetch = async () => {
    refs.loadMoreBtnRef.style.display = 'none';
    const hits = await fetchImages();

    renderImages(hits);
    if (document.querySelectorAll('.img-item').length > 40) {
      onScroll();
    }
  };

  await doFetch();
  hiddenLoader();
  refs.loadMoreBtnRef.addEventListener('click', doFetch);
};

refs.searchFormRef.addEventListener('submit', searchSubmit);
