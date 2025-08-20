import React from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  type: 'user' | 'bot';
  size?: 'sm' | 'md' | 'lg';
  emoji?: string;
  isTyping?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ 
  type, 
  size = 'md', 
  emoji,
  isTyping = false 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl'
  };

  const userEmojis = ['😊', '🤓', '😎', '🌟', '🚀'];
  const botEmojis = ['🤖', '🎓', '🧠', '✨', '🔬'];
  
  const defaultEmoji = type === 'user' 
    ? userEmojis[Math.floor(Math.random() * userEmojis.length)]
    : botEmojis[Math.floor(Math.random() * botEmojis.length)];

  const displayEmoji = emoji || defaultEmoji;

  return (
    <motion.div
      animate={isTyping ? { 
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      } : {}}
      transition={isTyping ? { 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center shadow-lg ${
        type === 'user' 
          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500' 
          : 'bg-gradient-to-br from-green-400 via-cyan-400 to-blue-500'
      }`}
    >
      <span className="filter drop-shadow-sm">{displayEmoji}</span>
    </motion.div>
  );
};

export default Avatar;