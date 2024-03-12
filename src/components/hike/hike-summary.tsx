import { FunctionComponent } from 'react';
import { Hike } from '@/models/hike/hike.interface.ts';
import { Cards, Header } from '@cloudscape-design/components';
import {
  HEADER_LABEL_ALL_TRAILS_RATING,
  HEADER_LABEL_AREA,
  HEADER_LABEL_CLASS,
  HEADER_LABEL_DRIVE_TIME,
  HEADER_LABEL_ELEVATION,
  HEADER_LABEL_GAIN,
  HEADER_LABEL_MILES,
  HEADER_LABEL_TRAILHEAD,
} from '@/components/hike-table/hike-table.tsx';

export interface Props {
  hike: Hike;
}

// TODO: add badges w/colors for items?
const HikeSummaryComponent: FunctionComponent<Props> = ({ hike }: Props) => {
  return (
    <Cards
      cardDefinition={{
        header: (hike: Hike) => <Header>{hike.hike}</Header>,
        sections: [
          {
            id: HEADER_LABEL_CLASS,
            header: <>{HEADER_LABEL_CLASS}</>,
            content: (item) => item.class,
            width: 50,
          },
          {
            id: HEADER_LABEL_MILES,
            header: HEADER_LABEL_MILES,
            content: (item) => item.miles,
            width: 50,
          },
          {
            id: HEADER_LABEL_GAIN,
            header: HEADER_LABEL_GAIN,
            content: (item) => item.gain,
            width: 50,
          },
          {
            id: HEADER_LABEL_ELEVATION,
            header: HEADER_LABEL_ELEVATION,
            content: (item) => item.elevation,
            width: 50,
          },
          {
            id: HEADER_LABEL_DRIVE_TIME,
            header: HEADER_LABEL_DRIVE_TIME,
            content: (item) => item.driveTimeMins,
            width: 50,
          },
          {
            id: HEADER_LABEL_AREA,
            header: HEADER_LABEL_AREA,
            content: (item) => item.area,
            width: 50,
          },
          {
            id: HEADER_LABEL_ALL_TRAILS_RATING,
            header: HEADER_LABEL_ALL_TRAILS_RATING,
            content: (item) => item.allTrailsRating,
            width: 50,
          },
          {
            id: HEADER_LABEL_TRAILHEAD,
            header: HEADER_LABEL_TRAILHEAD,
            content: (item) => item.trailhead,
            width: 50,
          },
        ],
      }}
      cardsPerRow={[{ cards: 1 }]}
      items={[hike]}
      trackBy="name"
    />
  );
};

export { HikeSummaryComponent };
