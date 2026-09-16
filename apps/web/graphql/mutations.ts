import { gql } from "@apollo/client";

export const GENERATE_AI_RESPONSE = gql`
  mutation GenerateAiResponse($input: String!) {
    generateAiResponse(input: $input) {
      content
      model
      tokensUsed
    }
  }
`;
