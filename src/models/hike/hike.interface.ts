import { HikeArea } from './hike-area.enum';

export interface HikeRow {
  Hike: string;
  Class: string;
  Miles: string;
  Gain: string;
  Elevation: string;
  DriveTimeMins: string;
  Area: HikeArea;
  BestTime: string;
  Trailhead: string;
  Note: string;
  Completed: string;
  Aspiration: string;
  MyRating: string;
  AllTrailsRating: string;
  Id: string;
}

export interface Hike {
  id: string;
  hike: string;
  class: number;
  miles: number;
  gain: number;
  elevation: number;
  driveTimeMins: number;
  area: HikeArea;
  bestTime: string;
  trailhead: string;
  note: string;
  isCompleted: boolean;
  aspiration: number;
  myRating: number;
  allTrailsRating: number;
}
