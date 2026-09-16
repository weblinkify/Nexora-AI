"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PLATFORM_INFO } from "@/graphql/queries";
import { HealthStatus } from "./HealthStatus";
import { AiPlayground } from "./AiPlayground";

export function Dashboard() {
  const { data, loading, error } = useQuery(GET_PLATFORM_INFO);
  const [activeTab, setActiveTab] = useState<"overview" | "ai">(
    "overview"
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
          AI-Native Full Stack
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          AI SaaS Platform
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          A modern full-stack application using Next.js,
          TypeScript, GraphQL, FastAPI, Python, and AI services.
        </p>
      </div>

      <div className="mb-8 flex gap-2 rounded-xl border border-white/10 bg-white/5 p-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`rounded-lg px-4 py-2 text-sm ${
            activeTab === "overview"
              ? "bg-white text-slate-950"
              : "text-slate-300"
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab("ai")}
          className={`rounded-lg px-4 py-2 text-sm ${
            activeTab === "ai"
              ? "bg-white text-slate-950"
              : "text-slate-300"
          }`}
        >
          AI Playground
        </button>
      </div>

      {activeTab === "overview" && (
        <>
          <div className="grid gap-6 md:grid-cols-3">
            <HealthStatus />

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-400">
                Backend
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                FastAPI
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                Async Python API with GraphQL and REST support.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-400">
                AI
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                LLM Ready
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                Provider-independent AI service abstraction.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">
              Platform Information
            </h2>

            {loading && (
              <p className="mt-4 text-slate-400">
                Loading...
              </p>
            )}

            {error && (
              <p className="mt-4 text-red-400">
                Unable to connect to GraphQL API.
              </p>
            )}

            {data && (
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <InfoItem
                  label="Application"
                  value={data.platformInfo.name}
                />

                <InfoItem
                  label="Version"
                  value={data.platformInfo.version}
                />

                <InfoItem
                  label="Environment"
                  value={data.platformInfo.environment}
                />
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "ai" && <AiPlayground />}
    </section>
  );
}

function InfoItem({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-black/20 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value}
      </p>
    </div>
  );
}
