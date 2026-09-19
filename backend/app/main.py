from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter

from app.api.routes.health import router as health_router
from app.graphql.context import get_context
from app.graphql.schema import schema

app = FastAPI(
    title="Nexora AI",
    version="0.1.0",
)

app.include_router(
    health_router,
    prefix="/api",
)

graphql_app = GraphQLRouter(
    schema,
    context_getter=get_context,
)

app.include_router(
    graphql_app,
    prefix="/graphql",
)


@app.get("/")
async def root() -> dict[str, str]:
    return {
        "name": "Nexora AI",
        "status": "running",
    }