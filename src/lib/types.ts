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

// New: Visualization block - diagrams using ASCII art or structured layouts
export interface Visualization {
  title: string;
  type: 'flow' | 'architecture' | 'sequence' | 'tree' | 'comparison' | 'layers';
  description?: string;
  // For ASCII/text diagrams
  diagram?: string;
  // For structured data (used in comparison and tree types)
  nodes?: { label: string; detail?: string; children?: string[] }[];
  // Legend explaining symbols
  legend?: string[];
}

// New: Lab - hands-on guided exercise with setup + steps
export interface Lab {
  title: string;
  objective: string;
  estTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  setup: string[]; // Prerequisites, environment setup commands
  steps: {
    title: string;
    instruction: string;
    code?: string;
    codeLanguage?: string;
    expectedOutput?: string;
    explanation?: string;
  }[];
  verification?: string; // How to verify it worked
  cleanup?: string[]; // How to clean up
}

// New: Progressive examples - small -> larger -> real-world
export interface ProgressiveExample {
  title: string;
  description: string;
  stages: {
    name: string; // "Tiny", "Small", "Real-World"
    description: string;
    code: string;
    language: string;
    explanation: string;
  }[];
}

// New: Setup block - environment setup instructions
export interface Setup {
  title: string;
  os: 'linux' | 'macos' | 'windows' | 'all';
  steps: {
    description: string;
    command?: string;
    expectedOutput?: string;
  }[];
  verification?: string;
  troubleshooting?: { problem: string; solution: string }[];
}

export interface Lesson {
  id: string;
  title: string;
  subtitle?: string;
  duration: number; // minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  phase: 'Foundation' | 'Intermediate' | 'Advanced' | 'Real-World';
  content: string[];
  codeExamples: CodeExample[];
  exercises?: Exercise[];
  quiz?: QuizQuestion[];
  keyTakeaways: string[];
  resources: Resource[];
  miniProject?: MiniProject;
  // New content types
  visualization?: Visualization;
  setup?: Setup;
  lab?: Lab;
  progressiveExample?: ProgressiveExample;
}

export interface Module {
  id: string;
  title: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  // Learning path - what you'll achieve by end of this module
  learningPath: {
    title: string;
    description: string;
    phases: {
      name: 'Foundation' | 'Intermediate' | 'Advanced' | 'Real-World';
      description: string;
      outcomes: string[]; // what you'll be able to do after this phase
    }[];
  };
  // Final real-world project that ties everything together
  capstoneProject?: {
    title: string;
    description: string;
    architecture?: string; // ASCII architecture diagram
    features: string[];
    techStack: string[];
    estTime: string;
    difficulty: 'Intermediate' | 'Advanced';
  };
  lessons: Lesson[];
}
