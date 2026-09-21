type Props = {
  number: string;
  title: string;
  description: string;
};

export function FeatureHint({
  number,
  title,
  description,
}: Props) {
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