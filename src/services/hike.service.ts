import { GoogleSpreadsheetService } from './google-spreadsheet.service';
import { HikeRowToHikeConverter } from '@/converter/hike-row-to-hike.converter';
import { Hike, HikeRow } from '@/models/hike/hike.interface';

const GOOGLE_SHEET_ID: string = '1cb-_qh71xP66h-hUhmb7JQ7MfwcUka_4CyOYtDSQp5g';
const GOOGLE_SHEET_INDEX: number = 2;

export class HikeService {
  static async getHikes(): Promise<Hike[]> {
    return GoogleSpreadsheetService.getSpreadsheet<HikeRow[]>(GOOGLE_SHEET_ID, GOOGLE_SHEET_INDEX).then(HikeRowToHikeConverter.convertAll);
  }
}
