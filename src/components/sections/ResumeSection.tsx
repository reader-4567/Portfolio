
import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import {
  FileText,
  Download,
  Printer,
  Terminal,
  MapPin,
  Mail,
  Github,
  Linkedin,
  Loader2,
  AlertCircle,
  X,
} from 'lucide-react';

/* =========================================================
   RESUME CONTENT
========================================================= */

const PROFESSIONAL_SUMMARY =
  'Computer Science and Engineering student with a strong foundation in programming, web development, database management, and REST APIs. Skilled in C, Python, Java, HTML, CSS, JavaScript, and MySQL, with hands-on experience developing interactive web applications, integrating REST APIs, and building projects such as a GitHub Profile Viewer, e-commerce UI clone, and Tic-Tac-Toe game. Seeking an entry-level software development opportunity to apply technical skills, solve real-world problems, and grow in a professional environment.';

const EDUCATION = [
  {
    qualification: 'B.E. in Computer Science and Engineering',
    institution: 'Sri Indu College of Engineering & Technology, Hyderabad',
    duration: '2023 – Present',
    score: 'CGPA: 8.59 / 10 [Till 6th Semester]',
  },
  {
    qualification: 'Telangana State Board of Intermediate Education',
    institution: 'SR Junior College',
    duration: '2021 – 2023',
    score: 'PERCENTAGE: 92.7',
  },
  {
    qualification: 'Board of Secondary Education',
    institution: 'Shanthi Nikethan Talent School',
    duration: '2021',
    score: 'CGPA: 10 / 10',
  },
];

const SKILLS = [
  { category: 'Programming:', value: 'C, Python, Java' },
  { category: 'Frontend:', value: 'HTML5, CSS3, JavaScript' },
  { category: 'Database:', value: 'MySQL' },
  { category: 'Tools:', value: 'Git, GitHub, VS Code' },
  {
    category: 'AI Tools:',
    value:
      'Cursor, Google Antigravity, ChatGPT, Claude, Gamma, Google AI Studio',
  },
];

const RESUME_PROJECTS = [
  {
    title: 'Amazon Clone UI',
    technologies: 'HTML5, CSS3',
    descriptions: [
      'Developed an Amazon-inspired e-commerce homepage using HTML5 and CSS3.',
      'Designed a multi-section interface with navigation, search, hero banner, product categories, promotions, and footer.',
      "Recreated Amazon's layout with CSS styling, hover effects, product cards, and dropdown menus.",
    ],
    github: 'https://github.com/reader-4567/Amazon-UI-Clone',
  },
  {
    title: 'Tic-Tac-Toe Game',
    technologies: 'HTML5, CSS3, JavaScript',
    descriptions: [
      'Developed an interactive Tic-Tac-Toe game using HTML5, CSS3, and JavaScript.',
      'Implemented game logic to detect wins, draws, and player turns.',
      'Added a restart feature to reset the game board.',
    ],
    github: 'https://github.com/reader-4567/Tic-Tac-Toe',
  },
  {
    title: 'GitHub Profile Viewer',
    technologies: 'HTML5, CSS3, JavaScript, GitHub REST API',
    descriptions: [
      'Developed an interactive GitHub Profile Viewer using HTML5, CSS3, and JavaScript.',
      'Used fetch(), async/await, and the GitHub REST API to retrieve profile and repository data.',
      'Implemented username search and dynamic display of GitHub profile details and repositories.',
    ],
    github: 'https://github.com/reader-4567/Github-Profile-Viewer',
  },
];

const CERTIFICATIONS = [
  'Merit Certificate on Technical Whiz Quiz',
  'TCS ION Career Edge – Program Professional Program',
  'LinkedIn Learning – Introduction to Web Design and Development',
  'LinkedIn Learning – Python Essential Training',
  'Gen AI Powered Data Analytics Job Simulation',
  'Infosys Foundation Finishing School for Employability Program – Test Engineer (Grade A)',
];

/* =========================================================
   COMPONENT
========================================================= */

