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
import { reactL1, reactL2, reactL3, reactL4, reactL5, reactL6, reactL7, reactL8, reactL9, reactL10, reactL11, reactL12, reactL13, reactL14, reactL15, reactL16, reactL17, reactL18 } from './react/all';
import { postgresqlL1, postgresqlL2, postgresqlL3, postgresqlL4, postgresqlL5, postgresqlL6, postgresqlL7, postgresqlL8, postgresqlL9, postgresqlL10, postgresqlL11, postgresqlL12, postgresqlL13, postgresqlL14, postgresqlL15 } from './postgresql/all';
import { dockerL1, dockerL2, dockerL3, dockerL4, dockerL5, dockerL6, dockerL7, dockerL8, dockerL9, dockerL10, dockerL11, dockerL12, dockerL13, dockerL14, dockerL15 } from './docker/all';
import { mlL1, mlL2, mlL3, mlL4, mlL5, mlL6, mlL7, mlL8, mlL9, mlL10, mlL11, mlL12, mlL13, mlL14, mlL15 } from './ml/all';

const contentRegistry: Record<string, Lesson> = {};

// Python (21 lessons)
for (const l of [pythonL1, pythonL2, pythonL3, pythonL4, pythonL5, pythonL6, pythonL7, pythonL8, pythonL9, pythonL10, pythonL11, pythonL12, pythonL13, pythonL14, pythonL15, pythonL16, pythonL17, pythonL18, pythonL19, pythonL20, pythonL21])
  contentRegistry[`python/${l.slug}`] = l;

// FastAPI (20 lessons)
for (const l of [fastapiL1, fastapiL2, fastapiL3, fastapiL4, fastapiL5, fastapiL6, fastapiL7, fastapiL8, fastapiL9, fastapiL10, fastapiL11, fastapiL12, fastapiL13, fastapiL14, fastapiL15, fastapiL16, fastapiL17, fastapiL18, fastapiL19, fastapiL20])
  contentRegistry[`fastapi/${l.slug}`] = l;

// React (18 lessons)
for (const l of [reactL1, reactL2, reactL3, reactL4, reactL5, reactL6, reactL7, reactL8, reactL9, reactL10, reactL11, reactL12, reactL13, reactL14, reactL15, reactL16, reactL17, reactL18])
  contentRegistry[`react/${l.slug}`] = l;

// PostgreSQL (15 lessons)
for (const l of [postgresqlL1, postgresqlL2, postgresqlL3, postgresqlL4, postgresqlL5, postgresqlL6, postgresqlL7, postgresqlL8, postgresqlL9, postgresqlL10, postgresqlL11, postgresqlL12, postgresqlL13, postgresqlL14, postgresqlL15])
  contentRegistry[`postgresql/${l.slug}`] = l;

// Docker (15 lessons)
for (const l of [dockerL1, dockerL2, dockerL3, dockerL4, dockerL5, dockerL6, dockerL7, dockerL8, dockerL9, dockerL10, dockerL11, dockerL12, dockerL13, dockerL14, dockerL15])
  contentRegistry[`docker/${l.slug}`] = l;

// ML (15 lessons)
for (const l of [mlL1, mlL2, mlL3, mlL4, mlL5, mlL6, mlL7, mlL8, mlL9, mlL10, mlL11, mlL12, mlL13, mlL14, mlL15])
  contentRegistry[`ml/${l.slug}`] = l;

export function getLessonContent(moduleSlug: string, lessonSlug: string): Lesson | null {
  return contentRegistry[`${moduleSlug}/${lessonSlug}`] || null;
}

export function hasLessonContent(moduleSlug: string, lessonSlug: string): boolean {
  return `${moduleSlug}/${lessonSlug}` in contentRegistry;
}
