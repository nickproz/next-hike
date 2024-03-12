import { DOMAIN } from '@/services/const';

export class GoogleSpreadsheetService {
  static async getSpreadsheet<T>(sheetId: string, sheetIndex: number): Promise<T> {
    return fetch(`${DOMAIN}/sheets/${sheetId}/sheetIndex/${sheetIndex}/rows`).then((res) => res.json());
  }
}
