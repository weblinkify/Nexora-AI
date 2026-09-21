import { ProjectResponse } from "../types";

export function exportArchitecture(
  project: ProjectResponse,
) {
  const bulletList = (items: string[]) =>
    items.length
      ? items.map((item) => `- ${item}`).join("\n")
      : "- None specified";

  const numberedList = (items: string[]) =>
    items.length
      ? items
          .map((item, index) => `${index + 1}. ${item}`)
          .join("\n")
      : "No implementation plan provided.";

  const markdown = `# ${project.title}

## Nexora AI Architecture Brief

### Executive Summary

${project.summary}

---

## Product Capabilities

${bulletList(project.features)}

---

## System Architecture

### Frontend

${bulletList(project.architecture.frontend)}

### Backend

${bulletList(project.architecture.backend)}

### Data Layer

${bulletList(project.architecture.database)}

### Infrastructure

${bulletList(project.architecture.infrastructure)}

---

## API Surface

${bulletList(project.api)}

---

## Data Model

${bulletList(project.database)}

---

## Implementation Plan

${numberedList(project.implementation_plan)}

---

## Nexora AI

Architecture generated from the original product requirements by Nexora AI.
`;

  const blob = new Blob([markdown], {
    type: "text/markdown;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  const filename = project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  anchor.href = url;
  anchor.download = `${
    filename || "nexora-project"
  }-architecture.md`;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(url);
}