import { createContext, FunctionComponent, ReactNode } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Hike } from '@/models/hike/hike.interface.ts';
import { QueryKey } from '@/models/query-key.enum.ts';
import { HikeService } from '@/services/hike.service.ts';

export interface Props {
  children: ReactNode;
}

export interface AppData {
  hikes: Hike[];
  onNavigate: (url: string, searchParams?: SearchParams, e?: Event) => void;
}

export type SearchParams = Record<string, string>;
export interface ContextAsyncData<T> {
  data: T;
  isLoading?: boolean;
}

export const AppData = createContext<ContextAsyncData<AppData>>(null!);

const AppContextProvider: FunctionComponent<Props> = ({ children }: Props) => {
  const navigate = useNavigate();
  const { isPending: areHikesLoading, data: hikes } = useQuery<Hike[]>({
    queryKey: [QueryKey.Hikes],
    queryFn: HikeService.getHikes,
  });

  function onNavigate(url: string, searchParams?: SearchParams, e?: Event): void {
    // stop link if event is passed
    e?.preventDefault?.();
    e?.stopPropagation?.();

    const [pathname, searchParamStr] = url.split('?');
    const search: string = createSearchParams(searchParams).toString() || searchParamStr;

    navigate({
      pathname,
      search,
    });
  }

  return (
    <AppData.Provider
      value={{
        isLoading: areHikesLoading,
        data: {
          hikes: hikes || [],
          onNavigate,
        },
      }}
    >
      {children}
    </AppData.Provider>
  );
};

export { AppContextProvider };
