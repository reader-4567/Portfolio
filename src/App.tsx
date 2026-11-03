/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { GitHubSection } from './components/sections/GitHubSection';
import { Education } from './components/sections/Education';
import { ResumeSection } from './components/sections/ResumeSection';
import { Contact } from './components/sections/Contact';

function PortfolioContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative ${
        isDark
          ? 'bg-black text-neutral-100 selection:bg-neutral-800 selection:text-white'
          : 'bg-[#fafafa] text-neutral-900 selection:bg-neutral-200 selection:text-neutral-950'
      }`}
    >
      {/* Background Grid Texture */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none -z-20 opacity-60" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubSection />
        <Education />
        <ResumeSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
