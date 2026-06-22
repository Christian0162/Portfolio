"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
  return (
    <div className="mt-5 flex flex-col gap-y-8 w-full">
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center gap-4">
          <span className="h-1.5 w-12 bg-indigo-500 rounded-full" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Recent Work</h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
          I&apos;ve worked on a variety of projects, from client e-commerce sites to complex capstone systems. Here are a few of my favorites.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 max-w-6xl w-full mx-auto auto-rows-fr mt-2">
        {DATA.projects.map((project, id) => (
          <BlurFade
            key={project.title}
            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
            className="h-full"
          >
            <ProjectCard
              href={project.href}
              key={project.title}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
              clientSide={project.clientSide}
              className="hover:shadow-[0_0_24px_rgba(99,102,241,0.08)] hover:border-indigo-500/20 hover:scale-[1.02] transition-all duration-300 bg-card/40 backdrop-blur-md rounded-2xl border-border/50"
            />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
