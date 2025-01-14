import { ChatService } from './services/chat';
import { DeepseekConfig } from './types';
import { ModelRegistry } from './models/registry';
import { ModelConfig } from './types/models';

export class Deepseek {
  private config: DeepseekConfig;
  public chat: ChatService;
  private modelRegistry: ModelRegistry;

  constructor(config: DeepseekConfig) {
    this.config = config;
    this.chat = new ChatService(config);
    this.modelRegistry = new ModelRegistry();
  }

  
  getAvailableModels() {
    return this.modelRegistry.listModels();
  }

  getModel(modelId: string) {
    return this.modelRegistry.getModel(modelId);
  }

  registerModel(config: ModelConfig) {
    this.modelRegistry.registerModel(config);
  }
}

export * from './types';
export * from './types/models';
export * from './services/chat'; 