import React, { useState } from 'react';
import { Search, Film, Heart, Bookmark, Menu, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onTabChange: (tab: string) => void;
  activeTab: string;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchQuery,
  onTabChange,
  activeTab,
  onMenuToggle,
  isMenuOpen,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen && searchQuery) {
      onSearch(''); // Clear search when closing
    }
  };

  return (
    <>
      <motion.header 
        className="sticky top-0 z-50 glass border-b border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center glow-effect"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Film className="h-5 w-5 text-white" />
                </motion.div>
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                </motion.div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">CineHub</h1>
                <p className="text-xs text-white/60">Professional</p>
              </div>
            </motion.div>

            {/* Center Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <motion.button
                onClick={toggleSearch}
                className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  isSearchOpen || searchQuery
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
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

              {/* Navigation - Desktop */}
              <nav className="hidden md:flex items-center space-x-2">
                {[
                  { id: 'favorites', icon: Heart, label: 'Favorites', gradient: 'from-pink-500 to-red-500' },
                  { id: 'watchlist', icon: Bookmark, label: 'Watchlist', gradient: 'from-blue-500 to-cyan-500' }
                ].map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`relative flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === item.id 
                        ? 'text-white shadow-lg' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {activeTab === item.id && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl`}
                        layoutId="activeTab"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <item.icon className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={onMenuToggle}
              className="md:hidden p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
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
            <nav className="flex flex-col space-y-2 pt-4 border-t border-white/10 mt-4">
              {[
                { id: 'favorites', icon: Heart, label: 'Favorites' },
                { id: 'watchlist', icon: Bookmark, label: 'Watchlist' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onMenuToggle();
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-white/20' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${50 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </motion.header>

      {/* Expandable Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed top-20 left-0 right-0 z-40 glass-dark border-b border-white/10"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="container mx-auto px-6 py-6">
              <motion.div 
                className="relative max-w-2xl mx-auto group"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="absolute inset-0 gradient-primary rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white/60 group-focus-within:text-white transition-colors" />
                  <input
                    type="text"
                    placeholder="Search for movies, actors, directors, genres..."
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full pl-16 pr-16 py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white text-lg placeholder-white/50 focus:outline-none focus:border-purple-500/50 focus:bg-white/15 transition-all duration-300"
                    autoFocus
                  />
                  {searchQuery && (
                    <motion.button
                      onClick={() => onSearch('')}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  )}
                </div>
                
                {/* Search suggestions or recent searches could go here */}
                {searchQuery && (
                  <motion.div
                    className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-white/60 text-sm">
                      Press Enter to search for "{searchQuery}"
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Quick search tips */}
              <motion.div
                className="flex flex-wrap justify-center gap-2 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror'].map((genre, index) => (
                  <motion.button
                    key={genre}
                    onClick={() => onSearch(genre)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white rounded-full text-sm transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {genre}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay when search is open */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSearch}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;