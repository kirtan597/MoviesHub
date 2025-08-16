import React, { useState, useEffect } from 'react';
import { X, Star, Calendar, Clock, Heart, Bookmark, Play, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Movie, UserReview } from '../types/movie';
import { movieService } from '../services/tmdb';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  isInWatchlist: boolean;
  onToggleFavorite: (movie: Movie) => void;
  onToggleWatchlist: (movie: Movie) => void;
  reviews?: UserReview[];
  onAddReview?: (review: Omit<UserReview, 'id' | 'date'>) => void;
}

const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  isOpen,
  onClose,
  isFavorite,
  isInWatchlist,
  onToggleFavorite,
  onToggleWatchlist,
  reviews,
  onAddReview,
}) => {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (movie && isOpen) {
      loadMovieDetails();
    }
  }, [movie, isOpen]);

  const loadMovieDetails = async () => {
    if (!movie) return;

    try {
      setLoading(true);
      const details = await movieService.getMovieDetails(movie.id);
      setMovieDetails(details);
    } catch (error) {
      console.error('Failed to load movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!movie || !userRating || !userReview.trim() || !userName.trim()) return;

    if (onAddReview) {
      onAddReview({
        movieId: movie.id,
        rating: userRating,
        review: userReview.trim(),
        userName: userName.trim(),
      });
    }

    setUserRating(0);
    setUserReview('');
    setUserName('');
  };

  const movieReviews = reviews?.filter(review => review.movieId === movie?.id) || [];

  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? movieService.getBackdropUrl(movie.backdrop_path)
    : '/api/placeholder/1280/720';

  const trailer = movieDetails?.videos?.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="min-h-screen bg-black bg-opacity-75 flex items-center justify-center p-4">
            <motion.div
              className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="relative">
                <img
                  src={backdropUrl}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={movie.poster_path ? movieService.getImageUrl(movie.poster_path) : '/api/placeholder/150/225'}
                      alt={movie.title}
                      className="w-20 h-30 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
                      <div className="flex items-center space-x-4 text-slate-300">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                          <span>{movie.vote_average.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}</span>
                        </div>
                        {movieDetails?.runtime && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{movieDetails.runtime} min</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-b border-slate-800">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => onToggleFavorite(movie)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isFavorite
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-red-500 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
                    <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                  </motion.button>

                  <motion.button
                    onClick={() => onToggleWatchlist(movie)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isInWatchlist
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-amber-500 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bookmark className="h-4 w-4" fill={isInWatchlist ? 'currentColor' : 'none'} />
                    <span>{isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
                  </motion.button>

                  {trailer && (
                    <motion.a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="h-4 w-4" />
                      <span>Watch Trailer</span>
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-slate-800">
                <nav className="flex space-x-8 px-6">
                  {['overview', 'cast', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 border-b-2 font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? 'border-amber-500 text-amber-500'
                          : 'border-transparent text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    {movieDetails?.tagline && (
                      <p className="text-amber-500 italic">"{movieDetails.tagline}"</p>
                    )}
                    <p className="text-slate-300 leading-relaxed">{movie.overview}</p>
                    
                    {movieDetails?.genres && (
                      <div>
                        <h4 className="text-white font-semibold mb-2">Genres</h4>
                        <div className="flex flex-wrap gap-2">
                          {movieDetails.genres.map((genre) => (
                            <span
                              key={genre.id}
                              className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'cast' && (
                  <div>
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {movieDetails?.cast?.slice(0, 12).map((actor) => (
                          <div key={actor.id} className="text-center">
                            <img
                              src={actor.profile_path ? movieService.getImageUrl(actor.profile_path) : '/api/placeholder/150/150'}
                              alt={actor.name}
                              className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                            />
                            <h4 className="text-white font-medium text-sm">{actor.name}</h4>
                            <p className="text-slate-400 text-xs">{actor.character}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {/* Add Review Form */}
                    <form onSubmit={handleSubmitReview} className="bg-slate-800 p-4 rounded-lg">
                      <h4 className="text-white font-semibold mb-4">Add Your Review</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Your name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-amber-500"
                        />
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-300">Rating:</span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setUserRating(star)}
                              className={`text-xl ${
                                star <= userRating ? 'text-yellow-400' : 'text-slate-600'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <textarea
                        placeholder="Write your review..."
                        value={userReview}
                        onChange={(e) => setUserReview(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-amber-500 mb-4"
                      />
                      
                      <button
                        type="submit"
                        disabled={!userRating || !userReview.trim() || !userName.trim()}
                        className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Submit Review
                      </button>
                    </form>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {movieReviews.length > 0 ? (
                        movieReviews.map((review) => (
                          <div key={review.id} className="bg-slate-800 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <User className="h-4 w-4 text-slate-400" />
                              <span className="text-white font-medium">{review.userName}</span>
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={`text-sm ${
                                      star <= review.rating ? 'text-yellow-400' : 'text-slate-600'
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="text-slate-400 text-sm">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-slate-300">{review.review}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-400 text-center py-8">
                          No reviews yet. Be the first to review this movie!
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovieModal;