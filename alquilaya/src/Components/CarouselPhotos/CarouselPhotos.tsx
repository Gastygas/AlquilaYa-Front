"use client";
import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styles from './Carousel.module.css';

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
      showThumbnails={false}
      showPlayButton={true}
      showFullscreenButton={false}
      autoPlay={true}
      slideInterval={3000}
      additionalClass={styles.customCarousel}
        renderItem={(item) => (
          <img
            src={item.original}
            alt=""
            style={{ height: '400px', width: '100%', objectFit: 'cover' }}
          />
        )}
    />
  );
};

export default CreateCarousel;
