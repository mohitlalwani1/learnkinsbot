import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  emoji: string;
  name: string;
  description: string;
  earned: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Badge: React.FC<BadgeProps> = ({ 
  emoji, 
  name, 
  description, 
  earned, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-20 h-20 text-3xl',
    lg: 'w-24 h-24 text-4xl'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`relative ${earned ? 'opacity-100' : 'opacity-40'}`}
    >
      <div className={`${sizeClasses[size]} rounded-2xl flex items-center justify-center ${
        earned 
          ? 'bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 shadow-lg shadow-yellow-400/30' 
          : 'bg-gray-700 border-2 border-dashed border-gray-600'
      }`}>
        <span className="filter drop-shadow-lg">{emoji}</span>
      </div>
      
      {earned && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      )}
      
      <div className="mt-2 text-center">
        <p className={`text-sm font-bold ${earned ? 'text-white' : 'text-gray-500'}`}>
          {name}
        </p>
        <p className={`text-xs ${earned ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default Badge;