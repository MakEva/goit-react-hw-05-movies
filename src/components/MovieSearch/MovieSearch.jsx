import { useState, useEffect } from 'react';
import { searchMovies } from '../../api/moviesApi';
import { useSearchParams } from 'react-router-dom';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { Loader } from 'components/Loader/Loader';

import css from './movie-search.module.css';

export const MovieSearch = () => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listMovies, setListMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const results = searchParams.get('search');

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ search });
  };

  useEffect(() => {
    if (!results) return;
    const getList = async () => {
      try {
        const { data } = await searchMovies(results);
        setListMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getList();
  }, [results]);

  return (
    <div>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          name="search"
          value={search}
          onChange={handleChange}
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          required
        />
        <button className={css.button} type="submit">
          <span className={css.span}>Search</span>
        </button>
      </form>
      <div className={css.container}>
        {listMovies.length > 0 ? <MoviesList list={listMovies} /> : ''}
      </div>
    </div>
  );
};
