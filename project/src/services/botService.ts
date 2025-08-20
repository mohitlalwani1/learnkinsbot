import { Message } from '../types';
import { sampleQuizQuestions } from '../data/quizQuestions';

class BotService {
  private questionPatterns = [
    /what is|what are|tell me about|explain/i,
    /how does|how do|how can/i,
    /why is|why do|why does/i,
    /when did|when does|when is/i,
    /where is|where does|where can/i
  ];

  private topics = [
    { name: 'Science', emoji: '🔬', keywords: ['science', 'chemistry', 'physics', 'biology', 'experiment'] },
    { name: 'Math', emoji: '🧮', keywords: ['math', 'mathematics', 'number', 'calculate', 'equation'] },
    { name: 'Space', emoji: '🚀', keywords: ['space', 'planet', 'star', 'galaxy', 'astronaut'] },
    { name: 'Animals', emoji: '🦁', keywords: ['animal', 'dog', 'cat', 'lion', 'elephant'] },
    { name: 'Technology', emoji: '💻', keywords: ['computer', 'robot', 'ai', 'technology', 'internet'] },
    { name: 'History', emoji: '🏛️', keywords: ['history', 'ancient', 'war', 'king', 'queen'] }
  ];

  generateResponse(userMessage: string, conversationHistory: Message[]): Message {
    const message = userMessage.toLowerCase();
    const topic = this.detectTopic(message);
    
    // Generate contextual responses based on the topic and message
    if (message.includes('hello') || message.includes('hi')) {
      return this.createBotMessage(
        `Hey there, awesome learner! 👋 I'm so excited to explore and learn with you today! What would you like to discover? Maybe something about ${this.getRandomTopic().name.toLowerCase()}? ${this.getRandomTopic().emoji}`,
        true,
        ['Tell me about space! 🚀', 'I want to learn math! 🧮', 'Show me science experiments! 🔬', 'Surprise me! ✨']
      );
    }

    if (message.includes('ai') || message.includes('artificial intelligence')) {
      return this.createBotMessage(
        `AI means Artificial Intelligence! 🤖 It's like giving computers a super smart brain that can learn and think. Would you like me to show you how AI works with a fun example?`,
        true,
        ['Show me an AI game! 🎮', 'How does AI learn? 🧠', 'Can AI be creative? 🎨', 'What can AI do? ⚡']
      );
    }

    if (message.includes('math') || message.includes('mathematics')) {
      return this.createBotMessage(
        `Math is like a superpower for solving puzzles! 🧮✨ It helps us understand patterns, solve problems, and even create video games! What kind of math adventure should we go on?`,
        true,
        ['Fun number tricks! 🎯', 'Geometry shapes! 📐', 'Math in games! 🎮', 'Quick math quiz! ⚡']
      );
    }

    if (message.includes('space') || message.includes('planet') || message.includes('star')) {
      return this.createBotMessage(
        `Space is AMAZING! 🌌 Did you know there are billions of stars and planets out there? Some planets have diamond rain! 💎 What space mystery should we explore together?`,
        true,
        ['Tell me about planets! 🪐', 'How big is space? 🌟', 'Can we live on Mars? 🔴', 'Space quiz time! 🚀']
      );
    }

    if (message.includes('science') || message.includes('experiment')) {
      return this.createBotMessage(
        `Science is like being a detective! 🔍 We ask questions, do experiments, and discover cool secrets about our world! What kind of science adventure sounds fun to you?`,
        true,
        ['Chemistry experiments! ⚗️', 'How things work! ⚙️', 'Animals and nature! 🦋', 'Science quiz! 🧪']
      );
    }

    if (message.includes('quiz') || message.includes('test') || message.includes('question')) {
      const randomQuiz = sampleQuizQuestions[Math.floor(Math.random() * sampleQuizQuestions.length)];
      return this.createBotMessage(
        `Let's test your knowledge! 🎯 Here's a fun question for you:`,
        true,
        randomQuiz.options,
        '🤔'
      );
    }

    // Default encouraging response with follow-up questions
    const responses = [
      `That's a great question! 🌟 I love how curious you are! Let me think about this with you...`,
      `Wow, you're asking such smart questions! 🧠 This is exactly how great learners think!`,
      `I'm so excited you asked that! 🎉 Learning together is the best part of my day!`,
      `You know what? That's the kind of question that leads to amazing discoveries! 🔍`
    ];

    const followUps = [
      'Want to explore this more? 🚀',
      'Should we try a fun activity about this? 🎮',
      'Would you like to see some examples? 👀',
      'Ready for a quick challenge? ⚡'
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const randomFollowUp = followUps[Math.floor(Math.random() * followUps.length)];

    return this.createBotMessage(
      `${randomResponse} ${randomFollowUp}`,
      true,
      ['Yes, let\'s explore! 🌟', 'Show me examples! 👁️', 'I want a challenge! 💪', 'Tell me more! 📚']
    );
  }

  private detectTopic(message: string): string {
    for (const topic of this.topics) {
      if (topic.keywords.some(keyword => message.includes(keyword))) {
        return topic.name;
      }
    }
    return 'General';
  }

  private getRandomTopic() {
    return this.topics[Math.floor(Math.random() * this.topics.length)];
  }

  private createBotMessage(content: string, isQuestion = false, options?: string[], emoji = '🤖'): Message {
    return {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      isQuestion,
      options,
      emoji
    };
  }

  getWelcomeMessage(): Message {
    return this.createBotMessage(
      `🎉 Welcome to the most awesome learning adventure ever! I'm your AI learning buddy, and I'm super excited to explore the world with you! 

What makes you curious today? I love talking about science, math, space, animals, technology, and so much more! 

Ready to start our learning journey? 🚀`,
      true,
      ['Let\'s learn about space! 🌌', 'Show me cool science! 🔬', 'Math can be fun? 🧮', 'Surprise me! ✨'],
      '🎓'
    );
  }
}

export const botService = new BotService();