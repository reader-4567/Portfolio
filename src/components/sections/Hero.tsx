import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import { HeroScene } from '../3d/HeroScene';
import { ArrowDown, Github, Linkedin, FileText, Sparkles, MapPin, Terminal } from 'lucide-react';

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 ${
            isDark ? 'bg-cyan-500/30' : 'bg-sky-400/20'
          }`}
        />
        <div
          className={`absolute bottom-10 right-10 w-[350px] h-[350px] rounded-full blur-[160px] opacity-15 ${
            isDark ? 'bg-neutral-500/20' : 'bg-neutral-400/20'
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & Action Controls */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            {/* Status / Identity Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 self-start px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-colors max-w-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shrink-0" />
              <span className={`truncate ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                {PERSONAL_INFO.title}
              </span>
              <span className="text-neutral-500 hidden xs:inline">|</span>
              <span className="flex items-center gap-1 text-neutral-400 shrink-0">
                <MapPin size={11} /> Hyderabad
              </span>
            </div>

            {/* Main Name & Dynamic Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1] break-words">
                <span className={isDark ? 'text-white' : 'text-neutral-950'}>
                  {PERSONAL_INFO.name}
                </span>
              </h1>
              <p
                className={`text-base sm:text-xl md:text-2xl font-light tracking-normal leading-relaxed max-w-2xl ${
                  isDark ? 'text-neutral-300' : 'text-neutral-700'
                }`}
              >
                {PERSONAL_INFO.headline}
              </p>
            </div>

            {/* Sub-text / Factual Background */}
            <p
              className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-xl ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}
            >
              Computer Science and Engineering student at{' '}
              <span className={isDark ? 'text-neutral-200 font-medium' : 'text-neutral-900 font-medium'}>
                Sri Indu College of Engineering and Technology
              </span>
              . Learning frontend development, exploring backend technologies, and building practical web projects.
            </p>

            {/* Tech stack badge strip */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 font-mono text-xs">
              <span className="text-neutral-500 flex items-center gap-1 mr-1 text-[11px] sm:text-xs">
                <Terminal size={12} /> Stack:
              </span>
              {['C', 'Python', 'Java', 'HTML5', 'CSS3', 'JavaScript', 'MySQL', 'Git', 'VS Code', 'Cursor'].map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border text-[10px] sm:text-[11px] font-mono transition-colors ${
                    isDark
                      ? 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Callouts (View Work, Resume, GitHub, LinkedIn) */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-3 sm:pt-4">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className={`w-full xs:w-auto px-5 sm:px-6 py-3 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                  isDark
                    ? 'bg-neutral-100 hover:bg-white text-neutral-950 hover:shadow-cyan-500/10'
                    : 'bg-neutral-900 hover:bg-black text-white hover:shadow-neutral-900/20'
                }`}
              >
                <span>View My Work</span>
                <ArrowDown size={14} />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('resume')}
                className={`w-full xs:w-auto px-4 sm:px-5 py-3 rounded-xl font-medium text-xs sm:text-sm border flex items-center justify-center gap-2 transition-all duration-200 ${
                  isDark
                    ? 'border-neutral-700 hover:border-neutral-500 bg-neutral-900/60 text-neutral-200 hover:text-white'
                    : 'border-neutral-300 hover:border-neutral-400 bg-neutral-100/80 text-neutral-800 hover:text-black'
                }`}
              >
                <FileText size={14} />
                <span>Download Resume</span>
              </button>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className={`w-full xs:w-auto px-4 py-3 rounded-xl font-medium text-xs sm:text-sm border flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 ${
                  isDark
                    ? 'border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-300 text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                <Github size={15} />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className={`w-full xs:w-auto px-4 py-3 rounded-xl font-medium text-xs sm:text-sm border flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 ${
                  isDark
                    ? 'border-neutral-800 hover:border-[#0A66C2]/60 text-neutral-400 hover:text-sky-400 hover:bg-neutral-900'
                    : 'border-neutral-200 hover:border-[#0A66C2]/60 text-neutral-600 hover:text-[#0A66C2] hover:bg-neutral-100'
                }`}
              >
                <Linkedin size={15} className="text-[#0A66C2]" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Factual Highlights Summary */}
            <div
              className={`pt-5 sm:pt-6 border-t grid grid-cols-3 gap-2 sm:gap-4 text-left max-w-lg ${
                isDark ? 'border-neutral-800/80' : 'border-neutral-200'
              }`}
            >
              <div>
                <p
                  className={`font-display font-bold text-lg sm:text-xl md:text-2xl ${
                    isDark ? 'text-neutral-100' : 'text-neutral-900'
                  }`}
                >
                  B.Tech
                </p>
                <p className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase mt-0.5">CSE Degree</p>
              </div>
              <div>
                <p
                  className={`font-display font-bold text-lg sm:text-xl md:text-2xl ${
                    isDark ? 'text-neutral-100' : 'text-neutral-900'
                  }`}
                >
                  3+ Core
                </p>
                <p className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase mt-0.5">Projects</p>
              </div>
              <div>
                <p
                  className={`font-display font-bold text-lg sm:text-xl md:text-2xl ${
                    isDark ? 'text-neutral-100' : 'text-neutral-900'
                  }`}
                >
                  Active
                </p>
                <p className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase mt-0.5">Repositories</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Centerpiece */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full">
              <HeroScene theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
