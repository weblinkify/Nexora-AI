from fastapi import FastAPI, HTTPException

from app.ai.exceptions import AIProviderError
from app.ai.models import AIRequest, AIResponse
from app.ai.service import AIService

app = FastAPI(
    title="Nexora AI",
    description="AI-native full-stack application platform.",
    version="1.0.0",
)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/ai/generate", response_model=AIResponse)
async def generate_ai(request: AIRequest) -> AIResponse:
    try:
        ai_service = AIService()
        return await ai_service.generate(request)
    except AIProviderError as exc:
        raise HTTPException(
            status_code=502,
            detail="AI provider request failed",
        ) from exc