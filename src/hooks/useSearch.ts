import { useState, useEffect, useCallback } from 'react';
import { Movie } from '../types/movie';
import { movieService } from '../services/tmdb';

export function useSearch(searchQuery: string) {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const searchMovies = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchLoading(false);
      setSearchError(null);
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError(null);
      const response = await movieService.searchMovies(query);
      setSearchResults(response.results);
    } catch (err) {
      console.warn('Search error:', err);
      setSearchError('Unable to search movies. Please try again.');
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchMovies(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchMovies]);

  return {
    searchResults,
    searchLoading,
    searchError,
  };
}