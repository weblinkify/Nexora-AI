"use client";

import { useEffect, useState } from "react";

type Status = "checking" | "healthy" | "unhealthy";

export function HealthStatus() {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let mounted = true;

    async function checkHealth() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ??
          "http://localhost:8000";

        const response = await fetch(`${apiUrl}/health`);

        if (!mounted) {
          return;
        }

        setStatus(response.ok ? "healthy" : "unhealthy");
      } catch {
        if (mounted) {
          setStatus("unhealthy");
        }
      }
    }

    checkHealth();

    return () => {
      mounted = false;
    };
  }, []);

  const config = {
    checking: {
      label: "Checking",
      color: "bg-yellow-400"
    },
    healthy: {
      label: "Healthy",
      color: "bg-emerald-400"
    },
    unhealthy: {
      label: "Unavailable",
      color: "bg-red-400"
    }
  }[status];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-slate-400">
        API Status
      </p>

      <div className="mt-3 flex items-center gap-3">
        <span
          className={`h-3 w-3 rounded-full ${config.color}`}
        />

        <h2 className="text-2xl font-semibold">
          {config.label}
        </h2>
      </div>

      <p className="mt-3 text-sm text-slate-400">
        FastAPI backend connectivity.
      </p>
    </div>
  );
}
