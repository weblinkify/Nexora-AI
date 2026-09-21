
import Link from "next/link";

const metrics = [
  {
    label: "AI Requests",
    value: "128",
    description: "Demo activity",
  },
  {
    label: "Successful Runs",
    value: "124",
    description: "96.9% demo success",
  },
  {
    label: "Avg Response",
    value: "1.8s",
    description: "Demo environment",
  },
  {
    label: "Tokens Used",
    value: "42.3K",
    description: "Estimated usage",
  },
];

const projects = [
  {
    name: "Invoice SaaS",
    status: "Generated",
    description: "Architecture and implementation plan",
  },
  {
    name: "AI Support Agent",
    status: "In progress",
    description: "API and workflow design",
  },
  {
    name: "Analytics Platform",
    status: "Generated",
    description: "Full-stack application blueprint",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#212121] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <header className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              AI Dashboard
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Monitor your AI application workspace.
            </p>
          </div>

          <Link
            href="/projects/new"
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
          >
            New AI Project
          </Link>
        </header>

        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p className="text-sm text-white/50">{metric.label}</p>

              <p className="mt-3 text-3xl font-semibold tracking-tight">
                {metric.value}
              </p>

              <p className="mt-2 text-xs text-white/40">
                {metric.description}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">AI Activity</h2>
                <p className="mt-1 text-sm text-white/40">
                  Recent activity in the demo environment.
                </p>
              </div>

              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                Demo
              </span>
            </div>

            <div className="flex h-64 items-end gap-3">
              {[35, 52, 44, 68, 58, 76, 64, 88, 72, 94, 82, 100].map(
                (height, index) => (
                  <div
                    key={index}
                    className="group flex h-full flex-1 items-end"
                  >
                    <div
                      className="w-full rounded-t-lg bg-white/20 transition group-hover:bg-white/40"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ),
              )}
            </div>

            <div className="mt-4 flex justify-between text-xs text-white/30">
              <span>12h ago</span>
              <span>Now</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-semibold">AI Pipeline</h2>

            <p className="mt-1 text-sm text-white/40">
              How Nexora processes an AI request.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "User idea",
                "FastAPI",
                "AI Service",
                "LLM Provider",
                "Streaming Response",
              ].map((step, index) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs">
                    {index + 1}
                  </div>

                  <div>
                    <p className="text-sm font-medium">{step}</p>
                    {index < 4 && (
                      <p className="mt-1 text-xs text-white/30">
                        Connected
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Recent AI Projects</h2>

            <p className="mt-1 text-sm text-white/40">
              Applications generated through the Nexora workflow.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.name}
                className="rounded-xl border border-white/10 bg-black/20 p-5 transition hover:border-white/20"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-medium">{project.name}</h3>

                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/60">
                    {project.status}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  {project.description}
                </p>

                <button className="mt-5 text-sm text-white/70 transition hover:text-white">
                  View project →
                </button>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          Nexora AI · Build intelligent applications. Ship them like software.
        </footer>
      </div>
    </main>
  );
}