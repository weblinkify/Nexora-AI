from typing import Optional

import strawberry

from app.ai.models import AIRequest
from app.ai.service import AIService


@strawberry.type
class AIResult:
    content: str
    model: str


@strawberry.input
class AIGenerateInput:
    prompt: str
    system_prompt: Optional[str] = None
    temperature: float = 0.2


@strawberry.type
class AIQuery:
    @strawberry.field
    async def generate(self, input: AIGenerateInput) -> AIResult:
        service = AIService()

        result = await service.generate(
            AIRequest(
                prompt=input.prompt,
                system_prompt=input.system_prompt,
                temperature=input.temperature,
            )
        )

        return AIResult(
            content=result.content,
            model=result.model,
        )