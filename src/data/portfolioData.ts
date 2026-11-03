
import { Project, SkillCategory, EducationItem } from '../types';


export const PERSONAL_INFO = {
  name: 'Kotla Sai Kiran',
  title: 'Aspiring Full Stack Developer',
  headline: 'Building modern web experiences through code and creativity.',
  subheadline: 'Computer Science and Engineering student at Sri Indu College of Engineering and Technology, Hyderabad. Exploring frontend development, programming, databases, and practical software development through hands-on projects.',
  email: 'kotlasaikiran742@gmail.com',
  location: 'Hyderabad, Telangana, India',
  college: 'Sri Indu College of Engineering and Technology',
  degree: 'B.Tech in Computer Science and Engineering',
  githubUsername: 'reader-4567',
  githubUrl: 'https://github.com/reader-4567',
  linkedinUrl: 'https://www.linkedin.com/in/sai-kiran-kotla-68136b377',
  status: 'Open to Software Engineering & Full Stack Roles',
  summary: `I am a Computer Science and Engineering student at Sri Indu College of Engineering and Technology, Hyderabad. I have knowledge of C, Python, Java, HTML, CSS, JavaScript, and MySQL. I enjoy building practical projects, strengthening my programming fundamentals, exploring web technologies, and using modern AI tools to support my development workflow.`
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Programming languages used to understand programming fundamentals, develop logical thinking, and solve problems.',
    skills: [
      {
        name: 'C',
        level: 'Programming Fundamentals',
        description: 'Understanding of basic C programming, including variables, data types, operators, conditional statements, loops, arrays, functions, and pointers.',
        tags: ['C Fundamentals', 'Loops', 'Arrays', 'Functions', 'Pointers'],
        iconKey: 'c'
      },
      {
        name: 'Python',
        level: 'Programming & Problem Solving',
        description: 'Knowledge of Python fundamentals, including variables, data types, conditional statements, loops, lists, strings, functions, and basic problem solving.',
        tags: ['Python Basics', 'Loops', 'Lists', 'Strings', 'Functions'],
        iconKey: 'python'
      },
      {
        name: 'Java',
        level: 'Object-Oriented Programming',
        description: 'Understanding of Java fundamentals and object-oriented programming concepts, including classes, objects, inheritance, encapsulation, and polymorphism.',
        tags: ['Java Basics', 'Classes & Objects', 'Inheritance', 'Encapsulation', 'Polymorphism'],
        iconKey: 'java'
      }
    ]
  },
  {
    title: 'Frontend Development',
    description: 'Fundamentals of building and styling web pages using frontend technologies.',
    skills: [
      {
        name: 'HTML5',
        level: 'Web Page Structure',
        description: 'Knowledge of HTML elements, forms, links, images, tables, and semantic page structure for creating web pages.',
        tags: ['HTML Elements', 'Forms', 'Semantic HTML', 'Page Structure'],
        iconKey: 'html5'
      },
      {
        name: 'CSS3',
        level: 'Styling & Layout',
        description: 'Understanding of CSS styling, selectors, colors, typography, Flexbox, layouts, and responsive design fundamentals.',
        tags: ['CSS Styling', 'Flexbox', 'Layouts', 'Responsive Design'],
        iconKey: 'css3'
      },
      {
        name: 'JavaScript',
        level: 'Programming & Interactivity',
        description: 'Knowledge of JavaScript fundamentals, including variables, functions, arrays, objects, conditional statements, loops, and DOM manipulation.',
        tags: ['JavaScript Basics', 'Functions', 'Arrays', 'DOM Manipulation', 'Events'],
        iconKey: 'javascript'
      }
    ]
  },
  {
    title: 'Database',
    description: 'Working with SQL queries, creating and managing database tables, and performing database operations.',
    skills: [
      {
        name: 'MySQL',
        level: 'Database Management',
        description: 'Working with SQL queries, creating and managing database tables, inserting, updating, deleting, and retrieving data.',
        tags: ['SQL Queries', 'Database Tables', 'CRUD Operations', 'Data Retrieval', 'Database Management'],
        iconKey: 'mysql'
      }
    ]
  },
  {
    title: 'Development Tools',
    description: 'Tools used for writing code, managing repositories, and working on software development projects.',
    skills: [
      {
        name: 'Git',
        level: 'Version Control Basics',
        description: 'Understanding of Git fundamentals, including initializing repositories, tracking changes, committing code, and working with branches.',
        tags: ['Git Basics', 'Repositories', 'Commits', 'Branching'],
        iconKey: 'git'
      },
      {
        name: 'GitHub',
        level: 'Code Hosting & Collaboration',
        description: 'Using GitHub to host code repositories, upload projects, manage source code, and maintain project versions.',
        tags: ['Repositories', 'Push & Pull', 'Project Hosting', 'Version Control'],
        iconKey: 'github'
      },
      {
        name: 'VS Code',
        level: 'Code Editor',
        description: 'Using Visual Studio Code to write, edit, run, and debug programs with extensions and an integrated terminal.',
        tags: ['Code Editing', 'Extensions', 'Integrated Terminal', 'Debugging'],
        iconKey: 'vscode'
      }
    ]
  },
  {
    title: 'AI Tools & Platforms',
    description: 'AI-powered platforms used for programming assistance, learning, research, and creative tasks.',
    subcategories: ['AI Coding', 'AI Assistants', 'AI Creation', 'AI Development'],
    skills: [
      // AI Coding
      {
        name: 'Cursor',
        level: 'AI-Powered Code Editor',
        subcategory: 'AI Coding',
        description: 'Using AI-assisted coding features to understand code, generate code, make edits, and work on development projects.',
        tags: ['AI Code Assistance', 'Code Generation', 'Code Editing', 'Development'],
        iconKey: 'cursor'
      },
      {
        name: 'Google Antigravity',
        level: 'AI Development Environment',
        subcategory: 'AI Coding',
        description: 'Exploring an AI-powered development environment for coding assistance and working on software projects.',
        tags: ['AI-Assisted Coding', 'Development Agents', 'Code Generation', 'Project Development'],
        iconKey: 'antigravity'
      },
      // AI Assistants
      {
        name: 'ChatGPT',
        level: 'AI Assistant',
        subcategory: 'AI Assistants',
        description: 'Using AI assistance for programming concepts, problem solving, debugging, learning, and technical guidance.',
        tags: ['Learning Assistance', 'Problem Solving', 'Code Debugging', 'Technical Guidance'],
        iconKey: 'chatgpt'
      },
      {
        name: 'Claude',
        level: 'AI Assistant',
        subcategory: 'AI Assistants',
        description: 'Using AI assistance to understand technical concepts, review code, generate ideas, and work on development tasks.',
        tags: ['Code Assistance', 'Technical Learning', 'Code Review', 'Content Generation'],
        iconKey: 'claude'
      },
      // AI Creation
      {
        name: 'Gamma',
        level: 'AI Presentation Tool',
        subcategory: 'AI Creation',
        description: 'Creating presentations and visually structured content using AI-powered design and content generation.',
        tags: ['Presentations', 'AI Design', 'Content Generation', 'Visual Layouts'],
        iconKey: 'gamma'
      },
      // AI Development
      {
        name: 'Google AI Studio',
        level: 'AI Development Platform',
        subcategory: 'AI Development',
        description: 'Exploring Gemini models and experimenting with AI prompts and model capabilities through Google AI Studio.',
        tags: ['Gemini', 'Prompt Experimentation', 'AI Models', 'AI Prototyping'],
        iconKey: 'aistudio'
      }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'ecommerce-ui-clone',
    title: 'E-Commerce UI Clone',
    category: 'Frontend Development',
    shortDescription: 'A responsive e-commerce website interface featuring product displays.',
    fullDescription: 'A frontend development project focused on creating an e-commerce website interface using HTML, CSS. The project explores webpage structure, styling.',
    technologies: ['HTML5', 'CSS3'],
    githubUrl: 'https://github.com/reader-4567',
    featured: true,
    highlights: [
      'Created a product-focused website layout'
    ],
    imagePlaceholderGradient: 'from-neutral-900 via-neutral-800 to-zinc-900'
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic-Tac-Toe',
    category: 'JavaScript Project',
    shortDescription: 'A browser-based Tic-Tac-Toe game with turn-based gameplay and win-condition checking.',
    fullDescription: 'An interactive implementation of the classic Tic-Tac-Toe game using HTML, CSS, and JavaScript. The project focuses on game logic, player turns, checking winning combinations, and handling game results.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Game Logic'],
    githubUrl: 'https://github.com/reader-4567',
    featured: true,
    highlights: [
      'Implemented two-player turn-based gameplay',
      'Added logic to identify winning combinations and draws',
      'Created a simple interface for playing and restarting the game'
    ],
    imagePlaceholderGradient: 'from-zinc-950 via-neutral-900 to-stone-900'
  },
  {
    id: 'github-profile-viewer',
    title: 'GitHub Profile Viewer',
    category: 'Web Development',
    shortDescription: 'A web application for searching GitHub profiles and displaying publicly available profile information.',
    fullDescription: 'A web development project that explores retrieving and displaying GitHub profile information. It focuses on JavaScript, API-based data retrieval, asynchronous operations, and dynamic webpage updates.',
    technologies: ['JavaScript', 'GitHub REST API', 'HTML5', 'CSS3', 'Fetch API'],
    githubUrl: 'https://github.com/reader-4567',
    featured: true,
    highlights: [
      'Explored fetching public GitHub profile information using an API',
      'Used JavaScript to display retrieved information dynamically',
      'Practised asynchronous requests and basic error handling'
    ],
    imagePlaceholderGradient: 'from-neutral-950 via-zinc-900 to-neutral-800'
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science and Engineering',
    institution: 'Sri Indu College of Engineering and Technology',
    location: 'Hyderabad, Telangana, India',
    period: 'Undergraduate Program',
    description: 'Undergraduate studies covering programming, data structures, database management, computer networks, operating systems, and other core computer science subjects.',
    highlights: [
      'Studying programming fundamentals and problem solving using C, Python, and Java',
      'Learning Data Structures and Algorithms, Object-Oriented Programming, and Database Management Systems',
      'Exploring web development, software development tools, and modern technologies'
    ]
  }
];

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Education', href: '#education' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' }
];
