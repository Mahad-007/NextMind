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
              <Link href={"/"} className="text-lg font-bold">ChatBot</Link>
              <div className="flex items-center gap-2">
                <DeployButton />
              </div>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-14 w-full max-w-5xl p-5 md:p-8">
          <Hero />
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

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-12">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
