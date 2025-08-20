import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { mockAuth } from '../services/mockAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onNavigateHome?: () => void;
  onAuthSuccess?: (userData: {name: string, email: string}, isSignup: boolean) => void;
  onError?: (message: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login', onNavigateHome, onAuthSuccess, onError }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'reset'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState<'volcano' | 'aurora'>('volcano');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    resetToken: ''
  });
  
  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (loading) return;
    
    setLoading(true);
    
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      if (mode === 'signup') {
        const result = await mockAuth.signUp(formData.name, formData.email, formData.password);
        if (result.success) {
          onAuthSuccess?.(result.user!, true);
          setMode('login');
          setFormData({ name: '', email: formData.email, password: '', confirmPassword: '', resetToken: '' });
        } else {
          alert(`❌ ${result.message}`);
          onError?.(result.message);
        }
      } else if (mode === 'login') {
        const result = await mockAuth.signIn(formData.email, formData.password);
        if (result.success && result.user) {
          onAuthSuccess?.(result.user, false);
          onClose(); // Close modal after successful login
        } else {
          alert(`🚫 ${result.message}`);
          onError?.(result.message);
        }
      } else if (mode === 'forgot') {
        const result = await mockAuth.forgotPassword(formData.email);
        if (result.success) {
          alert(`📧 Reset instructions sent! For demo: Check console for token`);
          setMode('reset');
        } else {
          alert(`📧 ${result.message}`);
          onError?.(result.message);
        }
      } else if (mode === 'reset') {
        const result = await mockAuth.resetPassword(formData.resetToken, formData.password);
        if (result.success) {
          alert(`✅ Password reset successfully!`);
          setMode('login');
          setFormData({ name: '', email: '', password: '', confirmPassword: '', resetToken: '' });
        } else {
          alert(`🔑 ${result.message}`);
          onError?.(result.message);
        }
      }
    } catch (error) {
      alert('⚠️ Something went wrong. Please try again.');
      onError?.('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleClose = () => {
    onClose();
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            className={`relative w-full max-w-md mx-2 sm:mx-4 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border-2 modal-content ${
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

            <div className="relative p-6 sm:p-8 z-10">
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
                  {mode === 'login' ? 'Sign In' : 
                   mode === 'signup' ? 'Sign Up' :
                   mode === 'forgot' ? 'Forgot Password' : 'Reset Password'}
                </h2>
                <p className="text-white/80">
                  {mode === 'login' ? 'Already have an account? Sign in below.' :
                   mode === 'signup' ? 'Sign up to begin your cinematic journey.' :
                   mode === 'forgot' ? 'Enter your email to reset password.' :
                   'Enter reset token and new password.'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Back Button for forgot/reset modes */}
                {(mode === 'forgot' || mode === 'reset') && (
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Sign In</span>
                  </button>
                )}

                {/* Name Field - Signup only */}
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

                {/* Email Field - All modes except reset */}
                {mode !== 'reset' && (
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
                )}

                {/* Reset Token Field - Reset mode only */}
                {mode === 'reset' && (
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Reset Token</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                      <input
                        type="text"
                        placeholder="Enter reset token from email"
                        value={formData.resetToken}
                        onChange={(e) => handleInputChange('resetToken', e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border-2 rounded-2xl text-white placeholder-white/60 focus:outline-none transition-all duration-300 ${
                          theme === 'volcano'
                            ? 'border-orange-500/30 focus:border-orange-400 focus:bg-orange-500/20'
                            : 'border-cyan-500/30 focus:border-cyan-400 focus:bg-cyan-500/20'
                        }`}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Password Field - All modes except forgot */}
                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-white/80 text-sm font-medium">
                        {mode === 'reset' ? 'New Password' : 'Password'}
                      </label>
                      {mode === 'login' && (
                        <button 
                          type="button" 
                          onClick={() => setMode('forgot')}
                          className={`text-sm transition-colors ${
                            theme === 'volcano'
                              ? 'text-orange-400 hover:text-orange-300'
                              : 'text-cyan-400 hover:text-cyan-300'
                          }`}
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={mode === 'reset' ? 'Enter new password' : 'Enter your password'}
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
                )}

                {/* Remember Me - Login only */}
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
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 sm:py-4 font-semibold rounded-2xl text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 text-sm sm:text-base touch-target ${
                    theme === 'volcano'
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    mode === 'login' ? 'Sign In' :
                    mode === 'signup' ? 'Sign Up' :
                    mode === 'forgot' ? 'Send Reset Link' :
                    'Reset Password'
                  )}
                </button>
              </form>

              {/* Toggle Mode */}
              {(mode === 'login' || mode === 'signup') && (
                <div className="text-center mt-6">
                  <p className="text-white/70">
                    {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                    <button
                      type="button"
                      onClick={() => {
                        setMode(mode === 'login' ? 'signup' : 'login');
                        setFormData({ name: '', email: '', password: '', confirmPassword: '', resetToken: '' });
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
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;