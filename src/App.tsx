/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ServicesSection } from './components/ServicesSection';
import { GitHubStudioHub } from './components/GitHubStudioHub';
import { InteractiveWorkbench } from './components/InteractiveWorkbench';
import { TechRadar } from './components/TechRadar';
import { TeamAndAbout } from './components/TeamAndAbout';
import { InquirySection } from './components/InquirySection';
import { CommandPalette } from './components/CommandPalette';
import { GeminiChatbot } from './components/GeminiChatbot';
import { Footer } from './components/Footer';

export default function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [inquiryInitialData, setInquiryInitialData] = useState<{
    projectType?: string;
    budget?: string;
    message?: string;
  }>({});

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEstimator = () => {
    scrollToSection('workbench');
  };

  const handleOpenInquiry = () => {
    scrollToSection('contact');
  };

  const handleInquiryForProject = (projectTitle: string) => {
    setInquiryInitialData({
      projectType: 'Custom Platform Architecture',
      message: `I'm interested in engineering a system with similar architecture to "${projectTitle}".`,
    });
    scrollToSection('contact');
  };

  const handleInquiryForService = (serviceTitle: string) => {
    setInquiryInitialData({
      projectType: serviceTitle,
      message: `Requesting a technical discovery consultation for ${serviceTitle}.`,
    });
    scrollToSection('contact');
  };

  const handleDirectInquiry = (data: { projectType?: string; budget?: string; message?: string }) => {
    setInquiryInitialData(data);
    scrollToSection('contact');
  };

  const handleCommandPaletteAction = (actionId: string) => {
    switch (actionId) {
      case 'open-palette':
        setIsCommandPaletteOpen(true);
        break;
      case 'services':
        scrollToSection('services');
        break;
      case 'github':
        scrollToSection('github');
        break;
      case 'ai-scoper':
      case 'cost-estimator':
        scrollToSection('workbench');
        break;
      case 'case-studies':
        scrollToSection('case-studies');
        break;
      case 'tech-radar':
        scrollToSection('tech-radar');
        break;
      case 'inquiry':
      case 'contact':
        scrollToSection('contact');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white selection:text-black">
      {/* Navigation Header */}
      <Navbar
        onOpenEstimator={handleOpenEstimator}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Main Studio Landing Sections */}
      <main>
        {/* Studio Hero with Live Terminal & Metrics */}
        <Hero
          onOpenEstimator={handleOpenEstimator}
          onOpenInquiry={handleOpenInquiry}
          onJumpToWorkbench={() => scrollToSection('workbench')}
        />

        {/* Engineering Services (Web Dev, Mobile App Dev, UI/UX Design) */}
        <ServicesSection
          onOpenInquiryForService={handleInquiryForService}
        />

        {/* Selected Case Studies & Production Architectures */}
        <ProjectShowcase
          onOpenInquiryForProject={handleInquiryForProject}
        />

        {/* GitHub Integration Hub (Live Repo Inspector + AI Audit + OSS Libraries) */}
        <GitHubStudioHub />

        {/* Flagship Interactive Workbench (AI Scoper + Project Estimator + Code Lab) */}
        <InteractiveWorkbench
          onDirectInquiry={handleDirectInquiry}
        />

        {/* Studio Tech Radar & Stack Standards */}
        <TechRadar />

        {/* Team, Engineering Philosophy & Client Testimonials */}
        <TeamAndAbout />

        {/* Contact Us & Project RFP Form */}
        <InquirySection
          initialData={inquiryInitialData}
        />
      </main>

      {/* Low-Latency Context-Aware Gemini Support Chatbot */}
      <GeminiChatbot
        onOpenInquiry={handleDirectInquiry}
      />

      {/* Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={handleCommandPaletteAction}
      />

      {/* Studio Footer */}
      <Footer />
    </div>
  );
}
