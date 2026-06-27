import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  addGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const search = document.querySelector('.search-text');
const buttonAdd = document.querySelector('.load');

let query = '';
let page = 1;
let totalPages = 0;

const PER_PAGE = 15;

hideLoadMoreButton();

form.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;
  query = search.value.trim();
 
  
  

  if (query === '') {
    hideLoadMoreButton();
    clearGallery();
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalPages = Math.ceil(Math.min(data.totalHits, 500) / PER_PAGE);
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);

    if (page < totalPages) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again!',
    });
  } finally {
    hideLoader();
  }
});

buttonAdd.addEventListener('click', async () => {
  if (page >= totalPages) {
  hideLoadMoreButton();
  return;
}
  page += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    
    totalPages = Math.ceil(Math.min(data.totalHits, 500) / PER_PAGE);
    addGallery(data.hits);

    const galleryCard = document.querySelector('.gallery-item');

    if (galleryCard) {
      const { height: cardHeight } = galleryCard.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
    updateBtn()
    
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again!',
    });
  } finally {
    hideLoader();
  }
});

function updateBtn() {
  if (page < totalPages) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
    
    iziToast.info({
      title: 'Info',
      message: `We're sorry, but you've reached the end of search results`,
    });
  }
}

