import { MetricCard } from "./MetricCard";

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

export function MetricsGrid() {
  return (
    <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.label}
          label={metric.label}
          value={metric.value}
          description={metric.description}
        />
      ))}
    </section>
  );
}