import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './refs';

const apiKey = '41747369-46a857856bf510ac3748d6666';
const getImages = async params => {
  try {
    const response = await axios.get('https://pixabay.com/api/', { params });

    return response.data;
  } catch {
    error =>
      iziToast.error({
        message: error.message,
        position: 'topRight',
      });
  }
};

export const createGetImagesRequest = q => {
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
      refs.loadMoreBtnRef.style.display = 'block';
      if (hits.length === 0) {
        refs.loadMoreBtnRef.style.display = 'none';
        refs.spanLoaderRef.classList.remove('loader');
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else if (page >= Math.ceil(totalHits / per_page)) {
        lastPage = true;
        refs.loadMoreBtnRef.style.display = 'none';
        iziToast.info({
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }

      page += 1;
      refs.searchFormRef.reset();
      return hits;
    } catch {
      error => {
        iziToast.error({
          message: error.message,
          position: 'topRight',
        });
      };
    }
  };
};
