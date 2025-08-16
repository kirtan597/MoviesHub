import React from 'react';
import { Heart, Bookmark, Star, Calendar, Play, Eye, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Movie } from '../types/movie';
import { movieService } from '../services/tmdb';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  isInWatchlist: boolean;
  onToggleFavorite: (movie: Movie) => void;
  onToggleWatchlist: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite,
  isInWatchlist,
  onToggleFavorite,
  onToggleWatchlist,
  onMovieClick,
  index = 0,
}) => {
  const imageUrl = movie.poster_path
    ? movieService.getImageUrl(movie.poster_path)
    : '/api/placeholder/300/450';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'TBA';

  return (
    <motion.div
      className="card-premium rounded-3xl shadow-lg hover:shadow-xl transition-all duration-400 overflow-hidden group cursor-pointer relative"
      whileHover={{ y: -4, scale: 1.01 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.15,
        ease: "easeOut"
      }}
      onClick={() => onMovieClick(movie)}
    >
      <div className="relative overflow-hidden rounded-t-3xl">
        {/* Enhanced Discount Badge */}
        <motion.div 
          className="absolute top-4 left-4 bg-gradient-to-r from-teal-500 to-cyan-500 dark-mode:from-blue-600 dark-mode:to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg dark-mode:shadow-blue-500/30 border dark-mode:border-blue-400/30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          HD 4K
        </motion.div>
        
        {/* Enhanced Heart Icon */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie);
          }}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark-mode:bg-gray-800/90 hover:bg-white dark-mode:hover:bg-gray-700 rounded-full flex items-center justify-center shadow-lg dark-mode:shadow-gray-900/50 z-10 transition-all duration-300 border dark-mode:border-gray-600/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600 dark-mode:text-gray-400'}`} />
        </motion.button>
        
        {/* Movie Poster */}
        <motion.img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/api/placeholder/300/450';
          }}
        />
        
      </div>

      {/* Movie Info */}
      <div className="p-6">
        <motion.h3 
          className="font-bold text-lg mb-2 line-clamp-2 transition-all duration-150 text-gray-900 dark-mode:text-white"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.1 }}
        >
          {movie.title}
        </motion.h3>
        
        <p className="text-gray-600 dark-mode:text-gray-300 text-sm mb-3 line-clamp-2">
          {movie.overview}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 dark-mode:bg-blue-900/50 text-blue-800 dark-mode:text-blue-300 px-2 py-1 rounded-full text-xs font-medium border dark-mode:border-blue-500/30">
              Action
            </span>
            <div className="flex items-center space-x-1 text-gray-500 dark-mode:text-gray-400 text-sm">
              <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
              <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
          <span className="text-gray-500 dark-mode:text-gray-400 text-sm">{releaseYear}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-900 dark-mode:text-white">
            <span className="text-2xl font-bold">Free</span>
            <span className="text-sm text-gray-500 dark-mode:text-gray-400 line-through ml-2">$9.99</span>
          </div>
          <div className="flex items-center space-x-1 text-green-600 dark-mode:text-green-400 text-sm">
            <div className="w-2 h-2 bg-green-500 dark-mode:bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-medium">Available</span>
          </div>
        </div>

        <div className="flex gap-2">
          <motion.button
            className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.1 }}
            onClick={(e) => {
              e.stopPropagation();
              onMovieClick(movie);
            }}
          >
            <Play className="w-4 h-4" />
            Watch Now
          </motion.button>
          
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist(movie);
            }}
            className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              isInWatchlist
                ? 'bg-blue-50 dark-mode:bg-blue-900/30 border-blue-500 dark-mode:border-blue-400 text-blue-600 dark-mode:text-blue-400'
                : 'border-gray-300 dark-mode:border-gray-600 text-gray-600 dark-mode:text-gray-400 hover:border-gray-400 dark-mode:hover:border-gray-500'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            <Bookmark className="w-5 h-5" fill={isInWatchlist ? 'currentColor' : 'none'} />
          </motion.button>
        </div>
      </div>

    </motion.div>
  );
};

export default MovieCard;