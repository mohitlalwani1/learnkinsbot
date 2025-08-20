import { Badge } from '../types';

export const availableBadges: Badge[] = [
  {
    id: 'first-chat',
    name: 'First Chat',
    emoji: '🎉',
    description: 'Started your first conversation!',
    earned: false
  },
  {
    id: 'curious-mind',
    name: 'Curious Mind',
    emoji: '🤔',
    description: 'Asked 10 questions',
    earned: false
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    emoji: '🏆',
    description: 'Completed 5 quizzes',
    earned: false
  },
  {
    id: 'streak-warrior',
    name: 'Streak Warrior',
    emoji: '🔥',
    description: 'Maintained a 7-day learning streak',
    earned: false
  },
  {
    id: 'science-explorer',
    name: 'Science Explorer',
    emoji: '🔬',
    description: 'Learned about 10 science topics',
    earned: false
  },
  {
    id: 'math-wizard',
    name: 'Math Wizard',
    emoji: '🧙‍♂️',
    description: 'Solved 20 math problems',
    earned: false
  }
];