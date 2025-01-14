import { DeepseekClient } from '../services/client';
import { DeepseekError, DeepseekErrorCode } from '../types';
import { TEST_API_KEY } from './setup';

describe('DeepseekClient Configuration', () => {
  it('should create client instance with API key', () => {
    const client = new DeepseekClient({ apiKey: TEST_API_KEY });
    expect(client).toBeInstanceOf(DeepseekClient);
  });

  it('should throw error when no API key provided', () => {
    expect(() => {
      new DeepseekClient({ apiKey: '' });
    }).toThrow();
  });
});

describe('DeepseekClient Error Handling', () => {
  const client = new DeepseekClient({ apiKey: 'invalid-key' });

  it('should handle authentication error', async () => {
    try {
      await client['post']('/chat/completions', {});
      fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeInstanceOf(DeepseekError);
      expect((error as DeepseekError).code).toBe(DeepseekErrorCode.AUTHENTICATION_FAILED);
    }
  });
}); 