import css from './reviews.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../api/moviesApi';
import { Loader } from 'components/Loader/Loader';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getList = async () => {
      try {
        const { data } = await getMovieReviews(id);
        setReviews(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getList();
  }, [id]);

  const reviewsRender = () => {
    const coment = reviews.map(({ author, content, id }) => {
      return (
        <li key={id}>
          <h2>{author}</h2>
          <p>{content}</p>
        </li>
      );
    });
    return coment;
  };

  return (
    <ul>
      {loading && <Loader />}
      {error && <p className={css.error}>Error: {error}</p>}
      {reviews.length ? reviewsRender() : <p>No reviews.</p>}
    </ul>
  );
};
