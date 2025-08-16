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
    <div className="relative bg-gradient-to-r from-slate-800 via-gray-900 to-slate-800 backdrop-blur-xl border-b border-cyan-400/40 sticky top-20 z-40 overflow-hidden shadow-2xl">
      <div className="container mx-auto px-6 py-8">
        {/* Main Categories */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="h-5 w-5 text-gradient" />
            <h3 className="text-xl font-bold text-emerald-100 drop-shadow-lg">Categories</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mainCategories.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id && !selectedGenre;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="relative group"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                >
                  <div className={`relative p-6 rounded-3xl backdrop-blur-xl border-2 transition-all duration-500 ${
                    isActive
                      ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-400/60 shadow-2xl shadow-emerald-500/20'
                      : 'bg-gradient-to-br from-slate-700/60 to-gray-800/60 border-slate-500/30 hover:border-emerald-400/40 hover:bg-gradient-to-br hover:from-slate-600/70 hover:to-gray-700/70'
                  }`}>
                    
                    {/* Animated border */}
                    <motion.div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${category.gradient} opacity-0 blur-sm`}
                      animate={isActive ? {
                        opacity: [0, 0.3, 0],
                        scale: [1, 1.02, 1]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Icon with glow */}
                    <motion.div 
                      className="relative z-10 mb-3"
                      animate={isActive ? {
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${category.gradient} flex items-center justify-center mb-2 shadow-lg shadow-emerald-500/30`}>
                        <Icon className="h-6 w-6 text-white drop-shadow-lg" />
                      </div>
                    </motion.div>
                    
                    <div className="relative z-10 text-left">
                      <h4 className="font-bold text-white text-sm mb-1 drop-shadow-lg">{category.label}</h4>
                      <p className="text-xs text-emerald-200 drop-shadow">{category.description}</p>
                    </div>
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
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
            <h3 className="text-xl font-bold text-cyan-100 drop-shadow-lg">Genres</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {genres.map((genre, index) => {
              const isActive = selectedGenre === genre.id;
              const gradients = [
                'from-emerald-400 to-teal-500',
                'from-cyan-400 to-blue-500', 
                'from-sky-400 to-indigo-500',
                'from-violet-400 to-purple-500',
                'from-fuchsia-400 to-pink-500',
                'from-rose-400 to-red-500',
                'from-orange-400 to-amber-500',
                'from-lime-400 to-green-500'
              ];
              const gradient = gradients[index % gradients.length];
              
              return (
                <motion.button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className="relative group"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 400 }}
                >
                  <div className={`relative px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
                    isActive
                      ? `bg-gradient-to-r ${gradient} border-white/40 shadow-2xl shadow-cyan-500/30 text-white`
                      : 'bg-gradient-to-r from-slate-700/50 to-gray-800/50 border-slate-400/30 hover:border-cyan-400/50 text-slate-200 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20'
                  }`}>
                    
                    {/* Animated glow */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 blur-lg`}
                      animate={isActive ? {
                        opacity: [0, 0.6, 0],
                        scale: [1, 1.08, 1]
                      } : {}}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    
                    {/* Floating particles */}
                    {isActive && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                    
                    <span className="relative z-10 font-medium text-sm drop-shadow">{genre.name}</span>
                    
                    {/* Wave effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: '-100%', skewX: -15 }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${8 + i * 2}rem`,
              height: `${8 + i * 2}rem`,
              background: `radial-gradient(circle, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.1))`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.15, 0.3, 0.15],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;