import { Lesson } from '../types';
import { pythonL1 } from './python/pyenv-setup';
import { fastapiL1 } from './fastapi/installation';
import { fastapiL2 } from './fastapi/path-query-params';

// Content registry — maps moduleSlug/lessonSlug to full lesson content
const contentRegistry: Record<string, Lesson> = {
  'python/pyenv-setup': pythonL1,
  'fastapi/installation': fastapiL1,
  'fastapi/path-query-params': fastapiL2,
};

export function getLessonContent(moduleSlug: string, lessonSlug: string): Lesson | null {
  const key = `${moduleSlug}/${lessonSlug}`;
  return contentRegistry[key] || null;
}

export function hasLessonContent(moduleSlug: string, lessonSlug: string): boolean {
  return `${moduleSlug}/${lessonSlug}` in contentRegistry;
}
