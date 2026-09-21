import { CodeGenerationResponse } from "../types";

export function downloadProject(
  code: CodeGenerationResponse,
) {
  const manifest = {
    project_name: code.project_name,
    summary: code.summary,
    files: code.files,
  };

  const blob = new Blob(
    [JSON.stringify(manifest, null, 2)],
    {
      type: "application/json",
    },
  );

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `${code.project_name}.json`;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(url);
}