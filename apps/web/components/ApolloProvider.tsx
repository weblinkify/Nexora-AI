"use client";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";

import { ReactNode, useMemo } from "react";

interface Props {
  children: ReactNode;
}

export function ApolloProviderWrapper({ children }: Props) {
  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri:
        process.env.NEXT_PUBLIC_GRAPHQL_URL ??
        "http://localhost:8000/graphql"
    });

    return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache()
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
