"use client";
import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

interface CreateCarouselProps {
  photos: string[];
}

const CreateCarousel: React.FC<CreateCarouselProps> = ({ photos }) => {

  const imagese = photos.map(photo => ({
    original: photo,
    thumbnail: photo,
  }));

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

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
