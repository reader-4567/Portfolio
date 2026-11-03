import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import { ArrowUp, Github, Linkedin, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t py-12 transition-colors ${
        isDark ? 'bg-black border-neutral-900 text-neutral-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-800/40 dark:border-neutral-800/40">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-xs border ${
                isDark ? 'bg-neutral-900 border-neutral-700 text-white' : 'bg-white border-neutral-300 text-black'
              }`}
            >
              KSK
            </div>
            <div>
              <p className={`text-sm font-display font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {PERSONAL_INFO.name}
              </p>
              <p className="text-xs font-mono text-neutral-500">
                {PERSONAL_INFO.college} · Hyderabad
              </p>
            </div>
          </div>

          {/* Social and quick links */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex items-center gap-1.5 hover:text-[#0077B5] transition-colors"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Mail size={14} />
              <span>Email</span>
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
              className={`p-2 rounded-xl border flex items-center gap-1.5 transition-colors ${
                isDark
                  ? 'border-neutral-800 hover:bg-neutral-900 text-neutral-400 hover:text-white'
                  : 'border-neutral-300 hover:bg-neutral-200 text-neutral-700 hover:text-black'
              }`}
              title="Return to top"
            >
              <ArrowUp size={14} />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. Designed & Built with React, TypeScript & Three.js.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Hyderabad, Telangana, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
