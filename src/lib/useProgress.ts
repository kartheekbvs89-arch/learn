'use client';

import { useState, useCallback } from 'react';
import { UserProgress, LessonProgress } from './types';

const STORAGE_KEY = 'learnstack-progress';

const defaultProgress: UserProgress = {
  modules: {},
  totalXP: 0,
  streak: 0,
  lastActivityDate: '',
  certificates: [],
};

function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultProgress;
    const parsed = JSON.parse(saved);
    return { ...defaultProgress, ...parsed };
  } catch {
    return defaultProgress;
  }
}

function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

function calculateStreak(lastDate: string): number {
  if (!lastDate) return 0;
  const today = new Date();
  const last = new Date(lastDate);
  const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 1; // same day
  if (diffDays === 1) return 2; // yesterday → streak continues
  return 0; // broken
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());

  const updateProgress = useCallback((updater: (p: UserProgress) => UserProgress) => {
    setProgress(prev => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  }, []);

  const completeLesson = useCallback((moduleSlug: string, lessonSlug: string, xp: number) => {
    updateProgress(prev => {
      const moduleProgress = prev.modules[moduleSlug] || {
        moduleSlug,
        lessons: {},
      };
      const existing = moduleProgress.lessons[lessonSlug] || {
        lessonSlug,
        completed: false,
        quizPassed: false,
        labCompleted: false,
        xpEarned: 0,
      };

      if (existing.completed) return prev; // already done

      const newLesson: LessonProgress = {
        ...existing,
        completed: true,
        xpEarned: existing.xpEarned + xp,
        completedAt: new Date().toISOString(),
      };

      const today = todayStr();
      const streak = prev.lastActivityDate === today
        ? prev.streak
        : calculateStreak(prev.lastActivityDate) + 1;

      return {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleSlug]: {
            ...moduleProgress,
            lessons: {
              ...moduleProgress.lessons,
              [lessonSlug]: newLesson,
            },
          },
        },
        totalXP: prev.totalXP + xp,
        streak,
        lastActivityDate: today,
      };
    });
  }, [updateProgress]);

  const passQuiz = useCallback((moduleSlug: string, lessonSlug: string, bonusXP: number) => {
    updateProgress(prev => {
      const moduleProgress = prev.modules[moduleSlug] || {
        moduleSlug,
        lessons: {},
      };
      const existing = moduleProgress.lessons[lessonSlug] || {
        lessonSlug,
        completed: false,
        quizPassed: false,
        labCompleted: false,
        xpEarned: 0,
      };

      if (existing.quizPassed) return prev;

      return {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleSlug]: {
            ...moduleProgress,
            lessons: {
              ...moduleProgress.lessons,
              [lessonSlug]: {
                ...existing,
                quizPassed: true,
                xpEarned: existing.xpEarned + bonusXP,
              },
            },
          },
        },
        totalXP: prev.totalXP + bonusXP,
      };
    });
  }, [updateProgress]);

  const completeLab = useCallback((moduleSlug: string, lessonSlug: string, bonusXP: number) => {
    updateProgress(prev => {
      const moduleProgress = prev.modules[moduleSlug] || {
        moduleSlug,
        lessons: {},
      };
      const existing = moduleProgress.lessons[lessonSlug] || {
        lessonSlug,
        completed: false,
        quizPassed: false,
        labCompleted: false,
        xpEarned: 0,
      };

      if (existing.labCompleted) return prev;

      return {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleSlug]: {
            ...moduleProgress,
            lessons: {
              ...moduleProgress.lessons,
              [lessonSlug]: {
                ...existing,
                labCompleted: true,
                xpEarned: existing.xpEarned + bonusXP,
              },
            },
          },
        },
        totalXP: prev.totalXP + bonusXP,
      };
    });
  }, [updateProgress]);

  const isLessonCompleted = useCallback((moduleSlug: string, lessonSlug: string): boolean => {
    return progress.modules[moduleSlug]?.lessons[lessonSlug]?.completed ?? false;
  }, [progress]);

  const isQuizPassed = useCallback((moduleSlug: string, lessonSlug: string): boolean => {
    return progress.modules[moduleSlug]?.lessons[lessonSlug]?.quizPassed ?? false;
  }, [progress]);

  const isLabCompleted = useCallback((moduleSlug: string, lessonSlug: string): boolean => {
    return progress.modules[moduleSlug]?.lessons[lessonSlug]?.labCompleted ?? false;
  }, [progress]);

  const getModuleProgress = useCallback((moduleSlug: string, totalLessons: number): number => {
    const mod = progress.modules[moduleSlug];
    if (!mod) return 0;
    const completed = Object.values(mod.lessons).filter(l => l.completed).length;
    return Math.round((completed / totalLessons) * 100);
  }, [progress]);

  const getModuleXP = useCallback((moduleSlug: string): number => {
    const mod = progress.modules[moduleSlug];
    if (!mod) return 0;
    return Object.values(mod.lessons).reduce((sum, l) => sum + l.xpEarned, 0);
  }, [progress]);

  return {
    progress,
    completeLesson,
    passQuiz,
    completeLab,
    isLessonCompleted,
    isQuizPassed,
    isLabCompleted,
    getModuleProgress,
    getModuleXP,
  };
}
