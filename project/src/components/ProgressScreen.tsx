import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Zap, Target, Calendar } from 'lucide-react';
import { UserProgress } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import Badge from './ui/Badge';
import ProgressBar from './ProgressBar';

interface ProgressScreenProps {
  progress: UserProgress;
  onBack: () => void;
}

const ProgressScreen: React.FC<ProgressScreenProps> = ({ progress, onBack }) => {
  const xpToNextLevel = (progress.level * 100) - progress.xp;
  const earnedBadges = progress.badges.filter(badge => badge.earned);
  const accuracy = progress.totalQuestions > 0 
    ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Chat
          </Button>
          
          <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Your Learning Journey 🚀
          </h1>
          
          <div className="w-24" /> {/* Spacer */}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Level & XP Card */}
            <Card className="p-8" gradient>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Level {progress.level}</h2>
                  <p className="text-gray-300">Keep learning to level up! 🌟</p>
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <ProgressBar
                current={progress.xp % 100}
                max={100}
                label={`XP Progress (${xpToNextLevel} XP to next level)`}
                color="yellow"
              />
            </Card>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{progress.xp}</h3>
                <p className="text-gray-300">Total XP Earned</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{accuracy}%</h3>
                <p className="text-gray-300">Quiz Accuracy</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{progress.streak}</h3>
                <p className="text-gray-300">Day Streak</p>
              </Card>
            </div>

            {/* Detailed Stats */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Learning Stats 📊</h3>
              <div className="space-y-4">
                <ProgressBar
                  current={progress.correctAnswers}
                  max={progress.totalQuestions || 1}
                  label="Questions Answered Correctly"
                  color="green"
                />
                <ProgressBar
                  current={earnedBadges.length}
                  max={progress.badges.length}
                  label="Badges Earned"
                  color="purple"
                />
                <ProgressBar
                  current={progress.streak}
                  max={30}
                  label="Learning Streak (Goal: 30 days)"
                  color="blue"
                />
              </div>
            </Card>
          </div>

          {/* Badges Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Your Badges
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {progress.badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge
                      emoji={badge.emoji}
                      name={badge.name}
                      description={badge.description}
                      earned={badge.earned}
                      size="sm"
                    />
                  </motion.div>
                ))}
              </div>
              
              {earnedBadges.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No badges yet! 🎯</p>
                  <p className="text-sm text-gray-500">
                    Keep chatting and learning to earn your first badge!
                  </p>
                </div>
              )}
            </Card>

            {/* Motivational Card */}
            <Card className="p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
              <h3 className="text-lg font-bold text-white mb-3">🎉 Keep Going!</h3>
              <p className="text-gray-300 text-sm mb-4">
                You're doing amazing! Every question you ask and every topic you explore 
                makes you smarter and more curious about the world.
              </p>
              <div className="text-xs text-gray-400">
                💡 Tip: Try asking me about different subjects to earn more badges!
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen;