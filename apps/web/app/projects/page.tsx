"use client";

import { useEffect, useState } from "react";

import {
  ProjectResponse,
  CodeGenerationResponse,
} from "./types";

import { IdeaComposer } from "./components/IdeaComposer";
import { ArchitectureLoading } from "./components/ArchitectureLoading";
import { ArchitectureResult } from "./components/ArchitectureResult";
import { CodeLoading } from "./components/CodeLoading";
import { CodeWorkspace } from "./components/CodeWorkspace";

import { exportArchitecture } from "./lib/exportArchitecture";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function NewProjectPage() {
  const [idea, setIdea] = useState("");
  const [project, setProject] =
    useState<ProjectResponse | null>(null);

  const [code, setCode] =
    useState<CodeGenerationResponse | null>(null);

  const [loadingArchitecture, setLoadingArchitecture] =
    useState(false);

  const [loadingCode, setLoadingCode] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (loadingCode) {
      document.getElementById("page-scroll")?.scrollTo(0, 0);
    }
  }, [loadingCode]);

  async function architectIdea() {
    if (!idea.trim()) {
      setError("Describe the application you want to build.");
      return;
    }

    if (idea.trim().length < 10) {
      setError(
        "Describe your idea using at least 10 characters.",
      );
      return;
    }

    setLoadingArchitecture(true);
    setError("");
    setProject(null);
    setCode(null);

    try {
      const response = await fetch(
        `${API_URL}/api/projects/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idea: idea.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          extractError(data) ||
          "Unable to architect this idea.",
        );
      }

      setProject(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to connect to the Nexora AI backend.",
      );
    } finally {
      setLoadingArchitecture(false);
    }
  }

  async function generateCode() {
    if (!project) return;

    setLoadingCode(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/projects/code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idea: idea.trim(),
            architecture: project.architecture,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          extractError(data) ||
          "Unable to generate the application code.",
        );
      }

      setCode(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to generate the application code.",
      );
    } finally {
      setLoadingCode(false);
    }
  }

  function handleExportArchitecture() {
    if (!project) return;

    exportArchitecture(project);
  }

  function resetProject() {
    setProject(null);
    setCode(null);
    setError("");
  }

  return (
    <main className="min-h-screen bg-[#212121] text-white">
      <div className="mx-auto max-w-[1180px] py-8 pb-6">
        {!project && !loadingArchitecture && (
          <IdeaComposer
            idea={idea}
            setIdea={setIdea}
            loading={loadingArchitecture}
            error={error}
            onGenerate={architectIdea}
          />
        )}

        {loadingArchitecture && (
          <ArchitectureLoading />
        )}

        {project && !code && !loadingCode && (
          <ArchitectureResult
            project={project}
            error={error}
            onGenerateCode={generateCode}
            onReset={resetProject}
            onExportArchitecture={
              handleExportArchitecture
            }
          />
        )}

        {loadingCode && <CodeLoading />}

        {code && !loadingCode && (
          <CodeWorkspace
            project={project}
            code={code}
            error={error}
            onGenerateCode={generateCode}
            onReset={resetProject}
          />
        )}
      </div>
    </main>
  );
}

function extractError(data: any): string {
  if (!data) return "";

  if (typeof data.detail === "string") {
    return data.detail;
  }

  if (Array.isArray(data.detail)) {
    return data.detail
      .map((item: any) => item?.msg)
      .filter(Boolean)
      .join(", ");
  }

  return "";
}