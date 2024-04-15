import { FunctionComponent, ReactNode } from 'react';
import { Hike } from '@/models/hike/hike.interface.ts';
import { Cards, Header } from '@cloudscape-design/components';
import { HikeLabel } from '@/components/hike-table/hike-table.tsx';

interface HikeCardSection {
  label: HikeLabel;
  content: (item: Hike) => ReactNode;
}

const HIKE_SECTIONS: HikeCardSection[] = [
  {
    label: HikeLabel.Class,
    content: (item) => item.class,
  },
  {
    label: HikeLabel.Miles,
    content: (item) => item.miles,
  },
  {
    label: HikeLabel.Gain,
    content: (item) => item.gain,
  },
  {
    label: HikeLabel.Elevation,
    content: (item) => item.elevation,
  },
  {
    label: HikeLabel.DriveTime,
    content: (item) => item.driveTimeMins,
  },
  {
    label: HikeLabel.Area,
    content: (item) => item.area,
  },
  {
    label: HikeLabel.AllTrailsRating,
    content: (item) => item.allTrailsRating,
  },
  {
    label: HikeLabel.Trailhead,
    content: (item) => item.trailhead,
  },
];

export interface Props {
  hike: Hike;
}

// TODO: add badges w/colors for items?
const HikeSummaryComponent: FunctionComponent<Props> = ({ hike }: Props) => {
  return (
    <Cards
      cardDefinition={{
        header: (hike: Hike) => <Header>{hike.hike}</Header>,
        sections: HIKE_SECTIONS.map((hike) => ({ id: hike.label, header: hike.label, content: hike.content, width: 50 })),
      }}
      cardsPerRow={[{ cards: 1 }]}
      items={[hike]}
      trackBy="name"
    />
  );
};

export { HikeSummaryComponent };
