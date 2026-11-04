import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  Copy,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.';
    if (!formData.message.trim()) {
      errs.message = 'Please provide a message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Build the mailto URI
    const subjectEncoded = encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject}`
    );
    const bodyEncoded = encodeURIComponent(
      `Hi Sai Kiran,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    setSubmitted(true);

    // Launch default email client
    window.location.href = mailtoUrl;
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden border-t border-neutral-800/40 dark:border-neutral-800/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-wider mb-3 text-neutral-500">
              <span className="text-neutral-400">07</span>
              <span>//</span>
              <span className="uppercase">DIRECT COMMUNICATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
              Get in Touch
            </h2>
          </div>
          <p className="text-sm font-mono text-neutral-500 max-w-sm">
            Available for full-time software engineering roles, internships, and technical discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`p-6 sm:p-8 rounded-3xl border ${
                isDark ? 'bg-neutral-950/70 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
              }`}
            >
              <h3 className="text-xl font-display font-bold mb-3">
                Let's Build Together
              </h3>
              <p
                className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                  isDark ? 'text-neutral-400' : 'text-neutral-600'
                }`}
              >
                Whether you have an open software developer role, would like to discuss my academic projects, or explore collaborative open-source work, I am eager to connect.
              </p>

              {/* Direct Channels */}
              <div className="space-y-4">
                {/* Email Box */}
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                    isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <Mail size={16} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono text-neutral-500 uppercase">Direct Email</p>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs sm:text-sm font-mono font-medium hover:text-cyan-400 truncate block transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="p-2 rounded-lg border border-neutral-700/60 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors shrink-0"
                    title="Copy email address"
                  >
                    {copiedEmail ? (
                      <CheckCircle2 size={15} className="text-emerald-500" />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>

                {/* Location Box */}
                <div
                  className={`p-4 rounded-2xl border flex items-center gap-3 ${
                    isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center justify-center shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-neutral-500 uppercase">Location</p>
                    <p className="text-xs sm:text-sm font-medium">
                      {PERSONAL_INFO.location}
                    </p>
                  </div>
                </div>

                {/* GitHub Box */}
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                    isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center justify-center shrink-0">
                      <Github size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-neutral-500 uppercase">GitHub</p>
                      <a
                        href={PERSONAL_INFO.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-mono font-medium hover:text-cyan-400 transition-colors"
                      >
                        github.com/reader-4567
                      </a>
                    </div>
                  </div>
                  <a
                    href={PERSONAL_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View GitHub Profile"
                    className="p-2 rounded-lg border border-neutral-700/60 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                {/* LinkedIn Box */}
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                    isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 text-[#0077B5] flex items-center justify-center shrink-0">
                      <Linkedin size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-neutral-500 uppercase">LinkedIn</p>
                      <a
                        href={PERSONAL_INFO.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-mono font-medium hover:text-cyan-400 transition-colors"
                      >
                        linkedin.com/in/sai-kiran-kotla
                      </a>
                    </div>
                  </div>
                  <a
                    href={PERSONAL_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View LinkedIn Profile"
                    className="p-2 rounded-lg border border-neutral-700/60 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 sm:p-8 md:p-10 rounded-3xl border transition-all ${
                isDark ? 'bg-neutral-950/70 border-neutral-800 shadow-2xl' : 'bg-white border-neutral-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare size={18} className="text-cyan-400" />
                <h3 className="text-xl font-display font-bold">
                  Send a Structured Message
                </h3>
              </div>

              {submitted && (
                <div
                  className={`mb-6 p-4 rounded-2xl border flex items-start gap-3 ${
                    isDark
                      ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-300'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  }`}
                >
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-500" />
                  <div className="text-xs font-mono">
                    <p className="font-semibold">Message Prepared</p>
                    <p className="mt-1 opacity-90">
                      Your default email application was triggered with your message pre-formatted. If it did not open automatically, copy my direct email ({PERSONAL_INFO.email}) and send directly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Chen"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl text-xs font-mono border focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500'
                          : isDark
                          ? 'bg-neutral-900/60 border-neutral-800 focus:border-cyan-400 text-neutral-200'
                          : 'bg-neutral-50 border-neutral-300 focus:border-blue-500 text-neutral-900'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-red-500 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl text-xs font-mono border focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : isDark
                          ? 'bg-neutral-900/60 border-neutral-800 focus:border-cyan-400 text-neutral-200'
                          : 'bg-neutral-50 border-neutral-300 focus:border-blue-500 text-neutral-900'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-red-500 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                    Subject *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Python Full Stack Developer Opportunity / Project Inquiry"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-mono border focus:outline-none transition-colors ${
                      errors.subject
                        ? 'border-red-500 focus:border-red-500'
                        : isDark
                        ? 'bg-neutral-900/60 border-neutral-800 focus:border-cyan-400 text-neutral-200'
                        : 'bg-neutral-50 border-neutral-300 focus:border-blue-500 text-neutral-900'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] font-mono text-red-500 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-mono border focus:outline-none transition-colors resize-none ${
                      errors.message
                        ? 'border-red-500 focus:border-red-500'
                        : isDark
                        ? 'bg-neutral-900/60 border-neutral-800 focus:border-cyan-400 text-neutral-200'
                        : 'bg-neutral-50 border-neutral-300 focus:border-blue-500 text-neutral-900'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-red-500 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
                    isDark
                      ? 'bg-neutral-100 hover:bg-white text-neutral-950 shadow-lg hover:shadow-cyan-500/10'
                      : 'bg-neutral-900 hover:bg-black text-white shadow-md'
                  }`}
                >
                  <Send size={14} />
                  <span>Send Message via Mailto</span>
                </button>

                <p className="text-[11px] font-mono text-neutral-500 text-center pt-2">
                  Transparent dispatch: Generates a direct mailto URI to kotlasaikiran742@gmail.com without intermediate third-party brokers.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
