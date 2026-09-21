type Props = {
  title: string;
  items: string[];
};

export function ArchitectureCard({
  title,
  items,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="font-medium">{title}</h3>

      <div className="mt-5 space-y-2">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="rounded-lg bg-[#303030] px-3 py-2.5 text-sm text-gray-200"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}