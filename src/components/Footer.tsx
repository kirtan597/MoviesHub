import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="relative mt-20 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
        animate={{
          background: [
            "linear-gradient(135deg, rgb(15, 23, 42), rgb(17, 24, 39), rgb(30, 41, 59))",
            "linear-gradient(135deg, rgb(17, 24, 39), rgb(30, 41, 59), rgb(15, 23, 42))",
            "linear-gradient(135deg, rgb(30, 41, 59), rgb(15, 23, 42), rgb(17, 24, 39))"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      {/* Animated Border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"
        animate={{
          background: [
            "linear-gradient(90deg, rgb(251, 146, 60), rgb(236, 72, 153), rgb(147, 51, 234))",
            "linear-gradient(90deg, rgb(236, 72, 153), rgb(147, 51, 234), rgb(251, 146, 60))",
            "linear-gradient(90deg, rgb(147, 51, 234), rgb(251, 146, 60), rgb(236, 72, 153))"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Floating Orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-2xl opacity-20"
          style={{
            width: `${12 + i * 4}rem`,
            height: `${12 + i * 4}rem`,
            background: `radial-gradient(circle, ${['rgb(251, 146, 60)', 'rgb(236, 72, 153)', 'rgb(147, 51, 234)', 'rgb(6, 182, 212)'][i]}, transparent)`,
            left: `${10 + i * 20}%`,
            top: `${20 + i * 15}%`
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5
          }}
        />
      ))}
      <div className="relative container mx-auto px-6 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.h3 
              className="text-3xl font-black text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text mb-6 drop-shadow-2xl"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                textShadow: [
                  "0 0 20px rgba(251, 146, 60, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)",
                  "0 0 30px rgba(236, 72, 153, 0.6), 0 0 50px rgba(147, 51, 234, 0.4)",
                  "0 0 20px rgba(251, 146, 60, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              KPXHub
            </motion.h3>
            <motion.p 
              className="text-slate-200 mb-8 leading-relaxed drop-shadow-lg font-medium text-lg"
              animate={{
                color: [
                  "rgb(226, 232, 240)",
                  "rgb(203, 213, 225)",
                  "rgb(226, 232, 240)"
                ],
                textShadow: [
                  "0 2px 4px rgba(0, 0, 0, 0.5)",
                  "0 4px 8px rgba(0, 0, 0, 0.6)",
                  "0 2px 4px rgba(0, 0, 0, 0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Revolutionizing entertainment with next-generation streaming technology, 
              immersive visual experiences, and AI-powered content discovery.
            </motion.p>
            <div className="flex space-x-4">
              {[
                { Icon: Github, url: "https://github.com/kirtan597" },
                { Icon: Linkedin, url: "https://www.linkedin.com/in/kirtan-panchal-309760320/" },
                { Icon: Instagram, url: "https://www.instagram.com/kirtannn_18/" },
                { Icon: Mail, url: "https://mail.google.com/mail/?view=cm&fs=1&to=kirtan.2082006@gmail.com" }
              ].map(({ Icon, url }, index) => (
                <motion.a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-pink-500/20 hover:from-orange-500/40 hover:to-pink-500/40 rounded-2xl flex items-center justify-center text-orange-300 hover:text-white transition-all duration-300 border border-orange-400/30 hover:border-orange-400/60 shadow-lg hover:shadow-orange-500/30"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4 
              className="text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text mb-6 drop-shadow-lg"
              animate={{
                textShadow: [
                  "0 0 10px rgba(6, 182, 212, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.6)",
                  "0 0 10px rgba(6, 182, 212, 0.5)"
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Quick Navigation
            </motion.h4>
            <ul className="space-y-3">
              {['Explore Movies', 'Premium Content', 'Trending Now', 'My Collection', 'Watch Later'].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 6, scale: 1.05 }}>
                  <motion.a 
                    href="#" 
                    className="relative text-slate-300 hover:text-cyan-300 transition-all duration-300 drop-shadow font-medium text-sm flex items-center space-x-2 group"
                    whileHover={{
                      textShadow: "0 0 8px rgba(6, 182, 212, 0.6)"
                    }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span>{link}</span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <motion.h4 
              className="text-xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text mb-6 drop-shadow-lg"
              animate={{
                textShadow: [
                  "0 0 10px rgba(16, 185, 129, 0.5)",
                  "0 0 20px rgba(20, 184, 166, 0.6)",
                  "0 0 10px rgba(16, 185, 129, 0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Support Hub
            </motion.h4>
            <ul className="space-y-3">
              {['24/7 Help Center', 'Live Chat Support', 'Privacy & Security', 'Terms & Conditions', 'Community Forum'].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 6, scale: 1.05 }}>
                  <motion.a 
                    href="#" 
                    className="relative text-slate-300 hover:text-emerald-300 transition-all duration-300 drop-shadow font-medium text-sm flex items-center space-x-2 group"
                    whileHover={{
                      textShadow: "0 0 8px rgba(16, 185, 129, 0.6)"
                    }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                    <span>{link}</span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="relative border-t border-gradient-to-r from-orange-500/30 via-pink-500/30 to-purple-500/30 mt-12 pt-8"
          style={{
            borderImage: "linear-gradient(90deg, rgba(251, 146, 60, 0.3), rgba(236, 72, 153, 0.3), rgba(147, 51, 234, 0.3)) 1"
          }}
        >
          {/* Animated Border */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 opacity-0"
            animate={{
              opacity: [0, 0.8, 0],
              background: [
                "linear-gradient(90deg, rgb(251, 146, 60), rgb(236, 72, 153), rgb(147, 51, 234))",
                "linear-gradient(90deg, rgb(236, 72, 153), rgb(147, 51, 234), rgb(251, 146, 60))",
                "linear-gradient(90deg, rgb(147, 51, 234), rgb(251, 146, 60), rgb(236, 72, 153))"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-slate-300 text-sm drop-shadow-lg font-medium"
              animate={{
                textShadow: [
                  "0 0 5px rgba(251, 146, 60, 0.3)",
                  "0 0 10px rgba(236, 72, 153, 0.4)",
                  "0 0 5px rgba(251, 146, 60, 0.3)"
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              © 2024 KPXHub. Pioneering the future of entertainment.
            </motion.p>
            
            <motion.div 
              className="flex items-center space-x-2 text-slate-300 text-sm mt-4 md:mt-0 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              <span className="drop-shadow">Crafted with</span>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-5 h-5 text-red-400 mx-1" fill="currentColor" />
              </motion.div>
              <span className="drop-shadow">by KPXHub Innovation Team</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;