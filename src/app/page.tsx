'use client';

import { useState, useMemo } from 'react';
import { allModules } from '@/lib/modules';
import { Module, Lesson } from '@/lib/types';
import {
  Search,
  BookOpen,
  Code2,
  CheckCircle2,
  Circle,
  ChevronRight,
  ChevronDown,
  Clock,
  Target,
  ListChecks,
  HelpCircle,
  ExternalLink,
  Star,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Trophy,
  Zap,
  Sparkles,
  Map,
  FlaskConical,
  Terminal,
  TrendingUp,
  Layers,
  Rocket,
} from 'lucide-react';

type View =
  | { type: 'home' }
  | { type: 'module'; moduleId: string }
  | { type: 'lesson'; moduleId: string; lessonId: string };

type Tab = 'learn' | 'practice' | 'quiz' | 'project';

const PHASE_COLORS: Record<string, string> = {
  Foundation: 'from-emerald-500 to-teal-500',
  Intermediate: 'from-blue-500 to-indigo-500',
  Advanced: 'from-purple-500 to-pink-500',
  'Real-World': 'from-amber-500 to-orange-500',
};

export default function Page() {
  const [view, setView] = useState<View>({ type: 'home' });
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('learn');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completed, setCompleted] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const saved = localStorage.getItem('completed-lessons');
      return saved ? new Set(JSON.parse(saved) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleComplete = (lessonId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) next.delete(lessonId);
      else next.add(lessonId);
      localStorage.setItem('completed-lessons', JSON.stringify([...next]));
      return next;
    });
  };

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalLessons = useMemo(
    () => allModules.reduce((sum, m) => sum + m.lessons.length, 0),
    []
  );
  const completionPct = Math.round((completed.size / totalLessons) * 100);

  const searchResults = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    const results: { module: Module; lesson: Lesson }[] = [];
    for (const mod of allModules) {
      for (const lesson of mod.lessons) {
        const text = `${lesson.title} ${lesson.subtitle ?? ''} ${lesson.content.join(' ')}`.toLowerCase();
        if (text.includes(q)) results.push({ module: mod, lesson });
      }
    }
    return results;
  }, [search]);

  const navigateToLesson = (moduleId: string, lessonId: string) => {
    setView({ type: 'lesson', moduleId, lessonId });
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToModule = (moduleId: string) => {
    setView({ type: 'module', moduleId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentModuleData = useMemo(() => {
    if (view.type !== 'module') return null;
    return allModules.find((m) => m.id === view.moduleId) ?? null;
  }, [view]);

  const currentLessonData = useMemo(() => {
    if (view.type !== 'lesson') return null;
    const mod = allModules.find((m) => m.id === view.moduleId);
    if (!mod) return null;
    const lessonIndex = mod.lessons.findIndex((l) => l.id === view.lessonId);
    if (lessonIndex === -1) return null;
    return {
      mod,
      lesson: mod.lessons[lessonIndex],
      index: lessonIndex,
      prev: lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null,
      next: lessonIndex < mod.lessons.length - 1 ? mod.lessons[lessonIndex + 1] : null,
    };
  }, [view]);

  // ===== HOME VIEW =====
  if (view.type === 'home') {
    return (
      <Shell
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        expandedModules={expandedModules}
        toggleModule={toggleModule}
        navigateToLesson={navigateToLesson}
        navigateToModule={navigateToModule}
        completed={completed}
        search={search}
        setSearch={setSearch}
        searchResults={searchResults}
        currentView={view}
        onHomeClick={() => setView({ type: 'home' })}
      >
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-zinc-800">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <div className="relative max-w-6xl mx-auto px-8 py-20">
            <div className="flex items-center gap-2 mb-6 text-sm text-purple-400">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Complete Tech Learning Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Master Every Tech Stack
              <br />
              From Zero to Production
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
              Google-certification-style learning paths with phases, visualizations, hands-on labs,
              progressive examples (small → real-world), and capstone projects. 9 courses, 50+ lessons,
              everything you need to actually write code.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => navigateToLesson('python', 'py-01')}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 rounded-lg font-semibold text-white transition-all shadow-lg shadow-purple-500/20"
              >
                Start Learning — Free
              </button>
              <button
                onClick={() => navigateToModule('kubernetes')}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold text-zinc-200 transition-all border border-zinc-700"
              >
                Browse Learning Paths
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
              <Stat label="Tech Courses" value={`${allModules.length}`} icon="📚" />
              <Stat label="Total Lessons" value={`${totalLessons}`} icon="📖" />
              <Stat label="Your Progress" value={`${completionPct}%`} icon="🎯" />
              <Stat label="Free Forever" value="100%" icon="✨" />
            </div>
          </div>
        </div>

        {/* Modules grid */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold mb-2">Choose Your Learning Path</h2>
          <p className="text-zinc-400 mb-10">
            Each course is a structured learning path with phases (Foundation → Intermediate → Advanced → Real-World),
            hands-on labs, visualizations, and capstone projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allModules.map((mod) => {
              const moduleCompleted = mod.lessons.filter((l) => completed.has(l.id)).length;
              const pct = Math.round((moduleCompleted / mod.lessons.length) * 100);
              return (
                <button
                  key={mod.id}
                  onClick={() => navigateToModule(mod.id)}
                  className="group text-left rounded-xl p-6 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-black/30"
                  style={{ background: `linear-gradient(135deg, ${mod.color}11 0%, transparent 60%)` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ background: mod.gradient }}
                    >
                      {mod.icon}
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400">
                      {mod.level}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-white transition">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-2 min-h-[40px]">
                    {mod.description}
                  </p>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-zinc-500">{mod.lessons.length} lessons</span>
                    <span className="text-zinc-500">{moduleCompleted}/{mod.lessons.length} done</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: mod.gradient }}
                    />
                  </div>
                  {mod.capstoneProject && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-400">
                      <Trophy className="w-3 h-3" />
                      <span>Capstone: {mod.capstoneProject.title}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Shell>
    );
  }

  // ===== MODULE VIEW (learning path) =====
  if (view.type === 'module' && currentModuleData) {
    const mod = currentModuleData;
    const moduleCompleted = mod.lessons.filter((l) => completed.has(l.id)).length;
    const pct = Math.round((moduleCompleted / mod.lessons.length) * 100);

    // Group lessons by phase
    const phases = ['Foundation', 'Intermediate', 'Advanced', 'Real-World'] as const;
    const lessonsByPhase = phases.map((phase) => ({
      phase,
      lessons: mod.lessons.filter((l) => l.phase === phase),
    })).filter((g) => g.lessons.length > 0);

    return (
      <Shell
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        expandedModules={expandedModules}
        toggleModule={toggleModule}
        navigateToLesson={navigateToLesson}
        navigateToModule={navigateToModule}
        completed={completed}
        search={search}
        setSearch={setSearch}
        searchResults={searchResults}
        currentView={view}
        onHomeClick={() => setView({ type: 'home' })}
      >
        <div className="max-w-4xl mx-auto px-8 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
            <button onClick={() => setView({ type: 'home' })} className="hover:text-zinc-300">Home</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-300">{mod.title}</span>
          </div>

          {/* Module header */}
          <div
            className="rounded-2xl p-8 mb-8 border border-zinc-800 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${mod.color}22 0%, transparent 70%)` }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl flex-shrink-0"
                style={{ background: mod.gradient }}
              >
                {mod.icon}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-1">{mod.title}</h1>
                <p className="text-zinc-400">{mod.description}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-zinc-300">Progress: {moduleCompleted}/{mod.lessons.length} lessons</span>
              <span className="text-zinc-300 font-bold">{pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, background: mod.gradient }}
              />
            </div>
          </div>

          {/* Learning Path */}
          {mod.learningPath && (
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4 text-purple-400">
                <Map className="w-5 h-5" />
                <h2 className="text-xl font-bold">{mod.learningPath.title}</h2>
              </div>
              <p className="text-zinc-400 mb-6">{mod.learningPath.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mod.learningPath.phases.map((phase, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-5 border border-zinc-800 bg-zinc-900/60"
                  >
                    <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium text-white bg-gradient-to-r ${PHASE_COLORS[phase.name]} mb-3`}>
                      Phase {i + 1}
                    </div>
                    <h3 className="font-bold mb-1">{phase.name}</h3>
                    <p className="text-xs text-zinc-500 mb-3">{phase.description}</p>
                    <ul className="space-y-1.5">
                      {phase.outcomes.map((outcome, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-xs text-zinc-400">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Capstone Project */}
          {mod.capstoneProject && (
            <section className="mb-10">
              <div className="rounded-xl p-6 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30">
                <div className="flex items-center gap-2 mb-3 text-amber-400">
                  <Trophy className="w-5 h-5" />
                  <h2 className="text-xl font-bold">Capstone Project</h2>
                </div>
                <h3 className="text-2xl font-bold mb-2">{mod.capstoneProject.title}</h3>
                <p className="text-zinc-300 mb-4">{mod.capstoneProject.description}</p>

                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {mod.capstoneProject.estTime}
                  </span>
                  <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300">
                    {mod.capstoneProject.difficulty}
                  </span>
                </div>

                {mod.capstoneProject.architecture && (
                  <div className="rounded-lg overflow-hidden border border-zinc-800 mb-4">
                    <div className="px-4 py-2 bg-zinc-900/50 border-b border-zinc-800 text-xs text-zinc-400 flex items-center gap-2">
                      <Layers className="w-3 h-3" /> Architecture
                    </div>
                    <pre className="overflow-x-auto p-4 text-xs custom-scrollbar bg-[#0d0d14]">
                      <code className="font-mono text-zinc-300 whitespace-pre">{mod.capstoneProject.architecture}</code>
                    </pre>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-300 mb-2">Features</h4>
                    <ul className="space-y-1">
                      {mod.capstoneProject.features.map((f, i) => (
                        <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5">
                          <Zap className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-300 mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {mod.capstoneProject.techStack.map((tech, i) => (
                        <span key={i} className="px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Lessons by Phase */}
          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-zinc-400" />
              Lessons
            </h2>
            <div className="space-y-8">
              {lessonsByPhase.map(({ phase, lessons }) => (
                <div key={phase}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`px-3 py-1 rounded text-xs font-medium text-white bg-gradient-to-r ${PHASE_COLORS[phase]}`}>
                      {phase}
                    </div>
                    <div className="flex-1 h-px bg-zinc-800" />
                    <span className="text-xs text-zinc-500">{lessons.length} lessons</span>
                  </div>
                  <div className="space-y-2">
                    {lessons.map((lesson, i) => {
                      const isDone = completed.has(lesson.id);
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => navigateToLesson(mod.id, lesson.id)}
                          className="w-full flex items-center gap-3 p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition text-left"
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-zinc-700 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs text-zinc-600">Lesson {mod.lessons.indexOf(lesson) + 1}</span>
                              <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">{lesson.difficulty}</span>
                              <span className="text-xs text-zinc-600 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />{lesson.duration}m
                              </span>
                            </div>
                            <div className="font-medium text-zinc-100 truncate">{lesson.title}</div>
                            {lesson.subtitle && (
                              <div className="text-xs text-zinc-500 truncate">{lesson.subtitle}</div>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Shell>
    );
  }

  // ===== LESSON VIEW =====
  if (view.type === 'lesson' && currentLessonData) {
    const { mod, lesson, prev, next } = currentLessonData;
    const isCompleted = completed.has(lesson.id);

    return (
      <Shell
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        expandedModules={expandedModules}
        toggleModule={toggleModule}
        navigateToLesson={navigateToLesson}
        navigateToModule={navigateToModule}
        completed={completed}
        search={search}
        setSearch={setSearch}
        searchResults={searchResults}
        currentView={view}
        onHomeClick={() => setView({ type: 'home' })}
      >
        <div className="max-w-4xl mx-auto px-8 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4 flex-wrap">
            <button onClick={() => setView({ type: 'home' })} className="hover:text-zinc-300">Home</button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => navigateToModule(mod.id)} className="hover:text-zinc-300">{mod.title}</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-300 truncate">{lesson.title}</span>
          </div>

          {/* Lesson header */}
          <div
            className="rounded-2xl p-8 mb-6 border border-zinc-800 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${mod.color}22 0%, transparent 70%)` }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: mod.gradient }}
              >
                {mod.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 text-xs flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-white bg-gradient-to-r ${PHASE_COLORS[lesson.phase]}`}>
                    {lesson.phase}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{mod.title}</span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Clock className="w-3 h-3" /> {lesson.duration} min
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{lesson.difficulty}</span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
                {lesson.subtitle && <p className="text-zinc-400">{lesson.subtitle}</p>}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 border-b border-zinc-800 overflow-x-auto">
            <TabButton active={activeTab === 'learn'} onClick={() => setActiveTab('learn')} icon={<BookOpen className="w-4 h-4" />} label="Learn" />
            {lesson.exercises && lesson.exercises.length > 0 && (
              <TabButton active={activeTab === 'practice'} onClick={() => setActiveTab('practice')} icon={<ListChecks className="w-4 h-4" />} label={`Practice (${lesson.exercises.length})`} />
            )}
            {lesson.quiz && lesson.quiz.length > 0 && (
              <TabButton active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} icon={<HelpCircle className="w-4 h-4" />} label={`Quiz (${lesson.quiz.length})`} />
            )}
            {lesson.miniProject && (
              <TabButton active={activeTab === 'project'} onClick={() => setActiveTab('project')} icon={<Trophy className="w-4 h-4" />} label="Mini Project" />
            )}
          </div>

          {activeTab === 'learn' && <LearnTab lesson={lesson} mod={mod} />}
          {activeTab === 'practice' && lesson.exercises && <PracticeTab exercises={lesson.exercises} />}
          {activeTab === 'quiz' && lesson.quiz && <QuizTab questions={lesson.quiz} />}
          {activeTab === 'project' && lesson.miniProject && <ProjectTab project={lesson.miniProject} />}

          {/* Mark complete + navigation */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <button
              onClick={() => toggleComplete(lesson.id)}
              className={`w-full mb-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                isCompleted
                  ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
              }`}
            >
              {isCompleted ? (<><CheckCircle2 className="w-5 h-5" /> Completed</>) : (<><Circle className="w-5 h-5" /> Mark as Complete</>)}
            </button>
            <div className="flex justify-between gap-4">
              {prev ? (
                <button onClick={() => navigateToLesson(mod.id, prev.id)} className="flex-1 flex items-center gap-2 p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-left transition">
                  <ArrowLeft className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-zinc-500">Previous</div>
                    <div className="text-sm font-medium truncate">{prev.title}</div>
                  </div>
                </button>
              ) : <div className="flex-1" />}
              {next ? (
                <button onClick={() => navigateToLesson(mod.id, next.id)} className="flex-1 flex items-center justify-end gap-2 p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-right transition">
                  <div className="min-w-0">
                    <div className="text-xs text-zinc-500">Next</div>
                    <div className="text-sm font-medium truncate">{next.title}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                </button>
              ) : <div className="flex-1" />}
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  return <div>Not found</div>;
}

// ===== Shell wrapper (header + sidebar + main content) =====
function Shell({
  children,
  sidebarOpen,
  setSidebarOpen,
  expandedModules,
  toggleModule,
  navigateToLesson,
  navigateToModule,
  completed,
  search,
  setSearch,
  searchResults,
  currentView,
  onHomeClick,
}: {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (b: boolean) => void;
  expandedModules: Set<string>;
  toggleModule: (id: string) => void;
  navigateToLesson: (moduleId: string, lessonId: string) => void;
  navigateToModule: (moduleId: string) => void;
  completed: Set<string>;
  search: string;
  setSearch: (s: string) => void;
  searchResults: { mod: Module; lesson: Lesson }[] | null;
  currentView: View;
  onHomeClick: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-100">
      <Header onHomeClick={onHomeClick} />
      <div className="flex">
        <Sidebar
          expandedModules={expandedModules}
          toggleModule={toggleModule}
          navigateToLesson={navigateToLesson}
          navigateToModule={navigateToModule}
          completed={completed}
          search={search}
          setSearch={setSearch}
          searchResults={searchResults}
          currentView={currentView}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 min-h-[calc(100vh-64px)]">{children}</main>
      </div>
    </div>
  );
}

function Header({ onHomeClick }: { onHomeClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 h-16 bg-[#0a0a0f]/95 backdrop-blur border-b border-zinc-800 flex items-center px-6">
      <button onClick={onHomeClick} className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <Code2 className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-lg">LearnStack</span>
      </button>
      <div className="ml-auto text-sm text-zinc-500">
        Structured Learning Paths · Visualizations · Labs · Capstones
      </div>
    </header>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="rounded-xl p-4 bg-zinc-900/60 border border-zinc-800">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-zinc-500">{label}</div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
        active ? 'border-purple-500 text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'
      }`}
    >
      {icon}{label}
    </button>
  );
}

function Sidebar({
  expandedModules,
  toggleModule,
  navigateToLesson,
  navigateToModule,
  completed,
  search,
  setSearch,
  searchResults,
  currentView,
  sidebarOpen,
  setSidebarOpen,
}: {
  expandedModules: Set<string>;
  toggleModule: (id: string) => void;
  navigateToLesson: (moduleId: string, lessonId: string) => void;
  navigateToModule: (moduleId: string) => void;
  completed: Set<string>;
  search: string;
  setSearch: (s: string) => void;
  searchResults: { mod: Module; lesson: Lesson }[] | null;
  currentView: View;
  sidebarOpen: boolean;
  setSidebarOpen: (b: boolean) => void;
}) {
  return (
    <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-200 overflow-hidden border-r border-zinc-800 bg-[#0d0d14] flex-shrink-0`}>
      <div className="w-80 h-full">
        <div className="p-4 border-b border-zinc-800">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xs text-zinc-500 hover:text-zinc-300 mb-3">
            {sidebarOpen ? '← Collapse' : '→ Expand'}
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lessons..."
              className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-160px)] custom-scrollbar p-2">
          {searchResults ? (
            <div className="space-y-1">
              <div className="text-xs text-zinc-500 px-2 py-1">{searchResults.length} results</div>
              {searchResults.map(({ mod, lesson }) => (
                <button key={lesson.id} onClick={() => navigateToLesson(mod.id, lesson.id)} className="w-full text-left p-2 rounded hover:bg-zinc-800/50">
                  <div className="text-xs text-zinc-500">{mod.icon} {mod.title}</div>
                  <div className="text-sm text-zinc-200">{lesson.title}</div>
                </button>
              ))}
            </div>
          ) : (
            allModules.map((mod) => {
              const isExpanded = expandedModules.has(mod.id);
              const moduleCompleted = mod.lessons.filter((l) => completed.has(l.id)).length;
              const isActiveModule = (currentView.type === 'mod' || currentView.type === 'lesson') && currentView.moduleId === mod.id;
              return (
                <div key={mod.id} className="mb-1">
                  <div className="flex">
                    <button
                      onClick={() => navigateToModule(mod.id)}
                      className={`flex-1 flex items-center gap-2 p-2 rounded hover:bg-zinc-800/50 text-left ${isActiveModule ? 'bg-zinc-800/50' : ''}`}
                    >
                      <span className="text-base">{mod.icon}</span>
                      <span className="text-sm font-medium flex-1 truncate">{mod.title}</span>
                      <span className="text-xs text-zinc-500">{moduleCompleted}/{mod.lessons.length}</span>
                    </button>
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="px-2 hover:bg-zinc-800/50 rounded"
                    >
                      {isExpanded ? <ChevronDown className="w-3 h-3 text-zinc-500" /> : <ChevronRight className="w-3 h-3 text-zinc-500" />}
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="ml-4 border-l border-zinc-800 mt-1">
                      {mod.lessons.map((lesson, i) => {
                        const isActive = currentView.type === 'lesson' && currentView.lessonId === lesson.id;
                        const isDone = completed.has(lesson.id);
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => navigateToLesson(mod.id, lesson.id)}
                            className={`w-full flex items-start gap-2 py-1.5 px-3 text-left text-sm transition ${
                              isActive ? 'bg-purple-500/10 text-white border-l-2 border-purple-500 -ml-px' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
                            }`}
                          >
                            <span className="text-xs text-zinc-600 mt-0.5">{i + 1}.</span>
                            {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" /> : <Circle className="w-3.5 h-3.5 text-zinc-700 mt-0.5 flex-shrink-0" />}
                            <span className="flex-1 leading-tight">{lesson.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}

// ===== Learn Tab with all new content types =====
function LearnTab({ lesson, mod }: { lesson: Lesson; mod: Module }) {
  return (
    <div className="space-y-8">
      {/* Setup block */}
      {lesson.setup && <SetupBlock setup={lesson.setup} />}

      {/* Content */}
      <section>
        <div className="flex items-center gap-2 mb-4 text-purple-400">
          <BookOpen className="w-4 h-4" />
          <h2 className="text-lg font-semibold">Overview</h2>
        </div>
        <div className="space-y-4">
          {lesson.content.map((paragraph, i) => (
            <p key={i} className="text-zinc-300 leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Visualization */}
      {lesson.visualization && <VisualizationBlock viz={lesson.visualization} />}

      {/* Progressive Examples */}
      {lesson.progressiveExample && <ProgressiveExampleBlock example={lesson.progressiveExample} />}

      {/* Code examples */}
      {lesson.codeExamples.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <Code2 className="w-4 h-4" />
            <h2 className="text-lg font-semibold">Code Examples</h2>
          </div>
          <div className="space-y-6">
            {lesson.codeExamples.map((example, i) => <CodeExample key={i} example={example} />)}
          </div>
        </section>
      )}

      {/* Lab */}
      {lesson.lab && <LabBlock lab={lesson.lab} />}

      {/* Key takeaways */}
      <section className="rounded-xl p-6 bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/20">
        <div className="flex items-center gap-2 mb-4 text-amber-400">
          <Lightbulb className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Key Takeaways</h2>
        </div>
        <ul className="space-y-2">
          {lesson.keyTakeaways.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Resources */}
      {lesson.resources.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4 text-blue-400">
            <ExternalLink className="w-4 h-4" />
            <h2 className="text-lg font-semibold">Free Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lesson.resources.map((resource, i) => (
              <a key={i} href={resource.url} target="_blank" rel="noreferrer" className="flex items-start gap-3 p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition group">
                {resource.isHiddenGem && <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" />}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-zinc-200 group-hover:text-white">{resource.title}</div>
                  <div className="text-xs text-zinc-500 capitalize mt-0.5">
                    {resource.type}{resource.isHiddenGem && ' · Hidden Gem'}
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-600 mt-1 flex-shrink-0" />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function CodeExample({ example }: { example: { filename?: string; language: string; code: string; explanation?: string } }) {
  return (
    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d14]">
      {example.filename && (
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border-b border-zinc-800 text-xs">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-zinc-400 ml-2 font-mono">{example.filename}</span>
          <span className="ml-auto text-zinc-600 uppercase">{example.language}</span>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed custom-scrollbar">
        <code className="font-mono text-zinc-200 whitespace-pre">{example.code}</code>
      </pre>
      {example.explanation && (
        <div className="px-4 py-3 bg-emerald-500/5 border-t border-zinc-800 text-sm text-zinc-400 leading-relaxed">
          <span className="text-emerald-400 font-medium">Why:</span> {example.explanation}
        </div>
      )}
    </div>
  );
}

function VisualizationBlock({ viz }: { viz: NonNullable<Lesson['visualization']> }) {
  return (
    <section className="rounded-xl p-6 bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20">
      <div className="flex items-center gap-2 mb-3 text-blue-400">
        <Layers className="w-5 h-5" />
        <h2 className="text-lg font-semibold">{viz.title}</h2>
      </div>
      {viz.description && <p className="text-sm text-zinc-400 mb-4">{viz.description}</p>}
      {viz.diagram && (
        <div className="rounded-lg overflow-hidden border border-zinc-800 bg-[#0d0d14]">
          <pre className="overflow-x-auto p-4 text-xs leading-relaxed custom-scrollbar">
            <code className="font-mono text-zinc-300 whitespace-pre">{viz.diagram}</code>
          </pre>
        </div>
      )}
      {viz.legend && viz.legend.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {viz.legend.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
              <span className="text-blue-500 mt-0.5">▸</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function SetupBlock({ setup }: { setup: NonNullable<Lesson['setup']> }) {
  const [os, setOs] = useState<'linux' | 'macos' | 'windows' | 'all'>('all');
  return (
    <section className="rounded-xl p-6 bg-gradient-to-br from-cyan-500/5 to-transparent border border-cyan-500/20">
      <div className="flex items-center gap-2 mb-3 text-cyan-400">
        <Terminal className="w-5 h-5" />
        <h2 className="text-lg font-semibold">{setup.title}</h2>
      </div>
      <div className="space-y-4">
        {setup.steps.map((step, i) => (
          <div key={i} className="border-l-2 border-cyan-500/30 pl-4">
            <div className="text-sm font-medium text-zinc-200 mb-1">Step {i + 1}: {step.description}</div>
            {step.command && (
              <pre className="overflow-x-auto p-3 rounded bg-[#0d0d14] border border-zinc-800 text-xs custom-scrollbar mt-2">
                <code className="font-mono text-zinc-300 whitespace-pre">{step.command}</code>
              </pre>
            )}
            {step.expectedOutput && (
              <div className="mt-2 text-xs text-emerald-400/70 font-mono">
                Expected: {step.expectedOutput.split('\n').map((line, j) => (
                  <div key={j}>{line}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {setup.verification && (
        <div className="mt-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-sm">
          <strong className="text-emerald-400">Verify:</strong> <span className="text-zinc-300">{setup.verification}</span>
        </div>
      )}
      {setup.troubleshooting && setup.troubleshooting.length > 0 && (
        <details className="mt-4">
          <summary className="text-sm text-zinc-400 cursor-pointer hover:text-zinc-200">Troubleshooting ({setup.troubleshooting.length})</summary>
          <div className="mt-3 space-y-2">
            {setup.troubleshooting.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-sm">
                <div className="text-amber-400 font-medium mb-1">Problem: {item.problem}</div>
                <div className="text-zinc-400">Solution: {item.solution}</div>
              </div>
            ))}
          </div>
        </details>
      )}
    </section>
  );
}

function LabBlock({ lab }: { lab: NonNullable<Lesson['lab']> }) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (i: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="rounded-xl p-6 bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/20">
      <div className="flex items-center gap-2 mb-3 text-purple-400">
        <FlaskConical className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Lab: {lab.title}</h2>
      </div>
      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {lab.estTime}
        </span>
        <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300">{lab.difficulty}</span>
        <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-300">
          {completedSteps.size}/{lab.steps.length} steps done
        </span>
      </div>
      <p className="text-sm text-zinc-300 mb-4"><strong>Objective:</strong> {lab.objective}</p>

      {lab.setup.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
          <div className="text-xs font-semibold text-zinc-400 mb-2">SETUP</div>
          <ul className="space-y-1">
            {lab.setup.map((s, i) => (
              <li key={i} className="text-xs text-zinc-400 font-mono">{s}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        {lab.steps.map((step, i) => {
          const done = completedSteps.has(i);
          return (
            <div key={i} className={`rounded-lg border p-4 ${done ? 'border-purple-500/40 bg-purple-500/5' : 'border-zinc-800 bg-zinc-900/60'}`}>
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleStep(i)}
                  className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition ${
                    done ? 'bg-purple-500 border-purple-500' : 'border-zinc-600 hover:border-zinc-500'
                  }`}
                >
                  {done && <CheckCircle2 className="w-3 h-3 text-white" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-zinc-100 mb-1">Step {i + 1}: {step.title}</div>
                  <p className="text-sm text-zinc-400 mb-3">{step.instruction}</p>
                  {step.code && (
                    <pre className="overflow-x-auto p-3 rounded bg-[#0d0d14] border border-zinc-800 text-xs custom-scrollbar mb-3">
                      <code className="font-mono text-zinc-300 whitespace-pre">{step.code}</code>
                    </pre>
                  )}
                  {step.expectedOutput && (
                    <div className="p-3 rounded bg-emerald-500/5 border border-emerald-500/20 text-xs font-mono text-emerald-300/80 mb-3">
                      <div className="text-emerald-400 font-sans font-medium mb-1">Expected output:</div>
                      <pre className="whitespace-pre">{step.expectedOutput}</pre>
                    </div>
                  )}
                  {step.explanation && (
                    <div className="text-xs text-zinc-500 italic">{step.explanation}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {lab.verification && (
        <div className="mt-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-sm">
          <strong className="text-emerald-400">Verification:</strong> <span className="text-zinc-300">{lab.verification}</span>
        </div>
      )}
      {lab.cleanup && lab.cleanup.length > 0 && (
        <details className="mt-4">
          <summary className="text-sm text-zinc-400 cursor-pointer hover:text-zinc-200">Cleanup</summary>
          <div className="mt-2 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            {lab.cleanup.map((c, i) => (
              <div key={i} className="text-xs font-mono text-zinc-400">{c}</div>
            ))}
          </div>
        </details>
      )}
    </section>
  );
}

function ProgressiveExampleBlock({ example }: { example: NonNullable<Lesson['progressiveExample']> }) {
  return (
    <section className="rounded-xl p-6 bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/20">
      <div className="flex items-center gap-2 mb-3 text-emerald-400">
        <TrendingUp className="w-5 h-5" />
        <h2 className="text-lg font-semibold">{example.title}</h2>
      </div>
      <p className="text-sm text-zinc-400 mb-6">{example.description}</p>
      <div className="space-y-6">
        {example.stages.map((stage, i) => (
          <div key={i} className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                stage.name === 'Tiny' ? 'bg-zinc-700 text-zinc-300' :
                stage.name === 'Small' ? 'bg-blue-500/20 text-blue-300' :
                'bg-emerald-500/20 text-emerald-300'
              }`}>{stage.name}</span>
              <span className="text-sm text-zinc-300">{stage.description}</span>
            </div>
            <pre className="overflow-x-auto p-4 rounded-lg bg-[#0d0d14] border border-zinc-800 text-xs custom-scrollbar mb-2">
              <code className="font-mono text-zinc-200 whitespace-pre">{stage.code}</code>
            </pre>
            <div className="text-xs text-zinc-500 italic px-2">{stage.explanation}</div>
            {i < example.stages.length - 1 && (
              <div className="flex justify-center my-3 text-zinc-600">↓</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function PracticeTab({ exercises }: { exercises: NonNullable<Lesson['exercises']> }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [showHint, setShowHint] = useState<Set<number>>(new Set());

  const toggleReveal = (i: number) => setRevealed((prev) => { const n = new Set(prev); if (n.has(i)) n.delete(i); else n.add(i); return n; });
  const toggleHint = (i: number) => setShowHint((prev) => { const n = new Set(prev); if (n.has(i)) n.delete(i); else n.add(i); return n; });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-emerald-400 mb-2">
        <ListChecks className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Hands-On Exercises</h2>
      </div>
      <p className="text-sm text-zinc-400">Try each exercise yourself first. Use the hint if stuck, then check the solution.</p>
      {exercises.map((ex, i) => (
        <div key={i} className="rounded-xl p-6 bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
            <p className="text-zinc-200 leading-relaxed">{ex.prompt}</p>
          </div>
          {ex.starterCode && (
            <div className="rounded-lg overflow-hidden border border-zinc-800 mb-4">
              <div className="px-4 py-2 bg-zinc-900/50 border-b border-zinc-800 text-xs text-zinc-500">Starter code</div>
              <pre className="overflow-x-auto p-4 text-sm custom-scrollbar"><code className="font-mono text-zinc-300 whitespace-pre">{ex.starterCode}</code></pre>
            </div>
          )}
          <div className="flex gap-3">
            {ex.hint && (
              <button onClick={() => toggleHint(i)} className="px-3 py-1.5 text-xs rounded-md bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />{showHint.has(i) ? 'Hide Hint' : 'Show Hint'}
              </button>
            )}
            <button onClick={() => toggleReveal(i)} className="px-3 py-1.5 text-xs rounded-md bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />{revealed.has(i) ? 'Hide Solution' : 'Show Solution'}
            </button>
          </div>
          {showHint.has(i) && ex.hint && (
            <div className="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-sm text-amber-200">
              <strong>Hint:</strong> {ex.hint}
            </div>
          )}
          {revealed.has(i) && (
            <div className="mt-4 rounded-lg overflow-hidden border border-emerald-500/30">
              <div className="px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-xs text-emerald-400 font-medium">
                Solution {ex.solutionLanguage && `(${ex.solutionLanguage})`}
              </div>
              <pre className="overflow-x-auto p-4 text-sm custom-scrollbar bg-[#0d0d14]"><code className="font-mono text-zinc-200 whitespace-pre">{ex.solution}</code></pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function QuizTab({ questions }: { questions: NonNullable<Lesson['quiz']> }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Set<number>>(new Set());

  const selectAnswer = (qIdx: number, optIdx: number) => {
    if (submitted.has(qIdx)) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };
  const submit = (qIdx: number) => {
    if (answers[qIdx] === undefined) return;
    setSubmitted((prev) => new Set(prev).add(qIdx));
  };

  const correctCount = questions.filter((q, i) => submitted.has(i) && answers[i] === q.correctIndex).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-purple-400">
          <HelpCircle className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Test Your Knowledge</h2>
        </div>
        <div className="text-sm text-zinc-400">Score: <span className="text-purple-400 font-bold">{correctCount}</span>/{questions.length}</div>
      </div>
      {questions.map((q, qIdx) => {
        const isSubmitted = submitted.has(qIdx);
        const selected = answers[qIdx];
        const isCorrect = selected === q.correctIndex;
        return (
          <div key={qIdx} className="rounded-xl p-6 bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm flex-shrink-0">Q{qIdx + 1}</div>
              <p className="text-zinc-200 font-medium leading-relaxed">{q.question}</p>
            </div>
            <div className="space-y-2 ml-11">
              {q.options.map((opt, optIdx) => {
                const isSelected = selected === optIdx;
                const isAnswer = optIdx === q.correctIndex;
                let cls = 'border-zinc-700 bg-zinc-900 hover:border-zinc-600';
                if (isSubmitted) {
                  if (isAnswer) cls = 'border-green-500 bg-green-500/10';
                  else if (isSelected) cls = 'border-red-500 bg-red-500/10';
                  else cls = 'border-zinc-800 opacity-60';
                } else if (isSelected) cls = 'border-purple-500 bg-purple-500/10';
                return (
                  <button key={optIdx} onClick={() => selectAnswer(qIdx, optIdx)} disabled={isSubmitted} className={`w-full text-left p-3 rounded-lg border text-sm transition ${cls}`}>
                    <span className="text-zinc-500 mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                    <span className="text-zinc-200">{opt}</span>
                    {isSubmitted && isAnswer && <CheckCircle2 className="inline-block w-4 h-4 text-green-500 ml-2" />}
                  </button>
                );
              })}
            </div>
            {!isSubmitted ? (
              <button onClick={() => submit(qIdx)} disabled={selected === undefined} className="mt-4 ml-11 px-4 py-2 text-sm rounded-md bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition">
                Submit Answer
              </button>
            ) : (
              <div className={`mt-4 ml-11 p-3 rounded-lg text-sm ${isCorrect ? 'bg-green-500/10 text-green-300 border border-green-500/30' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'}`}>
                <strong>{isCorrect ? 'Correct!' : 'Not quite.'}</strong> {q.explanation}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProjectTab({ project }: { project: NonNullable<Lesson['miniProject']> }) {
  const [showSolution, setShowSolution] = useState(false);
  return (
    <div className="space-y-6">
      <div className="rounded-xl p-6 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30">
        <div className="flex items-center gap-2 mb-3 text-purple-400">
          <Trophy className="w-5 h-5" />
          <h2 className="text-lg font-semibold">{project.title}</h2>
        </div>
        <p className="text-zinc-300 leading-relaxed mb-4">{project.description}</p>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Clock className="w-3 h-3" /> Estimated time: {project.estTime}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-zinc-500" /> Requirements
        </h3>
        <ul className="space-y-2">
          {project.requirements.map((req, i) => (
            <li key={i} className="flex items-start gap-2 text-zinc-300">
              <Zap className="w-3.5 h-3.5 text-purple-500 mt-1 flex-shrink-0" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => setShowSolution(!showSolution)} className="px-4 py-2 text-sm rounded-md bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition flex items-center gap-2">
          <Code2 className="w-4 h-4" />{showSolution ? 'Hide Solution' : 'Show Reference Solution'}
        </button>
      </div>
      {showSolution && (
        <div className="rounded-lg overflow-hidden border border-purple-500/30">
          <div className="px-4 py-2 bg-purple-500/10 border-b border-purple-500/20 text-xs text-purple-300 font-medium">
            Reference Solution ({project.solutionLanguage})
          </div>
          <pre className="overflow-x-auto p-4 text-sm custom-scrollbar bg-[#0d0d14]">
            <code className="font-mono text-zinc-200 whitespace-pre">{project.solutionCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
