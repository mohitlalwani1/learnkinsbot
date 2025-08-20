import React from 'react';
import { motion } from 'framer-motion';
import Avatar from './Avatar';

const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start mb-6"
    >
      <div className="flex items-start gap-3 max-w-[75%]">
        <Avatar type="bot" emoji="🤔" isTyping />

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-gray-800/95 border border-gray-700/50 rounded-3xl rounded-bl-lg px-6 py-4 shadow-xl backdrop-blur-md relative"
        >
          {/* Message tail */}
          <div className="absolute top-4 left-0 -translate-x-2 w-4 h-4 bg-gray-800/95 border-l border-t border-gray-700/50 rotate-45"></div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-lg font-medium">I'm thinking of something awesome...</span>
            <div className="flex space-x-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.2
                }}
                className="w-3 h-3 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.4
                }}
                className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;