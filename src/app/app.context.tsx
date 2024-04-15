import { createContext, FunctionComponent, ReactNode } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

export interface Props {
  children: ReactNode;
}

export interface AppData {
  onNavigate: (url: string, searchParams?: SearchParams, e?: Event) => void;
}

export type SearchParams = Record<string, string>;
export interface ContextAsyncData<T> {
  data: T;
  isLoading?: boolean;
}

export const AppData = createContext<ContextAsyncData<AppData>>({
  isLoading: true,
  data: {
    onNavigate: () => {},
  },
});

const AppContextProvider: FunctionComponent<Props> = ({ children }: Props) => {
  const navigate = useNavigate();

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
        isLoading: false,
        data: {
          onNavigate,
        },
      }}
    >
      {children}
    </AppData.Provider>
  );
};

export { AppContextProvider };
