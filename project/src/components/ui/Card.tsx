import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  gradient = false 
}) => {
  const baseClasses = 'rounded-3xl shadow-xl backdrop-blur-md border border-gray-700/50';
  const backgroundClasses = gradient 
    ? 'bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-purple-900/90'
    : 'bg-gray-800/90';
  const hoverClasses = hover ? 'hover:shadow-2xl hover:scale-105 transition-all duration-300' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseClasses} ${backgroundClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;