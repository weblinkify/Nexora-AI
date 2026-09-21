"use client";

import { useMemo, useState } from "react";

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

type GeneratedFile = {
  path: string;
  language: string;
  content: string;
};

type CodeGenerationResponse = {
  project_name: string;
  summary: string;
  files: GeneratedFile[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function NewProjectPage() {
  const [idea, setIdea] = useState("");
  const [project, setProject] =
    useState<ProjectResponse | null>(null);

  const [code, setCode] =
    useState<CodeGenerationResponse | null>(null);

  const [loadingArchitecture, setLoadingArchitecture] =
    useState(false);

  const [loadingCode, setLoadingCode] =
    useState(false);

  const [error, setError] = useState("");

  async function architectIdea() {
    if (!idea.trim()) {
      setError("Describe the application you want to build.");
      return;
    }

    if (idea.trim().length < 10) {
      setError(
        "Describe your idea using at least 10 characters.",
      );
      return;
    }

    setLoadingArchitecture(true);
    setError("");
    setProject(null);
    setCode(null);

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
        throw new Error(
          extractError(data) ||
          "Unable to architect this idea.",
        );
      }

      setProject(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to connect to the Nexora AI backend.",
      );
    } finally {
      setLoadingArchitecture(false);
    }
  }

  async function generateCode() {
    if (!project) return;

    setLoadingCode(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/projects/code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idea: idea.trim(),
            architecture: project.architecture,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          extractError(data) ||
          "Unable to generate the application code.",
        );
      }

      setCode(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to generate the application code.",
      );
    } finally {
      setLoadingCode(false);
    }
  }

  function resetProject() {
    setProject(null);
    setCode(null);
    setError("");
  }

  return (
    <main className="min-h-screen bg-[#212121] text-white">
      <div className="mx-auto max-w-[1400px] pb-6 py-8">
        {!project && !loadingArchitecture && (
          <IdeaComposer
            idea={idea}
            setIdea={setIdea}
            loading={loadingArchitecture}
            error={error}
            onGenerate={architectIdea}
          />
        )}

        {loadingArchitecture && (
          <ArchitectureLoading />
        )}

        {project && !code && !loadingCode && (
          <ArchitectureResult
            project={project}
            error={error}
            onGenerateCode={generateCode}
            onReset={resetProject}
          />
        )}

        {loadingCode && (
          <CodeLoading />
        )}

        {code && !loadingCode && (
          <CodeWorkspace
            project={project}
            code={code}
            error={error}
            onGenerateCode={generateCode}
            onReset={resetProject}
          />
        )}
      </div>
    </main>
  );
}

function IdeaComposer({
  idea,
  setIdea,
  loading,
  error,
  onGenerate,
}: {
  idea: string;
  setIdea: (value: string) => void;
  loading: boolean;
  error: string;
  onGenerate: () => void;
}) {
  return (
    <section className="mx-auto mt-5 max-w-4xl">
      <div className="text-center">

        <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
          Turn an idea into
          <span className="block text-white/35">
            an engineering system.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/40">
          Nexora AI transforms a product idea into requirements,
          architecture, APIs, data models, infrastructure,
          implementation tasks, and eventually production-ready code.
        </p>
      </div>

      <div className="mt-12 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              What are you building?
            </p>

            <p className="mt-1 text-xs text-white/30">
              Describe the product in plain language.
            </p>
          </div>

          <div className="hidden rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/25 md:block">
            Step 01 / Architecture
          </div>
        </div>

        <textarea
          value={idea}
          onChange={(event) =>
            setIdea(event.target.value)
          }
          placeholder="Example: Build an AI platform that helps small businesses automate customer support..."
          className="mt-6 min-h-48 w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-5 text-sm leading-7 outline-none placeholder:text-white/20 focus:border-white/25"
        />

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-white/25">
            {idea.length} characters
          </span>

          <button
            onClick={onGenerate}
            disabled={loading}
            className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading
              ? "Architecting..."
              : "Architect This Idea →"}
          </button>
        </div>

        {error && <ErrorMessage message={error} />}
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <FeatureHint
          number="01"
          title="Understand"
          description="Extract product requirements."
        />

        <FeatureHint
          number="02"
          title="Architect"
          description="Design the complete system."
        />

        <FeatureHint
          number="03"
          title="Build"
          description="Generate the starter codebase."
        />
      </div>
    </section>
  );
}

