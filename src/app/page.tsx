'use client';

import { useState, useRef } from 'react';
import { modules } from '@/lib/modules';
import { getLessonsForModule, getLessonMeta } from '@/lib/lessonMetadata';
import { getLessonContent } from '@/lib/content';
import { useProgress } from '@/lib/useProgress';
import { Sidebar } from '@/components/Sidebar';
import { CodeBlock } from '@/components/CodeBlock';
import { TerminalPanel, TerminalHandle } from '@/components/TerminalPanel';
import {
  Home, ChevronRight, Clock, Zap, Target, BookOpen, Code2,
  FlaskConical, HelpCircle, ExternalLink, CheckCircle2, Circle,
  ArrowLeft, ArrowRight, Lightbulb, AlertCircle, Trophy, Lock, Play,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type View =
  | { type: 'home' }
  | { type: 'module'; moduleSlug: string }
  | { type: 'lesson'; moduleSlug: string; lessonSlug: string }
  | { type: 'capstone'; moduleSlug: string };

type Tab = 'objective' | 'concepts' | 'code' | 'lab' | 'quiz' | 'resources';

const PHASE_COLORS: Record<string, string> = {
  Foundation: 'from-emerald-500 to-teal-500',
  Intermediate: 'from-blue-500 to-indigo-500',
  Advanced: 'from-purple-500 to-pink-500',
  'Real-World': 'from-amber-500 to-orange-500',
};

export default function Page() {
  const [view, setView] = useState<View>({ type: 'home' });
  const [activeTab, setActiveTab] = useState<Tab>('objective');
  const terminalRef = useRef<TerminalHandle>(null);
  const {
    progress, completeLesson, passQuiz, completeLab,
    isLessonCompleted, isQuizPassed, isLabCompleted,
    getModuleProgress, getModuleXP,
  } = useProgress();

  const navigate = (moduleSlug: string, lessonSlug?: string) => {
    if (!lessonSlug) {
      setView({ type: 'module', moduleSlug });
    } else if (lessonSlug === 'capstone') {
      setView({ type: 'capstone', moduleSlug });
    } else {
      setView({ type: 'lesson', moduleSlug, lessonSlug });
      setActiveTab('objective');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===== HOME (Dashboard) =====
  if (view.type === 'home') {
    return (
      <div className="flex min-h-screen bg-[#0F172A] text-zinc-100">
        <Sidebar currentModule={undefined} onNavigate={navigate} onHomeClick={() => setView({ type: 'home' })} />
        <main className="flex-1">
          {/* Hero */}
          <div className="relative overflow-hidden border-b border-zinc-800">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent" />
            <div className="relative max-w-6xl mx-auto px-8 py-16">
              <div className="flex items-center gap-2 mb-4 text-sm text-purple-400">
                <Zap className="w-4 h-4" />
                <span className="font-medium">Industrial-Grade Learning</span>
              </div>
              <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                LearnStack
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mb-8">
                Master every tech stack the way Google engineers do. Real terminals, real code,
                real projects. Not tutorials — engineering education.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
                <StatCard icon="📚" label="Modules" value={`${modules.length}`} />
                <StatCard icon="📖" label="Total Lessons" value={`${modules.reduce((s, m) => s + m.totalLessons, 0)}`} />
                <StatCard icon="⚡" label="Your XP" value={`${progress.totalXP}`} />
                <StatCard icon="🔥" label="Streak" value={`${progress.streak} days`} />
              </div>
            </div>
          </div>

          {/* Module Grid */}
          <div className="max-w-6xl mx-auto px-8 py-12">
            <h2 className="text-2xl font-bold mb-2">Choose Your Path</h2>
            <p className="text-zinc-400 mb-8">Each module is a structured learning path with phases, labs, and capstone projects.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map(mod => {
                const pct = getModuleProgress(mod.slug, mod.totalLessons);
                const xp = getModuleXP(mod.slug);
                return (
                  <button
                    key={mod.slug}
                    onClick={() => navigate(mod.slug)}
                    className="group text-left rounded-xl p-6 bg-[#1E293B] border border-zinc-800 hover:border-zinc-700 transition-all hover:translate-y-[-2px]"
                    style={{ background: `linear-gradient(135deg, ${mod.color}11 0%, #1E293B 60%)` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: mod.gradient }}>
                        {mod.icon}
                      </div>
                      {mod.capstoneProject && (
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 flex items-center gap-1">
                          <Trophy className="w-3 h-3" /> Capstone
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-white transition">{mod.title}</h3>
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2 min-h-[40px]">{mod.description}</p>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-zinc-500">{mod.totalLessons} lessons · {mod.estimatedHours}h</span>
                      <span className="text-amber-500">{xp} XP</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: mod.gradient }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ===== MODULE VIEW =====
  if (view.type === 'module') {
    const mod = modules.find(m => m.slug === view.moduleSlug)!;
    const lessons = getLessonsForModule(mod.slug);
    const phases = ['Foundation', 'Intermediate', 'Advanced', 'Real-World'] as const;
    const lessonsByPhase = phases.map(p => ({ phase: p, lessons: lessons.filter(l => l.phase === p) })).filter(g => g.lessons.length > 0);

    return (
      <div className="flex min-h-screen bg-[#0F172A] text-zinc-100">
        <Sidebar currentModule={mod.slug} onNavigate={navigate} onHomeClick={() => setView({ type: 'home' })} />
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-8 py-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
              <button onClick={() => setView({ type: 'home' })} className="hover:text-zinc-300">Home</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-zinc-300">{mod.title}</span>
            </div>

            {/* Module Header */}
            <div className="rounded-2xl p-8 mb-8 border border-zinc-800" style={{ background: `linear-gradient(135deg, ${mod.color}22 0%, transparent 70%)` }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl" style={{ background: mod.gradient }}>
                  {mod.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{mod.title}</h1>
                  <p className="text-zinc-400">{mod.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg p-3 bg-zinc-900/60">
                  <div className="text-2xl font-bold">{mod.totalLessons}</div>
                  <div className="text-xs text-zinc-500">Lessons</div>
                </div>
                <div className="rounded-lg p-3 bg-zinc-900/60">
                  <div className="text-2xl font-bold">{mod.estimatedHours}h</div>
                  <div className="text-xs text-zinc-500">Estimated</div>
                </div>
                <div className="rounded-lg p-3 bg-zinc-900/60">
                  <div className="text-2xl font-bold">{getModuleProgress(mod.slug, mod.totalLessons)}%</div>
                  <div className="text-xs text-zinc-500">Complete</div>
                </div>
              </div>
            </div>

            {/* Capstone */}
            {mod.capstoneProject && (
              <div className="rounded-xl p-6 mb-8 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30">
                <div className="flex items-center gap-2 mb-3 text-amber-400">
                  <Trophy className="w-5 h-5" />
                  <h2 className="text-lg font-bold">Capstone Project</h2>
                </div>
                <h3 className="text-xl font-bold mb-2">{mod.capstoneProject.title}</h3>
                <p className="text-zinc-300 mb-4">{mod.capstoneProject.description}</p>
                <button onClick={() => navigate(mod.slug, 'capstone')} className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 transition text-sm font-medium">
                  View Full Spec →
                </button>
              </div>
            )}

            {/* Lessons by Phase */}
            <div className="space-y-8">
              {lessonsByPhase.map(({ phase, lessons }) => (
                <div key={phase}>
                  <div className={`inline-block px-3 py-1 rounded text-xs font-medium text-white bg-gradient-to-r ${PHASE_COLORS[phase]} mb-4`}>
                    Phase: {phase}
                  </div>
                  <div className="space-y-2">
                    {lessons.map(lesson => {
                      const done = isLessonCompleted(mod.slug, lesson.slug);
                      return (
                        <button
                          key={lesson.slug}
                          onClick={() => navigate(mod.slug, lesson.slug)}
                          className="w-full flex items-center gap-3 p-4 rounded-lg bg-[#1E293B] border border-zinc-800 hover:border-zinc-700 transition text-left"
                        >
                          {done ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> : <Circle className="w-5 h-5 text-zinc-700 flex-shrink-0" />}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-zinc-100">{lesson.title}</div>
                            <div className="text-xs text-zinc-500 flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{lesson.duration}m</span>
                              <span>·</span>
                              <span>{lesson.difficulty}</span>
                              <span>·</span>
                              <span className="text-amber-500 flex items-center gap-1"><Zap className="w-3 h-3" />{lesson.xp} XP</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ===== LESSON VIEW =====
  if (view.type === 'lesson') {
    const mod = modules.find(m => m.slug === view.moduleSlug)!;
    const meta = getLessonMeta(view.moduleSlug, view.lessonSlug);
    const content = getLessonContent(view.moduleSlug, view.lessonSlug);
    const lessons = getLessonsForModule(mod.slug);
    const lessonIndex = lessons.findIndex(l => l.slug === view.lessonSlug);
    const prev = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
    const next = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;
    const done = isLessonCompleted(mod.slug, view.lessonSlug);

    if (!meta) return <div className="p-8">Lesson not found</div>;

    return (
      <div className="flex min-h-screen bg-[#0F172A] text-zinc-100">
        <Sidebar currentModule={mod.slug} currentLesson={view.lessonSlug} onNavigate={navigate} onHomeClick={() => setView({ type: 'home' })} />

        <main className="flex-1">
          {/* Topbar */}
          <div className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <button onClick={() => setView({ type: 'home' })} className="hover:text-zinc-300">Home</button>
              <ChevronRight className="w-3 h-3" />
              <button onClick={() => setView({ type: 'module', moduleSlug: mod.slug })} className="hover:text-zinc-300">{mod.title}</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-zinc-300 truncate">{meta.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 flex items-center gap-1">
                <Zap className="w-3 h-3" /> {meta.xp} XP
              </span>
              {done && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-zinc-800 px-6">
            <div className="flex gap-1 overflow-x-auto">
              <TabButton active={activeTab === 'objective'} onClick={() => setActiveTab('objective')} icon={<Target className="w-4 h-4" />} label="Objective" />
              <TabButton active={activeTab === 'concepts'} onClick={() => setActiveTab('concepts')} icon={<BookOpen className="w-4 h-4" />} label="Concepts" />
              <TabButton active={activeTab === 'code'} onClick={() => setActiveTab('code')} icon={<Code2 className="w-4 h-4" />} label="Code" />
              <TabButton active={activeTab === 'lab'} onClick={() => setActiveTab('lab')} icon={<FlaskConical className="w-4 h-4" />} label="Lab" />
              <TabButton active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} icon={<HelpCircle className="w-4 h-4" />} label="Quiz" />
              <TabButton active={activeTab === 'resources'} onClick={() => setActiveTab('resources')} icon={<ExternalLink className="w-4 h-4" />} label="Resources" />
            </div>
          </div>

          {/* Content + Terminal Split */}
          <div className="flex">
            {/* LEFT: Content (55%) */}
            <div className="w-full lg:w-[55%] p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'objective' && content && (
                    <div className="space-y-6">
                      <h1 className="text-2xl font-bold">{meta.title}</h1>
                      <p className="text-zinc-400">{meta.subtitle}</p>

                      <div className="rounded-xl p-5 bg-[#1E293B] border border-zinc-800">
                        <h3 className="font-semibold text-emerald-400 mb-3">By the end of this lesson you will be able to:</h3>
                        <ul className="space-y-2">
                          {content.objectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2 text-zinc-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl p-5 bg-blue-500/5 border border-blue-500/20">
                        <h3 className="font-semibold text-blue-400 mb-2">Real-World Context</h3>
                        <p className="text-zinc-300 text-sm">{content.realWorldContext}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Prerequisites</h3>
                        <ul className="space-y-1">
                          {content.prerequisites.map((p, i) => (
                            <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                              <span className="text-zinc-600">▸</span> {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'concepts' && content && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Concepts</h2>

                      {content.conceptDiagram && (
                        <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0D1117]">
                          <div className="px-4 py-2 bg-[#161B22] border-b border-zinc-800 text-xs text-zinc-400 flex items-center gap-2">
                            <BookOpen className="w-3 h-3" /> Architecture Diagram
                          </div>
                          <pre className="p-4 text-xs overflow-x-auto custom-scrollbar">
                            <code className="font-mono text-zinc-300 whitespace-pre">{content.conceptDiagram}</code>
                          </pre>
                        </div>
                      )}

                      <div className="prose prose-invert max-w-none">
                        {content.conceptExplanation.map((p, i) => (
                          <p key={i} className="text-zinc-300 leading-relaxed mb-4">{p}</p>
                        ))}
                      </div>

                      <div className="rounded-xl p-5 bg-amber-500/5 border border-amber-500/20">
                        <div className="flex items-center gap-2 mb-2 text-amber-400">
                          <Lightbulb className="w-4 h-4" />
                          <h3 className="font-semibold">Why this matters in production</h3>
                        </div>
                        <p className="text-zinc-300 text-sm">{content.whyItMatters}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'code' && content && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Code Examples</h2>
                      <p className="text-zinc-400 text-sm">Three approaches: Minimal → Real-World → Production. Each shows a different way to solve the same problem.</p>
                      {content.codeExamples.map((ex, i) => (
                        <div key={i}>
                          <h3 className="font-semibold mb-2 text-zinc-200">{ex.filename}</h3>
                          <CodeBlock code={ex.code} language={ex.language} filename={ex.filename} approach={ex.approach} />
                          {ex.explanation && (
                            <p className="text-sm text-zinc-400 mt-2">{ex.explanation}</p>
                          )}
                        </div>
                      ))}

                      {content.configFiles && content.configFiles.length > 0 && (
                        <div className="mt-8">
                          <h3 className="font-semibold mb-4">Configuration Files</h3>
                          {content.configFiles.map((cfg, i) => (
                            <div key={i} className="mb-4">
                              <CodeBlock code={cfg.content} language={cfg.language} filename={cfg.filename} />
                              <p className="text-xs text-zinc-500 mt-1">{cfg.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'lab' && content && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Hands-On Lab: {content.lab.title}</h2>
                      <p className="text-zinc-400 text-sm">Follow each step. Use the terminal on the right to run commands. Click "Run in Terminal" to auto-inject.</p>
                      {content.lab.steps.map((step, i) => (
                        <LabStepCard
                          key={i}
                          step={step}
                          onRun={() => step.command && terminalRef.current?.runCommand(step.command)}
                        />
                      ))}
                      {content.commonErrors.length > 0 && (
                        <div className="mt-8">
                          <h3 className="font-semibold mb-4 flex items-center gap-2 text-red-400">
                            <AlertCircle className="w-4 h-4" /> Common Errors
                          </h3>
                          <div className="space-y-3">
                            {content.commonErrors.map((err, i) => (
                              <div key={i} className="rounded-lg p-4 bg-red-500/5 border border-red-500/20">
                                <div className="font-mono text-sm text-red-400 mb-2">{err.error}</div>
                                <div className="text-sm text-zinc-300 mb-1"><strong className="text-green-400">Fix:</strong> {err.fix}</div>
                                <div className="text-xs text-zinc-500"><strong>Why:</strong> {err.rootCause}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'quiz' && content && (
                    <QuizTab
                      questions={content.quiz}
                      moduleSlug={mod.slug}
                      lessonSlug={view.lessonSlug}
                      onPass={() => passQuiz(mod.slug, view.lessonSlug, 50)}
                      onComplete={() => completeLesson(mod.slug, view.lessonSlug, meta.xp)}
                    />
                  )}

                  {activeTab === 'resources' && content && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Resources</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {content.resources.map((r, i) => (
                          <a key={i} href={r.url} target="_blank" rel="noreferrer" className="flex items-start gap-3 p-4 rounded-lg bg-[#1E293B] border border-zinc-800 hover:border-zinc-700 transition group">
                            {r.isHiddenGem && <span className="text-amber-500">⭐</span>}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-zinc-200 group-hover:text-white">{r.title}</div>
                              <div className="text-xs text-zinc-500 capitalize mt-0.5">{r.type}{r.isHiddenGem && ' · Hidden Gem'}</div>
                            </div>
                            <ExternalLink className="w-3 h-3 text-zinc-600 mt-1" />
                          </a>
                        ))}
                      </div>
                      <div className="rounded-xl p-5 bg-purple-500/5 border border-purple-500/20">
                        <h3 className="font-semibold text-purple-400 mb-2">What to Read Next</h3>
                        <p className="text-zinc-300 text-sm">{content.whatToReadNext}</p>
                      </div>
                    </div>
                  )}

                  {!content && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                        <Lock className="w-8 h-8 text-zinc-600" />
                      </div>
                      <h2 className="text-xl font-bold mb-2">Content Coming Soon</h2>
                      <p className="text-zinc-400 max-w-md">This lesson&apos;s full content is being written. The lesson metadata is ready — check back soon for the complete lesson with terminal, lab, and quiz.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Prev/Next */}
              <div className="flex justify-between gap-4 mt-12 pt-6 border-t border-zinc-800">
                {prev ? (
                  <button onClick={() => navigate(mod.slug, prev.slug)} className="flex-1 flex items-center gap-2 p-3 rounded-lg bg-[#1E293B] border border-zinc-800 hover:border-zinc-700 text-left">
                    <ArrowLeft className="w-4 h-4 text-zinc-500" />
                    <div><div className="text-xs text-zinc-500">Previous</div><div className="text-sm font-medium truncate">{prev.title}</div></div>
                  </button>
                ) : <div className="flex-1" />}
                {next ? (
                  <button onClick={() => navigate(mod.slug, next.slug)} className="flex-1 flex items-center justify-end gap-2 p-3 rounded-lg bg-[#1E293B] border border-zinc-800 hover:border-zinc-700 text-right">
                    <div><div className="text-xs text-zinc-500">Next</div><div className="text-sm font-medium truncate">{next.title}</div></div>
                    <ArrowRight className="w-4 h-4 text-zinc-500" />
                  </button>
                ) : <div className="flex-1" />}
              </div>
            </div>

            {/* RIGHT: Terminal (45%) */}
            <div className="hidden lg:block w-[45%] sticky top-[120px] border-l border-zinc-800" style={{ height: 'calc(100vh - 120px)' }}>
              <TerminalPanel ref={terminalRef} workingDir="~/myapp" venv=".venv" branch="main" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ===== CAPSTONE VIEW =====
  if (view.type === 'capstone') {
    const mod = modules.find(m => m.slug === view.moduleSlug)!;
    const cap = mod.capstoneProject;
    if (!cap) return <div>No capstone</div>;

    return (
      <div className="flex min-h-screen bg-[#0F172A] text-zinc-100">
        <Sidebar currentModule={mod.slug} currentLesson="capstone" onNavigate={navigate} onHomeClick={() => setView({ type: 'home' })} />
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-8 py-10">
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
              <button onClick={() => setView({ type: 'home' })} className="hover:text-zinc-300">Home</button>
              <ChevronRight className="w-3 h-3" />
              <button onClick={() => setView({ type: 'module', moduleSlug: mod.slug })} className="hover:text-zinc-300">{mod.title}</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-zinc-300">Capstone</span>
            </div>

            <div className="rounded-2xl p-8 mb-8 border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent">
              <div className="flex items-center gap-2 mb-3 text-amber-400">
                <Trophy className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Capstone: {cap.title}</h1>
              </div>
              <p className="text-zinc-300 mb-6">{cap.description}</p>

              <div className="rounded-lg overflow-hidden border border-zinc-800 bg-[#0D1117] mb-6">
                <div className="px-4 py-2 bg-[#161B22] border-b border-zinc-800 text-xs text-zinc-400">Architecture</div>
                <pre className="p-4 text-xs overflow-x-auto"><code className="font-mono text-zinc-300 whitespace-pre">{cap.architecture}</code></pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <ul className="space-y-1">
                    {cap.features.map((f, i) => <li key={i} className="text-sm text-zinc-400 flex items-start gap-2"><span className="text-amber-500">▸</span> {f}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {cap.techStack.map((t, i) => <span key={i} className="px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-300">{t}</span>)}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Grading Rubric</h3>
                <div className="space-y-2">
                  {cap.rubric.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-zinc-900/60">
                      <span className="text-sm text-zinc-300">{r.criterion}</span>
                      <span className="text-sm font-bold text-amber-400">{r.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return <div>Not found</div>;
}

// ===== Helper Components =====

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-xl p-4 bg-[#1E293B] border border-zinc-800">
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
      {icon} {label}
    </button>
  );
}

function LabStepCard({ step, onRun }: { step: any; onRun: () => void }) {
  const [completed, setCompleted] = useState(false);
  return (
    <div className={`rounded-xl p-4 border transition ${completed ? 'border-green-500/40 bg-green-500/5' : 'border-zinc-800 bg-[#1E293B]'}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => setCompleted(!completed)}
          className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition ${
            completed ? 'bg-green-500 border-green-500' : 'border-zinc-600 hover:border-zinc-500'
          }`}
        >
          {completed && <CheckCircle2 className="w-3 h-3 text-white" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-zinc-100 mb-1">Step {step.step}: {step.title}</div>
          <p className="text-sm text-zinc-400 mb-3">{step.instruction}</p>
          {step.command && (
            <div className="flex items-center gap-2 mb-2">
              <code className="flex-1 text-xs font-mono text-blue-400 bg-[#0D1117] px-3 py-2 rounded border border-zinc-800 overflow-x-auto">{step.command}</code>
              <button onClick={onRun} className="px-3 py-2 bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30 transition text-xs flex items-center gap-1 flex-shrink-0">
                <Play className="w-3 h-3" /> Run
              </button>
            </div>
          )}
          {step.expectedOutput && (
            <div className="text-xs text-emerald-400/70 font-mono mt-1">Expected: {step.expectedOutput}</div>
          )}
          {step.hint && (
            <details className="mt-2">
              <summary className="text-xs text-amber-400 cursor-pointer hover:text-amber-300">Hint</summary>
              <p className="text-xs text-zinc-500 mt-1">{step.hint}</p>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

function QuizTab({ questions, moduleSlug, lessonSlug, onPass, onComplete }: {
  questions: any[];
  moduleSlug: string;
  lessonSlug: string;
  onPass: () => void;
  onComplete: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Set<number>>(new Set());
  const [allSubmitted, setAllSubmitted] = useState(false);

  const correctCount = questions.filter((q, i) => submitted.has(i) && answers[i] === q.correctIndex).length;
  const allAnswered = questions.every((_, i) => submitted.has(i));
  const passed = correctCount >= 4;

  const submit = (i: number) => {
    if (answers[i] === undefined) return;
    setSubmitted(prev => new Set(prev).add(i));
  };

  const finishQuiz = () => {
    setAllSubmitted(true);
    if (correctCount >= 4) {
      onPass();
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quiz</h2>
        <div className="text-sm text-zinc-400">
          Score: <span className="text-purple-400 font-bold">{correctCount}</span>/{questions.length}
          {allSubmitted && (passed ? <span className="ml-2 text-green-400">✓ Passed!</span> : <span className="ml-2 text-red-400">✗ Need 4/5</span>)}
        </div>
      </div>
      <p className="text-zinc-400 text-sm">Answer all 5 questions. Need 4/5 to pass and unlock the next lesson.</p>

      {questions.map((q, qIdx) => {
        const isSubmitted = submitted.has(qIdx);
        const selected = answers[qIdx];
        const isCorrect = selected === q.correctIndex;
        return (
          <div key={qIdx} className="rounded-xl p-5 bg-[#1E293B] border border-zinc-800">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm flex-shrink-0">Q{qIdx + 1}</div>
              <p className="text-zinc-200 font-medium">{q.question}</p>
            </div>
            <div className="space-y-2 ml-10">
              {q.options.map((opt: string, optIdx: number) => {
                const isSelected = selected === optIdx;
                const isAnswer = optIdx === q.correctIndex;
                let cls = 'border-zinc-700 bg-zinc-900 hover:border-zinc-600';
                if (isSubmitted) {
                  if (isAnswer) cls = 'border-green-500 bg-green-500/10';
                  else if (isSelected) cls = 'border-red-500 bg-red-500/10';
                  else cls = 'border-zinc-800 opacity-60';
                } else if (isSelected) cls = 'border-purple-500 bg-purple-500/10';
                return (
                  <button
                    key={optIdx}
                    onClick={() => !isSubmitted && setAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                    disabled={isSubmitted}
                    className={`w-full text-left p-3 rounded-lg border text-sm transition ${cls}`}
                  >
                    <span className="text-zinc-500 mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                    <span className="text-zinc-200">{opt}</span>
                    {isSubmitted && isAnswer && <CheckCircle2 className="inline-block w-4 h-4 text-green-500 ml-2" />}
                  </button>
                );
              })}
            </div>
            {!isSubmitted ? (
              <button onClick={() => submit(qIdx)} disabled={selected === undefined} className="mt-4 ml-10 px-4 py-2 text-sm rounded-md bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 disabled:opacity-40 transition">
                Submit Answer
              </button>
            ) : (
              <div className={`mt-4 ml-10 p-3 rounded-lg text-sm ${isCorrect ? 'bg-green-500/10 text-green-300' : 'bg-amber-500/10 text-amber-300'}`}>
                <strong>{isCorrect ? '✓ Correct!' : '✗ Not quite.'}</strong> {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {allAnswered && !allSubmitted && (
        <button onClick={finishQuiz} className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg font-semibold text-white hover:from-purple-400 hover:to-indigo-500 transition">
          Finish Quiz ({correctCount}/{questions.length} correct)
        </button>
      )}
    </div>
  );
}
