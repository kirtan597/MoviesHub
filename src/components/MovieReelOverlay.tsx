import React from 'react';
import { motion } from 'framer-motion';

const MovieReelOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Enhanced Film Strip Left */}
      <motion.div
        className="absolute left-0 top-0 w-20 sm:w-32 h-full"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 15px,
            rgba(255,215,0,0.3) 15px,
            rgba(255,215,0,0.3) 18px,
            transparent 18px,
            transparent 25px,
            rgba(255,255,255,0.1) 25px,
            rgba(255,255,255,0.1) 28px
          )`
        }}
        animate={{ y: [0, -150, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Enhanced Film Strip Right */}
      <motion.div
        className="absolute right-0 top-0 w-20 sm:w-32 h-full"
        style={{
          background: 'linear-gradient(270deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 15px,
            rgba(255,215,0,0.3) 15px,
            rgba(255,215,0,0.3) 18px,
            transparent 18px,
            transparent 25px,
            rgba(255,255,255,0.1) 25px,
            rgba(255,255,255,0.1) 28px
          )`
        }}
        animate={{ y: [0, 150, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Cinematic Film Frames */}
      {[...Array(8)].map((_, i) => {
        const colors = [
          'from-amber-500/20 to-orange-500/20',
          'from-blue-500/20 to-cyan-500/20',
          'from-purple-500/20 to-pink-500/20',
          'from-green-500/20 to-teal-500/20'
        ];
        return (
          <motion.div
            key={i}
            className="absolute w-16 h-12 sm:w-24 sm:h-16 border-2 border-white/20 rounded-lg backdrop-blur-sm"
            style={{
              left: `${15 + (i % 4) * 20}%`,
              top: `${15 + Math.floor(i / 4) * 40}%`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 3, -3, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8
            }}
          >
            <div className={`w-full h-full bg-gradient-to-br ${colors[i % 4]} rounded-md`} />
            <div className="absolute inset-1 border border-white/10 rounded-sm" />
          </motion.div>
        );
      })}

      {/* Multiple Spotlight Effects */}
      <motion.div
        className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.08) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)',
          left: '30%',
          top: '20%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
          x: [0, 50, 0]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, rgba(147,51,234,0.03) 50%, transparent 70%)',
          right: '25%',
          bottom: '30%',
          transform: 'translate(50%, 50%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, -30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

      {/* Random Sparks Text Flow */}
      {[...Array(15)].map((_, i) => {
        const texts = ['KPXHUB', 'MOVIES', 'CINEMA', 'STREAMING', 'ENTERTAINMENT', '4K', 'HD'];
        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute text-white/15 font-bold pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${12 + Math.random() * 20}px`
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, Math.random() * 360]
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          >
            {texts[Math.floor(Math.random() * texts.length)]}
          </motion.div>
        );
      })}

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4
          }}
        />
      ))}
    </div>
  );
};

export default MovieReelOverlay;