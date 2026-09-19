from typing import AsyncIterator

from app.ai.client import AIClient
from app.ai.models import AIRequest, AIResponse
from app.ai.prompts import SYSTEM_PROMPT, build_prompt


class AIService:
    def __init__(self) -> None:
        self.client = AIClient()

    async def generate(self, request: AIRequest) -> AIResponse:
        system_prompt = request.system_prompt or SYSTEM_PROMPT
        user_prompt = build_prompt(request.prompt)

        return await self.client.generate(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
            temperature=request.temperature,
        )

    async def stream(self, request: AIRequest) -> AsyncIterator[str]:
        system_prompt = request.system_prompt or SYSTEM_PROMPT
        user_prompt = build_prompt(request.prompt)

        async for chunk in self.client.stream(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
            temperature=request.temperature,
        ):
            yield chunk