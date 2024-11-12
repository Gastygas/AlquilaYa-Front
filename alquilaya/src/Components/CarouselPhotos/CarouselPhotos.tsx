"use client";
import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

interface CreateCarouselProps {
  photos: string[];
}

const CreateCarousel: React.FC<CreateCarouselProps> = ({ photos }) => {

  const images = photos.map(photo => ({
    original: photo,
    thumbnail: photo,
  }));

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
};

export default CreateCarousel;
