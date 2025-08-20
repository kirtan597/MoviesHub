import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Movie } from './types/movie';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategoryTabs from './components/CategoryTabs';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import ErrorBoundary from './components/ErrorBoundary';
import ParticleBackground from './components/ParticleBackground';
import MovieReelOverlay from './components/MovieReelOverlay';
import AuthPrompt from './components/AuthPrompt';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import Toast from './components/Toast';
import Footer from './components/Footer';
import FavoritesPage from './components/FavoritesPage';
import WatchlistPage from './components/WatchlistPage';

import './index.css';

function App() {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [authPromptFeature, setAuthPromptFeature] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useLocalStorage<{name: string, email: string} | null>('kpxhub-user', null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toast, setToast] = useState<{isOpen: boolean, type: 'success' | 'error', message: string}>({isOpen: false, type: 'success', message: ''});
  const [favorites, setFavorites] = useLocalStorage<number[]>('kpxhub-favorites', []);
  const [watchlist, setWatchlist] = useLocalStorage<number[]>('kpxhub-watchlist', []);
  const [appError, setAppError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'favorites' | 'watchlist'>('home');

  // Error boundary for the app
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('App Error:', error);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (appError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl font-bold mb-4">KPXHub</h1>
          <p className="text-xl mb-4">{appError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const moviesData = useMovies(activeCategory, selectedGenre);
  const searchData = useSearch(searchQuery);
  
  const movies = moviesData?.movies || [];
  const loading = moviesData?.loading || false;
  const error = moviesData?.error;
  const hasMore = moviesData?.hasMore || false;
  const loadMore = moviesData?.loadMore;
  
  const searchResults = searchData?.searchResults || [];
  const searchLoading = searchData?.searchLoading || false;
  const searchError = searchData?.searchError;

  // Get user's favorite and watchlist movies
  const favoriteMovies = movies.filter(movie => favorites.includes(movie.id));
  const watchlistMovies = movies.filter(movie => watchlist.includes(movie.id));

  const displayMovies = searchQuery ? searchResults : 
    activeCategory === 'favorites' ? favoriteMovies :
    activeCategory === 'watchlist' ? watchlistMovies : movies;
  const isLoading = searchQuery ? searchLoading : loading;
  const displayError = searchQuery ? searchError : error;

  const handleCategoryChange = (category: string, genreId?: number) => {
    setActiveCategory(category);
    setSelectedGenre(genreId);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleToggleFavorite = (movie: Movie) => {
    setFavorites(prev => 
      prev.includes(movie.id)
        ? prev.filter(id => id !== movie.id)
        : [...prev, movie.id]
    );
  };

  const handleToggleWatchlist = (movie: Movie) => {
    setWatchlist(prev => 
      prev.includes(movie.id)
        ? prev.filter(id => id !== movie.id)
        : [...prev, movie.id]
    );
  };

  const handleAuthRequired = (feature: string) => {
    if (user) {
      if (feature === 'Favorites') {
        setCurrentPage('favorites');
      } else if (feature === 'Watchlist') {
        setCurrentPage('watchlist');
      }
      return;
    }
    setAuthPromptFeature(feature);
    setShowAuthPrompt(true);
  };

  const handleAuthSuccess = (userData: {name: string, email: string}, isSignup: boolean) => {
    if (isSignup) {
      // Show account created message but don't log in yet
      setToast({isOpen: true, type: 'success', message: `✅ Account created successfully! Welcome ${userData.name}! Please sign in now.`});
    } else {
      // Login success - set user and close modal
      setUser(userData);
      setIsAuthModalOpen(false);
      setToast({isOpen: true, type: 'success', message: `🎬 Welcome back, ${userData.name}! Ready to explore movies?`});
    }
    setTimeout(() => setToast(prev => ({...prev, isOpen: false})), 4000);
  };

  const handleSignOut = () => {
    setUser(null);
    setIsProfileOpen(false);
    setToast({isOpen: true, type: 'success', message: 'Signed out successfully!'});
    setTimeout(() => setToast(prev => ({...prev, isOpen: false})), 3000);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Dynamic Background */}
        <div className="dynamic-bg" />
        <ParticleBackground />
        {currentPage === 'home' && <MovieReelOverlay />}
        
        {/* Main Content */}
        <div className="relative z-10">
          <Header
            onSearch={handleSearch}
            searchQuery={searchQuery}
            onTabChange={handleCategoryChange}
            activeTab={activeCategory}
            onMenuToggle={handleMenuToggle}
            isMenuOpen={isMenuOpen}
            onAuthRequired={handleAuthRequired}
            user={user}
            onProfileClick={() => setIsProfileOpen(true)}
            onOpenAuth={(mode) => {
              setAuthMode(mode);
              setIsAuthModalOpen(true);
            }}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

          {currentPage === 'home' && (
            <>
              {!searchQuery && <HeroSection />}
              <CategoryTabs
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </>
          )}

          {currentPage === 'favorites' && (
            <FavoritesPage
              movies={favoriteMovies}
              onRemoveFavorite={handleToggleFavorite}
              onMovieClick={handleMovieClick}
            />
          )}

          {currentPage === 'watchlist' && (
            <WatchlistPage
              movies={watchlistMovies}
              onRemoveFromWatchlist={handleToggleWatchlist}
              onMovieClick={handleMovieClick}
              onBackToHome={() => setCurrentPage('home')}
            />
          )}

          {currentPage === 'home' && (
            <main className="container mx-auto px-6 py-12">
            <AnimatePresence>
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center min-h-[400px]"
                >
                  <LoadingSpinner />
                </motion.div>
              ) : displayError ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <div className="glass-strong rounded-2xl p-8 max-w-md mx-auto">
                    <h3 className="text-xl font-bold text-white mb-4">Connection Issue</h3>
                    <p className="text-white/70 mb-6">{displayError}</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="btn-primary"
                    >
                      Try Again
                    </button>
                  </div>
                </motion.div>
              ) : displayMovies.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <EmptyState 
                    message={
                      searchQuery ? `No results found for "${searchQuery}"` :
                      activeCategory === 'favorites' ? 'No favorite movies yet. Start liking movies to see them here!' :
                      activeCategory === 'watchlist' ? 'No movies in watchlist yet. Add movies to watch later!' :
                      'No movies found'
                    }
                    onReset={() => {
                      setSearchQuery('');
                      setActiveCategory('popular');
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="movies"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="mb-8">
                    <motion.h2 
                      className="text-3xl font-bold text-white mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {searchQuery ? `Search Results for "${searchQuery}"` : 
                       activeCategory === 'favorites' ? 'Your Favorite Movies' :
                       activeCategory === 'watchlist' ? 'Your Watchlist' :
                       selectedGenre ? 'Genre Movies' : 
                       activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace('_', ' ')}
                    </motion.h2>
                    <motion.p 
                      className="text-white/70"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {activeCategory === 'favorites' ? `${displayMovies.length} favorite movies` :
                       activeCategory === 'watchlist' ? `${displayMovies.length} movies in watchlist` :
                       `${displayMovies.length} movies found`}
                    </motion.p>
                  </div>

                  <MovieGrid
                    movies={displayMovies}
                    favorites={favorites}
                    watchlist={watchlist}
                    onToggleFavorite={handleToggleFavorite}
                    onToggleWatchlist={handleToggleWatchlist}
                    onMovieClick={handleMovieClick}
                  />

                  {hasMore && !searchQuery && (
                    <motion.div 
                      className="text-center mt-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1 }}
                    >
                      <button
                        onClick={loadMore}
                        className="btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Loading...' : 'Load More Movies'}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
          )}

          {currentPage === 'home' && <Footer />}
        </div>

        {/* Modals */}
        <AnimatePresence>
          {selectedMovie && (
            <MovieModal
              movie={selectedMovie}
              isOpen={!!selectedMovie}
              onClose={() => setSelectedMovie(null)}
              isFavorite={favorites.includes(selectedMovie.id)}
              isInWatchlist={watchlist.includes(selectedMovie.id)}
              onToggleFavorite={() => handleToggleFavorite(selectedMovie)}
              onToggleWatchlist={() => handleToggleWatchlist(selectedMovie)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAuthModalOpen && (
            <AuthModal
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
              initialMode={authMode}
              onAuthSuccess={handleAuthSuccess}
              onError={(message) => {
                setToast({isOpen: true, type: 'error', message});
                setTimeout(() => setToast(prev => ({...prev, isOpen: false})), 3000);
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAuthPrompt && (
            <AuthPrompt
              isOpen={showAuthPrompt}
              onClose={() => setShowAuthPrompt(false)}
              feature={authPromptFeature}
              onSignUp={() => {
                setShowAuthPrompt(false);
                setAuthMode('signup');
                setIsAuthModalOpen(true);
              }}
              onSignIn={() => {
                setShowAuthPrompt(false);
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
            />
          )}
        </AnimatePresence>

        <UserProfile
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user || {name: '', email: ''}}
          onSignOut={handleSignOut}
        />

        <Toast
          isOpen={toast.isOpen}
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(prev => ({...prev, isOpen: false}))}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;