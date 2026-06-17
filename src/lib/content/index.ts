import { Lesson } from '../types';
import { pythonL1 } from './python/pyenv-setup';
import { fastapiL1 } from './fastapi/installation';
import { fastapiL2 } from './fastapi/path-query-params';
import { fastapiL3 } from './fastapi/pydantic-v2';
import { fastapiL4, fastapiL5, fastapiL6 } from './fastapi/l4-l6';
import { fastapiL7, fastapiL8, fastapiL9, fastapiL10 } from './fastapi/l7-l10';
import { fastapiL11, fastapiL12, fastapiL13, fastapiL14, fastapiL15, fastapiL16, fastapiL17, fastapiL18, fastapiL19, fastapiL20 } from './fastapi/l11-l20';

// Content registry — maps moduleSlug/lessonSlug to full lesson content
const contentRegistry: Record<string, Lesson> = {
  'python/pyenv-setup': pythonL1,
  'fastapi/installation': fastapiL1,
  'fastapi/path-query-params': fastapiL2,
  'fastapi/pydantic-v2': fastapiL3,
  'fastapi/response-models': fastapiL4,
  'fastapi/routers-structure': fastapiL5,
  'fastapi/dependency-injection': fastapiL6,
  'fastapi/middleware': fastapiL7,
  'fastapi/authentication': fastapiL8,
  'fastapi/file-uploads': fastapiL9,
  'fastapi/websockets': fastapiL10,
  'fastapi/async-sqlalchemy': fastapiL11,
  'fastapi/redis': fastapiL12,
  'fastapi/celery': fastapiL13,
  'fastapi/ml-serving': fastapiL14,
  'fastapi/external-apis': fastapiL15,
  'fastapi/db-advanced': fastapiL16,
  'fastapi/testing': fastapiL17,
  'fastapi/error-logging': fastapiL18,
  'fastapi/deployment': fastapiL19,
  'fastapi/monitoring': fastapiL20,
};

export function getLessonContent(moduleSlug: string, lessonSlug: string): Lesson | null {
  const key = `${moduleSlug}/${lessonSlug}`;
  return contentRegistry[key] || null;
}

export function hasLessonContent(moduleSlug: string, lessonSlug: string): boolean {
  return `${moduleSlug}/${lessonSlug}` in contentRegistry;
}
