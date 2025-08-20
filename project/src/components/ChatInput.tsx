import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff, Sparkles } from 'lucide-react';
import Button from './ui/Button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Voice input (simplified for demo)
  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, you'd implement Web Speech API here
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setMessage(prev => prev + " (Voice input would work here!)");
      }, 2000);
    }
  };

  return (
    <div className="border-t border-gray-700/60 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md shadow-2xl">
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex items-end space-x-4 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={disabled ? "I'm thinking of something awesome to tell you... 🤔" : "Ask me anything! I love curious minds! 🌟"}
              disabled={disabled}
              rows={1}
              className="w-full px-6 py-4 bg-gray-800/95 border-2 border-gray-600/60 rounded-3xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-400/60 resize-none min-h-[60px] max-h-40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm hover:bg-gray-800 focus:bg-gray-800 text-lg"
            />
            
            {message.trim() && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-3 right-16 text-xs text-gray-500 bg-gray-900/80 px-3 py-1 rounded-full"
              >
                Press Enter to send ✨
              </motion.div>
            )}
          </div>

          {/* Voice Input Button */}
          <motion.button
            type="button"
            onClick={toggleVoiceInput}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
              isListening 
                ? 'bg-gradient-to-br from-red-500 to-pink-500 animate-pulse' 
                : 'bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
            }`}
          >
            {isListening ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </motion.button>

          {/* Send Button */}
          <motion.button
            type="submit"
            disabled={!message.trim() || disabled}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-400 hover:via-pink-400 hover:to-cyan-400 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-purple-500/25 disabled:hover:shadow-none relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
            />
            
            <div className="relative z-10 flex items-center justify-center">
              <Send className="w-6 h-6" />
              {!disabled && (
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                </motion.div>
              )}
            </div>
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;