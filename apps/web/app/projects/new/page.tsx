"use client";

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

  async function architectIdea() {
    if (!idea.trim()) {
      setError("Describe the application you want to build.");
      return;
    }

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
          "Unable to architect this idea.";

        setError(
          message === "String should have at least 10 characters"
            ? "Describe your idea using at least 10 characters."
            : message,
        );

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
      <div className="mx-auto max-w-7xl px-6 py-8">

        <section className="mx-auto mt-16 max-w-4xl text-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/50">
            AI Software Architect
          </div>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-6xl">
            Turn an idea into
            <span className="block text-white/40">
              an engineering blueprint.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/45">
            Nexora AI transforms a software idea into requirements,
            architecture, APIs, data models, infrastructure, and an
            implementation plan.
          </p>
        </section>

        <section className="mx-auto mt-12 max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  What are you building?
                </p>

                <p className="mt-1 text-xs text-white/30">
                  Start with a product idea. Nexora handles the
                  engineering decomposition.
                </p>
              </div>

              <div className="hidden rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/30 md:block">
                AI Architect
              </div>
            </div>

            <textarea
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="Example: Build an AI platform that helps small businesses automate customer support..."
              className="mt-6 min-h-40 w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-5 text-sm leading-6 outline-none placeholder:text-white/20 focus:border-white/25"
            />

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-white/25">
                {idea.length} characters
              </p>

              <button
                onClick={architectIdea}
                disabled={loading}
                className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading
                  ? "Architecting..."
                  : "Architect This Idea →"}
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}
          </div>
        </section>

        {loading && (
          <section className="mx-auto mt-10 max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                Nexora AI
              </p>

              <div className="mt-5 space-y-4">
                <PipelineStep
                  number="01"
                  label="Understanding requirements"
                />
                <PipelineStep
                  number="02"
                  label="Designing system architecture"
                />
                <PipelineStep
                  number="03"
                  label="Mapping data and APIs"
                />
                <PipelineStep
                  number="04"
                  label="Creating implementation plan"
                />
              </div>
            </div>
          </section>
        )}

        {project && !loading && (
          <ProjectResult project={project} />
        )}
      </div>
    </main>
  );
}

function ProjectResult({
  project,
}: {
  project: ProjectResponse;
}) {
  return (
    <section className="mx-auto mt-12 max-w-7xl space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/30">
              Architecture generated
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              {project.title}
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-white/45">
              {project.summary}
            </p>
          </div>

          <div className="flex h-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/50">
            Ready to build
          </div>
        </div>
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
          title="Data Layer"
          items={project.architecture.database}
        />

        <ArchitectureCard
          title="Infrastructure"
          items={project.architecture.infrastructure}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ListCard
          title="Product capabilities"
          description="What the system needs to do."
          items={project.features}
        />

        <ListCard
          title="API surface"
          description="The interfaces connecting the system."
          items={project.api}
        />
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Engineering Plan
            </h2>

            <p className="mt-1 text-sm text-white/35">
              From architecture to implementation.
            </p>
          </div>

          <span className="text-xs text-white/25">
            {project.implementation_plan.length} tasks
          </span>
        </div>

        <div className="mt-8 space-y-3">
          {project.implementation_plan.map(
            (step, index) => (
              <div
                key={`${step}-${index}`}
                className="flex items-center gap-4 rounded-xl border border-white/5 bg-black/20 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs text-white/40">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-sm text-white/60">
                  {step}
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-white/25">
          Next layer
        </p>

        <h3 className="mt-3 text-2xl font-semibold">
          From blueprint to code.
        </h3>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/35">
          The next stage of Nexora AI turns this architecture into
          production-ready application code.
        </p>

        <button
          disabled
          className="mt-6 rounded-xl border border-white/10 px-5 py-3 text-sm text-white/30"
        >
          Generate Code — Coming Next
        </button>
      </div>
    </section>
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
      <h3 className="font-medium">{title}</h3>

      <div className="mt-5 space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-lg bg-black/20 px-3 py-2 text-sm text-white/50"
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
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="font-medium">{title}</h3>

      <p className="mt-1 text-xs text-white/30">
        {description}
      </p>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex gap-3 text-sm text-white/50"
          >
            <span className="text-white/20">→</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PipelineStep({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-xs text-white/40">
        {number}
      </div>

      <div className="h-px flex-1 bg-white/5" />

      <span className="text-sm text-white/40">
        {label}
      </span>
    </div>
  );
}