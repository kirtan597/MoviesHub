import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Trash2, ArrowLeft } from 'lucide-react';
import { Movie } from '../types/movie';
import { movieService } from '../services/tmdb';

interface WatchlistPageProps {
  movies: Movie[];
  onRemoveFromWatchlist: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
  onBackToHome: () => void;
}

const WatchlistPage: React.FC<WatchlistPageProps> = ({ movies, onRemoveFromWatchlist, onMovieClick, onBackToHome }) => {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.button
          onClick={onBackToHome}
          className="flex items-center space-x-2 text-white/70 hover:text-white mb-6 sm:mb-8 transition-colors touch-target"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-sm sm:text-base">Back to Home</span>
        </motion.button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Bookmark className="h-12 w-12 sm:h-16 sm:w-16 text-amber-500 mx-auto mb-4" fill="currentColor" />
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4">My Watchlist</h1>
          <p className="text-white/70 text-sm sm:text-base">Movies you want to watch later</p>
        </motion.div>

        {movies.length === 0 ? (
          <div className="text-center py-20">
            <Bookmark className="h-16 w-16 sm:h-24 sm:w-24 text-gray-500 mx-auto mb-6" />
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">No movies in watchlist</h3>
            <p className="text-white/70 text-sm sm:text-base">Add movies to watch them later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
            {movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 rounded-lg sm:rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                onClick={() => onMovieClick(movie)}
              >
                <div className="relative">
                  <img
                    src={movie.poster_path ? movieService.getImageUrl(movie.poster_path) : '/api/placeholder/300/450'}
                    alt={movie.title}
                    className="w-full h-48 sm:h-64 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFromWatchlist(movie);
                    }}
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-amber-500 text-white p-1.5 sm:p-2 rounded-full hover:bg-amber-600 transition-colors touch-target"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
                <div className="p-2 sm:p-4">
                  <h3 className="text-white font-semibold mb-1 sm:mb-2 line-clamp-2 text-xs sm:text-base">{movie.title}</h3>
                  <p className="text-white/70 text-xs sm:text-sm">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;