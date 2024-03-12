import { FunctionComponent, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { FadeInImageComponent } from '@/components/reusable-components/fade-in-image/fade-in-image.tsx';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Button, Spinner } from '@cloudscape-design/components';
import { PhotoWithThumbnail } from '@/models/photo/photo.interface.ts';

export interface Props {
  images: PhotoWithThumbnail[];
}

// TODO: move to shared component library?
const ImageGalleryComponent: FunctionComponent<Props> = ({ images }: Props) => {
  // State
  const [imgIndex, setImgIndex] = useState<number>(-1);

  return (
    <div>
      {/* Masonry gallery */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
        <Masonry gutter={'10px'}>
          {images.map(({ photo, thumbnail }, i) => (
            <FadeInImageComponent key={thumbnail || photo} imgSrc={thumbnail || photo} imgAlt={`Gallery img ${i}`} onClick={() => setImgIndex(i)} />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {/* Lightbox img modal */}
      <Lightbox
        slides={images.map(({ photo }) => ({ src: photo }))}
        open={imgIndex >= 0}
        index={imgIndex}
        close={() => setImgIndex(-1)}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: 'rgba(255,255,255,0.85)' },
          icon: { filter: 'none' },
          button: { filter: 'none' },
        }}
        render={{
          iconPrev: () => <Button variant={'icon'} iconName={'angle-left'} />,
          iconNext: () => <Button variant={'icon'} iconName={'angle-right'} />,
          iconClose: () => <Button variant={'icon'} iconName={'close'} />,
          iconLoading: () => <Spinner />,
        }}
      />
    </div>
  );
};

export { ImageGalleryComponent };
