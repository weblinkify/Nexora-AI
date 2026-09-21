import { ProjectCard } from "./ProjectCard";

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

export function RecentProjects() {
  return (
    <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Recent AI Projects
        </h2>

        <p className="mt-1 text-sm text-white/40">
          Applications generated through the Nexora workflow.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            status={project.status}
            description={project.description}
          />
        ))}
      </div>
    </section>
  );
}