export const ResumeSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'sheet' | 'text'>('sheet');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  /* =======================================================
     WAIT FOR STRUCTURED RESUME
  ======================================================= */

  const ensureSheetRendered = async (): Promise<HTMLElement | null> => {
    if (activeTab !== 'sheet') {
      setActiveTab('sheet');
    }

    return new Promise((resolve) => {
      let attempts = 0;
      const maxAttempts = 100;

      const check = () => {
        attempts++;

        const element = document.getElementById('printable-resume');

        if (element && element.offsetHeight > 0) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => resolve(element));
          });
          return;
        }

        if (attempts < maxAttempts) {
          window.setTimeout(check, 30);
        } else {
          resolve(null);
        }
      };

      window.setTimeout(check, 30);
    });
  };

  /* =======================================================
     DOWNLOAD SINGLE-PAGE A4 PDF
  ======================================================= */

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    setPdfError(null);

    let element: HTMLElement | null = null;

    try {
      element = await ensureSheetRendered();

      if (!element) {
        throw new Error('Resume element could not be rendered.');
      }

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const images = Array.from(element.querySelectorAll('img'));

      await Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve();

          return new Promise<void>((resolve) => {
            img.addEventListener('load', () => resolve(), { once: true });
            img.addEventListener('error', () => resolve(), { once: true });
          });
        })
      );

      element.classList.add('exporting-pdf');

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      });

      const html2canvasModule = await import('html2canvas-pro');
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = await import('jspdf');

      if (!html2canvas) {
        throw new Error('Unable to load html2canvas-pro.');
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: Math.max(element.scrollWidth, 900),

        onclone: (_document, clonedElement) => {
          clonedElement.style.backgroundColor = '#ffffff';
          clonedElement.style.color = '#111827';
          clonedElement.style.border = 'none';
          clonedElement.style.borderRadius = '0';
          clonedElement.style.boxShadow = 'none';
          clonedElement.style.overflow = 'visible';

          clonedElement
            .querySelectorAll<HTMLElement>('*')
            .forEach((node) => {
              node.style.textShadow = 'none';

              if (
                node.classList.contains('text-neutral-400') ||
                node.classList.contains('text-neutral-500') ||
                node.classList.contains('text-neutral-300') ||
                node.classList.contains('text-neutral-200')
              ) {
                node.style.color = '#374151';
              }

              if (
                node.classList.contains('text-cyan-400') ||
                node.classList.contains('text-cyan-500')
              ) {
                node.style.color = '#0284c7';
              }

              if (
                node.tagName === 'H3' ||
                node.tagName === 'H4' ||
                node.tagName === 'STRONG' ||
                node.classList.contains('font-bold') ||
                node.classList.contains('font-semibold')
              ) {
                node.style.color = '#111827';
              }

              if (node.tagName === 'A') {
                node.style.color = '#2563eb';
              }

              if (
                node.classList.contains('border-neutral-800') ||
                node.classList.contains('border-neutral-700')
              ) {
                node.style.borderColor = '#e5e7eb';
              }
            });
        },
      });

      if (!canvas.width || !canvas.height) {
        throw new Error('PDF capture produced an empty image.');
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // A4 dimensions.
      const PAGE_WIDTH = 210;
      const PAGE_HEIGHT = 297;

      // One inch top and bottom.
      const TOP_MARGIN = 25.4;
      const BOTTOM_MARGIN = 25.4;

      // Side margins.
      const SIDE_MARGIN = 10;

      const AVAILABLE_WIDTH = PAGE_WIDTH - SIDE_MARGIN * 2;
      const AVAILABLE_HEIGHT =
        PAGE_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN;

      // Preserve the original aspect ratio.
      const aspectRatio = canvas.width / canvas.height;

      let renderedWidth = AVAILABLE_WIDTH;
      let renderedHeight = renderedWidth / aspectRatio;

      // Fit the entire resume into the available page area.
      if (renderedHeight > AVAILABLE_HEIGHT) {
        renderedHeight = AVAILABLE_HEIGHT;
        renderedWidth = renderedHeight * aspectRatio;
      }

      // Center the resume within the available page area.
      const x = (PAGE_WIDTH - renderedWidth) / 2;

      const y =
        TOP_MARGIN +
        (AVAILABLE_HEIGHT - renderedHeight) / 2;

      const imageData = canvas.toDataURL('image/jpeg', 0.98);

      // Create exactly one A4 page.
      pdf.addImage(
        imageData,
        'JPEG',
        x,
        y,
        renderedWidth,
        renderedHeight,
        undefined,
        'FAST'
      );

      pdf.save('Kotla_Sai_Kiran_Resume.pdf');
    } catch (error) {
      console.error('PDF generation error:', error);

      const message =
        error instanceof Error
          ? error.message
          : 'An unexpected PDF generation error occurred.';

      setPdfError(`PDF download failed: ${message}`);
    } finally {
      element?.classList.remove('exporting-pdf');
      setIsGeneratingPdf(false);
    }
  };

  /* =======================================================
     PRINT RESUME
  ======================================================= */

  const handlePrint = async () => {
    try {
      const element = await ensureSheetRendered();

      if (!element) {
        throw new Error('Resume could not be rendered for printing.');
      }

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      window.print();
    } catch (error) {
      console.error('Print error:', error);

      setPdfError(
        error instanceof Error
          ? error.message
          : 'Unable to open the print dialog.'
      );
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="resume"
      className="py-20 relative border-t border-neutral-800/40 dark:border-neutral-800/40"
    >
      <style>{`
        /* ================================================
           PDF EXPORT
        ================================================ */

        #printable-resume.exporting-pdf {
          background: #ffffff !important;
          color: #111827 !important;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          overflow: visible !important;
        }

        #printable-resume.exporting-pdf * {
          box-shadow: none !important;
        }

        #printable-resume.exporting-pdf .text-neutral-400,
        #printable-resume.exporting-pdf .text-neutral-500,
        #printable-resume.exporting-pdf .text-neutral-300,
        #printable-resume.exporting-pdf .text-neutral-200 {
          color: #374151 !important;
        }

        #printable-resume.exporting-pdf h3,
        #printable-resume.exporting-pdf h4,
        #printable-resume.exporting-pdf strong,
        #printable-resume.exporting-pdf .font-bold,
        #printable-resume.exporting-pdf .font-semibold {
          color: #111827 !important;
        }

        #printable-resume.exporting-pdf a {
          color: #2563eb !important;
        }

        /* ================================================
           PRINT LAYOUT
        ================================================ */

        @media print {
          @page {
            size: A4 portrait;
            margin: 1in 10mm;
          }

          html,
          body {
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #111827 !important;
            overflow: visible !important;
          }

          body * {
            visibility: hidden !important;
          }

          #printable-resume,
          #printable-resume * {
            visibility: visible !important;
          }

          #resume {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            background: #ffffff !important;
            overflow: visible !important;
          }

          #printable-resume {
            display: block !important;
            position: static !important;
            width: 100% !important;
            max-width: none !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #111827 !important;
            overflow: visible !important;
            font-size: 8.5pt !important;
            line-height: 1.25 !important;
          }

          #printable-resume h3 {
            font-size: 21pt !important;
          }

          #printable-resume h4 {
            font-size: 9pt !important;
            margin-bottom: 4pt !important;
            padding-bottom: 2pt !important;
            border-color: #d1d5db !important;
          }

          #printable-resume p,
          #printable-resume li,
          #printable-resume span {
            font-size: 8.2pt !important;
            line-height: 1.25 !important;
          }

          #printable-resume .text-neutral-400,
          #printable-resume .text-neutral-500,
          #printable-resume .text-neutral-300,
          #printable-resume .text-neutral-200 {
            color: #374151 !important;
          }

          #printable-resume h3,
          #printable-resume h4,
          #printable-resume strong,
          #printable-resume .font-bold,
          #printable-resume .font-semibold {
            color: #111827 !important;
          }

          #printable-resume a {
            color: #2563eb !important;
          }

          #printable-resume .resume-section {
            margin-bottom: 8pt !important;
          }

          #printable-resume .resume-education-list {
            gap: 7pt !important;
          }

          #printable-resume .resume-project-list {
            gap: 7pt !important;
          }

          #printable-resume .resume-header {
            padding-bottom: 7pt !important;
            margin-bottom: 8pt !important;
          }

          #printable-resume .resume-contact {
            font-size: 7.2pt !important;
          }

          #printable-resume svg {
            width: 9px !important;
            height: 9px !important;
          }

          .page-break-avoid {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="resume-header-bar flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-wider mb-3 text-neutral-500">
              <span className="text-neutral-400">06</span>
              <span>//</span>
              <span className="uppercase">CURRICULUM VITAE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
              Resume &amp; Credentials
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              disabled={isGeneratingPdf}
              className={`px-4 py-2.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-60 ${
                isDark
                  ? 'border-neutral-800 hover:bg-neutral-900 text-neutral-300'
                  : 'border-neutral-200 hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              <Printer size={14} />
              <span>Print Resume</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className={`px-5 py-2.5 rounded-xl border text-xs font-mono font-medium flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60 ${
                isDark
                  ? 'bg-neutral-100 hover:bg-white text-neutral-950 border-neutral-100'
                  : 'bg-neutral-900 hover:bg-black text-white border-neutral-900'
              }`}
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>Download Resume PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {pdfError && (
          <div className="resume-error-banner mb-6 p-4 rounded-xl border border-red-500/40 bg-red-950/20 text-red-300 flex items-start justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{pdfError}</span>
            </div>

            <button
              type="button"
              onClick={() => setPdfError(null)}
              aria-label="Dismiss error"
              className="text-red-400 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* VIEW SWITCHER */}
        <div className="resume-view-switcher flex items-center gap-2 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('sheet')}
            className={`px-4 py-2 rounded-lg text-xs font-mono ${
              activeTab === 'sheet'
                ? isDark
                  ? 'bg-neutral-800 text-cyan-400 font-semibold'
                  : 'bg-neutral-200 text-blue-700 font-semibold'
                : 'text-neutral-500'
            }`}
          >
            Structured Sheet View
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-1.5 ${
              activeTab === 'text'
                ? isDark
                  ? 'bg-neutral-800 text-cyan-400 font-semibold'
                  : 'bg-neutral-200 text-blue-700 font-semibold'
                : 'text-neutral-500'
            }`}
          >
            <Terminal size={12} />
            Plain Text View
          </button>
        </div>

        {/* =================================================
            STRUCTURED RESUME
        ================================================= */}

        {activeTab === 'sheet' ? (
          <div
            id="printable-resume"
            className={`max-w-4xl mx-auto p-5 sm:p-7 rounded-xl border shadow-xl overflow-visible ${
              isDark
                ? 'bg-neutral-950/90 border-neutral-800 text-neutral-200'
                : 'bg-white border-neutral-300 text-neutral-900'
            }`}
          >

            {/* PERSONAL INFORMATION */}
            <div className={`resume-header flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b ${isDark ? 'border-neutral-700/60' : 'border-neutral-200'} pb-4 mb-4 page-break-avoid`}>
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
                  {PERSONAL_INFO.name}
                </h3>

                <p className="text-sm font-medium text-cyan-500 font-mono mt-1">
                  {PERSONAL_INFO.title}
                </p>
              </div>

              <div className={`resume-contact text-[10px] font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'} space-y-1`}>
                <div className="flex items-center gap-1.5">
                  <Mail size={11} />
                  <span>{PERSONAL_INFO.email}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <MapPin size={11} />
                  <span>{PERSONAL_INFO.location}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Github size={11} />
                  <span>{PERSONAL_INFO.githubUrl}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Linkedin size={11} />
                  <span>{PERSONAL_INFO.linkedinUrl}</span>
                </div>
              </div>
            </div>

            {/* PROFESSIONAL SUMMARY - ONLY INSIDE RESUME */}
            <div className="resume-section mb-4 page-break-avoid">
              <h4 className={`text-[11px] font-mono uppercase tracking-widest ${isDark ? 'text-neutral-400 border-neutral-800' : 'text-neutral-500 border-neutral-200'} font-bold mb-2 border-b pb-1`}>
                PROFESSIONAL SUMMARY
              </h4>

              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {PROFESSIONAL_SUMMARY}
              </p>
            </div>

            {/* EDUCATION */}
            <div className="resume-section mb-4">
              <h4 className={`text-[11px] font-mono uppercase tracking-widest ${isDark ? 'text-neutral-400 border-neutral-800' : 'text-neutral-500 border-neutral-200'} font-bold mb-2 border-b pb-1`}>
                EDUCATION
              </h4>

              <div className="resume-education-list space-y-3 text-[11px]">
                {EDUCATION.map((item) => (
                  <div
                    key={item.qualification}
                    className="flex justify-between items-start gap-3 page-break-avoid"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs">
                        {item.qualification}
                      </p>

                      <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
                        {item.institution}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className={`font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        {item.duration}
                      </p>

                      <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
                        {item.score}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TECHNICAL SKILLS */}
            <div className="resume-section mb-4 page-break-avoid">
              <h4 className={`text-[11px] font-mono uppercase tracking-widest ${isDark ? 'text-neutral-400 border-neutral-800' : 'text-neutral-500 border-neutral-200'} font-bold mb-2 border-b pb-1`}>
                TECHNICAL SKILLS
              </h4>

              <div className="space-y-1.5 text-[11px]">
                {SKILLS.map((skill) => (
                  <div
                    key={skill.category}
                    className="grid grid-cols-[115px_1fr] sm:grid-cols-[145px_1fr] gap-2"
                  >
                    <span className="font-mono font-semibold">
                      {skill.category}
                    </span>

                    <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
                      {skill.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PROJECTS */}
            <div className="resume-section mb-4">
              <h4 className={`text-[11px] font-mono uppercase tracking-widest ${isDark ? 'text-neutral-400 border-neutral-800' : 'text-neutral-500 border-neutral-200'} font-bold mb-2 border-b pb-1`}>
                PROJECTS
              </h4>

              <div className="resume-project-list space-y-3 text-[10.5px]">
                {RESUME_PROJECTS.map((project) => (
                  <div
                    key={project.title}
                    className="page-break-avoid space-y-0.5"
                  >
                    <p className="font-bold text-xs">
                      {project.title} | {project.technologies}
                    </p>

                    <ul className={`list-[square] pl-5 space-y-0.5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'} leading-snug`}>
                      {project.descriptions.map((description, index) => (
                        <li key={index}>{description}</li>
                      ))}

                      <li>
                        <strong className={isDark ? 'text-neutral-200' : 'text-neutral-800'}>
                          Github:
                        </strong>{' '}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline break-all"
                        >
                          {project.github}
                        </a>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* CERTIFICATIONS */}
            <div className="resume-section mb-1 page-break-avoid">
              <h4 className={`text-[11px] font-mono uppercase tracking-widest ${isDark ? 'text-neutral-400 border-neutral-800' : 'text-neutral-500 border-neutral-200'} font-bold mb-2 border-b pb-1`}>
                CERTIFICATIONS
              </h4>

              <ul className={`list-disc pl-5 space-y-0.5 text-[10.5px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {CERTIFICATIONS.map((certification) => (
                  <li key={certification}>{certification}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          /* =================================================
             PLAIN TEXT VIEW
          ================================================= */

          <div
            className={`p-6 sm:p-8 rounded-2xl border font-mono text-xs overflow-x-auto ${
              isDark
                ? 'bg-neutral-950 border-neutral-800 text-neutral-300'
                : 'bg-neutral-900 border-neutral-700 text-neutral-200'
            }`}
          >
            <pre className="whitespace-pre-wrap leading-relaxed">
{`${PERSONAL_INFO.name}
${PERSONAL_INFO.title}

Location: ${PERSONAL_INFO.location}
Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.githubUrl}
LinkedIn: ${PERSONAL_INFO.linkedinUrl}

PROFESSIONAL SUMMARY
${PROFESSIONAL_SUMMARY}

EDUCATION
${EDUCATION.map(
  (item) =>
    `${item.qualification}\n${item.institution}\n${item.duration} | ${item.score}`
).join('\n\n')}

TECHNICAL SKILLS
${SKILLS.map((skill) => `${skill.category} ${skill.value}`).join('\n')}

PROJECTS
${RESUME_PROJECTS.map(
  (project, index) =>
    `${index + 1}. ${project.title} | ${project.technologies}\n${project.descriptions.map((description) => `- ${description}`).join('\n')}\nGithub: ${project.github}`
).join('\n\n')}

CERTIFICATIONS
${CERTIFICATIONS.map((certification) => `- ${certification}`).join('\n')}`}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};
