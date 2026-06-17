import { Lesson } from '../types';
import { pythonL1 } from './python/pyenv-setup';
import { pythonL2, pythonL3, pythonL4, pythonL5, pythonL6, pythonL7, pythonL8 } from './python/l2-l8';
import { pythonL9, pythonL10, pythonL11, pythonL12, pythonL13, pythonL14, pythonL15, pythonL16, pythonL17, pythonL18, pythonL19, pythonL20, pythonL21 } from './python/l9-l21';
import { fastapiL1 } from './fastapi/installation';
import { fastapiL2 } from './fastapi/path-query-params';
import { fastapiL3 } from './fastapi/pydantic-v2';
import { fastapiL4, fastapiL5, fastapiL6 } from './fastapi/l4-l6';
import { fastapiL7, fastapiL8, fastapiL9, fastapiL10 } from './fastapi/l7-l10';
import { fastapiL11, fastapiL12, fastapiL13, fastapiL14, fastapiL15, fastapiL16, fastapiL17, fastapiL18, fastapiL19, fastapiL20 } from './fastapi/l11-l20';

const contentRegistry: Record<string, Lesson> = {
  // Python
  'python/pyenv-setup': pythonL1,
  'python/types-variables': pythonL2,
  'python/strings': pythonL3,
  'python/collections': pythonL4,
  'python/control-flow': pythonL5,
  'python/functions': pythonL6,
  'python/file-io': pythonL7,
  'python/error-handling': pythonL8,
  'python/oop': pythonL9,
  'python/decorators': pythonL10,
  'python/iterators-generators': pythonL11,
  'python/modules-packages': pythonL12,
  'python/stdlib': pythonL13,
  'python/async-await': pythonL14,
  'python/metaclasses': pythonL15,
  'python/performance': pythonL16,
  'python/type-system': pythonL17,
  'python/pytest': pythonL18,
  'python/logging-config': pythonL19,
  'python/cli-apps': pythonL20,
  'python/packaging': pythonL21,
  // FastAPI
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
