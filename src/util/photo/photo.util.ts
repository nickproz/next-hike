import { Photo, PhotoMap, PhotoWithThumbnail } from '@/models/photo/photo.interface';

export const CLOUDINARY_TRANSFORM_THUMBNAIL: string = 't_gallery-thumbnail';
export const CLOUDINARY_TRANSFORM_AUTO_FORMAT: string = 'f_auto';

export class PhotoUtil {
  static findPhotos(photoData: PhotoMap, hikeId: string): Photo[] {
    if (!hikeId) {
      return [];
    }

    let photos: Photo[] = [];
    Object.keys(photoData).some((key) => {
      const data = photoData[key];

      // array photos found
      if (PhotoUtil.isPhotos(data)) {
        if (key !== hikeId) {
          return false;
        }

        photos = data;
        return true;
      }

      // object present, recurse
      if (data && PhotoUtil.isPhotoMap(data)) {
        photos = PhotoUtil.findPhotos(data, hikeId);
        return !!photos;
      }
    });

    return photos;
  }

  static getPhotosWithThumbnails(photos: Photo[]): PhotoWithThumbnail[] {
    return photos.map((photo) => ({ photo, thumbnail: PhotoUtil.getPhotoThumbnail(photo) }));
  }

  private static getPhotoThumbnail(photo: Photo): Photo {
    if (!photo) {
      return photo;
    }

    return photo.replace(CLOUDINARY_TRANSFORM_AUTO_FORMAT, `${CLOUDINARY_TRANSFORM_AUTO_FORMAT},${CLOUDINARY_TRANSFORM_THUMBNAIL}`);
  }

  private static isPhotos(photoData: Photo[] | PhotoMap): photoData is Photo[] {
    return Array.isArray(photoData);
  }

  private static isPhotoMap(photoData: Photo[] | PhotoMap): photoData is PhotoMap {
    return typeof photoData === 'object';
  }
}
