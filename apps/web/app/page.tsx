import Link from "next/link";
import { Dashboard } from "@/components/Dashboard";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
          >
            AI Native
          </Link>

          <nav className="flex items-center gap-6 text-sm text-slate-300">
            <Link href="/" className="hover:text-white">
              Dashboard
            </Link>

            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              API
            </a>
          </nav>
        </div>
      </header>

      <Dashboard />
    </main>
  );
}
