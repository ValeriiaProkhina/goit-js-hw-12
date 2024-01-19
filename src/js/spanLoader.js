import { refs } from './refs';
export const showLoader = () => {
  refs.spanLoaderRef.style.display = 'block';
  refs.spanLoaderRef.style.visibility = 'visible';
};
export const hiddenLoader = () => {
  refs.spanLoaderRef.style.display = 'none';
  refs.spanLoaderRef.style.visibility = 'hidden';
};
