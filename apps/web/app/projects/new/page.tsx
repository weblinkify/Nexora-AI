"use client";
import Link from "next/link";
import { useState } from "react";

type ProjectResponse = {
  title: string;
  summary: string;
  features: string[];
  architecture: {
    frontend: string[];
    backend: string[];
    database: string[];
    infrastructure: string[];
  };
  api: string[];
  database: string[];
  implementation_plan: string[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function NewProjectPage() {
  const [idea, setIdea] = useState("");
  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateProject() {
    if (!idea.trim()) return;

    setLoading(true);
    setError("");
    setProject(null);

    try {
      const response = await fetch(
        `${API_URL}/api/projects/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idea: idea.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        const message =
          data?.detail?.[0]?.msg ||
          data?.detail ||
          "Unable to generate the project.";

        setError(message);
        return;
      }

      setProject(data);
    } catch {
      setError(
        "Unable to connect to the Nexora AI backend.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
        >
          ← Back to Nexora AI
        </Link>
        <div className="max-w-3xl">
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Build an application from an idea.
          </h1>

          <p className="mt-4 text-white/50">
            Describe what you want to build. Nexora AI will
            transform the idea into an application architecture,
            APIs, database design, and implementation plan.
          </p>
        </div>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <label className="text-sm font-medium">
            What do you want to build?
          </label>

          <textarea
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            placeholder="Example: Build an AI customer support SaaS for small businesses..."
            className="mt-4 min-h-36 w-full resize-none rounded-xl border border-white/10 bg-black/30 p-4 text-sm outline-none placeholder:text-white/20 focus:border-white/30"
          />

          <button
            onClick={generateProject}
            disabled={loading || !idea.trim()}
            className="mt-4 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Architecting..." : "Generate Application Plan"}
          </button>

          {error && (
            <p className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}
        </section>

        {project && (
          <section className="mt-8 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-wider text-white/30">
                Generated Project
              </p>

              <h2 className="mt-2 text-3xl font-semibold">
                {project.title}
              </h2>

              <p className="mt-4 max-w-3xl leading-7 text-white/50">
                {project.summary}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ArchitectureCard
                title="Frontend"
                items={project.architecture.frontend}
              />

              <ArchitectureCard
                title="Backend"
                items={project.architecture.backend}
              />

              <ArchitectureCard
                title="Database"
                items={project.architecture.database}
              />

              <ArchitectureCard
                title="Infrastructure"
                items={project.architecture.infrastructure}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ListCard
                title="Features"
                items={project.features}
              />

              <ListCard
                title="API"
                items={project.api}
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-lg font-semibold">
                Implementation Plan
              </h2>

              <div className="mt-6 space-y-4">
                {project.implementation_plan.map(
                  (step, index) => (
                    <div
                      key={step}
                      className="flex gap-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs">
                        {index + 1}
                      </div>

                      <p className="pt-1 text-sm text-white/60">
                        {step}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function ArchitectureCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="font-semibold">{title}</h2>

      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white/60"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ListCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="font-semibold">{title}</h2>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm text-white/50"
          >
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}