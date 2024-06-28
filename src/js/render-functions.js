const galleryElement = document.querySelector('.gallery');

export function renderImages(images) {
  const fragment = document.createDocumentFragment();

  images.forEach(image => {
    const imageCardElement = createImageCard(image);
    fragment.appendChild(imageCardElement);
  });

  galleryElement.appendChild(fragment);
}

function createImageCard(image) {
  const imageCardElement = document.createElement('div');
  imageCardElement.classList.add('card');

  imageCardElement.innerHTML = `
    <a class="gallery-link" href="${image.largeImageURL}">
      <img class="card-image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
    </a>
    <div class="card-info">
      <p class="card-text"><b>Likes:</b> ${image.likes}</p>
      <p class="card-text"><b>Views:</b> ${image.views}</p>
      <p class="card-text"><b>Comments:</b> ${image.comments}</p>
      <p class="card-text"><b>Downloads:</b> ${image.downloads}</p>
    </div>
  `;

  return imageCardElement;
}