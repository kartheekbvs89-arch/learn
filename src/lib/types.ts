// ============================================================
// LearnStack — Industrial-Grade Types
// ============================================================

export type Phase = 'Foundation' | 'Intermediate' | 'Advanced' | 'Real-World';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

// === CODE EXAMPLE ===
export interface CodeExample {
  filename: string;
  language: string;
  code: string;
  explanation?: string;
  approach: 'minimal' | 'real-world' | 'production';
}

// === LAB STEP ===
export interface LabStep {
  step: number;
  title: string;
  instruction: string;
  command?: string;
  expectedOutput?: string;
  verification?: string; // how to verify (file exists, output matches, port responds)
  hint?: string;
}

// === QUIZ QUESTION ===
export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  isCodeOutput?: boolean;
}

// === RESOURCE ===
export interface Resource {
  title: string;
  url: string;
  type: 'docs' | 'article' | 'video' | 'tool' | 'book' | 'cheatsheet';
  isHiddenGem?: boolean;
  description?: string;
}

// === COMMON ERROR ===
export interface CommonError {
  error: string;
  fix: string;
  rootCause: string;
}

// === LESSON (full industrial-grade content) ===
export interface Lesson {
  slug: string;
  title: string;
  subtitle: string;
  duration: number; // minutes
  difficulty: Difficulty;
  phase: Phase;
  xp: number;
  moduleSlug: string;

  // 1. OBJECTIVE
  objectives: string[];
  realWorldContext: string;
  prerequisites: string[];

  // 2. CONCEPTS
  conceptDiagram?: string; // ASCII art
  conceptExplanation: string[];
  whyItMatters: string;

  // 3. CODE EXAMPLES (minimum 3)
  codeExamples: CodeExample[];

  // 4. CONFIG FILES (optional)
  configFiles?: { filename: string; content: string; language: string; comment: string }[];

  // 5. PROGRESSIVE LAB
  lab: {
    title: string;
    starterFiles?: { path: string; content: string }[];
    steps: LabStep[];
  };

  // 6. COMMON ERRORS
  commonErrors: CommonError[];

  // 7. QUIZ (5 questions)
  quiz: QuizQuestion[];

  // 8. RESOURCES
  resources: Resource[];
  whatToReadNext: string;
}

// === MODULE ===
export interface Module {
  slug: string;
  title: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  totalLessons: number;
  estimatedHours: number;
  capstoneProject?: {
    title: string;
    description: string;
    architecture: string;
    features: string[];
    techStack: string[];
    rubric: { criterion: string; weight: number }[];
  };
}

// === PROGRESS ===
export interface LessonProgress {
  lessonSlug: string;
  completed: boolean;
  quizPassed: boolean;
  labCompleted: boolean;
  xpEarned: number;
  completedAt?: string;
}

export interface ModuleProgress {
  moduleSlug: string;
  lessons: Record<string, LessonProgress>;
}

export interface UserProgress {
  modules: Record<string, ModuleProgress>;
  totalXP: number;
  streak: number;
  lastActivityDate: string;
  certificates: string[]; // module slugs
}
