import { useState, useEffect, useCallback } from 'react';
import { Movie, MovieResponse } from '../types/movie';
import { movieService } from '../services/tmdb';

export function useMovies(category: string, genreId?: number) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    loadMovies(1);
  }, [category, genreId]);

  const loadMovies = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      
      // Prevent infinite loops
      if (pageNum > 500) {
        setError('Maximum pages reached');
        setLoading(false);
        return;
      }
      
      let response: MovieResponse;
      
      switch (category) {
        case 'popular':
          response = await movieService.getPopularMovies(pageNum);
          break;
        case 'top_rated':
          response = await movieService.getTopRatedMovies(pageNum);
          break;
        case 'upcoming':
          response = await movieService.getUpcomingMovies(pageNum);
          break;
        case 'now_playing':
          response = await movieService.getNowPlayingMovies(pageNum);
          break;
        case 'trending':
          response = await movieService.getTrendingMovies();
          break;
        case 'genre':
          if (genreId) {
            response = await movieService.getMoviesByGenre(genreId, pageNum);
          } else {
            throw new Error('Genre ID is required for genre category');
          }
          break;
        default:
          response = await movieService.getPopularMovies(pageNum);
      }

      if (pageNum === 1) {
        setMovies(response.results);
      } else {
        setMovies(prev => [...prev, ...response.results]);
      }

      setHasMore(pageNum < response.total_pages);
      setPage(pageNum);
    } catch (err) {
      console.warn('Movie loading error:', err);
      setError('Unable to load movies. Using offline mode.');
      // Set some dummy data to prevent blank screen
      if (pageNum === 1) {
        setMovies([]);
      }
    } finally {
      setLoading(false);
    }
  }, [category, genreId]);

  const loadMore = () => {
    if (hasMore && !loading) {
      loadMovies(page + 1);
    }
  };

  return {
    movies,
    loading,
    error,
    hasMore,
    loadMore,
    refresh: () => loadMovies(1),
  };
}