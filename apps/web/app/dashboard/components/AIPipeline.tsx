const pipelineSteps = [
  "User idea",
  "FastAPI",
  "AI Service",
  "LLM Provider",
  "Streaming Response",
];

export function AIPipeline() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-lg font-semibold">
        AI Pipeline
      </h2>

      <p className="mt-1 text-sm text-white/40">
        How Nexora processes an AI request.
      </p>

      <div className="mt-8 space-y-4">
        {pipelineSteps.map((step, index) => (
          <div
            key={step}
            className="flex items-center gap-4"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs">
              {index + 1}
            </div>

            <div>
              <p className="text-sm font-medium">
                {step}
              </p>

              {index < pipelineSteps.length - 1 && (
                <p className="mt-1 text-xs text-white/30">
                  Connected
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}