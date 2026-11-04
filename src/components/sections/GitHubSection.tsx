import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GitHubUser, GitHubRepo } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  Search,
  RefreshCw,
  FolderGit2,
  Calendar,
  AlertCircle,
  Users,
  CheckCircle,
} from 'lucide-react';

export const GitHubSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  const fetchGitHubData = async () => {
    setLoading(true);
    setError(null);
    setIsRateLimited(false);

    try {
      // 1. Fetch user profile
      const userRes = await fetch(
        `https://api.github.com/users/${PERSONAL_INFO.githubUsername}`
      );

      if (userRes.status === 403) {
        setIsRateLimited(true);
        throw new Error(
          'GitHub API rate limit reached (60 requests/hour for public requests). Please visit profile directly.'
        );
      }

      if (!userRes.ok) {
        throw new Error(`Failed to load GitHub user: ${userRes.statusText}`);
      }

      const userData: GitHubUser = await userRes.json();
      setUser(userData);

      // 2. Fetch public repos sorted by last updated
      const reposRes = await fetch(
        `https://api.github.com/users/${PERSONAL_INFO.githubUsername}/repos?sort=updated&per_page=30`
      );

      if (reposRes.ok) {
        const reposData: GitHubRepo[] = await reposRes.json();
        setRepos(reposData);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error contacting GitHub API';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  // Filter repos by search term and selected language
  const languages = Array.from(
    new Set(repos.map((r) => r.language).filter(Boolean) as string[])
  );

  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLang =
      selectedLanguage === 'all' || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  return (
    <section
      id="github"
      className="py-24 relative overflow-hidden border-t border-neutral-800/40 dark:border-neutral-800/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-wider mb-3 text-neutral-500">
              <span className="text-neutral-400">04</span>
              <span>//</span>
              <span className="uppercase">LIVE API INTEGRATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
              GitHub Repositories
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchGitHubData}
              disabled={loading}
              className={`p-2.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors ${
                isDark
                  ? 'border-neutral-800 hover:bg-neutral-900 text-neutral-300'
                  : 'border-neutral-200 hover:bg-neutral-100 text-neutral-700'
              }`}
              title="Refresh GitHub API data"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Sync API</span>
            </button>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                isDark
                  ? 'bg-neutral-100 hover:bg-white text-neutral-950 border-neutral-100'
                  : 'bg-neutral-900 hover:bg-black text-white border-neutral-900'
              }`}
            >
              <Github size={15} />
              <span>@{PERSONAL_INFO.githubUsername}</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Live Profile Card */}
        {user && (
          <div
            className={`p-4 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl border mb-8 sm:mb-12 flex flex-col md:flex-row items-center justify-between gap-6 ${
              isDark
                ? 'bg-neutral-950/70 border-neutral-800'
                : 'bg-white border-neutral-200 shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left min-w-0 w-full md:w-auto">
              <img
                src={user.avatar_url}
                alt={user.name || user.login}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-neutral-700/60 object-cover shadow-xl shrink-0"
              />
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-lg sm:text-xl font-display font-bold truncate">
                    {user.name || user.login}
                  </h3>
                  <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                    @{user.login}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {user.bio || 'Aspiring Python Full Stack Developer passionate about clean code & open source.'}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono text-neutral-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> Joined {new Date(user.created_at).getFullYear()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {user.followers} followers · {user.following} following
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats Counter */}
            <div className="flex items-center justify-around w-full md:w-auto gap-4 sm:gap-6 border-t md:border-t-0 md:border-l border-neutral-800 pt-4 md:pt-0 md:pl-8 shrink-0">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-display font-bold text-cyan-400">
                  {user.public_repos}
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-neutral-500 uppercase">
                  Public Repos
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-display font-bold text-neutral-200">
                  {repos.reduce((acc, r) => acc + r.stargazers_count, 0)}
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-neutral-500 uppercase">
                  Stars
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-display font-bold text-neutral-200">
                  {repos.reduce((acc, r) => acc + r.forks_count, 0)}
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-neutral-500 uppercase">
                  Forks
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border animate-pulse space-y-4 ${
                  isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
                }`}
              >
                <div className="h-5 bg-neutral-800 rounded w-2/3" />
                <div className="h-10 bg-neutral-800/60 rounded" />
                <div className="h-4 bg-neutral-800/40 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error / Rate Limit State */}
        {!loading && error && (
          <div
            className={`p-8 rounded-3xl border text-center space-y-4 ${
              isDark
                ? 'bg-neutral-950/80 border-neutral-800 text-neutral-300'
                : 'bg-neutral-50 border-neutral-200 text-neutral-700'
            }`}
          >
            <AlertCircle size={32} className="mx-auto text-amber-500" />
            <div className="space-y-1">
              <h4 className="font-display font-bold text-lg">
                {isRateLimited ? 'GitHub API Rate Limit' : 'Unable to Load Repositories'}
              </h4>
              <p className="text-xs sm:text-sm font-mono text-neutral-500 max-w-lg mx-auto">
                {error}
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={fetchGitHubData}
                className="px-4 py-2 rounded-xl text-xs font-mono border border-neutral-700 hover:border-neutral-500 transition-colors"
              >
                Try Again
              </button>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-neutral-100 text-neutral-900 hover:bg-white"
              >
                Open reader-4567 on GitHub
              </a>
            </div>
          </div>
        )}

        {/* Search & Filter Bar */}
        {!loading && !error && repos.length > 0 && (
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
              />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-mono border focus:outline-none transition-colors ${
                  isDark
                    ? 'bg-neutral-900/80 border-neutral-800 focus:border-cyan-400 text-neutral-200'
                    : 'bg-white border-neutral-200 focus:border-blue-500 text-neutral-900'
                }`}
              />
            </div>

            {/* Language Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedLanguage('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  selectedLanguage === 'all'
                    ? isDark
                      ? 'bg-neutral-800 text-cyan-400 font-semibold'
                      : 'bg-neutral-200 text-blue-700 font-semibold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                All ({repos.length})
              </button>
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    selectedLanguage === lang
                      ? isDark
                        ? 'bg-neutral-800 text-cyan-400 font-semibold'
                        : 'bg-neutral-200 text-blue-700 font-semibold'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && !error && (
          <>
            {filteredRepos.length === 0 ? (
              <div
                className={`p-12 rounded-3xl border text-center ${
                  isDark ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <FolderGit2 size={32} className="mx-auto text-neutral-500 mb-3" />
                <p className="font-display font-semibold text-neutral-300">
                  No repositories match your filter.
                </p>
                <p className="text-xs font-mono text-neutral-500 mt-1">
                  Try clearing the search query or language filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                      isDark
                        ? 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900/60 shadow-lg'
                        : 'bg-white border-neutral-200 hover:border-neutral-400 hover:shadow-md'
                    }`}
                  >
                    <div>
                      {/* Repo Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <FolderGit2 size={16} className="text-cyan-400 shrink-0" />
                          <h4 className="font-display font-bold text-base tracking-tight group-hover:text-cyan-400 transition-colors line-clamp-1">
                            {repo.name}
                          </h4>
                        </div>
                        <ExternalLink
                          size={13}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 shrink-0"
                        />
                      </div>

                      {/* Description */}
                      <p
                        className={`text-xs leading-relaxed line-clamp-3 mb-4 ${
                          isDark ? 'text-neutral-400' : 'text-neutral-600'
                        }`}
                      >
                        {repo.description || 'Public GitHub repository by reader-4567.'}
                      </p>
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-4 border-t border-neutral-800/40 dark:border-neutral-800/40 flex items-center justify-between text-xs font-mono text-neutral-500">
                      <div className="flex items-center gap-2">
                        {repo.language && (
                          <span className="flex items-center gap-1.5 text-neutral-300">
                            <span className="w-2 h-2 rounded-full bg-cyan-400" />
                            {repo.language}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                          <Star size={12} /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={12} /> {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
