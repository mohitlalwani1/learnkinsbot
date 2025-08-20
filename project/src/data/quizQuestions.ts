import { QuizQuestion } from '../types';

export const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: 'ai-basics-1',
    question: 'What does AI stand for?',
    options: ['Artificial Intelligence', 'Amazing Ideas', 'Automatic Internet', 'Advanced Information'],
    correctAnswer: 0,
    explanation: 'AI stands for Artificial Intelligence - it\'s like giving computers a brain to think and learn! 🧠',
    topic: 'AI Basics'
  },
  {
    id: 'space-1',
    question: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Earth', 'Mercury', 'Mars'],
    correctAnswer: 2,
    explanation: 'Mercury is the closest planet to the Sun! It\'s super hot during the day but freezing at night! ☀️',
    topic: 'Space'
  },
  {
    id: 'math-1',
    question: 'What is 15 × 8?',
    options: ['120', '125', '115', '130'],
    correctAnswer: 0,
    explanation: 'Great job! 15 × 8 = 120. Here\'s a trick: 15 × 8 = (10 × 8) + (5 × 8) = 80 + 40 = 120! 🎯',
    topic: 'Math'
  }
];