import { Hike, HikeRow } from '@/models/hike/hike.interface';
import { BaseConverter } from './base-converter.class';

class HikeRowToHike extends BaseConverter<HikeRow, Hike> {
  doForward(hikeRow: HikeRow): Hike {
    return {
      id: hikeRow.Id,
      hike: hikeRow.Hike,
      class: convertStringToNumber(hikeRow.Class),
      miles: convertStringToNumber(hikeRow.Miles),
      gain: convertStringToNumber(hikeRow.Gain),
      elevation: convertStringToNumber(hikeRow.Elevation),
      driveTimeMins: convertStringToNumber(hikeRow.DriveTimeMins),
      area: hikeRow.Area,
      bestTime: hikeRow.BestTime,
      trailhead: hikeRow.Trailhead,
      note: hikeRow.Note,
      isCompleted: convertStringToBoolean(hikeRow.Completed),
      aspiration: convertStringToNumber(hikeRow.Aspiration),
      myRating: convertStringToNumber(hikeRow.MyRating),
      allTrailsRating: convertStringToNumber(hikeRow.AllTrailsRating),
    };
  }

  doBackward(): HikeRow {
    throw new Error('Cannot convert from a dropdown option to a DataLensProject');
  }
}

const convertStringToNumber: (str: string) => number = (str) => {
  const num: number = parseFloat(str);
  return (isNaN(num) ? null : num) as number;
};

const convertStringToBoolean: (str: string) => boolean = (str) => {
  return str === 'TRUE';
};

export const HikeRowToHikeConverter = new HikeRowToHike();
