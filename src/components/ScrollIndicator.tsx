"use client";

import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  sections: { id: string; label: string }[];
}

export default function ScrollIndicator({ sections }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  useEffect(() => {
    const observers = sections.map((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sec.id);
          }
        },
        {
          root: null,
          threshold: 0.4, // Trigger when 40% of the section is visible
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4 bg-background/30 backdrop-blur-md p-3.5 rounded-full border border-border/40 shadow-lg">
      {sections.map((sec) => (
        <button
          key={sec.id}
          onClick={() => scrollToSection(sec.id)}
          className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
          aria-label={`Scroll to ${sec.label}`}
        >
          {/* Label tooltip */}
          <span className="absolute right-8 scale-90 group-hover:scale-100 transition-all duration-200 origin-right bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold px-3 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none">
            {sec.label}
          </span>
          
          {/* Circle dot */}
          <span
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
              activeSection === sec.id
                ? "bg-indigo-500 scale-125 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/60 scale-100"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
