import css from './home.module.css';
import { useState, useEffect } from 'react';
import { getTrendMovies } from 'api/moviesApi';
import { Loader } from 'components/Loader/Loader';
import { MoviesList } from '../MoviesList/MoviesList';

export const Home = () => {
  const [listMovies, setListMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getListMovie = async () => {
      try {
        const { data } = await getTrendMovies();
        const movieList = data.results;
        setListMovies(movieList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getListMovie();
  }, []);

  return (
    <div className={css.container}>
      {loading && <Loader />}
      {error && <p className={css.error}>Error: {error}</p>}
      <h1>Trending today</h1>
      <ul className={css.list}>
        {listMovies?.length && <MoviesList list={listMovies} />}
      </ul>
    </div>
  );
};
