import { Lesson } from '../types';
import { pythonL1 } from './python/pyenv-setup';

// Content registry — maps moduleSlug/lessonSlug to full lesson content
const contentRegistry: Record<string, Lesson> = {
  'python/pyenv-setup': pythonL1,
  // Add more as we write them:
  // 'python/types-variables': pythonL2,
  // 'python/strings': pythonL3,
  // ...
};

export function getLessonContent(moduleSlug: string, lessonSlug: string): Lesson | null {
  const key = `${moduleSlug}/${lessonSlug}`;
  return contentRegistry[key] || null;
}

export function hasLessonContent(moduleSlug: string, lessonSlug: string): boolean {
  return `${moduleSlug}/${lessonSlug}` in contentRegistry;
}
