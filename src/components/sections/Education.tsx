
import React from 'react';
import { EDUCATION_DATA } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import { GraduationCap, MapPin, BookOpen, CheckCircle2 } from 'lucide-react';

export const Education: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const coursework = [
    'Data Structures & Algorithms',
    'Object-Oriented Programming (Java)',
    'Database Management Systems',
    'Computer Networks',
    'Operating Systems',
    'Compiler Design',
    'Automata Theory',
    'Principles of Programming Languages',
    'Distributed DBMS'
  ];

  return (
    <section
      id="education"
      className="py-24 relative overflow-hidden border-t border-neutral-800/40 dark:border-neutral-800/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-wider mb-3 text-neutral-500">
              <span className="text-neutral-400">05</span>
              <span>//</span>
              <span className="uppercase">ACADEMIC JOURNEY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
              Education
            </h2>
          </div>

          <p className="text-sm font-mono text-neutral-500 max-w-sm">
            My academic journey in Computer Science and Engineering.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-12">
          {EDUCATION_DATA.map((edu, idx) => (
            <div
              key={idx}
              className={`relative p-8 sm:p-10 rounded-3xl border transition-all ${
                isDark
                  ? 'bg-neutral-950/70 border-neutral-800 shadow-2xl'
                  : 'bg-white border-neutral-200 shadow-sm'
              }`}
            >

              {/* Institution and Degree Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-neutral-800/50 dark:border-neutral-800/50">
                <div className="space-y-2">

                  <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
                    <GraduationCap size={16} />
                    <span>{edu.period}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold">
                    {edu.degree}
                  </h3>

                  <div
                    className={`text-base sm:text-lg font-medium ${
                      isDark ? 'text-neutral-300' : 'text-neutral-700'
                    }`}
                  >
                    {edu.field}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 pt-1">
                    <span className="font-semibold text-neutral-500">
                      {edu.institution}
                    </span>

                    <span>•</span>

                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {edu.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start lg:items-end justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono border ${
                      isDark
                        ? 'bg-neutral-900 border-neutral-700 text-neutral-300'
                        : 'bg-neutral-100 border-neutral-300 text-neutral-700'
                    }`}
                  >
                    B.Tech CSE Undergraduate
                  </span>
                </div>
              </div>

              {/* Academic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">

                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                    Academic Background
                  </h4>

                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? 'text-neutral-300' : 'text-neutral-700'
                    }`}
                  >
                    {edu.description}
                  </p>

                  <ul className="space-y-3 pt-2">
                    {edu.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-emerald-500 shrink-0 mt-0.5"
                        />

                        <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Curriculum Subjects */}
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                    <BookOpen size={14} />
                    <span>Subjects Studied</span>
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {coursework.map((course) => (
                      <span
                        key={course}
                        className={`text-xs font-mono px-3 py-1.5 rounded-xl border ${
                          isDark
                            ? 'bg-neutral-900/60 border-neutral-800 text-neutral-300'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                        }`}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
