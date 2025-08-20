import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';
import Avatar from './Avatar';
import Button from './ui/Button';

interface MessageBubbleProps {
  message: Message;
  onOptionClick?: (option: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onOptionClick }) => {
  const isUser = message.type === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        {/* Avatar */}
        <Avatar 
          type={message.type} 
          emoji={message.emoji}
          size="md"
        />

        {/* Message Content */}
        <div className="flex flex-col">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative px-6 py-4 rounded-3xl shadow-xl ${
              isUser 
                ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white rounded-br-lg' 
                : 'bg-gray-800/95 text-gray-100 rounded-bl-lg border border-gray-700/50'
            } backdrop-blur-md`}
          >
            {/* Message tail */}
            <div className={`absolute top-4 w-4 h-4 ${
              isUser 
                ? 'right-0 translate-x-2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500' 
                : 'left-0 -translate-x-2 bg-gray-800/95 border-l border-t border-gray-700/50'
            } rotate-45`}></div>

            {isUser ? (
              <p className="text-lg font-medium leading-relaxed">{message.content}</p>
            ) : (
              <div className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <p className="text-lg leading-relaxed mb-3 last:mb-0">{children}</p>,
                    strong: ({ children }) => <strong className="text-cyan-300 font-bold">{children}</strong>,
                    em: ({ children }) => <em className="text-purple-300">{children}</em>,
                    code: ({ children }) => (
                      <code className="bg-gray-700/60 px-2 py-1 rounded text-cyan-300 font-medium text-base">
                        {children}
                      </code>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}

            {/* Timestamp */}
            <div className={`text-xs mt-3 opacity-75 ${
              isUser ? 'text-blue-100' : 'text-gray-400'
            }`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </motion.div>

          {/* Quick Reply Options */}
          {message.options && message.options.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex flex-wrap gap-2 mt-4 ml-2"
            >
              {message.options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.2 }}
                >
                  <Button
                    onClick={() => onOptionClick?.(option)}
                    variant="secondary"
                    size="sm"
                    className="text-sm bg-gradient-to-r from-gray-700 to-gray-600 hover:from-purple-600 hover:to-pink-600 border border-gray-600 hover:border-purple-500 transition-all duration-300"
                  >
                    {option}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;