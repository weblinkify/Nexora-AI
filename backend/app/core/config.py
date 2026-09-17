from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AI-Native Full-Stack Platform"
    app_env: str = "development"
    database_url: str = "postgresql://postgres:postgres@localhost:5432/ai_native"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()