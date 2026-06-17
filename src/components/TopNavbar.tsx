"use client";

import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface TopNavbarProps {
  sections: { id: string; label: string }[];
}

export default function TopNavbar({ sections }: TopNavbarProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch for theme icon
  useEffect(() => setMounted(true), []);

  // Track active section via intersection observer
  useEffect(() => {
    const observers = sections.map((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sec.id);
        },
        { root: null, threshold: 0.3 }
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

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#top-navbar")) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const activeLabel = sections.find((s) => s.id === activeSection)?.label ?? "";

  const ThemeIcon = mounted && theme === "dark" ? Sun : Moon;

  return (
    <header
      id="top-navbar"
      className="fixed top-0 inset-x-0 h-16 z-40 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-xs flex items-center justify-between px-6 sm:px-10 w-full gap-4"
    >
      {/* ── Logo ── */}
      <button
        onClick={() => scrollToSection(sections[0].id)}
        className="font-extrabold text-xl tracking-tight text-zinc-950 dark:text-white shrink-0 cursor-pointer"
      >
        CR<span className="text-indigo-500 font-black">.</span>
      </button>

      {/* ── Desktop: nav pills + theme toggle (md and above) ── */}
      <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
        <nav className="flex items-center gap-1.5">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`text-sm font-semibold transition-all duration-200 py-1.5 px-3.5 rounded-full cursor-pointer ${
                activeSection === sec.id
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {sec.label}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-px h-5 bg-border/60 mx-1 shrink-0" />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-card hover:bg-muted transition-colors cursor-pointer shrink-0"
          aria-label="Toggle theme"
        >
          <ThemeIcon className="size-4 text-zinc-950 dark:text-white" />
        </button>
      </div>

      {/* ── Mobile: active label + theme toggle + hamburger ── */}
      <div className="flex md:hidden items-center gap-2 ml-auto">
        {/* Current section label hint */}
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide truncate max-w-[100px]">
          {activeLabel}
        </span>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-card hover:bg-muted transition-colors cursor-pointer shrink-0"
          aria-label="Toggle theme"
        >
          <ThemeIcon className="size-4 text-zinc-950 dark:text-white" />
        </button>

        {/* Hamburger toggle */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-card hover:bg-muted transition-colors cursor-pointer shrink-0"
          aria-label="Toggle navigation menu"
        >
          {menuOpen
            ? <X className="size-4 text-zinc-950 dark:text-white" />
            : <Menu className="size-4 text-zinc-950 dark:text-white" />
          }
        </button>
      </div>

      {/* ── Mobile dropdown panel ── */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-background/95 backdrop-blur-md border-b border-border/40 shadow-lg py-3 px-6 flex flex-col gap-1 z-50">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`text-left w-full text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer ${
                activeSection === sec.id
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-muted"
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
