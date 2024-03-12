import { DOMAIN } from '@/services/const';
import { PhotoMap } from '@/models/photo/photo.interface';

export class PhotoService {
  static getAllPhotoData(): Promise<PhotoMap> {
    return fetch(`${DOMAIN}/cloudinary/proz-photography/photos`).then((res) => res.json());
  }
}
