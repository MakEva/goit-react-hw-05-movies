import axios from 'axios';

const API_KEY = '6316a6e4220c68df1c72cf0ff14989c1';
const BASE_URL = 'https://api.themoviedb.org/3/';

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  params: {
    api_key: `${API_KEY}`,
  },
});

export const getTrendMovies = () => {
  return instance.get('trending/movie/day');
};

export const searchMovies = (q, page = 1) => {
  const movie = instance.get(
    `search/movie?include_adult=false&language=en-US&page=${page}&query=${q}`
  );
  return movie;
};

export const getMovieDetails = id => {
  const details = instance.get(`movie/${id}`);
  return details;
};

export const getMovieCredits = id => {
  const credits = instance.get(`movie/${id}/credits?language=en-US`);
  return credits;
};

export const getMovieReviews = id => {
  const reviews = instance.get(`movie/${id}/reviews?language=en-US&page=1`);
  return reviews;
};
