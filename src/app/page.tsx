/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "motion/react";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import CertificatesSection from "@/components/section/certificates-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";
import Lanyard from "@/components/Lanyard";
import TopNavbar from "@/components/TopNavbar";
import SlowWordReveal from "@/components/SlowWordReveal";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About Me" },
  { id: "work", label: "Work Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Get in Touch" },
];

interface ScrollSectionProps {
  id: string;
  backdropText: string;
  children: React.ReactNode;
  className?: string;
}

function ScrollSection({ id, backdropText, children, className = "" }: ScrollSectionProps) {
  return (
    <section
      id={id}
      className={`w-full min-h-screen snap-start snap-always relative flex items-center justify-center py-24 px-6 sm:px-12 md:px-20 ${className}`}
    >
      {/* Aesthetic giant background typography */}
      <div className="absolute top-10 left-6 sm:top-14 sm:left-12 select-none pointer-events-none z-0">
        <h2 className="text-[14vw] sm:text-[10vw] font-black leading-none uppercase tracking-tighter text-zinc-900/5 dark:text-white/5 font-sans">
          {backdropText}
        </h2>
      </div>

      {/* Content wrapper with top padding to prevent covering backdrop headers */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mx-auto z-10 relative flex flex-col justify-center h-full pt-16 md:pt-20"
      >
        {children}
      </motion.div>
    </section>
  );
}

// Utility to escape string for regex
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Helper to highlight key technical terms in adaptive bold text
const highlightKeywords = (text: string) => {
  const keywords = [
    "Full-Stack Developer",
    "Information Technology graduate",
    "internship",
    "client project experience",
    "scalable web applications",
    "React",
    "Laravel",
    "ASP.NET MVC",
    "Node.js",
    "Tailwind CSS",
    "REST API development",
    "database design",
    "software testing",
    "deployment workflows",
    "Docker",
    "GitHub",
    "Agile development practices",
    "high-quality software solutions",
    "continuously learning new technologies",
    "business value"
  ];

  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
  const regex = new RegExp(`\\b(${sortedKeywords.map(k => escapeRegExp(k)).join("|")})\\b`, "g");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (keywords.includes(part)) {
      return (
        <span
          key={index}
          className="text-zinc-950 dark:text-white font-extrabold"
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

export default function Page() {
  // Group skills by category
  const skillCategories = {
    "Frontend": ["React", "Typescript", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Inertia.js"],
    "Backend": ["Laravel", "PHP", "C#", "Node.js", "Python", "ASP.NET MVC"],
    "Databases & DevOps": ["PostgreSQL", "Docker", "Firebase", "Git / GitHub"],
    "Tools & Testing": ["Playwright", "Jest", "Postman"]
  };

  return (
    <main className="w-full h-screen overflow-y-auto snap-y snap-mandatory scrollbar-none bg-background relative">
      {/* Sticky top navbar */}
      <TopNavbar sections={SECTIONS} />

      {/* 1. INTRO / HERO SECTION */}
      <ScrollSection id="hero" backdropText="INTRO">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center w-full">
          <div className="md:col-span-6 flex flex-col justify-center text-left space-y-6">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block border border-zinc-900/20 bg-zinc-900/5 dark:border-white/20 dark:bg-white/5 px-4 py-1.5 rounded-full text-zinc-900 dark:text-white text-xs font-semibold tracking-wider uppercase font-mono"
              >
                Welcome Pass
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                Hi, I&apos;m{" "}
                <span className="text-zinc-950 dark:text-white">
                  Christian Llyod G. Rivera
                </span>
              </h1>
            </div>

            {/* Slow reveal text animates word-by-word slowly in adaptive color */}
            <div className="text-zinc-800 dark:text-zinc-200 text-base sm:text-lg lg:text-xl leading-relaxed max-w-[620px]">
              <SlowWordReveal
                text="Motivated Full-Stack Developer and IT graduate with hands-on experience in building scalable web applications, software testing, and DevOps workflows With the Lanyard."
                delay={0.4}
                wordDelay={0.06}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="flex items-center gap-3 text-xs text-zinc-500 dark:text-white/40 font-mono"
            >
              <span>← Interactive Lanyard (Drag to rotate)</span>
            </motion.div>
          </div>

          {/* Lanyard container size balanced */}
          <div className="md:col-span-6 flex items-center justify-center relative h-[430px] md:h-[500px] w-full">
            <Lanyard position={[0, 0, 14]} gravity={[0, -30, 0]} fov={15} />
          </div>
        </div>
      </ScrollSection>

      {/* 2. ABOUT ME SECTION */}
      <ScrollSection id="about" backdropText="ABOUT">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full">
          <div className="md:col-span-7 space-y-6">
            <div className="flex items-center gap-4">
              <span className="h-1.5 w-12 bg-zinc-900 dark:bg-white rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Who I Am</h2>
            </div>
            <div className="text-zinc-800 dark:text-zinc-200 text-sm sm:text-base leading-relaxed text-pretty space-y-4">
              <p className="font-sans text-zinc-900 dark:text-white/90 text-base sm:text-lg">
                {highlightKeywords(DATA.summary)}
              </p>
            </div>
          </div>

          {/* Large Picture - Left edge fading away, no hover effects */}
          <div className="md:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[380px] aspect-[4/5] overflow-hidden rounded-xl shadow-xl border border-border/40">
              <img
                src={DATA.avatarUrl}
                alt={DATA.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* 3. WORK EXPERIENCE SECTION */}
      <ScrollSection id="work" backdropText="WORK">
        <div className="space-y-6 w-full mt-5">
          <div className="flex items-center gap-4">
            <span className="h-1.5 w-12 bg-zinc-900 dark:bg-white rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans">Professional Journey</h2>
          </div>
          <div className="max-w-3xl">
            <WorkSection />
          </div>
        </div>
      </ScrollSection>

      {/* 4. EDUCATION SECTION */}
      <ScrollSection id="education" backdropText="STUDIES">
        <div className="space-y-8 w-full mt-5">
          <div className="flex items-center gap-4">
            <span className="h-1.5 w-12 bg-zinc-900 dark:bg-white rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Education Timeline</h2>
          </div>
          <div className="flex flex-col gap-6 max-w-3xl">
            {DATA.education.map((edu, index) => (
              <motion.div
                key={`${edu.school}-${edu.degree}`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start justify-between border-b border-border/60 pb-6 group"
              >
                <div className="flex items-center gap-x-4">
                  {edu.logoUrl ? (
                    <img
                      src={edu.logoUrl}
                      alt={edu.school}
                      className="size-12 p-1.5 border border-border/80 rounded-xl shadow-md bg-white overflow-hidden object-contain flex-none"
                    />
                  ) : (
                    <div className="size-12 border border-border/80 rounded-xl shadow bg-muted flex-none" />
                  )}
                  <div className="space-y-1">
                    <Link
                      href={edu.href || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-base sm:text-lg flex items-center gap-2 text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {edu.school}
                      {edu.href && <ArrowUpRight className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />}
                    </Link>
                    <div className="text-sm text-zinc-600 dark:text-zinc-300 font-medium">
                      {edu.degree}
                    </div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-mono bg-muted/50 border px-3 py-1 rounded-full">
                  {edu.start} - {edu.end}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* 5. SKILLS SECTION */}
      <ScrollSection id="skills" backdropText="SKILLS">
        <div className="space-y-8 w-full mt-5">
          <div className="flex items-center gap-4">
            <span className="h-1.5 w-12 bg-zinc-900 dark:bg-white rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Core Competencies</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {Object.entries(skillCategories).map(([category, skills]) => (
              <div
                key={category}
                className="border border-border/50 bg-card/50 dark:bg-card/40 backdrop-blur-md rounded-2xl p-5 space-y-4 hover:border-zinc-900/20 dark:hover:border-white/20 hover:shadow-[0_0_20px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.01)] transition-all duration-300 shadow-sm"
              >
                <h3 className="text-sm font-semibold tracking-wider text-zinc-900/60 dark:text-white/70 uppercase">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skillName) => {
                    const skillObj = DATA.skills.find(s => s.name === skillName);
                    if (!skillObj) return null;
                    const IconComponent = skillObj.icon;
                    return (
                      <div
                        key={skillName}
                        className="flex items-center gap-2 px-3.5 py-1.5 border border-border bg-background hover:bg-zinc-900/5 dark:hover:bg-white/5 hover:border-zinc-900/20 dark:hover:border-white/20 hover:shadow-[0_0_12px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] rounded-xl transition-all duration-200 group cursor-default"
                      >
                        {IconComponent && (
                          <IconComponent className="size-4 text-zinc-500 dark:text-white/60 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors" />
                        )}
                        <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-white/90">
                          {skillName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* 6. PROJECTS SECTION */}
      <ScrollSection id="projects" backdropText="PROJECTS" className="min-h-screen h-fit">
        <ProjectsSection />
      </ScrollSection>

      {/* 7. CERTIFICATES SECTION */}
      <ScrollSection id="certificates" backdropText="AWARDS" className="min-h-screen h-fit">
        <CertificatesSection />
      </ScrollSection>

      {/* 8. CONTACT SECTION */}
      <ScrollSection id="contact" backdropText="CONTACT">
        <div className="max-w-2xl mx-auto w-full">
          <ContactSection />
        </div>
      </ScrollSection>
    </main>
  );
}
