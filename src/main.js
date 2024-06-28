
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const searchFormElement = document.querySelector('.search-form');
const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


let currentPage = 1;
let totalHits = 0;
let searchQuery = '';
let imagesLoaded = 0;

loaderElement.style.display = 'none';
loadMoreButton.classList.remove('visible');

searchFormElement.addEventListener('submit', handleFormSubmit);
loadMoreButton.addEventListener('click', loadMoreImages);

async function handleFormSubmit(event) {
  event.preventDefault();
  hideLoadMoreButton();
  clearGallery();
  currentPage = 1;
  searchQuery = event.target.querySelector('.search-input').value.trim();
  showLoader();

  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning!',
      message: 'Please enter image name!',
      position: 'topRight',
    });
    hideLoader();
    return;
  }

  try {
    const data = await getImages(searchQuery, currentPage);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits;
    imagesLoaded = data.hits.length;
    renderImages(data.hits);
    lightbox.refresh();
    showLoadMoreButton();

    iziToast.info({
      message: `We found ${totalHits} images.`,
      position: 'topRight',
    });

  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  }
}


function clearGallery() {
  galleryElement.innerHTML = '';
  currentPage = 1;
  hideLoadMoreButton();
}

async function loadMoreImages() {
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImages(searchQuery, currentPage);

    hideLoader();

    if (data.hits.length === 0) {
      return;
    }

    currentPage++;

    if (imagesLoaded + data.hits.length > totalHits) {
      data.hits = data.hits.slice(0, totalHits - imagesLoaded);
    }

    imagesLoaded += data.hits.length;

    renderImages(data.hits);
    lightbox.refresh();

    if (imagesLoaded >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }

    const cards = document.querySelectorAll('.card');
    const newImages = Array.from(cards).slice(-15);
    if (newImages.length > 0) {
      const firstNewImage = newImages[0];

      firstNewImage.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  } catch (error) {
    console.error('Error fetching more images:', error);
    hideLoader();
    iziToast.error({
      message: 'Failed to fetch more images. Please try again later.',
      position: 'topRight',
    });
  }
}

function showLoader() {
  loaderElement.style.display = 'block';
}

function hideLoader() {
  loaderElement.style.display = 'none';
}

function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}