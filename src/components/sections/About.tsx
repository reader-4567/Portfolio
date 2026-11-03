
import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import { Code, Compass, GraduationCap, Layers } from 'lucide-react';

export const About: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="about" className="py-24 relative overflow-hidden border-t border-neutral-800/40 dark:border-neutral-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-wider mb-3 text-neutral-500">
              <span className="text-neutral-400">01</span>
              <span>//</span>
              <span className="uppercase">ABOUT ME</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
              About Sai Kiran
            </h2>
          </div>

          <p className="text-sm font-mono text-neutral-500 max-w-sm">
            Computer Science student interested in programming, web development, and building practical software projects.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-base leading-relaxed">

            {/* Academic Background */}
            <div
              className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                isDark
                  ? 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                  : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2.5">
                <GraduationCap className={isDark ? 'text-cyan-400' : 'text-blue-600'} size={20} />
                <span>Academic Background</span>
              </h3>

              <p className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                I am pursuing a Bachelor of Technology (B.Tech) in{' '}
                <strong className={isDark ? 'text-white' : 'text-neutral-900'}>
                  Computer Science and Engineering
                </strong>{' '}
                at{' '}
                <strong className={isDark ? 'text-white' : 'text-neutral-900'}>
                  Sri Indu College of Engineering and Technology
                </strong>{' '}
                in Hyderabad, Telangana, India.
              </p>

              <p className={`mt-3.5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                During my academic journey, I have studied programming fundamentals using <strong>C, Python, and Java</strong>, along with object-oriented programming concepts, data structures, algorithms, database management systems, computer networks, and other core computer science subjects.
              </p>
            </div>

            {/* Technical Interests */}
            <div
              className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                isDark
                  ? 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                  : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2.5">
                <Code className={isDark ? 'text-cyan-400' : 'text-blue-600'} size={20} />
                <span>Technical Skills & Interests</span>
              </h3>

              <p className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                I have knowledge of <strong>HTML5, CSS3, and JavaScript</strong> for frontend development, along with <strong>MySQL</strong> for working with databases. I enjoy learning how websites work and applying programming concepts through practical projects.
              </p>

              <p className={`mt-3.5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                I also use <strong>Git, GitHub, and Visual Studio Code</strong> in my development workflow. Alongside these tools, I explore AI platforms such as Cursor, ChatGPT, Claude, Google Antigravity, Google AI Studio, and Gamma to support my learning and project development.
              </p>
            </div>

            {/* Career Direction */}
            <div
              className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                isDark
                  ? 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                  : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2.5">
                <Compass className={isDark ? 'text-cyan-400' : 'text-blue-600'} size={20} />
                <span>Career Goals</span>
              </h3>

              <p className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                My goal is to become a skilled{' '}
                <strong className={isDark ? 'text-white' : 'text-neutral-900'}>
                  Full Stack Developer
                </strong>
                . I am continuously improving my programming and problem-solving skills, exploring web technologies, and building projects to strengthen my practical knowledge.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6">

            {/* Profile Summary */}
            <div
              className={`p-6 sm:p-7 rounded-2xl border relative overflow-hidden ${
                isDark
                  ? 'bg-neutral-900/60 border-neutral-800'
                  : 'bg-neutral-100/90 border-neutral-300'
              }`}
            >
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 flex items-center justify-between">
                <span>PROFILE OVERVIEW</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              <div className="space-y-3 font-mono text-xs">

                <div className="flex flex-col xs:flex-row xs:items-center justify-between py-2 border-b border-neutral-800/40 dark:border-neutral-800/40 gap-1">
                  <span className="text-neutral-500">Name</span>
                  <span className="text-left xs:text-right font-medium">{PERSONAL_INFO.name}</span>
                </div>

                <div className="flex flex-col xs:flex-row xs:items-center justify-between py-2 border-b border-neutral-800/40 dark:border-neutral-800/40 gap-1">
                  <span className="text-neutral-500">Institution</span>
                  <span className="text-left xs:text-right font-medium">{PERSONAL_INFO.college}</span>
                </div>

                <div className="flex flex-col xs:flex-row xs:items-center justify-between py-2 border-b border-neutral-800/40 dark:border-neutral-800/40 gap-1">
                  <span className="text-neutral-500">Degree</span>
                  <span className="text-left xs:text-right font-medium">{PERSONAL_INFO.degree}</span>
                </div>

                <div className="flex flex-col xs:flex-row xs:items-center justify-between py-2 border-b border-neutral-800/40 dark:border-neutral-800/40 gap-1">
                  <span className="text-neutral-500">Location</span>
                  <span className="text-left xs:text-right font-medium">{PERSONAL_INFO.location}</span>
                </div>

                <div className="flex flex-col xs:flex-row xs:items-center justify-between py-2 border-b border-neutral-800/40 dark:border-neutral-800/40 gap-1">
                  <span className="text-neutral-500">Career Goal</span>
                  <span className="text-left xs:text-right font-medium text-cyan-500">Full Stack Developer</span>
                </div>

                <div className="flex flex-col xs:flex-row xs:items-center justify-between py-2 gap-1">
                  <span className="text-neutral-500">GitHub</span>
                  <a
                    href={PERSONAL_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-left xs:text-right font-medium text-cyan-400 hover:underline"
                  >
                    @{PERSONAL_INFO.githubUsername}
                  </a>
                </div>

              </div>
            </div>

            {/* Personal Approach */}
            <div
              className={`p-6 sm:p-7 rounded-2xl border ${
                isDark
                  ? 'bg-neutral-900/30 border-neutral-800'
                  : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <h4 className="font-display font-semibold text-base mb-4 flex items-center gap-2">
                <Layers size={18} className="text-neutral-400" />
                <span>My Approach</span>
              </h4>

              <ul className="space-y-3.5 text-xs font-mono">

                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-500 font-bold">&gt;</span>
                  <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                    <strong>Continuous Learning:</strong> Improving my technical knowledge by exploring new concepts and technologies.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-500 font-bold">&gt;</span>
                  <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                    <strong>Problem Solving:</strong> Breaking problems into smaller steps and developing logical solutions.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-500 font-bold">&gt;</span>
                  <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                    <strong>Practical Learning:</strong> Applying programming concepts by working on personal and academic projects.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-500 font-bold">&gt;</span>
                  <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                    <strong>Clean Code:</strong> Focusing on readable code and understanding how programs work.
                  </span>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
