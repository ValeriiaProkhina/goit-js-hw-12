import { refs } from './refs';
import { lightbox } from './lightbox';

export const renderImages = (hits = []) => {
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
  refs.galleryRef.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};
