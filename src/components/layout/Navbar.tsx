import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { PERSONAL_INFO, NAV_LINKS } from '../../data/portfolioData';
import { Sun, Moon, Menu, X, FileText, Github, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Identify active section
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const topOffset = targetEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'bg-black/85 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl shadow-black/40 py-3.5'
            : 'bg-white/85 backdrop-blur-md border-b border-neutral-200/80 shadow-md shadow-neutral-500/5 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none min-w-0"
        >
          <div
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-display font-bold text-xs sm:text-sm tracking-tighter border shrink-0 transition-all duration-300 ${
              isDark
                ? 'bg-neutral-900 border-neutral-700 text-neutral-100 group-hover:border-neutral-400 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                : 'bg-neutral-100 border-neutral-300 text-neutral-900 group-hover:border-neutral-500'
            }`}
          >
            KSK
          </div>
          <div className="flex flex-col min-w-0">
            <span
              className={`font-display text-xs sm:text-sm font-semibold tracking-wide truncate max-w-[140px] xs:max-w-[180px] sm:max-w-none transition-colors ${
                isDark ? 'text-neutral-100 group-hover:text-white' : 'text-neutral-900 group-hover:text-black'
              }`}
            >
              {PERSONAL_INFO.name}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-neutral-500 truncate">
              Python Full Stack Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className={`hidden md:flex items-center gap-1 lg:gap-1.5 p-1 rounded-full border transition-all duration-300 ${
            isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-100/70 border-neutral-200'
          }`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? isDark
                      ? 'bg-neutral-100 text-neutral-950 font-semibold shadow-sm'
                      : 'bg-neutral-900 text-white font-semibold shadow-sm'
                    : isDark
                    ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* GitHub quick link */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className={`p-2 rounded-lg border transition-all duration-200 ${
              isDark
                ? 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-900'
                : 'border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            <Github size={16} />
          </a>

          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className={`p-2 rounded-lg border transition-all duration-200 ${
              isDark
                ? 'border-neutral-800 text-neutral-400 hover:text-amber-300 hover:border-neutral-700 hover:bg-neutral-900'
                : 'border-neutral-200 text-neutral-600 hover:text-indigo-600 hover:border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Resume CTA Button */}
          <a
            href="#resume"
            onClick={(e) => handleNavClick(e, '#resume')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 ${
              isDark
                ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-700 hover:border-neutral-500'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300 hover:border-neutral-400'
            }`}
          >
            <FileText size={13} />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className={`md:hidden p-2 rounded-lg border transition-all ${
              isDark
                ? 'border-neutral-800 text-neutral-300 hover:bg-neutral-900'
                : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-4 py-5 transition-all ${
            isDark
              ? 'bg-neutral-950/95 border-neutral-800 text-neutral-200 backdrop-blur-xl'
              : 'bg-white/95 border-neutral-200 text-neutral-800 backdrop-blur-xl'
          }`}
        >
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? isDark
                        ? 'bg-neutral-900 text-white font-semibold border-l-2 border-cyan-400 pl-4'
                        : 'bg-neutral-100 text-neutral-950 font-semibold border-l-2 border-indigo-600 pl-4'
                      : isDark
                      ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={14} className="opacity-40" />
                </a>
              );
            })}
            <div
              className={`pt-3 mt-2 border-t ${
                isDark ? 'border-neutral-800/80' : 'border-neutral-200'
              }`}
            >
              <a
                href="#resume"
                onClick={(e) => handleNavClick(e, '#resume')}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  isDark
                    ? 'bg-neutral-100 hover:bg-white text-neutral-900'
                    : 'bg-neutral-900 hover:bg-black text-white'
                }`}
              >
                <FileText size={14} />
                <span>View Complete Resume</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
