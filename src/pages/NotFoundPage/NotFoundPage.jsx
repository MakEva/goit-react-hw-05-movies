import css from './not-found-page.module.css';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div>
      <h1>Cannot find this page</h1>
      <Link to="/">To home page</Link>
    </div>
  );
};
