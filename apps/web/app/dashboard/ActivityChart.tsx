const activity = [
  35,
  52,
  44,
  68,
  58,
  76,
  64,
  88,
  72,
  94,
  82,
  100,
];

export function ActivityChart() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            AI Activity
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Recent activity in the demo environment.
          </p>
        </div>

        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
          Demo
        </span>
      </div>

      <div className="flex h-64 items-end gap-3">
        {activity.map((height, index) => (
          <div
            key={index}
            className="group flex h-full flex-1 items-end"
          >
            <div
              className="w-full rounded-t-lg bg-white/20 transition group-hover:bg-white/40"
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between text-xs text-white/30">
        <span>12h ago</span>
        <span>Now</span>
      </div>
    </div>
  );
}