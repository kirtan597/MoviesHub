import axios from 'axios';
import { Movie, MovieResponse, Genre } from '../types/movie';

// Note: In a real application, this would be stored in environment variables
const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  timeout: 10000,
});

// Add error handling to prevent crashes
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('TMDB API Error:', error.message);
    return Promise.reject(error);
  }
);

export const movieService = {
  getImageUrl: (path: string) => `${IMAGE_BASE_URL}${path}`,
  getBackdropUrl: (path: string) => `${BACKDROP_BASE_URL}${path}`,

  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  },

  async getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
    const response = await tmdbApi.get('/movie/top_rated', {
      params: { page },
    });
    return response.data;
  },

  async getUpcomingMovies(page: number = 1): Promise<MovieResponse> {
    const response = await tmdbApi.get('/movie/upcoming', {
      params: { page },
    });
    return response.data;
  },

  async getNowPlayingMovies(page: number = 1): Promise<MovieResponse> {
    const response = await tmdbApi.get('/movie/now_playing', {
      params: { page },
    });
    return response.data;
  },

  async getMoviesByGenre(genreId: number, page: number = 1): Promise<MovieResponse> {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc',
      },
    });
    return response.data;
  },

  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    return response.data;
  },

  async getMovieDetails(movieId: number): Promise<Movie> {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,similar',
      },
    });
    return response.data;
  },

  async getGenres(): Promise<Genre[]> {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data.genres;
  },

  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<MovieResponse> {
    const response = await tmdbApi.get(`/trending/movie/${timeWindow}`);
    return response.data;
  },
};