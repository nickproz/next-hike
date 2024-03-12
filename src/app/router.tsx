import { FunctionComponent } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { AppLayoutComponent } from '@/app/app-layout.tsx';
import { HikeTableComponent } from '@/components/hike-table/hike-table.tsx';
import { AppContextProvider } from '@/app/app.context.tsx';
import { HikeComponent } from '@/components/hike/hike.tsx';

const RouterComponent: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route
            path={'/'}
            element={
              <AppLayoutComponent>
                <Outlet />
              </AppLayoutComponent>
            }
          >
            {/* Default home route */}
            <Route index element={<HikeTableComponent />} />

            <Route path={'/hike/:hikeId'} element={<HikeComponent />}></Route>
          </Route>
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export { RouterComponent };
