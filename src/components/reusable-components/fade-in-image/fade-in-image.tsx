import './fade-in-image.scss';
import { FunctionComponent, MouseEvent, useEffect, useRef, useState } from 'react';

export interface Props {
  imgSrc: string;
  imgAlt: string;
  onClick?: (e: MouseEvent<HTMLImageElement>) => void;
}

const FadeInImageComponent: FunctionComponent<Props> = ({ imgSrc, imgAlt, onClick }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<string>('75%');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // onLoad doesn't fire if img is cached
    if (imgRef.current?.complete) {
      onImageLoad();
    }
  }, [imgRef]);

  function onImageLoad(): void {
    setIsLoading(false);
    adjustAspectRatio();
  }

  function adjustAspectRatio(): void {
    if (imgRef.current) {
      const img = imgRef.current;
      const aspectRatio = (img.naturalHeight / img.naturalWidth) * 100;
      setAspectRatio(`${aspectRatio}%`);
    }
  }

  function onImgClick(e: MouseEvent<HTMLImageElement>) {
    if (!isLoading) {
      onClick?.(e);
    }
  }

  return (
    <div className="fade-in-image__container" style={{ paddingBottom: aspectRatio }}>
      <img
        ref={imgRef}
        src={imgSrc}
        alt={imgAlt}
        onLoad={onImageLoad}
        style={{ opacity: isLoading ? 0 : 1, cursor: isLoading ? 'unset' : 'pointer' }}
        onClick={onImgClick}
      />
    </div>
  );
};

export { FadeInImageComponent };
