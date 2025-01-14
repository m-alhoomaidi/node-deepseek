export interface ModelConfig {
  id: string;
  name: string;
  version: string;
  maxTokens: number;
  supportsFunctions: boolean;
  supportsVision: boolean;
  contextWindow: number;
}

export type ModelFamily = 'chat' | 'code' | 'instruct';

export interface ModelParameters {
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  stop?: string[];
} 