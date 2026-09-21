from fastapi import APIRouter, HTTPException

from app.ai.exceptions import AIProviderError
from app.projects.code_generator import CodeGeneratorService
from app.projects.code_models import (
    CodeGenerationRequest,
    CodeGenerationResponse,
)
from app.projects.models import ProjectRequest, ProjectResponse
from app.projects.service import ProjectService

router = APIRouter(
    prefix="/api/projects",
    tags=["projects"],
)


@router.post(
    "/generate",
    response_model=ProjectResponse,
)
async def generate_project(
    request: ProjectRequest,
) -> ProjectResponse:
    try:
        service = ProjectService()

        return await service.generate(request)

    except AIProviderError as exc:
        raise HTTPException(
            status_code=502,
            detail=str(exc),
        ) from exc


@router.post(
    "/code",
    response_model=CodeGenerationResponse,
)
async def generate_code(
    request: CodeGenerationRequest,
) -> CodeGenerationResponse:
    try:
        service = CodeGeneratorService()

        return await service.generate(request)

    except AIProviderError as exc:
        raise HTTPException(
            status_code=502,
            detail=str(exc),
        ) from exc