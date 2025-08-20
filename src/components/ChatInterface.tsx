import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Zap } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import SidePanel from './SidePanel';
import { apiService } from '../services/apiService';
import type { ChatMessage } from '../services/apiService';

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '🎓 Hello! I\'m **LearnerBot**, your advanced AI learning companion powered by GPT-4. I\'m here to help you:\n\n✨ **Learn new concepts** with clear explanations\n🧠 **Solve complex problems** step-by-step\n💡 **Get instant answers** to your questions\n🚀 **Accelerate your learning** journey\n\nWhat would you like to explore today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const callApi = async (message: string): Promise<string> => {
    const response = await apiService.sendMessage(message, conversationHistory);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    return response.message;
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
    
    // Add user message to conversation history
    const newUserMessage: ChatMessage = { role: 'user', content: content.trim() };
    setConversationHistory(prev => [...prev, newUserMessage]);
    
    setIsTyping(true);

    try {
      const botResponse = await callApi(content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Add bot response to conversation history
      const newBotMessage: ChatMessage = { role: 'assistant', content: botResponse };
      setConversationHistory(prev => [...prev, newBotMessage]);
      
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Something went wrong. Please try again. I\'m here to help once you\'re ready!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      // Log the actual error for debugging
      console.error('Chat API Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#121212] text-gray-100">
      {/* Side Panel */}
      <SidePanel 
        isOpen={isSidePanelOpen} 
        onToggle={() => setIsSidePanelOpen(!isSidePanelOpen)} 
      />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/60 border-b border-gray-700/50 p-4 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-7 h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  LearnerBot
                </h1>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-300">Powered by GPT-4</p>
                  <Zap className="w-3 h-3 text-yellow-400" />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-300 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-gray-900/80 relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isTyping && <TypingIndicator />}
          </div>
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatInterface;