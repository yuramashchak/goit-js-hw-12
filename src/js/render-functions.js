import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function renderPhoto(image) {
  return `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}">
      </a>

      <div class="underpicture">
        <div class="info">
          <p class="words">Likes</p>
          <p class="numbers">${image.likes}</p>
        </div>

        <div class="info">
          <p class="words">Views</p>
          <p class="numbers">${image.views}</p>
        </div>

        <div class="info">
          <p class="words">Comments</p>
          <p class="numbers">${image.comments}</p>
        </div>

        <div class="info">
          <p class="words">Downloads</p>
          <p class="numbers">${image.downloads}</p>
        </div>
      </div>
    </li>
  `;
}

function renderPhotos(images) {
  return images.map(renderPhoto).join('');
}

export function createGallery(images) {
  gallery.innerHTML = renderPhotos(images);
  lightbox.refresh();
}

export function addGallery(images) {
  gallery.insertAdjacentHTML('beforeend', renderPhotos(images));
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hide');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hide');
}

