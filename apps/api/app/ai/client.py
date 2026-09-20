from typing import AsyncIterator, Optional

from openai import AsyncOpenAI

from app.ai.demo import DemoAI
from app.ai.exceptions import AIProviderError
from app.ai.models import AIResponse
from app.config import get_settings


class AIClient:
    def __init__(self) -> None:
        settings = get_settings()

        self.mock_mode = settings.ai_mock_mode
        self.model = settings.ai_model
        self.demo = DemoAI()
        self.client: Optional[AsyncOpenAI] = None

        if self.mock_mode:
            return

        if settings.ai_base_url:
            self.client = AsyncOpenAI(
                api_key=settings.ai_api_key,
                base_url=settings.ai_base_url,
            )
        else:
            self.client = AsyncOpenAI(
                api_key=settings.ai_api_key,
            )

    async def generate(
        self,
        *,
        system_prompt: str,
        user_prompt: str,
        temperature: float = 0.2,
    ) -> AIResponse:
        if self.mock_mode:
            content, usage = await self.demo.generate(user_prompt)

            return AIResponse(
                content=content,
                model="nexora-demo",
                usage=usage,
            )

        if self.client is None:
            raise AIProviderError("AI client is not configured")

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                temperature=temperature,
            )

            message = response.choices[0].message.content or ""

            usage: Optional[dict[str, int]] = None

            if response.usage:
                usage = {
                    "prompt_tokens": response.usage.prompt_tokens,
                    "completion_tokens": response.usage.completion_tokens,
                    "total_tokens": response.usage.total_tokens,
                }

            return AIResponse(
                content=message,
                model=self.model,
                usage=usage,
            )

        except Exception as exc:
            raise AIProviderError(
                "AI provider request failed"
            ) from exc

    async def stream(
        self,
        *,
        system_prompt: str,
        user_prompt: str,
        temperature: float = 0.2,
    ) -> AsyncIterator[str]:
        if self.mock_mode:
            async for chunk in self.demo.stream(user_prompt):
                yield chunk
            return

        if self.client is None:
            raise AIProviderError("AI client is not configured")

        try:
            stream = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                temperature=temperature,
                stream=True,
            )

            async for chunk in stream:
                content = chunk.choices[0].delta.content

                if content:
                    yield content

        except Exception as exc:
            raise AIProviderError(
                "AI streaming request failed"
            ) from exc