import React, { useState } from 'react';
import { Search, Film, Heart, Bookmark, Menu, Sparkles, X, LogIn, UserPlus, Zap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import AuthModal from './AuthModal';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onTabChange: (tab: string) => void;
  activeTab: string;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  onAuthRequired: (feature: string) => void;
  user?: {name: string, email: string} | null;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchQuery,
  onTabChange,
  activeTab,
  onMenuToggle,
  isMenuOpen,
  onAuthRequired,
  user,
  onProfileClick,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen && searchQuery) {
      onSearch(''); // Clear search when closing
    }
  };

  return (
    <>
      <motion.header 
        className="sticky top-0 z-50 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(147, 51, 234, 0.15) 50%, rgba(236, 72, 153, 0.15) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(6, 182, 212, 0.3)'
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `linear-gradient(45deg, ${['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b'][i % 4]}, transparent)`,
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo - Enhanced with Dynamic Colors */}
            <motion.div 
              className="flex items-center space-x-4 group cursor-pointer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                {/* Main Logo Container */}
                <motion.div
                  className="relative w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #ffeaa7 100%)',
                    backgroundSize: '300% 300%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '100% 100%', '0% 100%', '0% 50%'],
                    boxShadow: [
                      '0 0 20px rgba(255, 107, 107, 0.4), 0 0 40px rgba(78, 205, 196, 0.3)',
                      '0 0 30px rgba(78, 205, 196, 0.5), 0 0 50px rgba(69, 183, 209, 0.4)',
                      '0 0 25px rgba(69, 183, 209, 0.4), 0 0 45px rgba(150, 206, 180, 0.3)',
                      '0 0 20px rgba(255, 107, 107, 0.4), 0 0 40px rgba(78, 205, 196, 0.3)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  whileHover={{ rotate: 360 }}
                >
                  <Film className="h-6 w-6 text-white drop-shadow-lg relative z-10" />
                  
                  {/* Pulsing Inner Glow */}
                  <motion.div
                    className="absolute inset-1 rounded-xl bg-white/20"
                    animate={{
                      opacity: [0.2, 0.6, 0.2],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                {/* Floating Sparkles */}
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5 text-yellow-300 drop-shadow-lg" />
                </motion.div>
                
                {/* Energy Rings */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-pink-400/50"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                />
              </div>
              
              <div className="relative">
                <motion.h1 
                  className="text-3xl font-black text-transparent bg-clip-text drop-shadow-2xl"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #ffeaa7 100%)',
                    backgroundSize: '300% 300%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '100% 100%', '0% 100%', '0% 50%']
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                >
                  KPXHub
                </motion.h1>
                <motion.p 
                  className="text-sm font-bold text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)',
                    backgroundSize: '200% 200%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Stream the Future
                </motion.p>
                
                {/* Floating Text Effects */}
                <motion.div
                  className="absolute -top-1 -right-8"
                  animate={{
                    y: [0, -5, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="h-3 w-3 text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {[
                { id: 'favorites', icon: Heart, label: 'Favorites', gradient: 'from-pink-500 to-red-500' },
                { id: 'watchlist', icon: Bookmark, label: 'Watchlist', gradient: 'from-blue-500 to-cyan-500' }
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => onAuthRequired(item.label)}
                  className="relative flex items-center space-x-2 px-4 lg:px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-white/80 hover:text-white group overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {/* Hover Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 rounded-2xl`}
                    whileHover={{ scale: 1.1 }}
                  />
                  
                  <item.icon className="h-5 w-5 relative z-10" />
                  <span className="relative z-10 hidden lg:inline">{item.label}</span>
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.button>
              ))}
            </nav>

            {/* Right Actions - Reordered */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <motion.button
                onClick={toggleSearch}
                className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-medium transition-all duration-300 overflow-hidden ${
                  isSearchOpen || searchQuery
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSearchOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">
                  {isSearchOpen ? 'Close' : 'Search'}
                </span>
                
                {searchQuery && !isSearchOpen && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.button>

              {/* Auth Buttons or User Profile */}
              {user ? (
                <motion.button
                  onClick={onProfileClick}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-medium transition-all duration-300 backdrop-blur-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/40 text-blue-300 hover:text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline">{user.name}</span>
                </motion.button>
              ) : (
                <>
                  {/* Enhanced Auth Buttons - Moved to end */}
              <motion.button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-medium transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: 'rgb(52, 211, 153)'
                }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn className="w-4 h-4 relative z-10" />
                <span className="hidden sm:inline relative z-10">Login</span>
                
                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.button>
              
              <motion.button
                onClick={() => {
                  setAuthMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="relative flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-white font-semibold shadow-lg transition-all duration-300 overflow-hidden border"
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)',
                  backgroundSize: '200% 200%',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserPlus className="w-4 h-4 relative z-10" />
                <span className="hidden sm:inline relative z-10">Sign Up</span>
                
                {/* Enhanced Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                />
              </motion.button>
                </>
              )}
              
              {/* Theme Toggle - Moved to last */}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={onMenuToggle}
              className="md:hidden p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            className="md:hidden overflow-hidden"
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-3 pt-6 border-t border-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 mt-4">
              {[
                { id: 'favorites', icon: Heart, label: 'Favorites', gradient: 'from-pink-500 to-red-500' },
                { id: 'watchlist', icon: Bookmark, label: 'Watchlist', gradient: 'from-blue-500 to-cyan-500' }
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onAuthRequired(item.label);
                    onMenuToggle();
                  }}
                  className="relative flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all text-white/70 hover:text-white group overflow-hidden"
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Mobile Button Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 rounded-2xl`}
                  />
                  
                  <item.icon className="h-5 w-5 relative z-10" />
                  <span className="font-medium relative z-10">{item.label}</span>
                  
                  {/* Mobile Shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.button>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                background: `linear-gradient(45deg, ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8'][i % 6]}, transparent)`,
                left: `${5 + i * 8}%`,
                top: `${10 + (i % 4) * 20}%`
              }}
              animate={{
                x: [0, 30, -30, 0],
                y: [0, -20, 20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </motion.header>

      {/* Enhanced Expandable Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed top-24 left-0 right-0 z-40 backdrop-blur-2xl border-b border-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-500/30 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)'
            }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Search Overlay Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: `linear-gradient(45deg, ${['#06b6d4', '#8b5cf6', '#ec4899'][i % 3]}, transparent)`,
                    left: `${15 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>

            <div className="container mx-auto px-6 py-8 relative z-10">
              <motion.div 
                className="relative max-w-3xl mx-auto group"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {/* Enhanced Search Input */}
                <div className="relative">
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl p-0.5"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #ffeaa7 100%)',
                      backgroundSize: '300% 300%'
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '100% 100%', '0% 100%', '0% 50%']
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="w-full h-full bg-black/20 dark-mode:bg-gray-900/40 backdrop-blur-xl rounded-3xl" />
                  </motion.div>
                  
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white/60 group-focus-within:text-cyan-400 transition-colors duration-300" />
                    <input
                      type="text"
                      placeholder="Discover movies, actors, directors, genres..."
                      value={searchQuery}
                      onChange={(e) => onSearch(e.target.value)}
                      className="w-full pl-16 pr-16 py-6 bg-transparent text-white dark-mode:text-gray-100 text-lg placeholder-white/50 dark-mode:placeholder-gray-400 focus:outline-none transition-all duration-300"
                      autoFocus
                    />
                    {searchQuery && (
                      <motion.button
                        onClick={() => onSearch('')}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
                
                {/* Search Results Preview */}
                {searchQuery && (
                  <motion.div
                    className="absolute top-full left-0 right-0 mt-4 bg-black/40 dark-mode:bg-gray-900/60 backdrop-blur-xl border border-white/10 dark-mode:border-blue-500/30 rounded-2xl p-6 shadow-2xl dark-mode:shadow-blue-500/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Zap className="h-4 w-4 text-cyan-400 dark-mode:text-blue-400" />
                      <p className="text-white/80 dark-mode:text-gray-200 text-sm font-medium">
                        Searching for "{searchQuery}"...
                      </p>
                    </div>
                    <div className="w-full h-1 bg-white/10 dark-mode:bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 dark-mode:from-blue-500 dark-mode:to-purple-600 rounded-full"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Enhanced Quick Search Tags */}
              <motion.div
                className="flex flex-wrap justify-center gap-3 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller'].map((genre, index) => {
                  const colors = [
                    'from-red-500 to-orange-500',
                    'from-yellow-500 to-green-500', 
                    'from-blue-500 to-purple-500',
                    'from-purple-500 to-pink-500',
                    'from-gray-700 to-red-900',
                    'from-pink-500 to-rose-500',
                    'from-indigo-500 to-blue-500'
                  ];
                  
                  return (
                    <motion.button
                      key={genre}
                      onClick={() => onSearch(genre)}
                      className={`relative px-6 py-3 bg-gradient-to-r ${colors[index]} rounded-2xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <span className="relative z-10">{genre}</span>
                      
                      {/* Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Backdrop overlay when search is open */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSearch}
          >
            {/* Backdrop Particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;