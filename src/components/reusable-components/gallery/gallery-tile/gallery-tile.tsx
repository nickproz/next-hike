import './gallery-tile.scss';
import { FunctionComponent } from 'react';
import { PhotoWithThumbnail } from '@/models/photo/photo.interface.ts';

export interface Props {
  img: PhotoWithThumbnail;
}

// TODO: move to shared component library?
const GalleryTileComponent: FunctionComponent<Props> = ({ img }: Props) => {
  console.log('Image!: ', img);
  return <div className={'gallery-tile__img'}></div>;
};

export { GalleryTileComponent };
