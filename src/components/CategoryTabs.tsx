import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, Calendar, Play, TrendingUp, Zap } from 'lucide-react';
import { movieService } from '../services/tmdb';
import { Genre } from '../types/movie';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string, genreId?: number) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await movieService.getGenres();
        setGenres(genreList.slice(0, 8));
      } catch (error) {
        console.error('Failed to load genres:', error);
      }
    };

    loadGenres();
  }, []);

  const mainCategories = [
    { 
      id: 'popular', 
      label: 'Popular', 
      icon: Flame, 
      gradient: 'from-orange-500 to-red-500',
      description: 'Most watched movies'
    },
    { 
      id: 'top_rated', 
      label: 'Top Rated', 
      icon: Star, 
      gradient: 'from-yellow-500 to-orange-500',
      description: 'Highest rated films'
    },
    { 
      id: 'upcoming', 
      label: 'Upcoming', 
      icon: Calendar, 
      gradient: 'from-blue-500 to-purple-500',
      description: 'Coming soon'
    },
    { 
      id: 'now_playing', 
      label: 'Now Playing', 
      icon: Play, 
      gradient: 'from-green-500 to-blue-500',
      description: 'In theaters now'
    },
    { 
      id: 'trending', 
      label: 'Trending', 
      icon: TrendingUp, 
      gradient: 'from-pink-500 to-purple-500',
      description: 'Hot right now'
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedGenre(null);
    onCategoryChange(categoryId);
  };

  const handleGenreClick = (genreId: number) => {
    setSelectedGenre(genreId);
    onCategoryChange('genre', genreId);
  };

  return (
    <div className="glass-dark border-b border-white/10 sticky top-20 z-40">
      <div className="container mx-auto px-6 py-6">
        {/* Main Categories */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="h-5 w-5 text-gradient" />
            <h3 className="text-lg font-semibold text-white">Categories</h3>
          </div>
          
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
            {mainCategories.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id && !selectedGenre;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`relative flex items-center space-x-3 px-6 py-4 rounded-2xl whitespace-nowrap font-medium transition-all duration-300 group ${
                    isActive
                      ? 'text-white shadow-2xl'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-2xl`}
                      layoutId="activeCategory"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  <motion.div
                    className="relative z-10 flex items-center space-x-3"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-semibold">{category.label}</div>
                      <div className="text-xs opacity-80">{category.description}</div>
                    </div>
                  </motion.div>

                  {/* Hover glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-2xl opacity-0 blur-xl`}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Genres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-white">Genres</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {genres.map((genre, index) => {
              const isActive = selectedGenre === genre.id;
              
              return (
                <motion.button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      layoutId="activeGenre"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  <span className="relative z-10">{genre.name}</span>
                  
                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full opacity-0"
                    whileHover={{ opacity: 1, x: ['-100%', '100%'] }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-4 right-10 w-20 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-4 left-10 w-16 h-16 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default CategoryTabs;