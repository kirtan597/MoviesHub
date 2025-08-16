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

          {/* Themed Backdrop */}
          {theme === 'volcano' ? (
            <motion.div
              className="absolute inset-0 backdrop-blur-sm overflow-hidden"
              style={{
                background: 'radial-gradient(circle at 30% 70%, #ff4500 0%, #ff6347 20%, #dc143c 40%, #8b0000 60%, #000000 100%)',
                backgroundSize: '150% 150%'
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              onClick={handleClose}
            >
              {/* Lava Bubbles */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    background: `radial-gradient(circle, #ff4500, #ff6347, transparent)`,
                    width: `${20 + i * 5}px`,
                    height: `${20 + i * 5}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [0, -50, 0],
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="absolute inset-0 backdrop-blur-sm overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
                backgroundSize: '400% 400%'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '100% 100%', '0% 100%', '0% 50%']
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              onClick={handleClose}
            >
              {/* Aurora Particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    background: `linear-gradient(45deg, #4facfe, #00f2fe, #667eea)`,
                    width: `${5 + i * 2}px`,
                    height: `${5 + i * 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    filter: 'blur(1px)'
                  }}
                  animate={{
                    x: [0, 100, -100, 0],
                    y: [0, -100, 100, 0],
                    opacity: [0.2, 1, 0.2],
                    scale: [1, 2, 1]
                  }}
                  transition={{
                    duration: 6 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          )}

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
                ? 'bg-gradient-to-br from-red-900/30 to-orange-900/30 border-orange-500/50' 
                : 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-cyan-400/50'
            }`}
            initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: -180 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Modal Background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background: theme === 'volcano'
                  ? 'radial-gradient(circle at center, #ff4500 0%, #ff6347 50%, #dc143c 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                backgroundSize: '200% 200%'
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <div className="relative p-8 z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  className="flex justify-center mb-4"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                    theme === 'volcano' 
                      ? 'bg-gradient-to-br from-orange-500 to-red-600' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  }`}>
                    {theme === 'volcano' ? '🌋' : '🌌'}
                  </div>
                </motion.div>
                <motion.h2
                  className={`text-3xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent ${
                    theme === 'volcano'
                      ? 'from-orange-400 to-red-400'
                      : 'from-cyan-400 to-purple-400'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {mode === 'login' ? 'Sign In' : 'Sign Up'}
                </motion.h2>
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
                  className={`w-full py-4 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-white relative overflow-hidden ${
                    theme === 'volcano'
                      ? 'bg-gradient-to-r from-orange-500 to-red-600'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-600'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${theme === 'volcano' ? '#ff4500' : '#4facfe'}40`,
                      `0 0 40px ${theme === 'volcano' ? '#ff4500' : '#4facfe'}60`,
                      `0 0 20px ${theme === 'volcano' ? '#ff4500' : '#4facfe'}40`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  <span className="relative z-10">{mode === 'login' ? 'Sign In' : 'Sign Up'}</span>
                </motion.button>
              </form>

              {/* Toggle Mode */}
              <div className="text-center mt-6">
                <p className="text-white/70">
                  {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                  <motion.button
                    onClick={() => {
                      setMode(mode === 'login' ? 'signup' : 'login');
                    }}
                    className={`ml-2 font-semibold transition-colors duration-300 ${
                      theme === 'volcano'
                        ? 'text-orange-400 hover:text-orange-300'
                        : 'text-cyan-400 hover:text-cyan-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </motion.button>
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