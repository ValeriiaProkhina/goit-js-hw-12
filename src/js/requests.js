import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './refs';
import { showLoader, hiddenLoader } from './spanLoader';

const apiKey = '41747369-46a857856bf510ac3748d6666';
const getImages = async params => {
  try {
    showLoader();
    const response = await axios.get('https://pixabay.com/api/', { params });
    return response.data;
  } catch {
    error => {
      return iziToast.error({
        message: error.message,
        position: 'topRight',
      });
    };
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
      if (!q) {
        return iziToast.warning({
          position: 'topRight',
          message: 'Please enter your query!',
        });
      }
      const { hits, totalHits } = await getImages(params);
      if (hits.length === 0) {
        return iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else if (page >= Math.ceil(totalHits / per_page)) {
        lastPage = true;
        return iziToast.info({
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        refs.loadMoreBtnRef.style.display = 'block';
      }

      page += 1;
      refs.searchFormRef.reset();
      return hits;
    } catch {
      error => {
        return iziToast.error({
          message: error.message,
          position: 'topRight',
        });
      };
    } finally {
      hiddenLoader();
    }
  };
};
