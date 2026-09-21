import { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function LoadingShell({
  eyebrow,
  title,
  description,
  children,
}: Props) {
  return (
    <div className="rounded-3xl border border-[#3F3F46] bg-[#2A2A2A] p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-white/25">
        {eyebrow}
      </p>

      <h1 className="mt-4 text-3xl font-semibold">
        {title}
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-6 text-white/35">
        {description}
      </p>

      <div className="mt-10 space-y-5">
        {children}
      </div>
    </div>
  );
}