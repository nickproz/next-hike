export type Photo = string;
export interface PhotoMap {
  [key: string]: Photo[] | PhotoMap;
}
export interface PhotoWithThumbnail {
  photo: Photo;
  thumbnail?: Photo;
}
