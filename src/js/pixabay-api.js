 export async function handleFormSubmit(event) {
  event.preventDefault();
  searchQuery = event.target.querySelector('.search-input').value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning!',
      message: 'Please enter image name!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();
  hideLoadMoreButton();

  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: 40,
      },
    });

    hideLoader();

    const data = response.data;

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

    iziToast.info({
      message: `We found ${totalHits} images.`,
      position: 'topRight',
    });

    if (totalHits > 15) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    hideLoader();
    iziToast.error({
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  }
}