function ArchitectureLoading() {
  return (
    <section className="mx-auto mt-20 max-w-4xl">
      <LoadingShell
        eyebrow="Nexora AI"
        title="Designing your system"
        description="Breaking the product idea into an implementation-ready architecture."
      >
        <PipelineStep
          number="01"
          label="Understanding requirements"
          active
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
      </LoadingShell>
    </section>
  );
}

function ArchitectureResult({
  project,
  error,
  onGenerateCode,
  onReset,
}: {
  project: ProjectResponse;
  error: string;
  onGenerateCode: () => void;
  onReset: () => void;
}) {
  return (
    <section className="mt-14 space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/25">
            Step 02 / Architecture
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            {project.title}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/40">
            {project.summary}
          </p>
        </div>

        <button
          onClick={onReset}
          className="rounded-xl border border-white/10 px-4 py-2 text-xs text-white/40 transition hover:bg-white/5"
        >
          Start over
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <StatCard
          label="Capabilities"
          value={project.features.length}
        />

        <StatCard
          label="API endpoints"
          value={project.api.length}
        />

        <StatCard
          label="Data entities"
          value={project.database.length}
        />

        <StatCard
          label="Build tasks"
          value={project.implementation_plan.length}
        />
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

      <div className="grid gap-6 lg:grid-cols-2">
        <ListCard
          title="Product capabilities"
          description="What the system needs to do."
          items={project.features}
        />

        <ListCard
          title="API surface"
          description="Interfaces connecting the application."
          items={project.api}
        />
      </div>

      <div className="rounded-3xl border border-[#3F3F46] bg-[#2A2A2A] p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/25">
              Implementation
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Engineering Plan
            </h2>
          </div>

          <span className="text-xs text-white/25">
            {project.implementation_plan.length} tasks
          </span>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2">
          {project.implementation_plan.map(
            (step, index) => (
              <div
                key={`${step}-${index}`}
                className="flex gap-4 rounded-xl border border-white/5 bg-black/20 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-sm leading-6 text-gray-200">
                  {step}
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/25">
              Next layer
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Turn the blueprint into code.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/35">
              Nexora will use this architecture and your original
              product idea to generate a coherent full-stack starter
              application.
            </p>
          </div>

          <button
            onClick={onGenerateCode}
            className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Generate Full-Stack Code →
          </button>
        </div>
      </div>
    </section>
  );
}

function CodeLoading() {
  return (
    <section className="mx-auto mt-20 max-w-4xl">
      <LoadingShell
        eyebrow="Nexora AI"
        title="Generating your codebase"
        description="Creating connected frontend, backend, configuration, and test files."
      >
        <PipelineStep
          number="01"
          label="Creating application structure"
          active
        />

        <PipelineStep
          number="02"
          label="Generating backend services"
        />

        <PipelineStep
          number="03"
          label="Generating frontend components"
        />

        <PipelineStep
          number="04"
          label="Generating configuration and tests"
        />
      </LoadingShell>
    </section>
  );
}

function CodeWorkspace({
  project,
  code,
  error,
  onGenerateCode,
  onReset,
}: {
  project: ProjectResponse | null;
  code: CodeGenerationResponse;
  error: string;
  onGenerateCode: () => void;
  onReset: () => void;
}) {
  const [selectedPath, setSelectedPath] = useState(
    code.files[0]?.path ?? "",
  );

  const selectedFile = useMemo(
    () =>
      code.files.find(
        (file) => file.path === selectedPath,
      ) ?? code.files[0],
    [code.files, selectedPath],
  );

  async function copyFile() {
    if (!selectedFile) return;

    await navigator.clipboard.writeText(
      selectedFile.content,
    );
  }

  function downloadProject() {
    const manifest = {
      project_name: code.project_name,
      summary: code.summary,
      files: code.files,
    };

    const blob = new Blob(
      [JSON.stringify(manifest, null, 2)],
      {
        type: "application/json",
      },
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${code.project_name}.json`;
    anchor.click();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="mt-14 space-y-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/25">
            Step 03 / Generated Code
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            {code.project_name}
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/40">
            {code.summary}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={downloadProject}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-xs text-white/50 transition hover:bg-white/5"
          >
            Export Project
          </button>

          <button
            onClick={onReset}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-xs text-white/50 transition hover:bg-white/5"
          >
            Start over
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-white/25">
              Project files
            </p>

            <p className="mt-2 text-xs text-white/30">
              {code.files.length} generated files
            </p>
          </div>

          <div className="max-h-[650px] overflow-y-auto p-2">
            {code.files.map((file) => {
              const active =
                selectedFile?.path === file.path;

              return (
                <button
                  key={file.path}
                  onClick={() =>
                    setSelectedPath(file.path)
                  }
                  className={[
                    "w-full rounded-lg px-3 py-2.5 text-left text-xs transition",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:bg-white/5 hover:text-white/70",
                  ].join(" ")}
                >
                  <span className="mr-2 text-white/20">
                    {fileIcon(file.language)}
                  </span>

                  {file.path}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#080808]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="text-xs text-white/20">
                {selectedFile
                  ? fileIcon(selectedFile.language)
                  : ""}
              </span>

              <span className="truncate text-xs text-white/50">
                {selectedFile?.path}
              </span>
            </div>

            <button
              onClick={copyFile}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-[11px] text-white/40 transition hover:bg-white/5"
            >
              Copy
            </button>
          </div>

          <div className="overflow-auto">
            <pre className="min-h-[650px] p-6 text-xs leading-6 text-white/60">
              <code>
                {selectedFile?.content ??
                  "No file selected."}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/25">
              Generated successfully
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Your architecture is now executable.
            </h2>

            <p className="mt-2 text-sm text-white/35">
              {project?.title ??
                "Generated application"}{" "}
              has been converted into a full-stack starter
              codebase.
            </p>
          </div>

          <button
            onClick={onGenerateCode}
            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/50 transition hover:bg-white/5"
          >
            Regenerate Code
          </button>
        </div>
      </div>
    </section>
  );
}

function LoadingShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[#3F3F46] bg-[#2A2A2A] p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-white/25">
        {eyebrow}
      </p>

      <h1 className="mt-4 text-3xl font-semibold">
        {title}
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-6 text-white/35">
        {description}
      </p>

      <div className="mt-10 space-y-5">
        {children}
      </div>
    </div>
  );
}

function PipelineStep({
  number,
  label,
  active = false,
}: {
  number: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={[
          "flex h-9 w-9 items-center justify-center rounded-lg text-xs",
          active
            ? "bg-white text-black"
            : "bg-white/5 text-white/30",
        ].join(" ")}
      >
        {number}
      </div>

      <div className="h-px flex-1 bg-white/5" />

      <span
        className={
          active
            ? "text-sm text-white/70"
            : "text-sm text-white/30"
        }
      >
        {label}
      </span>
    </div>
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
            className="rounded-lg bg-[#303030] px-3 py-2.5 text-sm text-gray-200"
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

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs text-white/30">{label}</p>

      <p className="mt-2 text-2xl font-semibold">
        {value}
      </p>
    </div>
  );
}

function FeatureHint({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
      <span className="text-[10px] text-white/20">
        {number}
      </span>

      <p className="mt-2 text-sm font-medium text-white/60">
        {title}
      </p>

      <p className="mt-1 text-xs text-white/25">
        {description}
      </p>
    </div>
  );
}

function ErrorMessage({
  message,
}: {
  message: string;
}) {
  return (
    <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
      {message}
    </div>
  );
}

function extractError(data: any): string {
  if (!data) return "";

  if (typeof data.detail === "string") {
    return data.detail;
  }

  if (Array.isArray(data.detail)) {
    return data.detail
      .map((item: any) => item?.msg)
      .filter(Boolean)
      .join(", ");
  }

  return "";
}

function fileIcon(language: string) {
  const normalized = language.toLowerCase();

  if (
    normalized.includes("typescript") ||
    normalized === "tsx"
  ) {
    return "TS";
  }

  if (normalized.includes("python")) {
    return "PY";
  }

  if (normalized.includes("json")) {
    return "{}";
  }

  if (
    normalized.includes("markdown") ||
    normalized === "md"
  ) {
    return "MD";
  }

  if (
    normalized.includes("docker")
  ) {
    return "DO";
  }

  return "·";
}
