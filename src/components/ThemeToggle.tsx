import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('kpxhub-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', isDark);
    document.documentElement.classList.toggle('light-mode', !isDark);
    document.body.classList.toggle('light-mode', !isDark);
    localStorage.setItem('kpxhub-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-3 rounded-full glass hover:scale-105 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="relative w-6 h-6"
        animate={{ rotate: isDark ? 0 : 360 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ 
            opacity: isDark ? 1 : 0, 
            scale: isDark ? 1 : 0.3,
            rotate: isDark ? 0 : -90
          }}
          transition={{ duration: 0.5 }}
        >
          <Moon className="w-6 h-6 text-blue-400" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ 
            opacity: isDark ? 0 : 1, 
            scale: isDark ? 0.3 : 1,
            rotate: isDark ? 90 : 0
          }}
          transition={{ duration: 0.5 }}
        >
          <Sun className="w-6 h-6 text-yellow-400" />
        </motion.div>
      </motion.div>
      
      {/* Enhanced Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDark 
            ? '0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)' 
            : '0 0 30px rgba(251, 191, 36, 0.4), 0 0 60px rgba(251, 191, 36, 0.2)'
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Background transition */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)'
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;