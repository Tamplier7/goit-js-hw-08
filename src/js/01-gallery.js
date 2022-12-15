import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryBox = document.querySelector('.gallery');

const galleryList = galleryItems.reduce(
  (acc, { preview, original, description }) => {
    return (acc += `<div class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}"/></a></div>`);
  },
  ''
);
console.log(galleryList);
galleryBox.insertAdjacentHTML('beforeend', galleryList);

const instance = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
