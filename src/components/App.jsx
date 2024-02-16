import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SharedLayout } from './SharedLayout/SharedLayout';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const MoviesSearchPage = lazy(() =>
  import('pages/MoviesSearchPage/MoviesSearchPage')
);
const MovieDetailsPage = lazy(() =>
  import('pages/MovieDetailsPage/MovieDetailsPage')
);
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/movies" element={<MoviesSearchPage />} />
          <Route path="movies/:id" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};

// import { HomePage } from 'pages/HomePage/HomePage';
// import { MoviesSearchPage } from 'pages/MoviesSearchPage/MoviesSearchPage';
// import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
// import { MovieDetailsPage } from 'pages/MovieDetailsPage/MovieDetailsPage';
// import { Cast } from './Cast/Cast';
// import { Reviews } from './Reviews/Reviews';

// const HomePage = lazy(() => import('pages/HomePage/HomePage'));
// const MoviesSearchPage = lazy(() =>
//   import('pages/MoviesSearchPage/MoviesSearchPage')
// );
// const MovieDetailsPage = lazy(() =>
//   import('pages/MovieDetailsPage/MovieDetailsPage')
// );
// const Cast = lazy(() => import('./Cast/Cast'));
// const Reviews = lazy(() => import('./Reviews/Reviews'));
// const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));
