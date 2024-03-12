import { ImageGalleryComponent } from '@/components/reusable-components/gallery/image-gallery.tsx';
import { HikeSummaryComponent } from '@/components/hike/hike-summary.tsx';
import { Hike } from '@/models/hike/hike.interface.ts';
import { QueryKey } from '@/models/query-key.enum.ts';
import { useQuery } from '@tanstack/react-query';
import { ContainerLoadingSpinnerComponent } from '@/components/reusable-components/container-loading-spinner/container-loading-spinner.tsx';
import { Alert } from '@cloudscape-design/components';
import { HikeDirectionsComponent } from '@/components/hike/hike-directions.tsx';
import { PhotoService } from '@/services/photo.service.ts';
import { PhotoMap, PhotoWithThumbnail } from '@/models/photo/photo.interface.ts';
import { PhotoUtil } from '@/util/photo/photo.util.ts';
import { FunctionComponent, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { RouteParam } from '@/models/route-param.enum.ts';
import { AppData } from '@/app/app.context.tsx';

// TODO: maybe move hike name into page header instead of hike stats header
// TODO: error handling
// TODO: maybe move query data to app context
const HikeComponent: FunctionComponent = () => {
  const { hikes } = useContext(AppData).data;
  const { isLoading: areHikesLoading } = useContext(AppData);

  const { isPending: arePhotosLoading, data: photoData } = useQuery<PhotoMap>({
    queryKey: [QueryKey.Photos],
    queryFn: PhotoService.getAllPhotoData,
  });

  const params = useParams();
  const hikeId: string | undefined = params?.[RouteParam.HikeId];
  const isLoading: boolean = areHikesLoading || arePhotosLoading;
  const hike: Hike | undefined = useMemo(() => (hikes || []).find((h: Hike) => h.id === hikeId), [hikes, hikeId]);
  const photos: PhotoWithThumbnail[] = useMemo(
    () => PhotoUtil.getPhotosWithThumbnails(PhotoUtil.findPhotos(photoData || {}, hikeId!)),
    [photoData, hikeId]
  );

  if (isLoading) {
    return <ContainerLoadingSpinnerComponent />;
  }

  if (!isLoading && !hike) {
    return <Alert type={'warning'}>No hike found.</Alert>;
  }

  return (
    <>
      <div className={'flex gap-x-5'}>
        <div className={'flex-1 mt-3'}>
          <HikeSummaryComponent hike={hike!} />
        </div>
        <div className={'flex-1 mt-3 mb-5'}>
          <HikeDirectionsComponent coordinates={'49.47088,-123.23478'} />
        </div>
      </div>
      <ImageGalleryComponent images={photos} />
    </>
  );
};

export { HikeComponent };
