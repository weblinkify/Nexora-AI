import asyncio
from typing import AsyncIterator


class DemoAI:
    """Local AI simulator for demos and development."""

    def _response(self, prompt: str) -> str:
        prompt_lower = prompt.lower()

        if any(word in prompt_lower for word in ["fastapi", "backend", "api"]):
            return (
                "FastAPI is a strong choice for an AI backend because it provides "
                "async request handling, automatic API documentation, and built-in "
                "validation through Pydantic.\n\n"
                "For Nexora AI, the backend handles AI requests, streaming "
                "responses, and application logic while keeping the frontend "
                "independent from the AI provider."
            )

        if any(
            word in prompt_lower
            for word in ["next.js", "nextjs", "frontend", "react"]
        ):
            return (
                "Next.js provides the application layer for the Nexora AI "
                "frontend. It handles the user interface while FastAPI manages "
                "AI requests and backend logic.\n\n"
                "This separation allows the frontend and backend to evolve "
                "independently."
            )

        if any(
            word in prompt_lower
            for word in ["investor", "startup", "business"]
        ):
            return (
                "Nexora AI is an AI-native application platform designed with "
                "a modular architecture.\n\n"
                "The platform separates the frontend, API layer, AI service, "
                "and provider integration. This creates a foundation for "
                "authentication, persistent conversations, usage controls, "
                "and multiple AI providers."
            )

        if any(word in prompt_lower for word in ["hello", "hi", "hey"]):
            return (
                "Hello! I'm Nexora AI. I can help you explore the platform, "
                "architecture, APIs, and AI-powered workflows."
            )

        return (
            f'I understand your request about "{prompt.strip()}".\n\n'
            "Nexora AI is processing this request through its application "
            "layer. In production, this layer can route the request to the "
            "configured AI provider and stream the response back to the client.\n\n"
            "This demo response is generated locally so the complete "
            "frontend-to-backend experience can be demonstrated without "
            "an external API dependency."
        )

    async def generate(self, prompt: str) -> tuple[str, dict[str, int]]:
        content = self._response(prompt)

        await asyncio.sleep(0.4)

        prompt_tokens = max(1, len(prompt.split()))
        completion_tokens = max(1, len(content.split()))

        usage = {
            "prompt_tokens": prompt_tokens,
            "completion_tokens": completion_tokens,
            "total_tokens": prompt_tokens + completion_tokens,
        }

        return content, usage

    async def stream(self, prompt: str) -> AsyncIterator[str]:
        content = self._response(prompt)

        for index, word in enumerate(content.split(" ")):
            chunk = word

            if index < len(content.split(" ")) - 1:
                chunk += " "

            yield chunk
            await asyncio.sleep(0.025)