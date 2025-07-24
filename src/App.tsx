import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Movie, UserReview, FavoriteItem, WatchlistItem } from './types/movie';

function App() {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Local storage hooks
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>('moviehub-favorites', []);
  const [watchlist, setWatchlist] = useLocalStorage<WatchlistItem[]>('moviehub-watchlist', []);
  const [reviews, setReviews] = useLocalStorage<UserReview[]>('moviehub-reviews', []);

  // Custom hooks
  const { movies, loading, error, hasMore, loadMore } = useMovies(activeCategory, selectedGenre);
  const { query, setQuery, results, loading: searchLoading, clearSearch } = useSearch();

  // Handle category change
  const handleCategoryChange = (category: string, genreId?: number) => {
    setActiveCategory(category);
    setSelectedGenre(genreId);
    setActiveTab('home');
  };

  // Handle search
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      setActiveTab('search');
    } else {
      setActiveTab('home');
    }
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    clearSearch();
    setIsMenuOpen(false);
  };

  // Handle movie click
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  // Handle favorite toggle
  const handleToggleFavorite = (movie: Movie) => {
    const favoriteItem: FavoriteItem = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      addedDate: new Date().toISOString(),
    };

    setFavorites(prev => {
      const exists = prev.find(item => item.id === movie.id);
      if (exists) {
        return prev.filter(item => item.id !== movie.id);
      } else {
        return [...prev, favoriteItem];
      }
    });
  };

  // Handle watchlist toggle
  const handleToggleWatchlist = (movie: Movie) => {
    const watchlistItem: WatchlistItem = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      addedDate: new Date().toISOString(),
    };

    setWatchlist(prev => {
      const exists = prev.find(item => item.id === movie.id);
      if (exists) {
        return prev.filter(item => item.id !== movie.id);
      } else {
        return [...prev, watchlistItem];
      }
    });
  };

  // Handle add review
  const handleAddReview = (reviewData: Omit<UserReview, 'id' | 'date'>) => {
    const newReview: UserReview = {
      ...reviewData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setReviews(prev => [...prev, newReview]);
  };

  // Handle load more
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadMore();
    }
  };

  // Get current movies based on active tab
  const getCurrentMovies = () => {
    switch (activeTab) {
      case 'search':
        return results;
      case 'favorites':
        return favorites.map(item => ({
          ...item,
          overview: '',
          backdrop_path: '',
          genre_ids: [],
          vote_count: 0,
        }));
      case 'watchlist':
        return watchlist.map(item => ({
          ...item,
          overview: '',
          backdrop_path: '',
          genre_ids: [],
          vote_count: 0,
        }));
      default:
        return movies;
    }
  };

  const currentMovies = getCurrentMovies();
  const isSearching = activeTab === 'search';
  const isShowingPersonalList = activeTab === 'favorites' || activeTab === 'watchlist';

  return (
    <div className="min-h-screen bg-slate-900">
      <Header
        onSearch={handleSearch}
        searchQuery={query}
        onTabChange={handleTabChange}
        activeTab={activeTab}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />

      {activeTab === 'home' && (
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}

      <main className="container mx-auto px-4 py-8">
        {/* Content Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            {activeTab === 'search' && query
              ? `Search results for "${query}"`
              : activeTab === 'favorites'
              ? 'Your Favorites'
              : activeTab === 'watchlist'
              ? 'Your Watchlist'
              : 'Discover Movies'}
          </h1>
          <p className="text-slate-400">
            {activeTab === 'search' && query
              ? `${results.length} movies found`
              : activeTab === 'favorites'
              ? `${favorites.length} favorite movies`
              : activeTab === 'watchlist'
              ? `${watchlist.length} movies in your watchlist`
              : 'Find your next favorite movie'}
          </p>
        </motion.div>

        {/* Loading State */}
        {(loading || searchLoading) && currentMovies.length === 0 && <LoadingSpinner />}

        {/* Error State */}
        {error && (
          <motion.div
            className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !searchLoading && currentMovies.length === 0 && (
          <EmptyState
            type={activeTab === 'search' ? 'search' : activeTab === 'favorites' ? 'favorites' : activeTab === 'watchlist' ? 'watchlist' : 'generic'}
          />
        )}

        {/* Movie Grid */}
        {currentMovies.length > 0 && (
          <MovieGrid
            movies={currentMovies}
            favorites={favorites.map(item => item.id)}
            watchlist={watchlist.map(item => item.id)}
            onToggleFavorite={handleToggleFavorite}
            onToggleWatchlist={handleToggleWatchlist}
            onMovieClick={handleMovieClick}
          />
        )}

        {/* Load More Button */}
        {!isSearching && !isShowingPersonalList && hasMore && currentMovies.length > 0 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-amber-500 text-white px-8 py-3 rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </motion.div>
        )}
      </main>

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isFavorite={selectedMovie ? favorites.some(item => item.id === selectedMovie.id) : false}
        isInWatchlist={selectedMovie ? watchlist.some(item => item.id === selectedMovie.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onToggleWatchlist={handleToggleWatchlist}
        reviews={reviews}
        onAddReview={handleAddReview}
      />
    </div>
  );
}

export default App;