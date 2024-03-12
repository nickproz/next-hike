import { FunctionComponent } from 'react';
import { ImageGalleryComponent } from './image-gallery.tsx';

const NUM_RANDOM_IMGS: number = 15;
const MIN_RANDOM_IMG_SIZE: number = 500;
const MAX_RANDOM_IMG_SIZE: number = 1000;

const RandomImageGalleryComponent: FunctionComponent = () => {
  function getRandomSize(): number {
    return Math.round(Math.random() * (MAX_RANDOM_IMG_SIZE - MIN_RANDOM_IMG_SIZE) + MIN_RANDOM_IMG_SIZE);
  }

  function getRandomImg(): string {
    return `https://picsum.photos/${getRandomSize()}/${getRandomSize()}`;
  }

  return <ImageGalleryComponent images={Array.from({ length: NUM_RANDOM_IMGS }, getRandomImg).map((photo) => ({ photo }))} />;
};

export { RandomImageGalleryComponent };
