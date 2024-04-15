import { ImageGalleryComponent } from '@/components/reusable-components/gallery/image-gallery.tsx';
import { HikeSummaryComponent } from '@/components/hike/hike-summary.tsx';
import { Hike } from '@/models/hike/hike.interface.ts';
import { ContainerLoadingSpinnerComponent } from '@/components/reusable-components/container-loading-spinner/container-loading-spinner.tsx';
import { Alert } from '@cloudscape-design/components';
import { HikeDirectionsComponent } from '@/components/hike/hike-directions.tsx';
import { PhotoWithThumbnail } from '@/models/photo/photo.interface.ts';
import { PhotoUtil } from '@/util/photo/photo.util.ts';
import { FunctionComponent, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { RouteParam } from '@/models/route-param.enum.ts';
import { usePhotos } from '@/hooks/data/use-photos.tsx';
import { useHikes } from '@/hooks/data/use-hikes.tsx';

// TODO: maybe move hike name into page header instead of hike stats header
// TODO: error handling
// TODO: maybe move query data to app context
const HikeComponent: FunctionComponent = () => {
  const { isLoading: areHikesLoading, data: hikeData } = useHikes();
  const { isLoading: arePhotosLoading, data: photoData } = usePhotos();

  const params = useParams();
  const hikeId: string | undefined = params?.[RouteParam.HikeId];
  const hike: Hike | undefined = useMemo(() => (hikeData || []).find((h: Hike) => h.id === hikeId), [hikeData, hikeId]);
  const photos: PhotoWithThumbnail[] = useMemo(
    () => PhotoUtil.getPhotosWithThumbnails(PhotoUtil.findPhotos(photoData || {}, hikeId!)),
    [photoData, hikeId]
  );

  if (areHikesLoading) {
    return <ContainerLoadingSpinnerComponent />;
  }

  if (!areHikesLoading && !hike) {
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

      {arePhotosLoading && <ContainerLoadingSpinnerComponent />}
      {!arePhotosLoading && <ImageGalleryComponent images={photos} />}
    </>
  );
};

export { HikeComponent };
