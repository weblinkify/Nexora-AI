from typing import List

from pydantic import BaseModel, Field


class GeneratedFile(BaseModel):
    path: str
    language: str
    content: str


class CodeGenerationRequest(BaseModel):
    idea: str = Field(min_length=10, max_length=5000)
    architecture: dict


class CodeGenerationResponse(BaseModel):
    project_name: str
    summary: str
    files: List[GeneratedFile]