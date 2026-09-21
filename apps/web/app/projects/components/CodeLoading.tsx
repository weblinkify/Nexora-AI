import { LoadingShell } from "./LoadingShell";
import { PipelineStep } from "./PipelineStep";

export function CodeLoading() {
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