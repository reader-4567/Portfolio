import React, { useEffect } from 'react';
import { Project } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { X, Github, ExternalLink, CheckCircle, Code, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl z-10 transition-all ${
          isDark
            ? 'bg-neutral-950 border-neutral-800 text-neutral-100'
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-neutral-800/40 dark:border-neutral-800/40 backdrop-blur-md bg-inherit">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              {project.category}
            </span>
            <h3 className="text-2xl font-display font-bold">{project.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className={`p-2 rounded-xl border transition-colors ${
              isDark
                ? 'border-neutral-800 hover:bg-neutral-900 text-neutral-400 hover:text-white'
                : 'border-neutral-200 hover:bg-neutral-100 text-neutral-600 hover:text-black'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className={`px-3 py-1 rounded-lg text-xs font-mono border ${
                  isDark
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                    : 'bg-neutral-100 border-neutral-300 text-neutral-700'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Full Narrative */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              Architecture & Overview
            </h4>
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
              {project.fullDescription}
            </p>
          </div>

          {/* Technical Key Highlights */}
          <div
            className={`p-5 rounded-2xl border ${
              isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}
          >
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3 flex items-center gap-2">
              <Layers size={14} />
              <span>Engineering Highlights</span>
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Links */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2 border transition-all ${
                isDark
                  ? 'bg-neutral-100 text-neutral-950 hover:bg-white border-neutral-100'
                  : 'bg-neutral-900 text-white hover:bg-black border-neutral-900'
              }`}
            >
              <Github size={15} />
              <span>Inspect Repository on GitHub</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2 border transition-all ${
                  isDark
                    ? 'border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white'
                    : 'border-neutral-300 hover:border-neutral-400 text-neutral-700 hover:text-black'
                }`}
              >
                <ExternalLink size={15} />
                <span>Open Live Deployment</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
