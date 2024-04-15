import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PhotoMap } from '@/models/photo/photo.interface.ts';
import { QueryKey } from '@/models/query-key.enum.ts';
import { DEFAULT_CACHE_TIME_MS, DOMAIN } from '@/services/const.ts';

export function usePhotos(): UseQueryResult<PhotoMap> {
  return useQuery<PhotoMap>({
    queryKey: [QueryKey.Photos],
    queryFn: getAllPhotoData,
    staleTime: DEFAULT_CACHE_TIME_MS,
  });
}

async function getAllPhotoData(): Promise<PhotoMap> {
  return fetch(`${DOMAIN}/cloudinary/proz-photography/photos`).then((res) => res.json());
}
