/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { DATA } from "@/data/resume";
import { Badge } from "@/components/ui/badge";

export default function WorkSection() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full flex flex-col gap-8">
      {DATA.work.map((work) => {
        // Technologies mentioned in description or related to this role
        const tags = [
          "React",
          "Inertia.js",
          "Laravel",
          "Tailwind CSS",
          "Mapbox API",
          "shadcn/ui",
          "Postman",
          "GitHub",
          "Docker",
          "Playwright"
        ];

        return (
          <div
            key={work.company}
            className="w-full border border-border/50 bg-card/50 dark:bg-card/30 backdrop-blur-md hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.03)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.05)] rounded-2xl p-6 sm:p-8 flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8 transition-all duration-300 relative overflow-hidden"
          >
            {/* Decorative soft backdrop glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 blur-2xl rounded-full" />

            {/* Left Col: Header and Company Info */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-x-4">
                {work.logoUrl && !imageError ? (
                  <img
                    src={work.logoUrl}
                    alt={work.company}
                    className="size-14 p-2 border border-border/85 rounded-2xl shadow-md bg-white overflow-hidden object-contain flex-none"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="size-14 border border-border/85 rounded-2xl shadow-md bg-muted flex-none" />
                )}
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-extrabold text-lg sm:text-xl text-zinc-950 dark:text-white">
                    {work.company}
                  </h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium font-sans">
                    {work.title}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-xs text-zinc-500 dark:text-zinc-300 font-medium mt-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-muted border px-2 py-0.5 rounded-md text-zinc-800 dark:text-white/80">
                    {work.start} - {work.end ?? "Present"}
                  </span>
                </div>
                <div>{work.location}</div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {work.badges.map((badge) => (
                  <Badge
                    key={badge}
                    className="text-[10px] font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 px-2 py-0.5"
                    variant="outline"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Right Col: Details and tech tags */}
            <div className="md:col-span-8 flex flex-col justify-between gap-6">
              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed text-pretty font-sans font-medium">
                {work.description}
              </p>

              <div className="space-y-2.5">
                <h4 className="text-xs font-bold tracking-wider text-zinc-500 dark:text-zinc-300 uppercase">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="text-[11px] font-medium border border-border/80 dark:border-border/65 hover:border-indigo-600 dark:hover:border-indigo-400 hover:bg-indigo-500/5 transition-colors h-6 px-2.5 bg-background text-zinc-800 dark:text-zinc-200"
                      variant="outline"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
