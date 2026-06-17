'use client';

import { useState } from 'react';
import { modules } from '@/lib/modules';
import { lessonMetadata, getLessonsForModule } from '@/lib/lessonMetadata';
import { useProgress } from '@/lib/useProgress';
import { ChevronDown, ChevronRight, Lock, CheckCircle2, Circle, Code2, Trophy } from 'lucide-react';

interface SidebarProps {
  currentModule?: string;
  currentLesson?: string;
  onNavigate: (moduleSlug: string, lessonSlug?: string) => void;
  onHomeClick: () => void;
}

const PHASE_COLORS: Record<string, string> = {
  Foundation: 'from-emerald-500 to-teal-500',
  Intermediate: 'from-blue-500 to-indigo-500',
  Advanced: 'from-purple-500 to-pink-500',
  'Real-World': 'from-amber-500 to-orange-500',
};

export function Sidebar({ currentModule, currentLesson, onNavigate, onHomeClick }: SidebarProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(currentModule ? [currentModule] : [])
  );
  const { isLessonCompleted, getModuleProgress } = useProgress();

  const toggle = (slug: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <aside className="w-[260px] h-screen sticky top-0 bg-[#1E293B] border-r border-zinc-800 flex flex-col flex-shrink-0">
      {/* Logo */}
      <button
        onClick={onHomeClick}
        className="flex items-center gap-2 px-4 h-14 border-b border-zinc-800 hover:bg-zinc-800/50 transition"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <Code2 className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-white">LearnStack</span>
      </button>

      {/* Module Tree */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        {modules.map(mod => {
          const isExpanded = expanded.has(mod.slug);
          const lessons = getLessonsForModule(mod.slug);
          const progress = getModuleProgress(mod.slug, mod.totalLessons);
          const isActiveModule = currentModule === mod.slug;

          // Group by phase
          const phases = ['Foundation', 'Intermediate', 'Advanced', 'Real-World'] as const;
          const lessonsByPhase = phases.map(phase => ({
            phase,
            lessons: lessons.filter(l => l.phase === phase),
          })).filter(g => g.lessons.length > 0);

          return (
            <div key={mod.slug} className="mb-1">
              {/* Module Header */}
              <button
                onClick={() => {
                  toggle(mod.slug);
                  onNavigate(mod.slug);
                }}
                className={`w-full flex items-center gap-2 p-2 rounded hover:bg-zinc-800/50 transition text-left ${
                  isActiveModule ? 'bg-zinc-800/50' : ''
                }`}
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                )}
                <span className="text-base">{mod.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-zinc-200 truncate">{mod.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-1 rounded-full bg-zinc-700 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${progress}%`, background: mod.gradient }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-500">{progress}%</span>
                  </div>
                </div>
              </button>

              {/* Lessons (expanded) */}
              {isExpanded && (
                <div className="ml-3 mt-1 border-l border-zinc-800">
                  {lessonsByPhase.map(({ phase, lessons }) => (
                    <div key={phase} className="mb-2">
                      {/* Phase Banner */}
                      <div className={`px-2 py-0.5 mx-2 my-1 rounded text-[10px] font-medium text-white bg-gradient-to-r ${PHASE_COLORS[phase]} inline-block`}>
                        {phase}
                      </div>
                      {/* Lessons */}
                      {lessons.map(lesson => {
                        const isCurrent = currentLesson === lesson.slug;
                        const isDone = isLessonCompleted(mod.slug, lesson.slug);
                        return (
                          <button
                            key={lesson.slug}
                            onClick={() => onNavigate(mod.slug, lesson.slug)}
                            className={`w-full flex items-start gap-2 py-1.5 px-3 text-left text-sm transition border-l-2 ${
                              isCurrent
                                ? 'bg-purple-500/10 text-white border-purple-500'
                                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 border-transparent'
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-zinc-700 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="leading-tight truncate">{lesson.title}</div>
                              <div className="text-[10px] text-zinc-600 flex items-center gap-1 mt-0.5">
                                <span>{lesson.duration}m</span>
                                <span>·</span>
                                <span className="text-amber-500">{lesson.xp} XP</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                  {/* Capstone */}
                  {mod.capstoneProject && (
                    <button
                      onClick={() => onNavigate(mod.slug, 'capstone')}
                      className={`w-full flex items-center gap-2 py-1.5 px-3 text-left text-sm transition border-l-2 ${
                        currentLesson === 'capstone'
                          ? 'bg-amber-500/10 text-white border-amber-500'
                          : 'text-amber-500 hover:bg-zinc-800/30 border-transparent'
                      }`}
                    >
                      <Trophy className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="font-medium">Capstone Project</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
