import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const searchFormRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const spanLoaderRef = document.querySelector('.span-loader');
const loadMoreBtnRef = document.getElementById('btn');

console.log(loadMoreBtnRef);

// import { renderGallery } from './js/renderGallery';

const apiKey = '41747369-46a857856bf510ac3748d6666';

const getImages = async params => {
  try {
    const response = await axios.get('https://pixabay.com/api/', { params });

    return response.data;
  } catch {
    e => console.log(e);
  }
};

const createGetImagesRequest = q => {
  let page = 1;
  const per_page = 40;
  let lastPage = false;

  return async () => {
    try {
      if (lastPage) return;
      const params = {
        key: apiKey,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page,
      };
      const { hits, totalHits } = await getImages(params);

      if (page >= Math.ceil(totalHits / per_page)) {
        lastPage = true;
      }

      page += 1;

      return hits;
    } catch (error) {
      console.log(error);
    }
  };
};

const renderImages = (hits = []) => {
  const markup = hits.reduce(
    (html, img) =>
      html +
      `<li class="img-item">
      <div class="img">
  <a class="img-link" href="${img.largeImageURL}">
    <img
      class="images"
      src="${img.webformatURL}"
      data-source="${img.largeImageURL}"
      alt="${img.tags}"
      width="360"
      height="200"
  /></a></div>
<div class="description">
  <div class="category">
    <p><b>Likes</b></p>
    <p>${img.likes}</p>
  </div>
  <div>
    <p><b>Views</b></p>
    <p>${img.views}</p>
  </div>
  <div>
    <p><b>Comments</b></p>
    <p>${img.comments}</p>
  </div>
  <div>
    <p><b>Downloads</b></p>
    <p>${img.downloads}</p>
  </div>
</div>
</li>`,
    ''
  );
  galleryRef.insertAdjacentHTML('beforeend', markup);
};

let doFetch = null;

searchFormRef.addEventListener('submit', async evt => {
  evt.preventDefault();
  if (doFetch != null) {
    loadMoreBtnRef.removeEventListener('click', doFetch);
  }

  const data = new FormData(evt.currentTarget);
  const query = data.get('query').trim();
  galleryRef.innerHTML = '';
  const fetchImages = createGetImagesRequest(query);
  doFetch = async () => {
    const hits = await fetchImages();
    renderImages(hits);
  };

  await doFetch();
  loadMoreBtnRef.classList.remove('is-hidden');
  loadMoreBtnRef.addEventListener('click', doFetch);
});
