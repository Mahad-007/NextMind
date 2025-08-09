import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-background">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="sticky top-0 z-40 w-full flex justify-center border-b border-b-foreground/10 h-16 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"} className="text-lg font-bold">NextMind</Link>
              <div className="flex items-center gap-2">
                <DeployButton />
              </div>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 w-full max-w-6xl p-5 md:p-8">
          <Hero />
          <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 shadow animate-float">
              <h3 className="text-lg font-semibold mb-1">Realtime chat</h3>
              <p className="text-sm text-muted-foreground">Responsive, elegant chat UI with credits tracking.</p>
            </div>
            <div className="glass rounded-xl p-6 shadow animate-float [animation-delay:300ms]">
              <h3 className="text-lg font-semibold mb-1">Supabase auth</h3>
              <p className="text-sm text-muted-foreground">Secure sign in and protected routes out of the box.</p>
            </div>
            <div className="glass rounded-xl p-6 shadow animate-float [animation-delay:600ms]">
              <h3 className="text-lg font-semibold mb-1">Groq-powered</h3>
              <p className="text-sm text-muted-foreground">Fast, smart conversations leveraging Groq models.</p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-foreground/10 bg-card p-6 shadow">
              <h3 className="text-lg font-semibold mb-2">Get connected</h3>
              {hasEnvVars ? (
                <p className="text-sm text-muted-foreground">Environment is configured. Head to the chatbot and start exploring.</p>
              ) : (
                <ConnectSupabaseSteps />
              )}
            </div>
            <div className="rounded-xl border border-foreground/10 bg-card p-6 shadow">
              <h3 className="text-lg font-semibold mb-2">Create an account</h3>
              <SignUpUserSteps />
            </div>
          </section>
        </div>

        <footer className="w-full flex items-center justify-between border-t mx-auto text-xs gap-8 py-12 px-5 max-w-6xl">
          <span className="text-muted-foreground">© {new Date().getFullYear()} NextMind</span>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
