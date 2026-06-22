/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";

export default function CertificatesSection() {
  return (
    <div className="flex flex-col gap-y-6 w-full md:mt-5 mt-0">
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-4">
          <span className="h-1.5 w-12 bg-indigo-500 rounded-full" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Credentials & Certifications</h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
          I continuously expand my technical knowledge by completing certifications, participating in tech talks, and keeping up with modern engineering standards.
        </p>
      </div>

      <div className="max-w-3xl w-full mx-auto mt-2">
        <Timeline>
          {DATA.certificates.map((cert) => (
            <TimelineItem key={cert.title + cert.dates} className="w-full flex items-start justify-between gap-6 md:gap-10 pb-8">
              <TimelineConnectItem className="flex items-start justify-center">
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="size-11 bg-white z-10 shrink-0 overflow-hidden p-1.5 border rounded-2xl shadow-md ring-2 ring-border/50 object-contain flex-none transition-transform hover:scale-105"
                  />
                ) : (
                  <div className="size-11 bg-card z-10 shrink-0 overflow-hidden p-1.5 border rounded-2xl shadow-md ring-2 ring-border/50 flex-none" />
                )}
              </TimelineConnectItem>
              <div className="flex flex-1 flex-col justify-start gap-2 min-w-0 bg-card/50 dark:bg-card/30 backdrop-blur-md border border-border/60 hover:border-indigo-500/30 p-5 rounded-2xl transition-all duration-300">
                <div className="flex items-center justify-between gap-4">
                  {cert.title && (
                    <h3 className="font-bold text-base sm:text-lg leading-tight text-zinc-950 dark:text-white">{cert.title}</h3>
                  )}
                  {cert.dates && (
                    <time className="text-xs text-zinc-600 dark:text-zinc-400 font-mono bg-muted border px-2.5 py-0.5 rounded-full shrink-0">{cert.dates}</time>
                  )}
                </div>
                {cert.issuer && (
                  <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 font-semibold font-sans">{cert.issuer}</p>
                )}
                {cert.description && (
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                    {cert.description}
                  </p>
                )}
                {cert.links && cert.links.length > 0 && (
                  <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
                    {(cert.links as readonly { href: string; title: string; icon?: React.ReactNode }[]).map((link, idx) => (
                      <Link
                        href={link.href}
                        key={idx}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Badge className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-indigo-600 transition-colors">
                          {link.icon}
                          {link.title}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
}
