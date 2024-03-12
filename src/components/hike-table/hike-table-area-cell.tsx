import { FunctionComponent } from 'react';
import { HikeTableCellComponent } from './hike-table-cell.tsx';
import { HikeArea } from '@/models/hike/hike-area.enum.ts';

export interface Props {
  area: HikeArea;
}

const AREA_TO_HEX_MAP: Record<HikeArea, string> = {
  [HikeArea.SouthCascades]: '#ffffcc',
  [HikeArea.Rainier]: '#ffffdd',
  [HikeArea.SnoqualmiePass]: '#ffffee',
  [HikeArea.Olympics]: '#fefeff',
  [HikeArea.Teanaways]: '#fdfeff',
  [HikeArea.AlpineLakes]: '#fcfeff',
  [HikeArea.Highway2]: '#f5f5ff',
  [HikeArea.MountainLoopHighway]: '#eaeaff',
  [HikeArea.Glacier]: '#e0e0ff',
  [HikeArea.NorthCascades]: '#d5d5ff',
  [HikeArea.Baker]: '#cacaff',
  [HikeArea.Canada]: '#bfbfff',
  [HikeArea.Other]: '',
};

const HikeTableAreaCellComponent: FunctionComponent<Props> = ({ area }: Props) => {
  function getHexColor(): string {
    return AREA_TO_HEX_MAP[area];
  }

  return <HikeTableCellComponent style={{ backgroundColor: getHexColor() }}>{area}</HikeTableCellComponent>;
};

export { HikeTableAreaCellComponent };
