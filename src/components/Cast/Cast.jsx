import css from './cast.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieCredits } from '../../api/moviesApi';
import { Loader } from 'components/Loader/Loader';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        const { data } = await getMovieCredits(id);
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getList();
  }, [id]);

  const castRender = () => {
    const actors = cast.map(
      ({ id, profile_path, original_name, name, character }) => {
        return (
          <li key={id}>
            <img
              className={css.img}
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500${profile_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
              }
              alt={original_name}
            />
            <h2>{name}</h2>
            <p>{character}</p>
          </li>
        );
      }
    );
    return actors;
  };

  return (
    <ul className={css.list}>
      {loading && <Loader />}
      {error && <p className={css.error}>Error: {error}</p>}
      {cast && cast.length > 0 ? castRender() : null}
    </ul>
  );
};
export default Cast;
