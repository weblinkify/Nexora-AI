export interface PlatformInfo {
  name: string;
  version: string;
  environment: string;
}

export interface PlatformInfoQuery {
  platformInfo: PlatformInfo;
}

export interface AiResponse {
  content: string;
  model: string;
  tokensUsed: number;
}

export interface GenerateAiResponseMutation {
  generateAiResponse: AiResponse;
}
