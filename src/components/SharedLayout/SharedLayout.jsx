import { MainMenu } from '../MainMenu/MainMenu';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Loader } from '../Loader/Loader';

export const SharedLayout = () => {
  return (
    <>
      <MainMenu />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};
