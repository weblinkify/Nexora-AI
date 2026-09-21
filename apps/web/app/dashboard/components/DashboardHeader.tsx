import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          AI Dashboard
        </h1>

        <p className="mt-2 text-sm text-white/50">
          Monitor your AI application workspace.
        </p>
      </div>

      <Link
        href="/projects"
        className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
      >
        New AI Project
      </Link>
    </header>
  );
}