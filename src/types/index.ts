export interface DeepseekConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
}

export type DeepseekModel =
  | 'deepseek-chat'
  | 'deepseek-chat-v2'
  | 'deepseek-chat-v2.5'
  | 'deepseek-coder'
  | 'deepseek-coder-v2'
  | 'deepseek-coder-v2.5';

export interface ChatRequest {
  messages: ChatMessage[];
  model: DeepseekModel;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  seed?: number;
}

export interface ChatResponse {
  id: string;
  choices: {
    message: ChatMessage;
    finish_reason: string;
    index: number;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ChatStreamResponse {
  id: string;
  choices: {
    delta: Partial<ChatMessage>;
    finish_reason: string | null;
    index: number;
  }[];
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

export enum DeepseekErrorCode {
  INVALID_FORMAT = 400,
  AUTHENTICATION_FAILED = 401,
  INSUFFICIENT_BALANCE = 402,
  INVALID_PARAMETERS = 422,
  RATE_LIMIT_REACHED = 429,
  SERVER_ERROR = 500,
  SERVER_OVERLOADED = 503,
}

export class DeepseekError extends Error {
  code: DeepseekErrorCode;
  status: number;

  constructor(message: string, code: DeepseekErrorCode, status: number) {
    super(message);
    this.name = 'DeepseekError';
    this.code = code;
    this.status = status;
  }
}

export type Handler<T = unknown> = (data: T) => void;

export type ChatCompletionHandler = (response: ChatStreamResponse) => void;
export type ErrorHandler = (error: Error) => void;
