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
      className="card-premium group cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onClick={() => onMovieClick(movie)}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        {/* Movie Poster */}
        <motion.img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-72 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/api/placeholder/300/450';
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button Overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <motion.button
            className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 glow-effect"
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onMovieClick(movie);
            }}
          >
            <Play className="h-6 w-6 ml-1" />
          </motion.button>
        </motion.div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(movie);
            }}
            className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isFavorite
                ? 'bg-red-500/80 text-white shadow-lg shadow-red-500/30'
                : 'bg-black/30 text-white hover:bg-red-500/80 hover:shadow-lg hover:shadow-red-500/30'
            }`}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </motion.button>
          
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist(movie);
            }}
            className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isInWatchlist
                ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/30'
                : 'bg-black/30 text-white hover:bg-blue-500/80 hover:shadow-lg hover:shadow-blue-500/30'
            }`}
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Bookmark className="h-4 w-4" fill={isInWatchlist ? 'currentColor' : 'none'} />
          </motion.button>
        </div>

        {/* Rating Badge */}
        <motion.div 
          className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center space-x-1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Star className="h-3.5 w-3.5 text-yellow-400" fill="currentColor" />
          <span className="text-sm font-semibold">{movie.vote_average.toFixed(1)}</span>
        </motion.div>

        {/* Quality Badge */}
        <motion.div 
          className="absolute bottom-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2.5 py-1 rounded-full text-xs font-bold"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          HD
        </motion.div>
      </div>

      {/* Movie Info */}
      <div className="p-5">
        <motion.h3 
          className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-gradient transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          {movie.title}
        </motion.h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-white/60 text-sm">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{releaseYear}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{movie.vote_count}</span>
            </div>
          </div>
          
          <motion.div 
            className="flex items-center space-x-1 text-green-400 text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="h-4 w-4" />
            <span>2h 15m</span>
          </motion.div>
        </div>

        <motion.p 
          className="text-white/70 text-sm line-clamp-3 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {movie.overview}
        </motion.p>

        {/* Action Bar */}
        <motion.div 
          className="flex items-center justify-between mt-4 pt-4 border-t border-white/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-medium">Available</span>
          </div>
          
          <motion.button
            className="text-white/60 hover:text-white text-sm font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            More Info →
          </motion.button>
        </motion.div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 blur-xl -z-10"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default MovieCard;