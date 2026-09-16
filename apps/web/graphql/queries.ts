import { gql } from "@apollo/client";

export const GET_PLATFORM_INFO = gql`
  query GetPlatformInfo {
    platformInfo {
      name
      version
      environment
    }
  }
`;
