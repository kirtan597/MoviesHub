import React from 'react';
import { motion } from 'framer-motion';
import { Film, Search, Heart, Bookmark, Sparkles, Play } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  onReset?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, onReset }) => {
  const type = message?.includes('search') || message?.includes('results') ? 'search' : 'generic';
  const getConfig = () => {
    switch (type) {
      case 'search':
        return {
          icon: Search,
          title: 'No Movies Found',
          description: message || 'Try adjusting your search terms or explore different categories',
          gradient: 'from-blue-500 to-cyan-500',
          suggestions: ['Check your spelling', 'Try broader keywords', 'Browse categories instead']
        };
      case 'favorites':
        return {
          icon: Heart,
          title: 'No Favorites Yet',
          description: message || 'Start building your collection of favorite movies',
          gradient: 'from-pink-500 to-red-500',
          suggestions: ['Browse popular movies', 'Explore different genres', 'Check out trending films']
        };
      case 'watchlist':
        return {
          icon: Bookmark,
          title: 'Empty Watchlist',
          description: message || 'Add movies you want to watch later',
          gradient: 'from-purple-500 to-blue-500',
          suggestions: ['Browse upcoming releases', 'Check top rated movies', 'Explore new genres']
        };
      default:
        return {
          icon: Film,
          title: 'No Content Available',
          description: message || 'No movies to display at the moment',
          gradient: 'from-gray-500 to-gray-600',
          suggestions: ['Refresh the page', 'Try again later', 'Check your connection']
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-32 bg-gradient-to-r ${config.gradient} opacity-5 rounded-full blur-3xl`}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -50, 50, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Main Icon with Animation */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.2,
          type: "spring",
          stiffness: 200
        }}
      >
        <motion.div
          className={`w-24 h-24 bg-gradient-to-r ${config.gradient} rounded-full flex items-center justify-center shadow-2xl`}
          animate={{ 
            boxShadow: [
              `0 0 20px rgba(139, 92, 246, 0.3)`,
              `0 0 40px rgba(139, 92, 246, 0.6)`,
              `0 0 20px rgba(139, 92, 246, 0.3)`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon className="h-12 w-12 text-white" />
        </motion.div>
        
        {/* Floating sparkles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              rotate: 360,
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
          >
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </motion.div>
        ))}
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-3xl font-bold text-gradient mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {config.title}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-white/70 text-lg mb-8 max-w-md leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {config.description}
      </motion.p>

      {/* Suggestions */}
      <motion.div
        className="space-y-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h3 className="text-white font-semibold mb-4">Suggestions:</h3>
        {config.suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-3 text-white/60"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
          >
            <div className={`w-2 h-2 bg-gradient-to-r ${config.gradient} rounded-full`} />
            <span>{suggestion}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Button */}
      <motion.button
        className={`btn-primary bg-gradient-to-r ${config.gradient} px-8 py-4 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset || (() => window.location.reload())}
      >
        <Play className="h-5 w-5" />
        <span>Explore Movies</span>
      </motion.button>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 bg-gradient-to-r ${config.gradient} rounded-full`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;