import { ChatService } from '../services/chat';
import { TEST_API_KEY } from './setup';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ChatService', () => {
  let chatService: ChatService;

  beforeEach(() => {
    const mockAxiosInstance = {
      interceptors: {
        response: {
          use: jest.fn(),
        },
      },
      defaults: {},
      post: jest.fn(),
    };

    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);
    chatService = new ChatService({ apiKey: TEST_API_KEY });
    jest.clearAllMocks();
  });

  it('should create chat completion', async () => {
    const mockResponse = {
      data: {
        id: 'test-id',
        choices: [
          {
            message: { role: 'assistant', content: 'Hello!' },
            finish_reason: 'stop',
            index: 0,
          },
        ],
        usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 },
      },
    };

    const mockAxiosInstance = mockedAxios.create();
    (mockAxiosInstance.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await chatService.createCompletion({
      messages: [{ role: 'user', content: 'Hello' }],
      model: 'deepseek-chat',
      max_tokens: 100,
    });

    expect(response.choices[0].message.content).toBe('Hello!');
  });

  it('should handle streaming completion', async () => {
    const mockStreamResponse = {
      data: {
        on: (event: string, callback: any) => {
          if (event === 'data') {
            callback(Buffer.from('data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n'));
            callback(Buffer.from('data: [DONE]\n\n'));
          }
        },
      },
    };

    const mockAxiosInstance = mockedAxios.create();
    (mockAxiosInstance.post as jest.Mock).mockResolvedValue(mockStreamResponse);

    const chunks: string[] = [];
    await chatService.streamCompletion(
      {
        messages: [{ role: 'user', content: 'Hello' }],
        model: 'deepseek-chat',
      },
      (chunk) => {
        if (chunk.choices[0].delta.content) {
          chunks.push(chunk.choices[0].delta.content);
        }
      },
    );

    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks[0]).toBe('Hello');
  });
});
