"use client";

import Hero from "@/components/Home/Hero";
import AboutSection from "@/components/About/AboutSection";
import SkillsSection from "@/components/Skills/SkillsSection";
import ExperienceSection from "@/components/Experience/ExperienceSection";
import ProjectGallery from "@/components/Projects/ProjectGallery";
import ContactForm from "@/components/Contact/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary relative">
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectGallery />
      <ContactForm />
    </main>
  );
}
