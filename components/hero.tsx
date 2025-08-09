import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-b from-background to-[hsl(222_50%_6%)] dark:from-[hsl(222_50%_6%)] dark:to-[hsl(222_50%_4%)] shadow-2xl">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_600px_at_50%_-20%,hsl(217_91%_60%/0.15),transparent)]" />
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24 text-center flex flex-col items-center gap-10">
        <div className="flex gap-8 justify-center items-center opacity-90">
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            rel="noreferrer"
          >
            <SupabaseLogo />
          </a>
          <span className="border-l rotate-45 h-6" />
          <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
            <NextLogo />
          </a>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Build a modern AI ChatBot
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
          Next.js + Supabase + Groq with a clean, responsive black & blue UI.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/chatbot" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 font-medium shadow hover:opacity-90 transition">
            Start chatting
          </a>
          <a href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-5 py-3 font-medium hover:bg-foreground/5 transition">
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}
