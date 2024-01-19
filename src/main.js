import { onScroll } from './js/onScroll';
import { refs } from './js/refs';
import { renderImages } from './js/renderImages';
import { createGetImagesRequest } from './js/requests';
import { lightbox } from './js/lightbox';

let doFetch = null;

const searchSubmit = async evt => {
  evt.preventDefault();

  refs.spanLoaderRef.classList.add('loader');
  if (doFetch != null) {
    refs.loadMoreBtnRef.removeEventListener('click', doFetch);
  }

  const data = new FormData(evt.currentTarget);
  const query = data.get('query').trim();
  refs.galleryRef.innerHTML = '';
  const fetchImages = createGetImagesRequest(query);

  doFetch = async () => {
    refs.loadMoreBtnRef.style.display = 'none';
    refs.spanLoaderRef.classList.add('loader');
    const hits = await fetchImages();
    refs.spanLoaderRef.classList.remove('loader');

    renderImages(hits);
    if (document.querySelectorAll('.img-item').length > 40) {
      onScroll();
    }
  };

  await doFetch();
  lightbox.refresh();
  refs.spanLoaderRef.classList.remove('loader');
  refs.loadMoreBtnRef.addEventListener('click', doFetch);
};

refs.searchFormRef.addEventListener('submit', searchSubmit);
