import json

from app.ai.client import AIClient
from app.ai.exceptions import AIProviderError
from app.projects.models import ProjectRequest, ProjectResponse
from app.projects.prompts import (
    PROJECT_SYSTEM_PROMPT,
    build_project_prompt,
)


class ProjectService:
    def __init__(self) -> None:
        self.client = AIClient()

    async def generate(
        self,
        request: ProjectRequest,
    ) -> ProjectResponse:
        response = await self.client.generate(
            system_prompt=PROJECT_SYSTEM_PROMPT,
            user_prompt=build_project_prompt(request.idea),
            temperature=0.2,
        )

        try:
            data = json.loads(response.content)
            return ProjectResponse.model_validate(data)
        except Exception as exc:
            raise AIProviderError(
                "AI returned an invalid project specification"
            ) from exc