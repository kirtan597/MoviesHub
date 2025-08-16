import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Star, Zap, X } from 'lucide-react';

interface AuthPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp?: () => void;
  feature: string;
  onNavigateHome?: () => void;
}

const AuthPrompt: React.FC<AuthPromptProps> = ({ isOpen, onClose, onSignUp, feature, onNavigateHome }) => {
  const handleClose = () => {
    onClose();
    if (onNavigateHome) {
      onNavigateHome();
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {/* Live Gradient Backdrop */}
          <motion.div
            className="absolute inset-0 backdrop-blur-sm cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #00d4aa 0%, #00a8cc 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)',
              backgroundSize: '300% 300%'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '100% 100%', '0% 100%', '0% 50%'],
              opacity: 0.9
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClose();
            }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg bg-white/95 dark-mode:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClose();
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 dark-mode:bg-gray-800 dark-mode:hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 dark-mode:text-gray-300 dark-mode:hover:text-white transition-all duration-300 z-50 shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              type="button"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="relative p-8 text-center z-10">
              {/* Icon */}
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(251, 146, 60, 0.3)",
                    "0 0 40px rgba(236, 72, 153, 0.4)",
                    "0 0 20px rgba(251, 146, 60, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-10 h-10 text-white" />
              </motion.div>

              {/* Title */}
              <motion.h2
                className="text-3xl font-bold text-gray-900 dark-mode:text-white mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
              >
                Unlock Premium Features
              </motion.h2>

              {/* Message */}
              <p className="text-gray-600 dark-mode:text-gray-300 text-lg mb-8 leading-relaxed">
                To access <span className="text-blue-600 dark-mode:text-blue-400 font-semibold">{feature}</span> and unlock all premium features, 
                please sign up or register first.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                {[
                  { icon: Star, text: "Unlimited movie access", color: "from-yellow-400 to-orange-500" },
                  { icon: Zap, text: "Premium streaming quality", color: "from-purple-400 to-pink-500" },
                  { icon: Lock, text: "Exclusive content library", color: "from-emerald-400 to-cyan-500" }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark-mode:bg-gray-800 rounded-xl border border-gray-200 dark-mode:border-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${benefit.color} rounded-lg flex items-center justify-center`}>
                      <benefit.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 dark-mode:text-gray-200 font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3">
                <motion.button
                  onClick={() => {
                    handleClose();
                    if (onSignUp) {
                      onSignUp();
                    }
                  }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.1 }}
                >
                  Sign Up Now - It's Free!
                </motion.button>

                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClose();
                  }}
                  className="w-full py-3 text-gray-500 dark-mode:text-gray-400 hover:text-gray-700 dark-mode:hover:text-gray-200 font-medium transition-colors duration-300"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.1 }}
                  type="button"
                >
                  Maybe Later
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthPrompt;