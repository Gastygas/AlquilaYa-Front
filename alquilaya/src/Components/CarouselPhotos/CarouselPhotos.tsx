"use client";
import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const images = [
  {
    original: 'url-de-tu-imagen-1.jpg',
    thumbnail: 'url-de-tu-miniatura-1.jpg',
  },
  {
    original: 'url-de-tu-imagen-2.jpg',
    thumbnail: 'url-de-tu-miniatura-2.jpg',
  },
  {
    original: 'url-de-tu-imagen-3.jpg',
    thumbnail: 'url-de-tu-miniatura-3.jpg',
  },
];

function CreateCarousel() {
  return (
    <ImageGallery
      items={images}
      showThumbnails={true}
      showPlayButton={true}
      showFullscreenButton={true}
      autoPlay={true}
      slideInterval={3000}
    />
  );
}

export default CreateCarousel;
