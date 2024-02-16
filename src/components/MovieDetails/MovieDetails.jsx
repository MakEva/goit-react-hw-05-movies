import css from './movie-details.module.css';
import { useState, useEffect, Suspense } from 'react';
import {
  Link,
  useParams,
  useLocation,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import { getMovieDetails } from 'api/moviesApi';
import { Loader } from 'components/Loader/Loader';

export const MovieDetails = () => {
  const [detailsMovie, setDetailsMovie] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/';
  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        const { data } = await getMovieDetails(id);
        setDetailsMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getList();
  }, [id]);

  const { title, poster_path, overview, vote_average, genres } =
    detailsMovie || {};

  const goBack = () => navigate(from);

  return (
    <div className={css.main_container}>
      {error && <p className={css.error}>Error: {error}</p>}
      {loading && <Loader />}
      <button className={css.btn} onClick={goBack} type="button">
        Go back
      </button>
      {detailsMovie && (
        <>
          <div className={css.container}>
            <img
              className={css.img}
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
            />
            <div>
              <h1 className={css.title}>{`${title}`}</h1>
              <p className={css.info}>
                User score: {Math.floor(vote_average * 10)}%
              </p>
              <h2 className={css.h2}>Overview</h2>
              <p className={css.info}>{overview}</p>
              <h2 className={css.h2}>Genres</h2>
              <p className={css.genres}>
                {genres && genres.map(i => i.name).join(', ')}
              </p>
            </div>
          </div>
          <div className={css.addInfo}>
            <p className={css.info}>Additional information</p>
            <ul className={css.list}>
              <li>
                <Link className={css.link} to={'cast'} state={{ from }}>
                  Cast
                </Link>
              </li>
              <li>
                <Link className={css.link} to={'reviews'} state={{ from }}>
                  Reviews
                </Link>
              </li>
            </ul>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
};
