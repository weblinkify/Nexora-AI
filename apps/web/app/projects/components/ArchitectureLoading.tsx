import { LoadingShell } from "./LoadingShell";
import { PipelineStep } from "./PipelineStep";

export function ArchitectureLoading() {
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