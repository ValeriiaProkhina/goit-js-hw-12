import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { onScroll } from './js/onScroll';
import { refs } from './js/refs';
import { renderImages } from './js/renderImages';
import { createGetImagesRequest } from './js/requests';

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
    const lightbox = new SimpleLightbox('.gallery a', {
      nav: true,
      captionDelay: 250,
      captionsData: 'alt',
      close: true,
      enableKeyboard: true,
      docClose: true,
      scrollZoom: false,
      fadeSpeed: 400,
    });
    renderImages(hits);
    lightbox.refresh();
    if (document.querySelectorAll('.img-item').length > 40) {
      onScroll();
    }
  };

  await doFetch();

  refs.spanLoaderRef.classList.remove('loader');
  refs.loadMoreBtnRef.addEventListener('click', doFetch);
};

refs.searchFormRef.addEventListener('submit', searchSubmit);

// const searchFormRef = document.querySelector('.search-form');
// const galleryRef = document.querySelector('.gallery');
// const spanLoaderRef = document.querySelector('.span-loader');
// const loadMoreBtnRef = document.getElementById('btn');

// const apiKey = '41747369-46a857856bf510ac3748d6666';

// const getImages = async params => {
//   try {
//     const response = await axios.get('https://pixabay.com/api/', { params });

//     return response.data;
//   } catch {
//     error => {
//       iziToast.error({
//         message: error.message,
//         position: 'topRight',
//       });
//     };
//   }
// };

// const createGetImagesRequest = q => {
//   let page = 1;
//   const per_page = 40;
//   let lastPage = false;

//   return async () => {
//     try {
//       if (lastPage) return;
//       const params = {
//         key: apiKey,
//         q,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page,
//         per_page,
//       };
//       const { hits, totalHits } = await getImages(params);
//       loadMoreBtnRef.style.display = 'block';
//       if (hits.length === 0) {
//         loadMoreBtnRef.style.display = 'none';
//         spanLoaderRef.classList.remove('loader');
//         iziToast.error({
//           position: 'topRight',
//           message:
//             'Sorry, there are no images matching your search query. Please try again!',
//         });
//       } else if (page >= Math.ceil(totalHits / per_page)) {
//         lastPage = true;
//         loadMoreBtnRef.style.display = 'none';
//         spanLoaderRef.classList.remove('loader');
//         iziToast.info({
//           position: 'topRight',
//           message: "We're sorry, but you've reached the end of search results.",
//         });
//       }

//       page += 1;
//       searchFormRef.reset();
//       return hits;
//     } catch (error) {
//       iziToast.error({ message: error.message, position: 'topRight' });
//     }
//   };
// };

// const renderImages = (hits = []) => {
//   const markup = hits.reduce(
//     (html, img) =>
//       html +
//       `<li class="img-item">
//       <div class="img">
//   <a class="img-link" href="${img.largeImageURL}">
//     <img
//       class="images"
//       src="${img.webformatURL}"
//       data-source="${img.largeImageURL}"
//       alt="${img.tags}"
//       width="360"
//       height="200"
//   /></a></div>
// <div class="description">
//   <div class="category">
//     <p><b>Likes</b></p>
//     <p>${img.likes}</p>
//   </div>
//   <div>
//     <p><b>Views</b></p>
//     <p>${img.views}</p>
//   </div>
//   <div>
//     <p><b>Comments</b></p>
//     <p>${img.comments}</p>
//   </div>
//   <div>
//     <p><b>Downloads</b></p>
//     <p>${img.downloads}</p>
//   </div>
// </div>
// </li>`,
//     ''
//   );
//   galleryRef.insertAdjacentHTML('beforeend', markup);
// };
// searchFormRef.addEventListener('submit', async evt => {
//   evt.preventDefault();

//   spanLoaderRef.classList.add('loader');
//   if (doFetch != null) {
//     loadMoreBtnRef.removeEventListener('click', doFetch);
//   }

//   const data = new FormData(evt.currentTarget);
//   const query = data.get('query').trim();
//   galleryRef.innerHTML = '';
//   const fetchImages = createGetImagesRequest(query);

//   doFetch = async () => {
//     loadMoreBtnRef.style.display = 'none';
//     spanLoaderRef.classList.add('loader');
//     const hits = await fetchImages();
//     spanLoaderRef.classList.remove('loader');
//     const lightbox = new SimpleLightbox('.gallery a', {
//       nav: true,
//       captionDelay: 250,
//       captionsData: 'alt',
//       close: true,
//       enableKeyboard: true,
//       docClose: true,
//       scrollZoom: false,
//       fadeSpeed: 400,
//     });
//     renderImages(hits);
//     lightbox.refresh();
//     onScroll();
//   };

//   await doFetch();

//   spanLoaderRef.classList.remove('loader');
//   loadMoreBtnRef.addEventListener('click', doFetch);
// });
