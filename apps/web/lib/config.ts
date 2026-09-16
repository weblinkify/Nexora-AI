export const config = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8000",

  graphqlUrl:
    process.env.NEXT_PUBLIC_GRAPHQL_URL ??
    "http://localhost:8000/graphql"
} as const;
