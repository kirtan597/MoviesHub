import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, X } from 'lucide-react';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
  };
  onSignOut: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose, user, onSignOut }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            className="relative w-80 bg-white/95 dark-mode:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, x: 50 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.9, opacity: 0, x: 50 }}
            transition={{ duration: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark-mode:text-white">Account</h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-gray-100 dark-mode:bg-gray-800 hover:bg-gray-200 dark-mode:hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark-mode:text-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <motion.button
                  className="w-full flex items-center space-x-3 p-4 bg-blue-50 dark-mode:bg-blue-900/30 rounded-2xl text-blue-600 dark-mode:text-blue-400 hover:bg-blue-100 dark-mode:hover:bg-blue-900/50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <User className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Profile</div>
                    <div className="text-sm opacity-70">{user.name}</div>
                  </div>
                </motion.button>



                <motion.button
                  onClick={onSignOut}
                  className="w-full flex items-center space-x-3 p-4 bg-red-50 dark-mode:bg-red-900/30 rounded-2xl text-red-600 dark-mode:text-red-400 hover:bg-red-100 dark-mode:hover:bg-red-900/50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Sign Out</div>
                    <div className="text-sm opacity-70">Logout from account</div>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfile;