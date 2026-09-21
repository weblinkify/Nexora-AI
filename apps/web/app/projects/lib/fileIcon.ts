export function fileIcon(language: string) {
  const normalized = language.toLowerCase();

  if (
    normalized.includes("typescript") ||
    normalized === "tsx"
  ) {
    return "TS";
  }

  if (normalized.includes("python")) {
    return "PY";
  }

  if (normalized.includes("json")) {
    return "{}";
  }

  if (
    normalized.includes("markdown") ||
    normalized === "md"
  ) {
    return "MD";
  }

  if (normalized.includes("docker")) {
    return "DO";
  }

  return "·";
}