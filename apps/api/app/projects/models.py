from typing import List

from pydantic import BaseModel, Field


class ProjectRequest(BaseModel):
    idea: str = Field(min_length=10, max_length=5000)


class ProjectArchitecture(BaseModel):
    frontend: List[str]
    backend: List[str]
    database: List[str]
    infrastructure: List[str]


class ProjectResponse(BaseModel):
    title: str
    summary: str
    features: List[str]
    architecture: ProjectArchitecture
    api: List[str]
    database: List[str]
    implementation_plan: List[str]