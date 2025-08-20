import React from 'react';
import { Bot, BookOpen, Zap, Target, X, Menu, Sparkles, Brain, Rocket } from 'lucide-react';

interface SidePanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 md:hidden w-12 h-12 bg-gray-800/95 hover:bg-gray-700/95 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm border border-gray-700/50"
      >
        {isOpen ? <X className="w-6 h-6 text-gray-300" /> : <Menu className="w-6 h-6 text-gray-300" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={onToggle}
        />
      )}

      {/* Side Panel */}
      <div className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed md:relative md:translate-x-0 z-40 h-full w-80 bg-gradient-to-b from-gray-900/98 via-gray-800/98 to-gray-900/98 border-r border-gray-700/60 backdrop-blur-md transition-transform duration-300 ease-in-out shadow-2xl`}>
        
        <div className="p-6 h-full overflow-y-auto">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative w-14 h-14 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-xl">
              <Bot className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                LearnerBot
              </h1>
              <p className="text-sm text-gray-300 font-medium">Powered by GPT-4</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-200 mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-400" />
              About LearnerBot
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your advanced AI learning companion powered by GPT-4. I'm designed to help you master complex concepts, 
              solve challenging problems, and accelerate your learning journey across any subject.
            </p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-md font-bold text-gray-200 mb-4 flex items-center">
              <Rocket className="w-4 h-4 mr-2 text-blue-400" />
              Key Features
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-sm font-medium">Comprehensive Learning Support</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-sm font-medium">Lightning-Fast Responses</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                <div className="w-10 h-10 bg-cyan-600/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-sm font-medium">Personalized Learning</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-700/40 rounded-xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-gray-200 mb-3 flex items-center">
              💡 <span className="ml-2">Pro Learning Tips</span>
            </h3>
            <ul className="text-xs text-gray-300 space-y-2">
              <li>• Be specific in your questions</li>
              <li>• Ask for examples and practice problems</li>
              <li>• Request step-by-step explanations</li>
              <li>• Don't hesitate to ask follow-up questions</li>
            </ul>
          </div>

          {/* Status */}
          <div className="mt-8 pt-6 border-t border-gray-700/60">
            <div className="flex items-center justify-between text-sm bg-gray-800/30 p-3 rounded-lg">
              <span className="text-gray-400">Status</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-green-400 font-medium">Online & Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanel;