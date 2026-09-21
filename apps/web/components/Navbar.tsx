import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#212121]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-sm font-semibold transition group-hover:border-white/20">
            N
          </div>

          <div>
            <h1 className="text-sm font-semibold tracking-tight text-white">
              Nexora AI
            </h1>

            <p className="text-xs text-white/30">
              AI-native application platform
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-xs text-white/50 transition hover:bg-white/5 hover:text-white"
          >
            AI Workspace
          </Link>

          <Link
            href="/dashboard"
            className="rounded-lg px-3 py-2 text-xs text-white/50 transition hover:bg-white/5 hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            href="/projects"
            className="ml-2 rounded-lg bg-white px-4 py-2 text-xs font-medium text-black transition hover:bg-white/90"
          >
            Architect an Idea →
          </Link>
        </nav>
      </div>
    </header>
  );
}