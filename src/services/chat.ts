import { DeepseekClient } from './client';
import { ChatRequest, ChatResponse, ChatStreamResponse } from '../types';
import { ModelRegistry } from '../models/registry';
import { ModelConfig, ModelParameters } from '../types/models';

export class ChatService extends DeepseekClient {
  private modelRegistry: ModelRegistry;

  constructor(config: any) {
    super(config);
    this.modelRegistry = new ModelRegistry();
  }

  async createCompletion(request: ChatRequest): Promise<ChatResponse> {
    const baseURL = this.modelRegistry.getModelEndpoint(request.model);
    this.updateBaseURL(baseURL);
    
    return this.post<ChatResponse>('/chat/completions', request);
  }

  protected updateBaseURL(baseURL: string) {
    this.client.defaults.baseURL = baseURL;
  }

  // Get available models
  getAvailableModels() {
    return this.modelRegistry.listModels();
  }

  // Get models by family
  getModelsByFamily(family: 'chat' | 'code' | 'instruct') {
    return this.modelRegistry.listModels(family);
  }

  // Register custom model
  registerCustomModel(config: ModelConfig) {
    this.modelRegistry.registerModel(config);
  }

  async streamCompletion(
    request: ChatRequest,
    onData: (chunk: any) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    try {
      const response = await this.client.post('/chat/completions', 
        { ...request, stream: true },
        { responseType: 'stream' }
      );

      response.data.on('data', (chunk: Buffer) => {
        try {
          const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
          for (const line of lines) {
            if (line.includes('data: ')) {
              const jsonStr = line.replace('data: ', '');
              if (jsonStr === '[DONE]') return;
              const jsonData = JSON.parse(jsonStr);
              onData(jsonData);
            }
          }
        } catch (error) {
          onError?.(error as Error);
        }
      });
    } catch (error) {
      onError?.(error as Error);
    }
  }
} 