import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Settings, Zap, Menu, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Message, UserProgress } from '../types';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import Button from './ui/Button';
import Card from './ui/Card';
import Avatar from './Avatar';
import { botService } from '../services/botService';
import { progressService } from '../services/progressService';

interface ChatInterfaceProps {
  onShowProgress: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onShowProgress }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState<UserProgress>(progressService.getProgress());
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add welcome message
    const welcomeMessage = botService.getWelcomeMessage();
    setMessages([welcomeMessage]);
    
    // Award first chat badge
    const badge = progressService.earnBadge('first-chat');
    if (badge) {
      triggerConfetti();
      setProgress(progressService.getProgress());
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#EC4899', '#06B6D4', '#10B981']
    });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = botService.generateResponse(content, messages);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // Award XP and check for badges
      const newProgress = progressService.addXP(10);
      setProgress(newProgress);

      // Check for milestone badges
      if (messages.length >= 10) {
        const badge = progressService.earnBadge('curious-mind');
        if (badge) {
          triggerConfetti();
          setProgress(progressService.getProgress());
        }
      }
    }, 1500 + Math.random() * 1000);
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-4 left-4 z-50 md:hidden w-12 h-12 bg-gray-800/95 hover:bg-gray-700/95 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm border border-gray-700/50"
      >
        {showSidebar ? <X className="w-6 h-6 text-gray-300" /> : <Menu className="w-6 h-6 text-gray-300" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(showSidebar || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed md:relative z-40 w-80 h-full bg-gray-800/95 backdrop-blur-md border-r border-gray-700/50 shadow-2xl"
          >
            <div className="p-6 h-full overflow-y-auto">
              {/* Profile Section */}
              <Card className="p-6 mb-6 text-center">
                <Avatar type="user" size="lg" />
                <h3 className="text-xl font-bold text-white mt-4 mb-2">Learning Champion!</h3>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Level {progress.level}
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{progress.xp}</div>
                  <div className="text-xs text-gray-400">XP Points</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">{progress.streak}</div>
                  <div className="text-xs text-gray-400">Day Streak</div>
                </Card>
              </div>

              {/* Recent Badges */}
              <Card className="p-4 mb-6">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  Recent Badges
                </h4>
                <div className="flex gap-2">
                  {progress.badges
                    .filter(badge => badge.earned)
                    .slice(-3)
                    .map(badge => (
                      <div key={badge.id} className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center text-lg">
                        {badge.emoji}
                      </div>
                    ))}
                  {progress.badges.filter(badge => badge.earned).length === 0 && (
                    <p className="text-xs text-gray-500">Keep chatting to earn badges! 🎯</p>
                  )}
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={onShowProgress}
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  View Progress
                </Button>
                
                <Button
                  onClick={() => handleSendMessage("Let's do a quiz!")}
                  variant="success"
                  className="w-full"
                >
                  🎯 Quick Quiz
                </Button>
              </div>

              {/* Tips */}
              <Card className="p-4 mt-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30">
                <h4 className="text-sm font-bold text-white mb-2">💡 Learning Tip</h4>
                <p className="text-xs text-gray-300">
                  Ask follow-up questions! The more curious you are, the more you'll learn and grow! 🌱
                </p>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800/95 backdrop-blur-md border-b border-gray-700/50 p-4 shadow-lg">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <Avatar type="bot" emoji="🎓" size="md" />
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  LearnerBot
                </h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Ready to learn! 🚀</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <div className="flex items-center gap-2 bg-purple-600/20 px-3 py-1 rounded-full">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-medium">Level {progress.level}</span>
                </div>
                <div className="flex items-center gap-2 bg-cyan-600/20 px-3 py-1 rounded-full">
                  <span className="text-cyan-400 font-medium">{progress.xp} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 relative"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-xl"
            />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            {messages.map((message) => (
              <MessageBubble 
                key={message.id} 
                message={message} 
                onOptionClick={handleOptionClick}
              />
            ))}
            
            {isTyping && <TypingIndicator />}
          </div>
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default ChatInterface;