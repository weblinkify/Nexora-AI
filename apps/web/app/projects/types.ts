export type ProjectResponse = {
  title: string;
  summary: string;
  features: string[];
  architecture: {
    frontend: string[];
    backend: string[];
    database: string[];
    infrastructure: string[];
  };
  api: string[];
  database: string[];
  implementation_plan: string[];
};

export type GeneratedFile = {
  path: string;
  language: string;
  content: string;
};

export type CodeGenerationResponse = {
  project_name: string;
  summary: string;
  files: GeneratedFile[];
};