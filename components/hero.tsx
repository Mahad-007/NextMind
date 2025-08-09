import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-b from-[hsl(222_50%_6%)] to-[hsl(222_50%_4%)] shadow-2xl">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_50%_-20%,hsl(217_91%_60%/0.2),transparent)]" />
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,hsl(217_91%_60%/.25),transparent)] blur-3xl animate-aurora" />
        <div className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-[conic-gradient(from_270deg_at_50%_50%,hsl(201_96%_32%/.25),transparent)] blur-3xl animate-aurora" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 text-center flex flex-col items-center gap-10">
        <div className="flex gap-8 justify-center items-center opacity-90 animate-float">
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
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="gradient-text">NextMind</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
          Future of Conversations — design-forward AI experiences that feel alive.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/chatbot" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium shadow hover:opacity-90 transition glow-border">
            Try NextMind
          </a>
          <a href="#features" className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-6 py-3 font-medium hover:bg-foreground/5 transition">
            Explore features
          </a>
        </div>
      </div>
    </section>
  );
}
