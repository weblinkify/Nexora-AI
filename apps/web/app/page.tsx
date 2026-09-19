import AIChat from "../components/AIChat";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Nexora AI
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Build intelligent applications. Ship them like software.
            </p>
          </div>

          <div className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            AI Workspace
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center">
          <AIChat />
        </section>

        <footer className="mt-12 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
          Nexora AI · AI-native full-stack platform
        </footer>
      </div>
    </main>
  );
}