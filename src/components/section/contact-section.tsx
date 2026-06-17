import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import { Mail, Github, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <div className="border border-border/50 bg-card/30 backdrop-blur-md p-10 sm:p-14 rounded-3xl relative overflow-hidden shadow-2xl w-full max-w-xl mx-auto flex flex-col items-center gap-6 text-center">
      {/* Background Flickering Grid */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={3}
          gridGap={2.5}
          color="#6366f1"
          maxOpacity={0.15}
          flickerChance={0.1}
          style={{
            maskImage: "radial-gradient(circle at center, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full">
        {/* Glowing message icon */}
        <div className="size-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)] animate-pulse">
          <MessageSquare className="size-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            I&apos;m currently open to new opportunities, collaborations, or just chatting about technology. Let&apos;s build something great together!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-2">
          <Button asChild className="rounded-xl px-6 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer shadow-lg shadow-indigo-600/20 flex items-center gap-2 group transition-all duration-300 hover:scale-[1.03]">
            <Link href={`mailto:${DATA.contact.email}`}>
              <Mail className="size-4 group-hover:translate-x-0.5 transition-transform" />
              Email Me
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl px-6 py-5 border-border hover:bg-muted font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 hover:scale-[1.03]">
            <Link href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
              GitHub Profile
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground/60 font-mono mt-4">
          Cebu, Philippines • {DATA.contact.tel}
        </p>
      </div>
    </div>
  );
}
