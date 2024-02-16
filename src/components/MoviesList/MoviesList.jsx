import css from './movies-list.module.css';
import { Link, useLocation } from 'react-router-dom';

export const MoviesList = ({ list }) => {
  const location = useLocation();

  const renderMoviList = () => {
    return list.map(({ title, id }) => {
      return (
        <div>
          <li className={css.list} key={id}>
            <Link
              className={css.link}
              to={`/movies/${id}`}
              state={{ from: location }}
            >
              {title}
            </Link>
          </li>
        </div>
      );
    });
  };

  return (
    <>
      <div>{renderMoviList()}</div>
    </>
  );
};
