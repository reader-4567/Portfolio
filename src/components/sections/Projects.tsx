import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { ProjectModal } from '../ui/ProjectModal';
import { Github, ExternalLink, ArrowUpRight, ShoppingBag, Grid3X3, GitBranch, RefreshCw } from 'lucide-react';

// Interactive mini Tic-Tac-Toe preview widget inside the project card
function MiniTicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(['X', 'O', 'X', null, 'X', null, 'O', null, 'O']);
  const [turn, setTurn] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.every(Boolean) ? 'Draw' : null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else {
      setTurn(turn === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBoard(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between bg-neutral-950 text-neutral-100 rounded-xl select-none font-mono">
      <div className="flex items-center justify-between text-[11px] pb-2 border-b border-neutral-800">
        <span className="text-cyan-400 flex items-center gap-1.5">
          <Grid3X3 size={13} />
          {winner ? (winner === 'Draw' ? 'Game Over: Draw' : `Winner: ${winner}!`) : `Turn: Player ${turn}`}
        </span>
        <button
          type="button"
          onClick={resetGame}
          className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-white px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800"
        >
          <RefreshCw size={10} /> Reset
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1.5 my-2 max-w-[190px] mx-auto w-full">
        {board.map((cell, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Tic-Tac-Toe square ${idx + 1}, ${cell ? `contains ${cell}` : 'empty'}`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(idx);
            }}
            className={`w-14 h-14 rounded-lg flex items-center justify-center font-display font-bold text-lg border transition-all ${
              cell === 'X'
                ? 'bg-neutral-900 border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.15)]'
                : cell === 'O'
                ? 'bg-neutral-900 border-amber-500/50 text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.15)]'
                : 'bg-neutral-900/50 border-neutral-800 text-neutral-600 hover:border-neutral-700 hover:bg-neutral-900'
            }`}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="text-center text-[10px] text-neutral-500">
        Interactive Logic Demo
      </div>
    </div>
  );
}

// Procedural visual illustration for E-Commerce UI Clone
function EcommercePreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between bg-neutral-950 text-neutral-100 rounded-xl font-mono text-[11px]">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <ShoppingBag size={14} className="text-cyan-400" />
          <span className="font-semibold text-neutral-200">APEX STORE // UI</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-neutral-400">Cart (3)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 my-2">
        <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
          <div className="w-full h-14 rounded bg-neutral-800/80 mb-2 flex items-center justify-center text-neutral-600 font-sans text-xs">
            Sneaker V1
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-neutral-300">Titanium Low</span>
            <span className="text-cyan-400 font-bold">$189</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
          <div className="w-full h-14 rounded bg-neutral-800/80 mb-2 flex items-center justify-center text-neutral-600 font-sans text-xs">
            Chrono 01
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-neutral-300">Steel Watch</span>
            <span className="text-cyan-400 font-bold">$240</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-1">
        <span>Responsive Grid</span>
        <span className="text-emerald-400">Cart Total: $429.00</span>
      </div>
    </div>
  );
}

// Procedural visual illustration for GitHub Profile Viewer
function GitHubViewerPreview() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between bg-neutral-950 text-neutral-100 rounded-xl font-mono text-[11px]">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <GitBranch size={14} className="text-cyan-400" />
          <span className="text-neutral-300">GH API Explorer</span>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          200 OK
        </span>
      </div>

      <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-2 my-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 text-xs font-bold">
            SK
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-200">reader-4567</div>
            <div className="text-[10px] text-neutral-500">Public Repos: Active</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 text-[10px] text-center pt-1 border-t border-neutral-800/60">
          <div className="p-1 rounded bg-neutral-950">
            <span className="text-neutral-500 block">Repos</span>
            <span className="text-neutral-200 font-bold">LIVE</span>
          </div>
          <div className="p-1 rounded bg-neutral-950">
            <span className="text-neutral-500 block">Followers</span>
            <span className="text-neutral-200 font-bold">SYNC</span>
          </div>
          <div className="p-1 rounded bg-neutral-950">
            <span className="text-neutral-500 block">API</span>
            <span className="text-cyan-400 font-bold">REST</span>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-neutral-500 flex justify-between">
        <span>Asynchronous Fetch</span>
        <span>Rate-limit safe</span>
      </div>
    </div>
  );
}

export const Projects: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getCustomPreview = (id: string) => {
    switch (id) {
      case 'tic-tac-toe':
        return <MiniTicTacToe />;
      case 'ecommerce-ui-clone':
        return <EcommercePreview />;
      case 'github-profile-viewer':
        return <GitHubViewerPreview />;
      default:
        return null;
    }
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 relative overflow-hidden border-t border-neutral-800/40 dark:border-neutral-800/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-wider mb-3 text-neutral-500">
              <span className="text-neutral-400">03</span>
              <span>//</span>
              <span className="uppercase">FEATURED PORTFOLIO WORK</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
              Selected Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-neutral-500 max-w-md">
            Production builds, interactive algorithms, and API tools built with authentic code and clean architecture.
          </p>
        </div>

        {/* Project Editorial Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={`group flex flex-col justify-between rounded-3xl border transition-all duration-300 overflow-hidden ${
                isDark
                  ? 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-600 hover:shadow-2xl hover:shadow-cyan-500/5'
                  : 'bg-white border-neutral-200 hover:border-neutral-400 hover:shadow-xl'
              }`}
            >
              <div>
                {/* Visual Preview Container */}
                <div className="p-4 sm:p-5 border-b border-neutral-800/50 dark:border-neutral-800/50 bg-neutral-900/30">
                  <div className="w-full h-56 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center relative">
                    {getCustomPreview(project.id)}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400">
                      0{index + 1} // {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}
                  >
                    {project.shortDescription}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-md border ${
                          isDark
                            ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                            : 'bg-neutral-100 border-neutral-300 text-neutral-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div
                className={`p-6 pt-0 flex items-center justify-between gap-3`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className={`text-xs font-mono font-medium flex items-center gap-1.5 px-4 py-2 rounded-xl border transition-colors ${
                    isDark
                      ? 'border-neutral-700 hover:border-neutral-500 text-neutral-200 hover:text-white bg-neutral-900/60'
                      : 'border-neutral-300 hover:border-neutral-400 text-neutral-800 hover:text-black bg-neutral-100'
                  }`}
                >
                  <span>Details & Code</span>
                  <ArrowUpRight size={13} />
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl border transition-colors ${
                    isDark
                      ? 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                      : 'border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-300'
                  }`}
                  aria-label={`GitHub repo for ${project.title}`}
                  title="View GitHub repository"
                >
                  <Github size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Live Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
