type Props = {
  title: string;
  description: string;
  items: string[];
};

export function ListCard({
  title,
  description,
  items,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="font-medium">{title}</h3>

      <p className="mt-1 text-xs text-white/30">
        {description}
      </p>

      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
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