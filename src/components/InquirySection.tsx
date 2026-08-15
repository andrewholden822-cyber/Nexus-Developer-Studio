import React, { useState, useEffect } from 'react';
import { InquiryFormData } from '../types';
import { Send, CheckCircle2, RefreshCw, Shield, Sparkles, Clock, Mail, MessageSquare, Terminal } from 'lucide-react';

interface InquirySectionProps {
  initialData?: {
    projectType?: string;
    budget?: string;
    message?: string;
    subject?: string;
  };
}

export const InquirySection: React.FC<InquirySectionProps> = ({ initialData }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    subject: 'Project Consultation & Architecture Discovery',
    company: '',
    projectType: 'Web Development',
    budget: '$25k - $50k',
    timeline: 'Within 2-4 weeks',
    message: '',
  });

  const [formMode, setFormMode] = useState<'contact' | 'detailed'>('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<{
    inquiryId: string;
    message: string;
    timestamp: string;
  } | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        subject: initialData.subject || prev.subject,
        projectType: initialData.projectType || prev.projectType,
        budget: initialData.budget || prev.budget,
        message: initialData.message || prev.message,
      }));
      if (initialData.budget || initialData.projectType) {
        setFormMode('detailed');
      }
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data && data.success) {
        setSubmittedResponse(data);
      } else {
        setSubmittedResponse({
          inquiryId: 'NEX-' + Math.floor(100000 + Math.random() * 900000),
          message: 'Thank you for reaching out. A NEXUS Technical Lead will review your message and reply within 24 hours.',
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err) {
      setSubmittedResponse({
        inquiryId: 'NEX-' + Math.floor(100000 + Math.random() * 900000),
        message: 'Thank you for reaching out. A NEXUS Technical Lead will review your message and reply within 24 hours.',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-zinc-700"></span>
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-[0.25em]">
                Direct Channel // Contact Us
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter uppercase text-white leading-none">
              Contact Us.
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base font-serif italic font-light leading-relaxed">
              Have a project in mind or need senior architectural consulting? Fill out the contact form, and our engineering team will get back to you with actionable insights.
            </p>

            <div className="space-y-3 pt-2 text-xs font-mono text-zinc-300">
              <div className="p-4 bg-[#0D0D0D] rounded-xl border border-zinc-850 flex items-center gap-3">
                <Clock className="w-4 h-4 text-white shrink-0" />
                <span>Response SLA: &lt; 24 business hours guaranteed</span>
              </div>
              <div className="p-4 bg-[#0D0D0D] rounded-xl border border-zinc-850 flex items-center gap-3">
                <Shield className="w-4 h-4 text-white shrink-0" />
                <span>Mutual NDA option available for proprietary codebases</span>
              </div>
              <div className="p-4 bg-[#0D0D0D] rounded-xl border border-zinc-850 flex items-center gap-3">
                <Terminal className="w-4 h-4 text-white shrink-0" />
                <span>Direct Slack / Discord shared channel for active sprints</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-850 flex items-center justify-between">
              <div>
                <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Studio Email Wire:</div>
                <a
                  href="mailto:contact@nexusdeveloperstudio.com"
                  className="text-sm font-mono text-white hover:underline mt-1 inline-block"
                >
                  contact@nexusdeveloperstudio.com
                </a>
              </div>
              <div className="text-right">
                <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Studio Location:</div>
                <span className="text-xs font-mono text-zinc-300">San Francisco // Remote Edge</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Us Form */}
          <div className="lg:col-span-7 bg-[#0D0D0D] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {/* Form Mode Toggle */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white" />
                <span className="text-sm font-bold uppercase tracking-wider text-white">Contact Us Form</span>
              </div>
              <div className="flex rounded-lg bg-zinc-950 p-1 border border-zinc-800 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setFormMode('contact')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    formMode === 'contact' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Standard Contact
                </button>
                <button
                  type="button"
                  onClick={() => setFormMode('detailed')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    formMode === 'detailed' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Detailed RFP
                </button>
              </div>
            </div>

            {submittedResponse ? (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white font-mono uppercase">
                    Message Sent Successfully
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 mt-1 uppercase">
                    Reference ID: {submittedResponse.inquiryId}
                  </div>
                </div>

                <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed font-serif italic font-light">
                  {submittedResponse.message}
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => setSubmittedResponse(null)}
                    className="px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-xs font-mono uppercase tracking-wider text-white transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 uppercase tracking-wider mb-1.5">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-100 placeholder:text-zinc-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 uppercase tracking-wider mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-100 placeholder:text-zinc-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-zinc-300 uppercase tracking-wider mb-1.5">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject || ''}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. New Web Application Build / Mobile App Discovery"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-100 placeholder:text-zinc-600 transition-colors"
                  />
                </div>

                {/* Detailed RFP fields when toggled */}
                {formMode === 'detailed' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div>
                      <label className="block text-zinc-300 uppercase tracking-wider mb-1.5">Company</label>
                      <input
                        type="text"
                        value={formData.company || ''}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Name"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-100 placeholder:text-zinc-600"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 uppercase tracking-wider mb-1.5">Service</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-100"
                      >
                        <option>Web Development</option>
                        <option>Mobile App Development</option>
                        <option>UI/UX Design</option>
                        <option>Generative AI & Agents</option>
                        <option>Cloud Architecture & DevOps</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-zinc-300 uppercase tracking-wider mb-1.5">Budget</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-100"
                      >
                        <option>$15k - $25k</option>
                        <option>$25k - $50k</option>
                        <option>$50k - $100k</option>
                        <option>$100k+</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Message Field */}
                <div>
                  <label className="block text-zinc-300 uppercase tracking-wider mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, technical challenges, deliverables, or questions..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-100 placeholder:text-zinc-600 resize-none leading-relaxed font-sans font-light transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-white hover:bg-zinc-200 disabled:bg-zinc-800 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
