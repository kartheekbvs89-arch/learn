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
import { reactLessons, postgresqlLessons, dockerLessons, mlLessons } from './remaining-modules';

const contentRegistry: Record<string, Lesson> = {};

// Register Python lessons
const pythonLessons = [pythonL1, pythonL2, pythonL3, pythonL4, pythonL5, pythonL6, pythonL7, pythonL8, pythonL9, pythonL10, pythonL11, pythonL12, pythonL13, pythonL14, pythonL15, pythonL16, pythonL17, pythonL18, pythonL19, pythonL20, pythonL21];
for (const l of pythonLessons) contentRegistry[`python/${l.slug}`] = l;

// Register FastAPI lessons
const fastapiLessons = [fastapiL1, fastapiL2, fastapiL3, fastapiL4, fastapiL5, fastapiL6, fastapiL7, fastapiL8, fastapiL9, fastapiL10, fastapiL11, fastapiL12, fastapiL13, fastapiL14, fastapiL15, fastapiL16, fastapiL17, fastapiL18, fastapiL19, fastapiL20];
for (const l of fastapiLessons) contentRegistry[`fastapi/${l.slug}`] = l;

// Register React lessons
for (const l of reactLessons) contentRegistry[`react/${l.slug}`] = l;

// Register PostgreSQL lessons
for (const l of postgresqlLessons) contentRegistry[`postgresql/${l.slug}`] = l;

// Register Docker lessons
for (const l of dockerLessons) contentRegistry[`docker/${l.slug}`] = l;

// Register ML lessons
for (const l of mlLessons) contentRegistry[`ml/${l.slug}`] = l;

export function getLessonContent(moduleSlug: string, lessonSlug: string): Lesson | null {
  const key = `${moduleSlug}/${lessonSlug}`;
  return contentRegistry[key] || null;
}

export function hasLessonContent(moduleSlug: string, lessonSlug: string): boolean {
  return `${moduleSlug}/${lessonSlug}` in contentRegistry;
}
