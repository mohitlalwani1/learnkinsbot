import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  color?: 'purple' | 'blue' | 'green' | 'yellow';
  showNumbers?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  label,
  color = 'purple',
  showNumbers = true
}) => {
  const percentage = Math.min((current / max) * 100, 100);
  
  const colorClasses = {
    purple: 'from-purple-500 to-pink-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    yellow: 'from-yellow-500 to-orange-500'
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          {showNumbers && (
            <span className="text-sm text-gray-400">{current}/{max}</span>
          )}
        </div>
      )}
      
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full shadow-lg`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;