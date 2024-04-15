import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QueryKey } from '@/models/query-key.enum.ts';
import { Hike, HikeRow } from '@/models/hike/hike.interface.ts';
import { GoogleSpreadsheetService } from '@/services/google-spreadsheet.service.ts';
import { HikeRowToHikeConverter } from '@/converter/hike-row-to-hike.converter.ts';
import { DEFAULT_CACHE_TIME_MS } from '@/services/const.ts';

const GOOGLE_SHEET_ID: string = '1cb-_qh71xP66h-hUhmb7JQ7MfwcUka_4CyOYtDSQp5g';
const GOOGLE_SHEET_INDEX: number = 2;

export function useHikes(): UseQueryResult<Hike[]> {
  return useQuery<Hike[]>({
    queryKey: [QueryKey.Hikes],
    queryFn: getHikes,
    staleTime: DEFAULT_CACHE_TIME_MS,
  });
}

async function getHikes(): Promise<Hike[]> {
  return GoogleSpreadsheetService.getSpreadsheet<HikeRow[]>(GOOGLE_SHEET_ID, GOOGLE_SHEET_INDEX).then(HikeRowToHikeConverter.convertAll);
}
