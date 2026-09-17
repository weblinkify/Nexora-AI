from dataclasses import dataclass

from fastapi import Request


@dataclass
class GraphQLContext:
    request: Request


async def get_context(request: Request) -> GraphQLContext:
    return GraphQLContext(
        request=request,
    )