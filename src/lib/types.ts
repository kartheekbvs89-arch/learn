// Core types for the learning platform

export interface CodeExample {
  filename?: string;
  language: string;
  code: string;
  explanation?: string;
}

export interface Exercise {
  prompt: string;
  starterCode?: string;
  starterLanguage?: string;
  hint?: string;
  solution: string;
  solutionLanguage?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type ResourceType =
  | 'docs'
  | 'video'
  | 'article'
  | 'tool'
  | 'interactive'
  | 'cheatsheet'
  | 'book';

export interface Resource {
  title: string;
  url: string;
  type: ResourceType;
  isHiddenGem?: boolean;
}

export interface MiniProject {
  title: string;
  description: string;
  requirements: string[];
  estTime: string;
  solutionCode: string;
  solutionLanguage: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle?: string;
  duration: number; // minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  content: string[];
  codeExamples: CodeExample[];
  exercises?: Exercise[];
  quiz?: QuizQuestion[];
  keyTakeaways: string[];
  resources: Resource[];
  miniProject?: MiniProject;
}

export interface Module {
  id: string;
  title: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  lessons: Lesson[];
}
