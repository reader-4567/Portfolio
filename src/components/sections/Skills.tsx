import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import { ToolIcon } from '../ui/ToolIcons';
import {
  Code2,
  Layout,
  Database as DatabaseIcon,
  Wrench,
  Bot,
} from 'lucide-react';

export const Skills: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');

  // Category icons mapping:
  // 0: Programming Languages, 1: Frontend Development, 2: Database, 3: Development Tools, 4: AI Tools & Platforms
  const categoryIcons = [Code2, Layout, DatabaseIcon, Wrench, Bot];

  const displayedCategories =
    selectedCategory === 'all'
      ? SKILL_CATEGORIES
      : [SKILL_CATEGORIES[selectedCategory]];

  const totalSkillsCount = SKILL_CATEGORIES.reduce(
    (acc, c) => acc + c.skills.length,
    0
  );

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 relative overflow-hidden border-t border-neutral-800/40 dark:border-neutral-800/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-wider mb-3 text-neutral-500">
              <span className="text-neutral-400">02</span>
              <span>//</span>
              <span className="uppercase">TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
              Skills & Toolset
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-neutral-500 max-w-md">
            Verified competencies across systems programming, frontend engineering, relational databases, developer tooling, and modern AI platforms.
          </p>
        </div>

        {/* Filter Pills - Responsive Flex Wrap */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 mb-8 sm:mb-12">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all duration-200 border ${
              selectedCategory === 'all'
                ? isDark
                  ? 'bg-neutral-100 text-neutral-950 border-neutral-100 font-semibold shadow-md'
                  : 'bg-neutral-900 text-white border-neutral-900 font-semibold shadow-md'
                : isDark
                ? 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                : 'bg-neutral-100 border-neutral-300 text-neutral-600 hover:text-neutral-950 hover:border-neutral-400'
            }`}
          >
            All ({totalSkillsCount})
          </button>

          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = categoryIcons[idx] || Code2;
            const isSelected = selectedCategory === idx;
            return (
              <button
                key={cat.title}
                type="button"
                onClick={() => setSelectedCategory(idx)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all duration-200 border ${
                  isSelected
                    ? isDark
                      ? 'bg-neutral-100 text-neutral-950 border-neutral-100 font-semibold shadow-md'
                      : 'bg-neutral-900 text-white border-neutral-900 font-semibold shadow-md'
                    : isDark
                    ? 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    : 'bg-neutral-100 border-neutral-300 text-neutral-600 hover:text-neutral-950 hover:border-neutral-400'
                }`}
              >
                <Icon size={13} className="shrink-0" />
                <span className="truncate max-w-[130px] sm:max-w-none">{cat.title}</span>
                <span className="text-[10px] opacity-60 shrink-0">({cat.skills.length})</span>
              </button>
            );
          })}
        </div>

        {/* Categories Stack */}
        <div className="space-y-8 sm:space-y-12">
          {displayedCategories.map((category) => {
            const catIndexInFull = SKILL_CATEGORIES.findIndex(
              (c) => c.title === category.title
            );
            const Icon = categoryIcons[catIndexInFull] || Code2;
            const isAiCategory = category.title.includes('AI');
            const isDatabaseCategory = category.title === 'Database';

            return (
              <div
                key={category.title}
                className={`p-4 xs:p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border transition-all ${
                  isDark
                    ? 'bg-neutral-950/70 border-neutral-800/80 shadow-2xl shadow-black/40'
                    : 'bg-white border-neutral-200/90 shadow-sm'
                }`}
              >
                {/* Category Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 sm:pb-6 mb-6 sm:mb-8 border-b border-neutral-800/50 dark:border-neutral-800/50 gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center border shrink-0 transition-transform duration-300 ${
                        isDark
                          ? 'bg-neutral-900 border-neutral-700 text-cyan-400'
                          : 'bg-neutral-100 border-neutral-300 text-blue-600'
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg xs:text-xl sm:text-2xl font-display font-bold tracking-tight">
                        {category.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-mono text-neutral-500 mt-0.5 line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <span
                      className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono border ${
                        isDark
                          ? 'bg-neutral-900 border-neutral-800 text-neutral-400'
                          : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                      }`}
                    >
                      {category.skills.length} verified technologies
                    </span>
                  </div>
                </div>

                {/* AI Tools Special Layout with Subcategories */}
                {isAiCategory && category.subcategories ? (
                  <div className="space-y-6 sm:space-y-8">
                    {category.subcategories.map((subcatName) => {
                      const subcatSkills = category.skills.filter(
                        (s) => s.subcategory === subcatName
                      );
                      if (subcatSkills.length === 0) return null;

                      return (
                        <div key={subcatName} className="space-y-3 sm:space-y-4">
                          {/* Subcategory Label */}
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                            <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold shrink-0">
                              {subcatName}
                            </h4>
                            <div className="h-px flex-1 bg-neutral-800/50 dark:bg-neutral-800/50" />
                          </div>

                          {/* Subcategory Skills Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            {subcatSkills.map((skill) => (
                              <div
                                key={skill.name}
                                className={`group p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
                                  isDark
                                    ? 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900/80 hover:shadow-xl hover:shadow-cyan-500/5'
                                    : 'bg-neutral-50/80 border-neutral-200 hover:border-neutral-400 hover:bg-white hover:shadow-lg'
                                }`}
                              >
                                <div>
                                  {/* Logo and Name */}
                                  <div className="flex items-start justify-between gap-2.5 mb-3 sm:mb-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-2 bg-neutral-900/90 dark:bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                                        <ToolIcon
                                          name={skill.iconKey || skill.name}
                                          size={24}
                                        />
                                      </div>
                                      <div className="min-w-0">
                                        <h5 className="text-base sm:text-lg font-display font-bold tracking-tight truncate group-hover:text-cyan-400 transition-colors">
                                          {skill.name}
                                        </h5>
                                        <span className="text-[10px] sm:text-[11px] font-mono text-cyan-500/90 font-medium truncate block">
                                          {skill.level}
                                        </span>
                                      </div>
                                    </div>

                                    <span
                                      className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 ${
                                        isDark
                                          ? 'bg-neutral-800/80 border-neutral-700 text-neutral-300'
                                          : 'bg-neutral-200 border-neutral-300 text-neutral-700'
                                      }`}
                                    >
                                      {subcatName}
                                    </span>
                                  </div>

                                  <p
                                    className={`text-xs leading-relaxed mb-3 sm:mb-4 ${
                                      isDark ? 'text-neutral-400' : 'text-neutral-600'
                                    }`}
                                  >
                                    {skill.description}
                                  </p>
                                </div>

                                {/* Tags */}
                                <div className="pt-3 border-t border-neutral-800/40 dark:border-neutral-800/40">
                                  <div className="flex flex-wrap gap-1.5">
                                    {skill.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                                          isDark
                                            ? 'bg-neutral-800/60 text-neutral-400 group-hover:text-neutral-300'
                                            : 'bg-neutral-200/70 text-neutral-600 group-hover:text-neutral-800'
                                        }`}
                                      >
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : isDatabaseCategory ? (
                  /* Dedicated Featured Database Showcase Card */
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`md:col-span-12 group p-4 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:-translate-y-1 flex flex-col md:flex-row justify-between gap-5 sm:gap-6 ${
                          isDark
                            ? 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900/80 hover:shadow-xl'
                            : 'bg-neutral-50/80 border-neutral-200 hover:border-neutral-400 hover:bg-white hover:shadow-lg'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 min-w-0">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
                            <ToolIcon
                              name={skill.iconKey || skill.name}
                              size={34}
                            />
                          </div>
                          <div className="space-y-1.5 sm:space-y-2 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                              <h4 className="text-xl sm:text-2xl font-display font-bold tracking-tight group-hover:text-cyan-400 transition-colors">
                                {skill.name}
                              </h4>
                              <span
                                className={`px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded text-[10px] sm:text-[11px] font-mono border ${
                                  isDark
                                    ? 'bg-neutral-800 border-neutral-700 text-neutral-300'
                                    : 'bg-neutral-200 border-neutral-300 text-neutral-700'
                                }`}
                              >
                                {skill.level}
                              </span>
                            </div>
                            <p
                              className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${
                                isDark ? 'text-neutral-400' : 'text-neutral-600'
                              }`}
                            >
                              {skill.description}
                            </p>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex md:flex-col justify-start md:justify-center items-start md:items-end gap-2 shrink-0 border-t md:border-t-0 md:border-l border-neutral-800/40 pt-3 md:pt-0 md:pl-6">
                          <div className="flex flex-wrap md:justify-end gap-1 sm:gap-1.5 max-w-full md:max-w-xs">
                            {skill.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded transition-colors ${
                                  isDark
                                    ? 'bg-neutral-800/60 text-neutral-300 group-hover:text-cyan-400'
                                    : 'bg-neutral-200/80 text-neutral-800 group-hover:text-blue-600'
                                }`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Responsive Grid for Programming, Frontend, 3D Web, Tools */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`group p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
                          isDark
                            ? 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900/80 hover:shadow-xl hover:shadow-cyan-500/5'
                            : 'bg-neutral-50/80 border-neutral-200 hover:border-neutral-400 hover:bg-white hover:shadow-lg'
                        }`}
                      >
                        <div>
                          {/* Logo and Name */}
                          <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-2 bg-neutral-900/90 dark:bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                                <ToolIcon
                                  name={skill.iconKey || skill.name}
                                  size={24}
                                />
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-base sm:text-lg font-display font-bold tracking-tight truncate group-hover:text-cyan-400 transition-colors">
                                  {skill.name}
                                </h4>
                                <span className="text-[10px] sm:text-[11px] font-mono text-neutral-500 truncate block">
                                  {skill.level}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p
                            className={`text-xs leading-relaxed mb-3 sm:mb-4 ${
                              isDark ? 'text-neutral-400' : 'text-neutral-600'
                            }`}
                          >
                            {skill.description}
                          </p>
                        </div>

                        {/* Technical Concept Tags */}
                        <div className="pt-3 border-t border-neutral-800/40 dark:border-neutral-800/40">
                          <div className="flex flex-wrap gap-1.5">
                            {skill.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                                  isDark
                                    ? 'bg-neutral-800/60 text-neutral-400 group-hover:text-neutral-300'
                                    : 'bg-neutral-200/70 text-neutral-600 group-hover:text-neutral-800'
                                }`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
