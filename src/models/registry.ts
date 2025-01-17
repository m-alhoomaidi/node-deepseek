import { ModelConfig, ModelFamily } from '../types/models';

export interface ModelEndpoint {
  id: string;
  baseURL: string;
}

const MODEL_ENDPOINTS: ModelEndpoint[] = [
  {
    id: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com/v1',
  },
  {
    id: 'deepseek-chat-v2.5',
    baseURL: 'https://api.deepseek.com/v1',
  },
];

export class ModelRegistry {
  private models: Map<string, ModelConfig> = new Map();

  constructor() {
    // Register default models
    this.registerModel({
      id: 'deepseek-chat',
      name: 'DeepSeek Chat',
      version: '3.0',
      maxTokens: 32768,
      supportsFunctions: true,
      supportsVision: false,
      contextWindow: 32768,
    });

    this.registerModel({
      id: 'deepseek-chat-v2.5',
      name: 'DeepSeek Chat',
      version: '2.5',
      maxTokens: 16384,
      supportsFunctions: true,
      supportsVision: false,
      contextWindow: 16384,
    });

    this.registerModel({
      id: 'deepseek-coder',
      name: 'DeepSeek Coder',
      version: '3.0',
      maxTokens: 32768,
      supportsFunctions: true,
      supportsVision: false,
      contextWindow: 32768,
    });
  }

  registerModel(config: ModelConfig): void {
    this.models.set(config.id, config);
  }

  getModel(modelId: string): ModelConfig | undefined {
    return this.models.get(modelId);
  }

  listModels(family?: ModelFamily): ModelConfig[] {
    const allModels = Array.from(this.models.values());
    if (!family) return allModels;

    return allModels.filter((model) => model.id.toLowerCase().includes(family.toLowerCase()));
  }

  validateModelParameters(modelId: string, maxTokens?: number): void {
    const model = this.getModel(modelId);
    if (!model) {
      throw new Error(`Model ${modelId} not found`);
    }

    if (maxTokens && maxTokens > model.maxTokens) {
      throw new Error(`Requested ${maxTokens} tokens exceeds model maximum of ${model.maxTokens}`);
    }
  }

  getModelEndpoint(modelId: string): string {
    const endpoint = MODEL_ENDPOINTS.find((e) => e.id === modelId);
    return endpoint?.baseURL || 'https://api.deepseek.com/v1'; // default fallback
  }
}
