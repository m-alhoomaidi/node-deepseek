import { ModelRegistry } from '../models/registry';

describe('ModelRegistry', () => {
  let registry: ModelRegistry;

  beforeEach(() => {
    registry = new ModelRegistry();
  });

  it('should have default models registered', () => {
    const models = registry.listModels();
    expect(models.length).toBeGreaterThan(0);
    expect(models.some((m) => m.id === 'deepseek-chat')).toBeTruthy();
  });

  it('should register new model', () => {
    const newModel = {
      id: 'test-model',
      name: 'Test Model',
      version: '1.0',
      maxTokens: 1000,
      supportsFunctions: false,
      supportsVision: false,
      contextWindow: 1000,
    };

    registry.registerModel(newModel);
    const model = registry.getModel('test-model');
    expect(model).toEqual(newModel);
  });

  it('should filter models by family', () => {
    const chatModels = registry.listModels('chat');
    expect(chatModels.every((m) => m.id.includes('chat'))).toBeTruthy();
  });

  it('should validate token limits', () => {
    expect(() => {
      registry.validateModelParameters('deepseek-chat', 100000);
    }).toThrow();
  });
});
