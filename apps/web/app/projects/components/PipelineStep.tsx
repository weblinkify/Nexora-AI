type Props = {
  number: string;
  label: string;
  active?: boolean;
};

export function PipelineStep({
  number,
  label,
  active = false,
}: Props) {
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