import React from 'react';
import { motion } from 'framer-motion';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  favorites: number[];
  watchlist: number[];
  onToggleFavorite: (movie: Movie) => void;
  onToggleWatchlist: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  favorites,
  watchlist,
  onToggleFavorite,
  onToggleWatchlist,
  onMovieClick,
}) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {movies.map((movie, index) => (
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <MovieCard
            movie={movie}
            isFavorite={favorites.includes(movie.id)}
            isInWatchlist={watchlist.includes(movie.id)}
            onToggleFavorite={onToggleFavorite}
            onToggleWatchlist={onToggleWatchlist}
            onMovieClick={onMovieClick}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MovieGrid;