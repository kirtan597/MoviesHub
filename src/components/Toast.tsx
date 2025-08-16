import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X, Sparkles } from 'lucide-react';

interface ToastProps {
  isOpen: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ isOpen, type, message, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ 
            scale: [0, 1.5, 1.2, 1], 
            rotate: [0, 360, 0], 
            opacity: 1 
          }}
          exit={{ 
            scale: [1, 0.8, 0], 
            opacity: [1, 0.5, 0],
            y: -50
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut",
            times: [0, 0.3, 0.7, 1]
          }}
        >
          {/* Explosion Particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: type === 'success' 
                  ? `linear-gradient(45deg, #10b981, #34d399, #6ee7b7)` 
                  : `linear-gradient(45deg, #ef4444, #f87171, #fca5a5)`,
                left: '50%',
                top: '50%'
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.5, 0],
                x: [0, Math.cos(i * 30 * Math.PI / 180) * 100],
                y: [0, Math.sin(i * 30 * Math.PI / 180) * 100],
                opacity: [1, 0.8, 0]
              }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Main Toast */}
          <motion.div
            className={`relative p-6 rounded-3xl shadow-2xl backdrop-blur-xl border-2 min-w-[300px] overflow-hidden ${
              type === 'success' 
                ? 'bg-gradient-to-br from-green-400/30 to-emerald-600/30 border-green-400/60' 
                : 'bg-gradient-to-br from-red-400/30 to-rose-600/30 border-red-400/60'
            }`}
            animate={{
              boxShadow: [
                `0 0 20px ${type === 'success' ? '#10b981' : '#ef4444'}40`,
                `0 0 40px ${type === 'success' ? '#10b981' : '#ef4444'}80`,
                `0 0 20px ${type === 'success' ? '#10b981' : '#ef4444'}40`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: type === 'success'
                  ? 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)'
                  : 'linear-gradient(135deg, #ef4444 0%, #f87171 50%, #fca5a5 100%)',
                backgroundSize: '300% 300%'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Sparkle Effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + (i % 3) * 20}%`
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                <Sparkles className={`h-4 w-4 ${type === 'success' ? 'text-green-300' : 'text-red-300'}`} />
              </motion.div>
            ))}

            <div className="flex items-center space-x-4 relative z-10">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {type === 'success' ? (
                  <CheckCircle className="h-8 w-8 text-green-300" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-300" />
                )}
              </motion.div>
              
              <div className="flex-1">
                <motion.p 
                  className="font-bold text-white text-lg"
                  animate={{
                    textShadow: [
                      `0 0 10px ${type === 'success' ? '#10b981' : '#ef4444'}`,
                      `0 0 20px ${type === 'success' ? '#10b981' : '#ef4444'}`,
                      `0 0 10px ${type === 'success' ? '#10b981' : '#ef4444'}`
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {message}
                </motion.p>
              </div>
              
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors relative z-20"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5 text-white" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;