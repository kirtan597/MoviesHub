import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onNavigateHome?: () => void;
  onAuthSuccess?: (userData: {name: string, email: string}, isSignup: boolean) => void;
  onError?: (message: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login', onNavigateHome, onAuthSuccess, onError }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState<'volcano' | 'aurora'>('volcano');
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('kpxhub-form-data');
    return saved ? JSON.parse(saved) : { name: '', email: '', password: '' };
  });
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('kpxhub-registered-users');
    return saved ? JSON.parse(saved) : [];
  });
  
  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || (mode === 'signup' && !formData.name)) {
      onError?.('Please fill in all fields');
      return;
    }
    
    if (mode === 'signup') {
      if (registeredUsers.find((user: any) => user.email === formData.email)) {
        onError?.('User already exists. Please sign in.');
        return;
      }
      
      const newUser = { name: formData.name, email: formData.email, password: formData.password };
      const updatedUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('kpxhub-registered-users', JSON.stringify(updatedUsers));
      
      setTimeout(() => {
        setMode('login');
        onAuthSuccess?.({ name: formData.name, email: formData.email }, true);
      }, 500);
    } else {
      if (registeredUsers.length === 0 || !registeredUsers.find((u: any) => u.email === formData.email)) {
        onError?.('🚫 Trying to sign in without signing up?\nPlease create an account first to unlock the magic of KPXHub ✨');
        return;
      }
      
      const user = registeredUsers.find((u: any) => u.email === formData.email && u.password === formData.password);
      if (!user) {
        onError?.('😕 Sign-in failed. Check your credentials or sign up if you haven\'t yet.');
        return;
      }
      
      setTimeout(() => {
        onAuthSuccess?.({ name: user.name, email: user.email }, false);
        localStorage.removeItem('kpxhub-form-data');
        onClose();
      }, 500);
    }
  };
  
  const handleClose = () => {
    onClose();
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    localStorage.setItem('kpxhub-form-data', JSON.stringify(newData));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Theme Toggle */}
          <motion.button
            onClick={() => setTheme(theme === 'volcano' ? 'aurora' : 'volcano')}
            className="absolute top-6 left-6 z-50 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-white font-medium hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === 'volcano' ? '🌋 Volcano' : '🌌 Aurora'}
          </motion.button>

          {/* Simplified Backdrop */}
          <motion.div
            className="absolute inset-0 backdrop-blur-sm"
            style={{
              background: theme === 'volcano'
                ? 'radial-gradient(circle at 50% 50%, #ff4500 0%, #dc143c 50%, #000000 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          />

          {/* Close Button */}
          <motion.button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Modal */}
          <motion.div
            className={`relative w-full max-w-md backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border-2 ${
              theme === 'volcano' 
                ? 'bg-red-900/40 border-orange-500/50' 
                : 'bg-purple-900/40 border-cyan-400/50'
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >

            <div className="relative p-8 z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                    theme === 'volcano' 
                      ? 'bg-gradient-to-br from-orange-500 to-red-600' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  }`}>
                    {theme === 'volcano' ? '🌋' : '🌌'}
                  </div>
                </div>
                <h2 className={`text-3xl font-bold mb-2 ${
                  theme === 'volcano' ? 'text-orange-400' : 'text-cyan-400'
                }`}>
                  {mode === 'login' ? 'Sign In' : 'Sign Up'}
                </h2>
                <p className="text-white/80">
                  {mode === 'login' ? 'Already have an account? Sign in below.' : 'Sign up to begin your cinematic journey.'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border-2 rounded-2xl text-white placeholder-white/60 focus:outline-none transition-all duration-300 ${
                          theme === 'volcano'
                            ? 'border-orange-500/30 focus:border-orange-400 focus:bg-orange-500/20'
                            : 'border-cyan-500/30 focus:border-cyan-400 focus:bg-cyan-500/20'
                        }`}
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border-2 rounded-2xl text-white placeholder-white/60 focus:outline-none transition-all duration-300 ${
                        theme === 'volcano'
                          ? 'border-orange-500/30 focus:border-orange-400 focus:bg-orange-500/20'
                          : 'border-cyan-500/30 focus:border-cyan-400 focus:bg-cyan-500/20'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-white/80 text-sm font-medium">Password</label>
                    {mode === 'login' && (
                      <button type="button" className={`text-sm transition-colors ${
                        theme === 'volcano'
                          ? 'text-orange-400 hover:text-orange-300'
                          : 'text-cyan-400 hover:text-cyan-300'
                      }`}>
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-xl border-2 rounded-2xl text-white placeholder-white/60 focus:outline-none transition-all duration-300 ${
                        theme === 'volcano'
                          ? 'border-orange-500/30 focus:border-orange-400 focus:bg-orange-500/20'
                          : 'border-cyan-500/30 focus:border-cyan-400 focus:bg-cyan-500/20'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {mode === 'login' && (
                  <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center">
                      <input type="checkbox" className={`w-4 h-4 rounded focus:ring-2 ${
                        theme === 'volcano'
                          ? 'text-orange-500 border-orange-300 focus:ring-orange-500'
                          : 'text-cyan-500 border-cyan-300 focus:ring-cyan-500'
                      }`} />
                      <span className="ml-2 text-sm text-white/70">Remember me</span>
                    </label>
                  </div>
                )}
                
                <motion.button
                  type="submit"
                  className={`w-full py-4 font-semibold rounded-2xl text-white transition-all duration-200 ${
                    theme === 'volcano'
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                >
                  {mode === 'login' ? 'Sign In' : 'Sign Up'}
                </motion.button>
              </form>

              {/* Toggle Mode */}
              <div className="text-center mt-6">
                <p className="text-white/70">
                  {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => {
                      setMode(mode === 'login' ? 'signup' : 'login');
                    }}
                    className={`ml-2 font-semibold transition-colors duration-200 ${
                      theme === 'volcano'
                        ? 'text-orange-400 hover:text-orange-300'
                        : 'text-cyan-400 hover:text-cyan-300'
                    }`}
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;