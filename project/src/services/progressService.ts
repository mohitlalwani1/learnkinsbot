import { UserProgress, Badge } from '../types';
import { availableBadges } from '../data/badges';

class ProgressService {
  private storageKey = 'learnerbot-progress';

  getProgress(): UserProgress {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      const progress = JSON.parse(saved);
      // Ensure badges have the earned property
      progress.badges = progress.badges.map((badge: Badge) => ({
        ...badge,
        earnedAt: badge.earnedAt ? new Date(badge.earnedAt) : undefined
      }));
      return progress;
    }

    return {
      level: 1,
      xp: 0,
      streak: 0,
      badges: availableBadges.map(badge => ({ ...badge })),
      totalQuestions: 0,
      correctAnswers: 0
    };
  }

  saveProgress(progress: UserProgress): void {
    localStorage.setItem(this.storageKey, JSON.stringify(progress));
  }

  addXP(amount: number): UserProgress {
    const progress = this.getProgress();
    progress.xp += amount;
    
    // Level up logic
    const newLevel = Math.floor(progress.xp / 100) + 1;
    if (newLevel > progress.level) {
      progress.level = newLevel;
    }

    this.saveProgress(progress);
    return progress;
  }

  earnBadge(badgeId: string): Badge | null {
    const progress = this.getProgress();
    const badge = progress.badges.find(b => b.id === badgeId);
    
    if (badge && !badge.earned) {
      badge.earned = true;
      badge.earnedAt = new Date();
      this.saveProgress(progress);
      return badge;
    }
    
    return null;
  }

  incrementStreak(): UserProgress {
    const progress = this.getProgress();
    progress.streak += 1;
    this.saveProgress(progress);
    return progress;
  }

  recordQuizAnswer(correct: boolean): UserProgress {
    const progress = this.getProgress();
    progress.totalQuestions += 1;
    if (correct) {
      progress.correctAnswers += 1;
    }
    this.saveProgress(progress);
    return progress;
  }
}

export const progressService = new ProgressService();